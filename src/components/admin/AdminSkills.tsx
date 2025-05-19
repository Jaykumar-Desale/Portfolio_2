
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Plus, Trash } from "lucide-react";
import { getPortfolioData, savePortfolioData } from "@/data/portfolioData";
import { SkillItem } from "@/types/portfolio";
import { toast } from "@/components/ui/use-toast";

export default function AdminSkills() {
  const portfolioData = getPortfolioData();
  const [skills, setSkills] = useState<SkillItem[]>([...portfolioData.skills]);
  const [newSkill, setNewSkill] = useState<Omit<SkillItem, "id">>({
    name: "",
    proficiency: 50,
    category: "",
  });
  
  const handleNewSkillChange = (field: keyof Omit<SkillItem, "id">, value: string | number) => {
    setNewSkill((prev) => ({ ...prev, [field]: value }));
  };
  
  const handleAddSkill = () => {
    if (!newSkill.name.trim()) {
      toast({
        title: "Validation Error",
        description: "Skill name is required.",
        variant: "destructive",
      });
      return;
    }
    
    const skill: SkillItem = {
      id: uuidv4(),
      ...newSkill,
    };
    
    setSkills((prev) => [...prev, skill]);
    setNewSkill({
      name: "",
      proficiency: 50,
      category: "",
    });
    
    // Save the updated skills
    const newData = { ...portfolioData, skills: [...skills, skill] };
    savePortfolioData(newData);
    
    toast({
      title: "Skill Added",
      description: `${skill.name} has been added to your skills.`,
    });
  };
  
  const handleUpdateSkill = (id: string, field: keyof SkillItem, value: string | number) => {
    const updatedSkills = skills.map((skill) => 
      skill.id === id ? { ...skill, [field]: value } : skill
    );
    
    setSkills(updatedSkills);
    
    // Save the updated skills
    const newData = { ...portfolioData, skills: updatedSkills };
    savePortfolioData(newData);
  };
  
  const handleDeleteSkill = (id: string) => {
    const updatedSkills = skills.filter((skill) => skill.id !== id);
    setSkills(updatedSkills);
    
    // Save the updated skills
    const newData = { ...portfolioData, skills: updatedSkills };
    savePortfolioData(newData);
    
    toast({
      title: "Skill Removed",
      description: "The skill has been removed from your portfolio.",
    });
  };
  
  // Get unique categories
  const categories = [...new Set(skills.map((skill) => skill.category || "Other"))];
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Skill</CardTitle>
          <CardDescription>
            Add a new skill to your portfolio
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label htmlFor="new-skill-name" className="text-sm font-medium">
                Skill Name
              </label>
              <Input
                id="new-skill-name"
                value={newSkill.name}
                onChange={(e) => handleNewSkillChange("name", e.target.value)}
                placeholder="e.g. React"
                className="mt-1"
              />
            </div>
            
            <div>
              <label htmlFor="new-skill-category" className="text-sm font-medium">
                Category
              </label>
              <Input
                id="new-skill-category"
                value={newSkill.category || ""}
                onChange={(e) => handleNewSkillChange("category", e.target.value)}
                placeholder="e.g. Frontend"
                className="mt-1"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">
                Proficiency: {newSkill.proficiency}%
              </label>
              <Slider
                value={[newSkill.proficiency]}
                onValueChange={(value) => handleNewSkillChange("proficiency", value[0])}
                className="mt-3"
                step={5}
                max={100}
              />
            </div>
          </div>
          
          <Button 
            onClick={handleAddSkill}
            className="mt-4" 
            disabled={!newSkill.name.trim()}
          >
            <Plus className="mr-2 h-4 w-4" /> Add Skill
          </Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Manage Skills</CardTitle>
          <CardDescription>
            Edit or remove existing skills
          </CardDescription>
        </CardHeader>
        <CardContent>
          {categories.length > 0 ? (
            <div className="space-y-8">
              {categories.map((category) => (
                <div key={category} className="space-y-4">
                  <h3 className="font-semibold text-lg">{category || "Other"}</h3>
                  
                  {skills
                    .filter((skill) => (skill.category || "Other") === category)
                    .map((skill) => (
                      <div key={skill.id} className="grid gap-4 md:grid-cols-3 items-center border-b pb-4">
                        <div>
                          <label className="text-sm font-medium">Skill Name</label>
                          <Input
                            value={skill.name}
                            onChange={(e) => handleUpdateSkill(skill.id, "name", e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium">
                            Proficiency: {skill.proficiency}%
                          </label>
                          <Slider
                            value={[skill.proficiency]}
                            onValueChange={(value) => handleUpdateSkill(skill.id, "proficiency", value[0])}
                            className="mt-3"
                            step={5}
                            max={100}
                          />
                        </div>
                        
                        <div className="flex items-center mt-6">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteSkill(skill.id)}
                          >
                            <Trash className="h-5 w-5 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">You haven't added any skills yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
