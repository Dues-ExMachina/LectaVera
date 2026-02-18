import apiClient from './client';
import type { Document, DocumentsResponse, DocumentCategory, UploadData } from '@/types';

export const documentsApi = {
    list: async (filters?: {
        category?: DocumentCategory;
        page?: number;
        per_page?: number;
    }): Promise<DocumentsResponse> => {
        const res = await apiClient.get('/documents', { params: filters });
        return res.data;
    },

    upload: async (data: UploadData): Promise<Document> => {
        const formData = new FormData();
        formData.append('file', data.file);
        formData.append('category', data.category);
        if (data.tags) formData.append('tags', data.tags);

        const res = await apiClient.post('/documents/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return res.data;
    },

    get: async (id: string): Promise<Document> => {
        const res = await apiClient.get(`/documents/${id}`);
        return res.data;
    },

    getStatus: async (id: string): Promise<{ status: string; progress?: number }> => {
        const res = await apiClient.get(`/documents/${id}/status`);
        return res.data;
    },

    update: async (
        id: string,
        data: { category?: DocumentCategory; tags?: string[]; is_archived?: boolean }
    ): Promise<Document> => {
        const res = await apiClient.patch(`/documents/${id}`, data);
        return res.data;
    },

    delete: async (id: string): Promise<void> => {
        await apiClient.delete(`/documents/${id}`);
    },

    bulkDelete: async (ids: string[]): Promise<void> => {
        await apiClient.post('/documents/bulk-delete', { document_ids: ids });
    },
};
