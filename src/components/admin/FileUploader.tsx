
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { validateImageFile, validateResumeFile, validateFileSize, createFilePreview, revokeFilePreview } from "@/utils/fileManager";
import { Upload, FileCheck, AlertCircle } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface FileUploaderProps {
  fileType: "image" | "resume";
  onFileSelect: (file: File) => void;
}

export default function FileUploader({ fileType, onFileSelect }: FileUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fileTypeText = fileType === "image" ? "Image" : "Resume";
  const acceptTypes = fileType === "image" ? "image/jpeg, image/png, image/gif, image/webp" : "application/pdf";
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Validate file type
      const isValidType = fileType === "image" 
        ? validateImageFile(selectedFile) 
        : validateResumeFile(selectedFile);
      
      if (!isValidType) {
        setError(`Invalid file type. Please upload a ${fileType === "image" ? "JPG, PNG, GIF, or WebP image" : "PDF document"}.`);
        return;
      }
      
      // Validate file size
      if (!validateFileSize(selectedFile)) {
        setError("File size exceeds 5MB limit.");
        return;
      }
      
      // Clear previous preview
      if (previewUrl) {
        revokeFilePreview(previewUrl);
      }
      
      // Create new preview (for images only)
      if (fileType === "image") {
        setPreviewUrl(createFilePreview(selectedFile));
      }
      
      setFile(selectedFile);
    }
  };
  
  const handleUpload = () => {
    if (file) {
      onFileSelect(file);
      toast({
        title: `${fileTypeText} Selected`,
        description: `${file.name} has been selected for upload.`,
      });
    }
  };
  
  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor={`${fileType}-upload`}>{fileTypeText} Upload</Label>
            <Input
              id={`${fileType}-upload`}
              type="file"
              accept={acceptTypes}
              onChange={handleFileChange}
              className="cursor-pointer"
            />
            <p className="text-xs text-muted-foreground">
              {fileType === "image" ? "Accepted formats: JPG, PNG, GIF, WebP" : "Accepted format: PDF"} (Max 5MB)
            </p>
          </div>
          
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {file && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <FileCheck className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium">Selected: {file.name}</span>
              </div>
              
              {fileType === "image" && previewUrl && (
                <div className="mt-4">
                  <p className="text-sm font-medium mb-2">Preview:</p>
                  <img 
                    src={previewUrl} 
                    alt="Preview" 
                    className="max-h-48 max-w-full object-contain border rounded-md"
                  />
                </div>
              )}
              
              <Button 
                onClick={handleUpload} 
                className="w-full"
              >
                <Upload className="h-4 w-4 mr-2" />
                Use This {fileTypeText}
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
