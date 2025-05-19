
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { downloadFile } from "@/utils/fileManager";
import FileUploader from "./FileUploader";
import { Download } from "lucide-react";

export default function AdminDocuments() {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [portfolioImages, setPortfolioImages] = useState<File[]>([]);

  // In a real app, this would come from the server/database
  // For demo, we'll use a placeholder URL
  const [resumeUrl, setResumeUrl] = useState<string | null>(
    localStorage.getItem("resume_url")
  );
  
  const handleResumeSelect = (file: File) => {
    setResumeFile(file);
    // In a real app, you would upload the file to a server here
    // For demo purposes, we'll just create a local object URL
    const objectUrl = URL.createObjectURL(file);
    setResumeUrl(objectUrl);
    
    // Store the URL in localStorage so other components can access it
    localStorage.setItem("resume_url", objectUrl);
    
    toast({
      title: "Resume Updated",
      description: "Your resume has been successfully updated and is now available for download.",
    });
  };
  
  const handleImageSelect = (file: File) => {
    setPortfolioImages(prev => [...prev, file]);
    
    toast({
      title: "Image Added",
      description: "Your portfolio image has been added.",
    });
  };
  
  const handleDownloadResume = () => {
    if (resumeUrl) {
      downloadFile(resumeUrl, "resume.pdf");
      
      toast({
        title: "Download Started",
        description: "Your resume download has started.",
      });
    } else {
      toast({
        title: "No Resume Available",
        description: "Please upload a resume first.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Document Management</CardTitle>
        <CardDescription>
          Upload and manage your portfolio documents and images
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="resume" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="resume">Resume</TabsTrigger>
            <TabsTrigger value="images">Portfolio Images</TabsTrigger>
          </TabsList>
          
          <TabsContent value="resume" className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Resume Management</h3>
                <Button 
                  onClick={handleDownloadResume}
                  disabled={!resumeUrl}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Resume
                </Button>
              </div>
              
              <p className="text-sm text-muted-foreground">
                Upload your resume as a PDF file. This will be available for visitors to download from the navigation bar.
              </p>
              
              <FileUploader fileType="resume" onFileSelect={handleResumeSelect} />
              
              {resumeFile && (
                <div className="p-4 border rounded-md bg-muted">
                  <p className="font-medium">Current Resume:</p>
                  <p className="text-sm">{resumeFile.name}</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="images" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Portfolio Images</h3>
              <p className="text-sm text-muted-foreground">
                Upload images for your portfolio. You can preview them before adding to your gallery.
              </p>
              
              <FileUploader fileType="image" onFileSelect={handleImageSelect} />
              
              {portfolioImages.length > 0 && (
                <div className="space-y-4">
                  <h4 className="font-medium">Uploaded Images:</h4>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                    {portfolioImages.map((image, index) => (
                      <div key={index} className="relative aspect-square overflow-hidden rounded-md border">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Portfolio image ${index + 1}`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
