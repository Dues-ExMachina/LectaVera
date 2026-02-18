'use client';

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, X, Loader2 } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

const categories = [
    'MATH', 'SCIENCE', 'HISTORY', 'LITERATURE', 'COMPUTER_SCIENCE',
    'ENGINEERING', 'BUSINESS', 'MEDICINE', 'LAW', 'OTHER',
];

interface UploadModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function UploadModal({ open, onOpenChange }: UploadModalProps) {
    const [file, setFile] = useState<File | null>(null);
    const [category, setCategory] = useState('');
    const [tags, setTags] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [progress, setProgress] = useState(0);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            setFile(acceptedFiles[0]);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'application/pdf': ['.pdf'] },
        maxSize: 50 * 1024 * 1024,
        multiple: false,
    });

    const handleUpload = async () => {
        if (!file || !category) {
            toast.error('Please select a file and category');
            return;
        }

        setIsUploading(true);
        // Simulate upload progress
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 95) {
                    clearInterval(interval);
                    return 95;
                }
                return prev + 5;
            });
        }, 100);

        // Simulate API call
        setTimeout(() => {
            clearInterval(interval);
            setProgress(100);
            toast.success('Document uploaded! Processing...');
            setIsUploading(false);
            setFile(null);
            setCategory('');
            setTags('');
            setProgress(0);
            onOpenChange(false);
        }, 2000);
    };

    const removeFile = () => {
        setFile(null);
        setProgress(0);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[480px]">
                <DialogHeader>
                    <DialogTitle className="font-serif">Upload Document</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    {!file ? (
                        <div
                            {...getRootProps()}
                            className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${isDragActive
                                    ? 'border-primary bg-primary/5'
                                    : 'border-border hover:border-primary/50 hover:bg-muted/50'
                                }`}
                        >
                            <input {...getInputProps()} />
                            <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                            <p className="text-sm font-medium">
                                {isDragActive ? 'Drop the file here' : 'Drag & drop or click to browse'}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">PDF only, max 50MB</p>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-muted/30">
                            <FileText className="h-8 w-8 text-blue-500 shrink-0" />
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">{file.name}</p>
                                <p className="text-xs text-muted-foreground">
                                    {(file.size / 1024 / 1024).toFixed(1)} MB
                                </p>
                            </div>
                            <Button variant="ghost" size="icon" onClick={removeFile} className="h-8 w-8 shrink-0">
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    )}

                    {isUploading && <Progress value={progress} className="h-2" />}

                    <div className="space-y-2">
                        <Label>Category *</Label>
                        <Select value={category} onValueChange={setCategory}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((cat) => (
                                    <SelectItem key={cat} value={cat}>
                                        {cat.replace('_', ' ')}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Tags (optional)</Label>
                        <Input
                            placeholder="e.g., calculus, derivatives (comma separated)"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                        />
                    </div>

                    <Button
                        className="w-full bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] text-white"
                        onClick={handleUpload}
                        disabled={!file || !category || isUploading}
                    >
                        {isUploading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Uploading...
                            </>
                        ) : (
                            <>
                                <Upload className="mr-2 h-4 w-4" />
                                Upload
                            </>
                        )}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
