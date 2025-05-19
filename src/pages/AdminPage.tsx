
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import AdminProfile from "@/components/admin/AdminProfile";
import AdminSkills from "@/components/admin/AdminSkills";
import AdminProjects from "@/components/admin/AdminProjects";
import AdminExperience from "@/components/admin/AdminExperience";
import AdminEducation from "@/components/admin/AdminEducation";
import AdminContact from "@/components/admin/AdminContact";
import AdminDocuments from "@/components/admin/AdminDocuments";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function AdminPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);
  
  if (!isAuthenticated) {
    return null;
  }
  
  return (
    <>
      <Header />
      <main className="container py-10">
        <h1 className="text-3xl font-bold mb-8">Portfolio Admin</h1>
        
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="mb-8 flex flex-wrap">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <AdminProfile />
          </TabsContent>
          
          <TabsContent value="skills">
            <AdminSkills />
          </TabsContent>
          
          <TabsContent value="projects">
            <AdminProjects />
          </TabsContent>
          
          <TabsContent value="experience">
            <AdminExperience />
          </TabsContent>
          
          <TabsContent value="education">
            <AdminEducation />
          </TabsContent>
          
          <TabsContent value="documents">
            <AdminDocuments />
          </TabsContent>
          
          <TabsContent value="contact">
            <AdminContact />
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </>
  );
}
