
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";
import { getPortfolioData, savePortfolioData } from "@/data/portfolioData";
import { EducationItem } from "@/types/portfolio";
import { toast } from "@/components/ui/use-toast";

export default function AdminEducation() {
  const portfolioData = getPortfolioData();
  const [educationItems, setEducationItems] = useState<EducationItem[]>([...portfolioData.education]);
  const [newEducation, setNewEducation] = useState<Omit<EducationItem, "id">>({
    institution: "",
    degree: "",
    field: "",
    startDate: "",
    endDate: null,
    description: "",
  });
  
  const handleNewEducationChange = (field: keyof Omit<EducationItem, "id">, value: string | null) => {
    setNewEducation((prev) => ({ ...prev, [field]: value }));
  };
  
  const handleAddEducation = () => {
    if (!newEducation.institution.trim() || !newEducation.degree.trim()) {
      toast({
        title: "Validation Error",
        description: "Institution and degree are required.",
        variant: "destructive",
      });
      return;
    }
    
    const education: EducationItem = {
      id: uuidv4(),
      ...newEducation,
    };
    
    setEducationItems((prev) => [...prev, education]);
    setNewEducation({
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: null,
      description: "",
    });
    
    // Save the updated education items
    const newData = { ...portfolioData, education: [...educationItems, education] };
    savePortfolioData(newData);
    
    toast({
      title: "Education Added",
      description: `${education.degree} from ${education.institution} has been added.`,
    });
  };
  
  const handleUpdateEducation = (id: string, field: keyof EducationItem, value: any) => {
    const updatedEducationItems = educationItems.map((edu) => 
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    
    setEducationItems(updatedEducationItems);
    
    // Save the updated education items
    const newData = { ...portfolioData, education: updatedEducationItems };
    savePortfolioData(newData);
  };
  
  const handleDeleteEducation = (id: string) => {
    const updatedEducationItems = educationItems.filter((edu) => edu.id !== id);
    setEducationItems(updatedEducationItems);
    
    // Save the updated education items
    const newData = { ...portfolioData, education: updatedEducationItems };
    savePortfolioData(newData);
    
    toast({
      title: "Education Removed",
      description: "The education item has been removed from your portfolio.",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Education</CardTitle>
          <CardDescription>
            Add a new educational qualification to your portfolio
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="new-edu-institution" className="text-sm font-medium">
                Institution *
              </label>
              <Input
                id="new-edu-institution"
                value={newEducation.institution}
                onChange={(e) => handleNewEducationChange("institution", e.target.value)}
                placeholder="e.g. University of Technology"
              />
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="new-edu-degree" className="text-sm font-medium">
                  Degree *
                </label>
                <Input
                  id="new-edu-degree"
                  value={newEducation.degree}
                  onChange={(e) => handleNewEducationChange("degree", e.target.value)}
                  placeholder="e.g. Bachelor's Degree"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="new-edu-field" className="text-sm font-medium">
                  Field of Study *
                </label>
                <Input
                  id="new-edu-field"
                  value={newEducation.field}
                  onChange={(e) => handleNewEducationChange("field", e.target.value)}
                  placeholder="e.g. Computer Science"
                />
              </div>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="new-edu-start" className="text-sm font-medium">
                  Start Date *
                </label>
                <Input
                  id="new-edu-start"
                  type="month"
                  value={newEducation.startDate}
                  onChange={(e) => handleNewEducationChange("startDate", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="new-edu-end" className="text-sm font-medium">
                  End Date (leave empty for current education)
                </label>
                <Input
                  id="new-edu-end"
                  type="month"
                  value={newEducation.endDate || ""}
                  onChange={(e) => handleNewEducationChange("endDate", e.target.value || null)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="new-edu-description" className="text-sm font-medium">
                Description (optional)
              </label>
              <Textarea
                id="new-edu-description"
                value={newEducation.description || ""}
                onChange={(e) => handleNewEducationChange("description", e.target.value)}
                placeholder="Describe your studies, achievements, etc."
                rows={3}
              />
            </div>
          </div>
          
          <Button 
            onClick={handleAddEducation}
            className="mt-6" 
            disabled={!newEducation.institution.trim() || !newEducation.degree.trim() || !newEducation.field.trim() || !newEducation.startDate}
          >
            <Plus className="mr-2 h-4 w-4" /> Add Education
          </Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Manage Education</CardTitle>
          <CardDescription>
            Edit or remove existing education qualifications
          </CardDescription>
        </CardHeader>
        <CardContent>
          {educationItems.length > 0 ? (
            <div className="space-y-8">
              {educationItems.map((edu) => (
                <div key={edu.id} className="border-b pb-8">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Institution</label>
                    <Input
                      value={edu.institution}
                      onChange={(e) => handleUpdateEducation(edu.id, "institution", e.target.value)}
                    />
                  </div>
                  
                  <div className="grid gap-4 md:grid-cols-2 mt-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Degree</label>
                      <Input
                        value={edu.degree}
                        onChange={(e) => handleUpdateEducation(edu.id, "degree", e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Field of Study</label>
                      <Input
                        value={edu.field}
                        onChange={(e) => handleUpdateEducation(edu.id, "field", e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="grid gap-4 md:grid-cols-2 mt-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Start Date</label>
                      <Input
                        type="month"
                        value={edu.startDate}
                        onChange={(e) => handleUpdateEducation(edu.id, "startDate", e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">End Date</label>
                      <Input
                        type="month"
                        value={edu.endDate || ""}
                        onChange={(e) => handleUpdateEducation(edu.id, "endDate", e.target.value || null)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2 mt-4">
                    <label className="text-sm font-medium">Description</label>
                    <Textarea
                      value={edu.description || ""}
                      onChange={(e) => handleUpdateEducation(edu.id, "description", e.target.value)}
                      rows={3}
                    />
                  </div>
                  
                  <div className="flex justify-end mt-4">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteEducation(edu.id)}
                    >
                      <Trash className="mr-2 h-4 w-4" /> Delete Education
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">You haven't added any education information yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
