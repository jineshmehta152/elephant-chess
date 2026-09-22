"use client";

import { CloudinaryUpload } from "./CloudinaryUpload";

export function ImageUpload({ onUploadComplete }: { onUploadComplete: (url: string) => void }) {
  return (
    <CloudinaryUpload
      onChange={(url) => onUploadComplete(url)}
    />
  );
}








