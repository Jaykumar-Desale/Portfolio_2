
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

export default function ResumeDownload() {
  const [isLoading, setIsLoading] = useState(false);
  
  // In a real application, this URL would be fetched from a database or API
  // For demo purposes, we'll check if a resume has been uploaded via localStorage
  const resumeUrl = localStorage.getItem("resume_url");
  
  const handleDownload = async () => {
    setIsLoading(true);
    
    try {
      // In a real app, you would fetch the resume from a server
      // For demo purposes, we'll check if we have a resume URL
      if (resumeUrl) {
        const a = document.createElement('a');
        a.href = resumeUrl;
        a.download = "resume.pdf";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        toast({
          title: "Download Started",
          description: "Your resume download has started.",
        });
      } else {
        toast({
          title: "Resume Not Available",
          description: "The resume is not currently available for download.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error downloading resume:", error);
      toast({
        title: "Download Failed",
        description: "There was an error downloading the resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Button 
      onClick={handleDownload} 
      disabled={isLoading || !resumeUrl}
      size="sm"
      variant="outline"
      className="flex items-center gap-2"
    >
      <Download className="h-4 w-4" />
      {isLoading ? "Downloading..." : "Resume"}
    </Button>
  );
}
