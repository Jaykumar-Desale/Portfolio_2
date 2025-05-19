
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash, X } from "lucide-react";
import { getPortfolioData, savePortfolioData } from "@/data/portfolioData";
import { ExperienceItem } from "@/types/portfolio";
import { toast } from "@/components/ui/use-toast";

export default function AdminExperience() {
  const portfolioData = getPortfolioData();
  const [experiences, setExperiences] = useState<ExperienceItem[]>([...portfolioData.experience]);
  const [newExperience, setNewExperience] = useState<Omit<ExperienceItem, "id">>({
    role: "",
    company: "",
    startDate: "",
    endDate: null,
    description: "",
    technologies: [],
  });
  const [newTech, setNewTech] = useState("");
  
  const handleNewExperienceChange = (field: keyof Omit<ExperienceItem, "id" | "technologies">, value: string | null) => {
    setNewExperience((prev) => ({ ...prev, [field]: value }));
  };
  
  const handleAddTech = () => {
    if (newTech.trim() && !newExperience.technologies?.includes(newTech.trim())) {
      setNewExperience((prev) => ({
        ...prev,
        technologies: [...(prev.technologies || []), newTech.trim()],
      }));
      setNewTech("");
    }
  };
  
  const handleRemoveTech = (tech: string) => {
    setNewExperience((prev) => ({
      ...prev,
      technologies: prev.technologies?.filter((t) => t !== tech) || [],
    }));
  };
  
  const handleAddExperience = () => {
    if (!newExperience.role.trim() || !newExperience.company.trim()) {
      toast({
        title: "Validation Error",
        description: "Role and company are required.",
        variant: "destructive",
      });
      return;
    }
    
    const experience: ExperienceItem = {
      id: uuidv4(),
      ...newExperience,
    };
    
    setExperiences((prev) => [...prev, experience]);
    setNewExperience({
      role: "",
      company: "",
      startDate: "",
      endDate: null,
      description: "",
      technologies: [],
    });
    
    // Save the updated experiences
    const newData = { ...portfolioData, experience: [...experiences, experience] };
    savePortfolioData(newData);
    
    toast({
      title: "Experience Added",
      description: `${experience.role} at ${experience.company} has been added to your experience.`,
    });
  };
  
  const handleUpdateExperience = (id: string, field: keyof ExperienceItem, value: any) => {
    const updatedExperiences = experiences.map((exp) => 
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    
    setExperiences(updatedExperiences);
    
    // Save the updated experiences
    const newData = { ...portfolioData, experience: updatedExperiences };
    savePortfolioData(newData);
  };
  
  const handleUpdateTechnologies = (id: string, technologies: string[]) => {
    const updatedExperiences = experiences.map((exp) => 
      exp.id === id ? { ...exp, technologies } : exp
    );
    
    setExperiences(updatedExperiences);
    
    // Save the updated experiences
    const newData = { ...portfolioData, experience: updatedExperiences };
    savePortfolioData(newData);
  };
  
  const handleDeleteExperience = (id: string) => {
    const updatedExperiences = experiences.filter((exp) => exp.id !== id);
    setExperiences(updatedExperiences);
    
    // Save the updated experiences
    const newData = { ...portfolioData, experience: updatedExperiences };
    savePortfolioData(newData);
    
    toast({
      title: "Experience Removed",
      description: "The experience has been removed from your portfolio.",
    });
  };
  
  // Experience editing states
  const [editingTechs, setEditingTechs] = useState<Record<string, boolean>>({});
  const [newTechForExp, setNewTechForExp] = useState<Record<string, string>>({});
  
  const toggleEditingTechs = (id: string) => {
    setEditingTechs((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    
    if (!newTechForExp[id]) {
      setNewTechForExp((prev) => ({
        ...prev,
        [id]: "",
      }));
    }
  };
  
  const handleAddTechToExp = (id: string) => {
    const tech = newTechForExp[id].trim();
    if (tech) {
      const exp = experiences.find(e => e.id === id);
      if (exp) {
        const updatedTechs = [...(exp.technologies || [])];
        if (!updatedTechs.includes(tech)) {
          updatedTechs.push(tech);
          handleUpdateTechnologies(id, updatedTechs);
          setNewTechForExp((prev) => ({
            ...prev,
            [id]: "",
          }));
        }
      }
    }
  };
  
  const handleRemoveTechFromExp = (id: string, tech: string) => {
    const exp = experiences.find(e => e.id === id);
    if (exp && exp.technologies) {
      const updatedTechs = exp.technologies.filter(t => t !== tech);
      handleUpdateTechnologies(id, updatedTechs);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Experience</CardTitle>
          <CardDescription>
            Add a new work experience to your portfolio
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="new-exp-role" className="text-sm font-medium">
                  Job Title *
                </label>
                <Input
                  id="new-exp-role"
                  value={newExperience.role}
                  onChange={(e) => handleNewExperienceChange("role", e.target.value)}
                  placeholder="e.g. Frontend Developer"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="new-exp-company" className="text-sm font-medium">
                  Company *
                </label>
                <Input
                  id="new-exp-company"
                  value={newExperience.company}
                  onChange={(e) => handleNewExperienceChange("company", e.target.value)}
                  placeholder="e.g. Acme Inc."
                />
              </div>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="new-exp-start" className="text-sm font-medium">
                  Start Date *
                </label>
                <Input
                  id="new-exp-start"
                  type="month"
                  value={newExperience.startDate}
                  onChange={(e) => handleNewExperienceChange("startDate", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="new-exp-end" className="text-sm font-medium">
                  End Date (leave empty for current position)
                </label>
                <Input
                  id="new-exp-end"
                  type="month"
                  value={newExperience.endDate || ""}
                  onChange={(e) => handleNewExperienceChange("endDate", e.target.value || null)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="new-exp-description" className="text-sm font-medium">
                Description *
              </label>
              <Textarea
                id="new-exp-description"
                value={newExperience.description}
                onChange={(e) => handleNewExperienceChange("description", e.target.value)}
                placeholder="Describe your responsibilities and achievements"
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Technologies Used</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {newExperience.technologies?.map((tech) => (
                  <Badge key={tech} variant="secondary" className="gap-1">
                    {tech}
                    <button
                      type="button"
                      onClick={() => handleRemoveTech(tech)}
                      className="ml-1 rounded-full hover:bg-muted p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newTech}
                  onChange={(e) => setNewTech(e.target.value)}
                  placeholder="Add technology"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddTech();
                    }
                  }}
                />
                <Button type="button" onClick={handleAddTech} size="sm">
                  Add
                </Button>
              </div>
            </div>
          </div>
          
          <Button 
            onClick={handleAddExperience}
            className="mt-6" 
            disabled={!newExperience.role.trim() || !newExperience.company.trim() || !newExperience.startDate}
          >
            <Plus className="mr-2 h-4 w-4" /> Add Experience
          </Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Manage Experience</CardTitle>
          <CardDescription>
            Edit or remove existing work experience
          </CardDescription>
        </CardHeader>
        <CardContent>
          {experiences.length > 0 ? (
            <div className="space-y-8">
              {experiences.map((exp) => (
                <div key={exp.id} className="border-b pb-8">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Job Title</label>
                      <Input
                        value={exp.role}
                        onChange={(e) => handleUpdateExperience(exp.id, "role", e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Company</label>
                      <Input
                        value={exp.company}
                        onChange={(e) => handleUpdateExperience(exp.id, "company", e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="grid gap-4 md:grid-cols-2 mt-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Start Date</label>
                      <Input
                        type="month"
                        value={exp.startDate}
                        onChange={(e) => handleUpdateExperience(exp.id, "startDate", e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">End Date</label>
                      <Input
                        type="month"
                        value={exp.endDate || ""}
                        onChange={(e) => handleUpdateExperience(exp.id, "endDate", e.target.value || null)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2 mt-4">
                    <label className="text-sm font-medium">Description</label>
                    <Textarea
                      value={exp.description}
                      onChange={(e) => handleUpdateExperience(exp.id, "description", e.target.value)}
                      rows={3}
                    />
                  </div>
                  
                  <div className="space-y-2 mt-4">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Technologies Used</label>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleEditingTechs(exp.id)}
                      >
                        {editingTechs[exp.id] ? "Done" : "Edit Technologies"}
                      </Button>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies?.map((tech) => (
                        <Badge key={tech} variant="secondary" className="gap-1">
                          {tech}
                          {editingTechs[exp.id] && (
                            <button
                              type="button"
                              onClick={() => handleRemoveTechFromExp(exp.id, tech)}
                              className="ml-1 rounded-full hover:bg-muted p-0.5"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          )}
                        </Badge>
                      ))}
                    </div>
                    
                    {editingTechs[exp.id] && (
                      <div className="flex gap-2 mt-2">
                        <Input
                          value={newTechForExp[exp.id] || ""}
                          onChange={(e) => {
                            setNewTechForExp((prev) => ({
                              ...prev,
                              [exp.id]: e.target.value,
                            }));
                          }}
                          placeholder="Add technology"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleAddTechToExp(exp.id);
                            }
                          }}
                        />
                        <Button type="button" onClick={() => handleAddTechToExp(exp.id)} size="sm">
                          Add
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-end mt-4">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteExperience(exp.id)}
                    >
                      <Trash className="mr-2 h-4 w-4" /> Delete Experience
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">You haven't added any work experience yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
