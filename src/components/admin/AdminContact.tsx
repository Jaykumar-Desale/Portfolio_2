
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getPortfolioData, savePortfolioData } from "@/data/portfolioData";
import { toast } from "@/components/ui/use-toast";

export default function AdminContact() {
  const portfolioData = getPortfolioData();
  const [contact, setContact] = useState({ ...portfolioData.contact });
  
  const handleChange = (field: keyof typeof contact, value: string) => {
    setContact((prev) => ({ ...prev, [field]: value }));
  };
  
  const handleSave = () => {
    // Validate email format
    if (contact.email && !isValidEmail(contact.email)) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    
    const newData = { ...portfolioData, contact };
    savePortfolioData(newData);
    
    toast({
      title: "Contact Information Updated",
      description: "Your contact information has been updated successfully.",
    });
  };
  
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
        <CardDescription>
          Update your contact information to let people reach out to you
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email *
          </label>
          <Input
            id="email"
            type="email"
            value={contact.email || ""}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="your.email@example.com"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-medium">
            Phone
          </label>
          <Input
            id="phone"
            type="tel"
            value={contact.phone || ""}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="+1 (123) 456-7890"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="location" className="text-sm font-medium">
            Location
          </label>
          <Input
            id="location"
            value={contact.location || ""}
            onChange={(e) => handleChange("location", e.target.value)}
            placeholder="City, Country"
          />
        </div>
        
        <div className="pt-4 border-t">
          <h3 className="font-medium mb-4">Social Media Links</h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="github" className="text-sm font-medium">
                GitHub
              </label>
              <Input
                id="github"
                value={contact.github || ""}
                onChange={(e) => handleChange("github", e.target.value)}
                placeholder="https://github.com/username"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="linkedin" className="text-sm font-medium">
                LinkedIn
              </label>
              <Input
                id="linkedin"
                value={contact.linkedin || ""}
                onChange={(e) => handleChange("linkedin", e.target.value)}
                placeholder="https://linkedin.com/in/username"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="twitter" className="text-sm font-medium">
                Twitter
              </label>
              <Input
                id="twitter"
                value={contact.twitter || ""}
                onChange={(e) => handleChange("twitter", e.target.value)}
                placeholder="https://twitter.com/username"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="website" className="text-sm font-medium">
                Personal Website
              </label>
              <Input
                id="website"
                value={contact.website || ""}
                onChange={(e) => handleChange("website", e.target.value)}
                placeholder="https://yourwebsite.com"
              />
            </div>
          </div>
        </div>
        
        <div className="flex justify-end pt-4">
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </CardContent>
    </Card>
  );
}
