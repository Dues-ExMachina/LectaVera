// ==================== User & Auth ====================
export interface User {
  id: string;
  email: string;
  username: string;
  full_name: string;
  avatar_url?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Tokens {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  username: string;
  password: string;
  full_name: string;
}

export interface AuthResponse {
  user: User;
  tokens: Tokens;
}

// ==================== Documents ====================
export type DocumentCategory =
  | 'MATH'
  | 'SCIENCE'
  | 'HISTORY'
  | 'LITERATURE'
  | 'COMPUTER_SCIENCE'
  | 'ENGINEERING'
  | 'BUSINESS'
  | 'MEDICINE'
  | 'LAW'
  | 'OTHER';

export type DocumentStatus = 'PROCESSING' | 'READY' | 'FAILED';

export interface Document {
  id: string;
  filename: string;
  category: DocumentCategory;
  tags: string[];
  page_count: number;
  file_size: number;
  status: DocumentStatus;
  is_archived: boolean;
  uploaded_at: string;
  updated_at: string;
  thumbnail_url?: string;
}

export interface DocumentsResponse {
  documents: Document[];
  total: number;
  page: number;
  per_page: number;
}

export interface UploadData {
  file: File;
  category: DocumentCategory;
  tags?: string;
}

// ==================== Study Sessions ====================
export type StudyMode = 'answer' | 'summarize' | 'deep_dive';

export interface StudySession {
  id: string;
  title: string;
  mode: StudyMode;
  document_ids: string[];
  documents?: Document[];
  message_count: number;
  created_at: string;
  updated_at: string;
  duration_seconds?: number;
}

export interface Message {
  id?: string;
  role: 'user' | 'assistant';
  content: string;
  mode?: StudyMode;
  citations?: Citation[];
  verdict?: 'correct' | 'ambiguous' | 'incorrect';
  follow_up?: string;
  isStreaming?: boolean;
  created_at?: string;
}

export interface Citation {
  id: string;
  source_type: 'pdf' | 'web';
  document_name?: string;
  page_number?: number;
  url?: string;
  snippet: string;
}

export interface SessionWithMessages extends StudySession {
  messages: Message[];
}

// ==================== Quiz ====================
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface QuizGenerateRequest {
  document_ids: string[];
  question_count: number;
  difficulty: Difficulty;
  topic_focus?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  explanation?: string;
  source_reference?: string;
}

export interface QuizQuestionWithAnswer extends QuizQuestion {
  correct_answer_index: number;
  user_answer_index?: number;
}

export interface Quiz {
  id: string;
  title: string;
  document_ids: string[];
  questions: QuizQuestion[];
  question_count: number;
  difficulty: Difficulty;
  topic_focus?: string;
  status: 'pending' | 'completed';
  created_at: string;
}

export interface QuizSubmitRequest {
  answers: { question_id: string; answer_index: number }[];
}

export interface QuizResult {
  id: string;
  quiz_id: string;
  score: number;
  total: number;
  percentage: number;
  questions: QuizQuestionWithAnswer[];
  time_taken_seconds?: number;
  completed_at: string;
}

export interface QuizHistory {
  id: string;
  title: string;
  score?: number;
  total?: number;
  percentage?: number;
  status: 'pending' | 'completed';
  difficulty: Difficulty;
  created_at: string;
}

// ==================== Analytics ====================
export interface DashboardStats {
  total_documents: number;
  questions_this_week: number;
  avg_quiz_score: number;
  study_streak: number;
  documents_trend?: number;
  questions_trend?: number;
}

export interface ActivityData {
  questions_over_time: { date: string; count: number }[];
  questions_by_category: { category: string; count: number }[];
  time_per_document: { document_name: string; minutes: number }[];
}

export interface WeakArea {
  category: DocumentCategory;
  accuracy: number;
  recommendation: string;
  document_name?: string;
}

export interface StudyCalendarDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

// ==================== User Preferences ====================
export type AiPersonality = 'formal' | 'balanced' | 'casual';
export type CitationStyle = 'APA' | 'MLA' | 'Chicago';

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  ai_personality: AiPersonality;
  citation_style: CitationStyle;
  default_study_mode: StudyMode;
  email_notifications: boolean;
  study_reminders: boolean;
  quiz_reminders: boolean;
  weekly_summary: boolean;
  reminder_time?: string;
}

// ==================== Search ====================
export interface SearchResult {
  type: 'document' | 'session' | 'quiz';
  id: string;
  title: string;
  description?: string;
  highlight?: string;
}

// ==================== API ====================
export interface ApiError {
  detail: string;
  status_code: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  per_page: number;
}
