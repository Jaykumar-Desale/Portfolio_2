
import { getPortfolioData } from "@/data/portfolioData";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";

export default function Projects() {
  const { projects } = getPortfolioData();
  
  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);
  
  return (
    <section id="projects" className="py-16 md:py-24 bg-muted/20">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            My Projects
          </h2>
          <div className="mt-2 h-1 w-16 bg-primary mx-auto"></div>
        </motion.div>
        
        <Tabs defaultValue="all" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="all">All Projects</TabsTrigger>
              <TabsTrigger value="featured">Featured</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="all" className="mt-0">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="featured" className="mt-0">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
              
              {featuredProjects.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground">No featured projects yet.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: any, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Card className="h-full overflow-hidden group">
        {project.imageUrl && (
          <div className="aspect-video w-full overflow-hidden">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        
        <CardHeader>
          <CardTitle>{project.title}</CardTitle>
          <div className="flex flex-wrap gap-2 mt-2">
            {project.tags.map((tag: string) => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>
        </CardHeader>
        
        <CardContent>
          <CardDescription className="text-sm">
            {project.description}
          </CardDescription>
        </CardContent>
        
        <CardFooter className="gap-2">
          {project.demoUrl && (
            <Button variant="default" size="sm" asChild>
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-1 h-4 w-4" />
                Demo
              </a>
            </Button>
          )}
          
          {project.githubUrl && (
            <Button variant="outline" size="sm" asChild>
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="mr-1 h-4 w-4" />
                Github
              </a>
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}
