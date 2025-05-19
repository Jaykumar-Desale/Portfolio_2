
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Check, Plus, Trash, X } from "lucide-react";
import { getPortfolioData, savePortfolioData } from "@/data/portfolioData";
import { ProjectItem } from "@/types/portfolio";
import { toast } from "@/components/ui/use-toast";

export default function AdminProjects() {
  const portfolioData = getPortfolioData();
  const [projects, setProjects] = useState<ProjectItem[]>([...portfolioData.projects]);
  const [newProject, setNewProject] = useState<Omit<ProjectItem, "id">>({
    title: "",
    description: "",
    imageUrl: "",
    tags: [],
    demoUrl: "",
    githubUrl: "",
    featured: false,
  });
  const [newTag, setNewTag] = useState("");
  
  const handleNewProjectChange = (field: keyof Omit<ProjectItem, "id" | "tags">, value: string | boolean) => {
    setNewProject((prev) => ({ ...prev, [field]: value }));
  };
  
  const handleAddTag = () => {
    if (newTag.trim() && !newProject.tags.includes(newTag.trim())) {
      setNewProject((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag("");
    }
  };
  
  const handleRemoveTag = (tag: string) => {
    setNewProject((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };
  
  const handleAddProject = () => {
    if (!newProject.title.trim() || !newProject.description.trim()) {
      toast({
        title: "Validation Error",
        description: "Project title and description are required.",
        variant: "destructive",
      });
      return;
    }
    
    const project: ProjectItem = {
      id: uuidv4(),
      ...newProject,
    };
    
    setProjects((prev) => [...prev, project]);
    setNewProject({
      title: "",
      description: "",
      imageUrl: "",
      tags: [],
      demoUrl: "",
      githubUrl: "",
      featured: false,
    });
    
    // Save the updated projects
    const newData = { ...portfolioData, projects: [...projects, project] };
    savePortfolioData(newData);
    
    toast({
      title: "Project Added",
      description: `${project.title} has been added to your projects.`,
    });
  };
  
  const handleUpdateProject = (id: string, field: keyof ProjectItem, value: any) => {
    const updatedProjects = projects.map((project) => 
      project.id === id ? { ...project, [field]: value } : project
    );
    
    setProjects(updatedProjects);
    
    // Save the updated projects
    const newData = { ...portfolioData, projects: updatedProjects };
    savePortfolioData(newData);
  };
  
  const handleUpdateProjectTags = (id: string, tags: string[]) => {
    const updatedProjects = projects.map((project) => 
      project.id === id ? { ...project, tags } : project
    );
    
    setProjects(updatedProjects);
    
    // Save the updated projects
    const newData = { ...portfolioData, projects: updatedProjects };
    savePortfolioData(newData);
  };
  
  const handleDeleteProject = (id: string) => {
    const updatedProjects = projects.filter((project) => project.id !== id);
    setProjects(updatedProjects);
    
    // Save the updated projects
    const newData = { ...portfolioData, projects: updatedProjects };
    savePortfolioData(newData);
    
    toast({
      title: "Project Removed",
      description: "The project has been removed from your portfolio.",
    });
  };
  
  // Project editing states
  const [editingTags, setEditingTags] = useState<Record<string, boolean>>({});
  const [newTagForProject, setNewTagForProject] = useState<Record<string, string>>({});
  
  const toggleEditingTags = (id: string) => {
    setEditingTags((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    
    if (!newTagForProject[id]) {
      setNewTagForProject((prev) => ({
        ...prev,
        [id]: "",
      }));
    }
  };
  
  const handleAddTagToProject = (id: string) => {
    const tag = newTagForProject[id].trim();
    if (tag && !projects.find(p => p.id === id)?.tags.includes(tag)) {
      const project = projects.find(p => p.id === id);
      if (project) {
        const updatedTags = [...project.tags, tag];
        handleUpdateProjectTags(id, updatedTags);
        setNewTagForProject((prev) => ({
          ...prev,
          [id]: "",
        }));
      }
    }
  };
  
  const handleRemoveTagFromProject = (id: string, tag: string) => {
    const project = projects.find(p => p.id === id);
    if (project) {
      const updatedTags = project.tags.filter(t => t !== tag);
      handleUpdateProjectTags(id, updatedTags);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Project</CardTitle>
          <CardDescription>
            Add a new project to your portfolio
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="new-project-title" className="text-sm font-medium">
                  Project Title *
                </label>
                <Input
                  id="new-project-title"
                  value={newProject.title}
                  onChange={(e) => handleNewProjectChange("title", e.target.value)}
                  placeholder="e.g. E-commerce Platform"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="new-project-image" className="text-sm font-medium">
                  Image URL
                </label>
                <Input
                  id="new-project-image"
                  value={newProject.imageUrl || ""}
                  onChange={(e) => handleNewProjectChange("imageUrl", e.target.value)}
                  placeholder="URL to project image"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="new-project-description" className="text-sm font-medium">
                Description *
              </label>
              <Textarea
                id="new-project-description"
                value={newProject.description}
                onChange={(e) => handleNewProjectChange("description", e.target.value)}
                placeholder="Describe your project"
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Tags</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {newProject.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="gap-1">
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 rounded-full hover:bg-muted p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add tag"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                />
                <Button type="button" onClick={handleAddTag} size="sm">
                  Add
                </Button>
              </div>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="new-project-demo" className="text-sm font-medium">
                  Demo URL
                </label>
                <Input
                  id="new-project-demo"
                  value={newProject.demoUrl || ""}
                  onChange={(e) => handleNewProjectChange("demoUrl", e.target.value)}
                  placeholder="e.g. https://myproject.com"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="new-project-github" className="text-sm font-medium">
                  GitHub URL
                </label>
                <Input
                  id="new-project-github"
                  value={newProject.githubUrl || ""}
                  onChange={(e) => handleNewProjectChange("githubUrl", e.target.value)}
                  placeholder="e.g. https://github.com/username/project"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="new-project-featured"
                checked={newProject.featured}
                onCheckedChange={(checked) => 
                  handleNewProjectChange("featured", checked === true)
                }
              />
              <label
                htmlFor="new-project-featured"
                className="text-sm font-medium leading-none"
              >
                Feature this project
              </label>
            </div>
          </div>
          
          <Button 
            onClick={handleAddProject}
            className="mt-6" 
            disabled={!newProject.title.trim() || !newProject.description.trim()}
          >
            <Plus className="mr-2 h-4 w-4" /> Add Project
          </Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Manage Projects</CardTitle>
          <CardDescription>
            Edit or remove existing projects
          </CardDescription>
        </CardHeader>
        <CardContent>
          {projects.length > 0 ? (
            <div className="space-y-8">
              {projects.map((project) => (
                <div key={project.id} className="border-b pb-8">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Project Title</label>
                      <Input
                        value={project.title}
                        onChange={(e) => handleUpdateProject(project.id, "title", e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Image URL</label>
                      <Input
                        value={project.imageUrl || ""}
                        onChange={(e) => handleUpdateProject(project.id, "imageUrl", e.target.value)}
                      />
                      {project.imageUrl && (
                        <div className="mt-2">
                          <img
                            src={project.imageUrl}
                            alt={project.title}
                            className="h-20 object-cover rounded-md"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2 mt-4">
                    <label className="text-sm font-medium">Description</label>
                    <Textarea
                      value={project.description}
                      onChange={(e) => handleUpdateProject(project.id, "description", e.target.value)}
                      rows={3}
                    />
                  </div>
                  
                  <div className="space-y-2 mt-4">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Tags</label>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleEditingTags(project.id)}
                      >
                        {editingTags[project.id] ? "Done" : "Edit Tags"}
                      </Button>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="gap-1">
                          {tag}
                          {editingTags[project.id] && (
                            <button
                              type="button"
                              onClick={() => handleRemoveTagFromProject(project.id, tag)}
                              className="ml-1 rounded-full hover:bg-muted p-0.5"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          )}
                        </Badge>
                      ))}
                    </div>
                    
                    {editingTags[project.id] && (
                      <div className="flex gap-2 mt-2">
                        <Input
                          value={newTagForProject[project.id] || ""}
                          onChange={(e) => {
                            setNewTagForProject((prev) => ({
                              ...prev,
                              [project.id]: e.target.value,
                            }));
                          }}
                          placeholder="Add tag"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleAddTagToProject(project.id);
                            }
                          }}
                        />
                        <Button type="button" onClick={() => handleAddTagToProject(project.id)} size="sm">
                          Add
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  <div className="grid gap-4 md:grid-cols-2 mt-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Demo URL</label>
                      <Input
                        value={project.demoUrl || ""}
                        onChange={(e) => handleUpdateProject(project.id, "demoUrl", e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">GitHub URL</label>
                      <Input
                        value={project.githubUrl || ""}
                        onChange={(e) => handleUpdateProject(project.id, "githubUrl", e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id={`project-featured-${project.id}`}
                        checked={project.featured}
                        onCheckedChange={(checked) => 
                          handleUpdateProject(project.id, "featured", checked)
                        }
                      />
                      <label
                        htmlFor={`project-featured-${project.id}`}
                        className="text-sm font-medium"
                      >
                        Feature this project
                      </label>
                    </div>
                    
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteProject(project.id)}
                    >
                      <Trash className="mr-2 h-4 w-4" /> Delete Project
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">You haven't added any projects yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
