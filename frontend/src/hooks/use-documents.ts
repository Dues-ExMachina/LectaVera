import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { documentsApi } from '@/lib/api/documents';
import type { DocumentCategory, UploadData } from '@/types';

export function useDocuments(filters?: { category?: DocumentCategory; page?: number }) {
    return useQuery({
        queryKey: ['documents', filters],
        queryFn: () => documentsApi.list(filters),
        staleTime: 1000 * 60 * 5,
    });
}

export function useDocument(id: string) {
    return useQuery({
        queryKey: ['documents', id],
        queryFn: () => documentsApi.get(id),
        enabled: !!id,
    });
}

export function useUploadDocument() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: UploadData) => documentsApi.upload(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['documents'] });
            toast.success('Document uploaded! Processing...');
        },
        onError: () => {
            toast.error('Upload failed. Please try again.');
        },
    });
}

export function useUpdateDocument() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: { category?: DocumentCategory; tags?: string[]; is_archived?: boolean } }) =>
            documentsApi.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['documents'] });
            toast.success('Document updated.');
        },
        onError: () => {
            toast.error('Failed to update document.');
        },
    });
}

export function useDeleteDocument() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => documentsApi.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['documents'] });
            toast.success('Document deleted.');
        },
        onError: () => {
            toast.error('Failed to delete document.');
        },
    });
}

export function useBulkDeleteDocuments() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (ids: string[]) => documentsApi.bulkDelete(ids),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['documents'] });
            toast.success('Documents deleted.');
        },
        onError: () => {
            toast.error('Failed to delete documents.');
        },
    });
}
