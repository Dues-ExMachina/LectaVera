import { useAuthStore } from '@/store/auth-store';

const WS_BASE_URL = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8000';

export type WebSocketMessage =
    | { type: 'chunk'; content: string }
    | { type: 'complete'; citations: unknown[]; verdict: string; follow_up?: string }
    | { type: 'error'; message: string };

export class WebSocketManager {
    private ws: WebSocket | null = null;
    private reconnectAttempts = 0;
    private maxReconnectAttempts = 5;
    private reconnectTimeout: ReturnType<typeof setTimeout> | null = null;
    private sessionId: string;

    public onMessage?: (data: WebSocketMessage) => void;
    public onConnect?: () => void;
    public onDisconnect?: () => void;
    public onError?: (error: Event) => void;

    constructor(sessionId: string) {
        this.sessionId = sessionId;
    }

    connect() {
        const token = useAuthStore.getState().accessToken;
        if (!token) {
            console.error('No access token available for WebSocket connection');
            return;
        }

        try {
            this.ws = new WebSocket(`${WS_BASE_URL}/ws/${this.sessionId}?token=${token}`);

            this.ws.onopen = () => {
                this.reconnectAttempts = 0;
                this.onConnect?.();
            };

            this.ws.onclose = () => {
                this.onDisconnect?.();
                this.attemptReconnect();
            };

            this.ws.onerror = (error) => {
                this.onError?.(error);
            };

            this.ws.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data) as WebSocketMessage;
                    this.onMessage?.(data);
                } catch {
                    console.error('Failed to parse WebSocket message:', event.data);
                }
            };
        } catch (error) {
            console.error('WebSocket connection error:', error);
        }
    }

    send(content: string, mode: string) {
        if (this.ws?.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify({ content, mode }));
        } else {
            console.error('WebSocket is not connected');
        }
    }

    private attemptReconnect() {
        if (this.reconnectAttempts >= this.maxReconnectAttempts) {
            return;
        }

        const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000);
        this.reconnectAttempts++;

        this.reconnectTimeout = setTimeout(() => {
            this.connect();
        }, delay);
    }

    disconnect() {
        if (this.reconnectTimeout) {
            clearTimeout(this.reconnectTimeout);
        }
        this.reconnectAttempts = this.maxReconnectAttempts;
        this.ws?.close();
        this.ws = null;
    }

    get isConnected() {
        return this.ws?.readyState === WebSocket.OPEN;
    }
}
