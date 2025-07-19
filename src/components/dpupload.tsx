"use client";

import { useState } from "react";
import { useUploadThing } from "./uploadthings";
import { Button } from "@/components/ui/button";
import { Upload, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface DpUploadProps {
    onUploadSuccess?: () => void;
}

export default function DpUpload({ onUploadSuccess }: DpUploadProps) {
    const [isUploading, setIsUploading] = useState(false);
    const { startUpload, isUploading: uploadThingIsUploading } = useUploadThing("imageUploader");

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setIsUploading(true);
        try {
            const uploaded = await startUpload(Array.from(files));
            if (uploaded) {
                console.log("Files: ", uploaded);
                toast.success("Profile picture updated successfully!");
                // Call the callback to refresh profile data
                onUploadSuccess?.();
            }
        } catch (error) {
            toast.error(`Upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        } finally {
            setIsUploading(false);
        }
    };

    const isLoading = uploadThingIsUploading || isUploading;

    return (
        <div className="mt-3 space-y-2">
            <Button
                type="button"
                variant="secondary"
                size="sm"
                disabled={isLoading}
                className="w-full relative group transition-all duration-200 hover:bg-primary hover:text-primary-foreground shadow-sm"
                asChild
            >
                <label className="cursor-pointer">
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Uploading...
                        </>
                    ) : (
                        <>
                            <Upload className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                            Change Photo
                        </>
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                        disabled={isLoading}
                        aria-label="Upload profile picture"
                    />
                </label>
            </Button>
            <p className="text-xs text-muted-foreground text-center leading-tight">
                JPG, PNG, GIF up to 4MB
            </p>
        </div>
    );
}