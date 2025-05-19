
import { PortfolioData } from "@/types/portfolio";
import { v4 as uuidv4 } from "uuid";

export const defaultPortfolioData: PortfolioData = {
  profile: {
    name: "Jaykumar Desale",
    title: "Web Developer, Software Developer, Full Stack Developer, Java",
    summary: "Enthusiastic and results-driven software developer with a strong foundation in full-stack development and a passion for building efficient, user-centric applications. Proficient in Java, PHP, JavaScript, and MySQL, with hands-on experience delivering functional web-based systems through academic projects. Adept at problem-solving, quick to adapt to new technologies, and committed to continuous learning. Demonstrates strong collaboration skills, professional ethics, and a keen eye for scalable, maintainable code.",
    avatarUrl: "",
  },
  skills: [

    { id: uuidv4(), name: "HTML", proficiency: 90, category: "Frontend" },
    { id: uuidv4(), name: "CSS", proficiency: 85, category: "Frontend" },
    { id: uuidv4(), name: "JAVA", proficiency: 80, category: "Backend" },
    { id: uuidv4(), name: "javascript", proficiency: 75, category: "Frontend" },
    { id: uuidv4(), name: "MySql", proficiency: 70, category: "Database" },
    { id: uuidv4(), name: "PHP", proficiency: 65, category: "Backend" },
    { id: uuidv4(), name: "C", proficiency: 80, category: "Languages" },
    { id: uuidv4(), name: "C++", proficiency: 80, category: "Languages" },
    
    { id: uuidv4(), name: "React", proficiency: 40, category: "Frontend" },
    { id: uuidv4(), name: "TypeScript", proficiency: 30, category: "Languages" },
    { id: uuidv4(), name: "Node.js", proficiency: 40, category: "Backend" },
    { id: uuidv4(), name: "git & GitHub", proficiency: 70, category: "" },
    { id: uuidv4(), name: "Docker", proficiency: 40, category: "DevOps" },
    { id: uuidv4(), name: "TailwindCSS", proficiency: 30, category: "Frontend" },
  ],
  projects: [
    {
      id: uuidv4(),
      title: "",
      description: "",
      imageUrl: "",
      tags: ["", "", "", ""],
      demoUrl: "",
      githubUrl: "",
      featured: true,
    },
    
  ],
  experience: [
    {
      id: uuidv4(),
      role: "",
      company: "",
      startDate: "",
      endDate: null,
      description: "",
      technologies: [" ", " ", " ", " "],
    },
  
  ],
  education: [
    {
      id: uuidv4(),
      institution: "Kavayitri Bahinabai Chaudhari North Maharashtra University, Jalgaon.",
      degree: "Master's Degree",
      field: "Computer Application",
      startDate: "March 2023",
      endDate: "March 2025",
      description: "Specialized in Software Development/ Software Application with a focus on Web Development.",
    },
    {
      id: uuidv4(),
      institution: "Kavayitri Bahinabai Chaudhari North Maharashtra University, Jalgaon.",
      degree: "Bachelor's Degree",
      field: "Computer Application",
      startDate: " March 2020",
      endDate: "March 2023",
      description: " ",
    },
    
  ],
  contact: {
    email: "jaykumar.desale2001@gmail.com",
    phone: "+91 7218146567",
    location: "Mumbai, Ambernath",
    github: "https://github.com/Jaykumar-Desale",
    linkedin: "https://www.linkedin.com/in/jaykumardesale",
    twitter: "...",
  },
};

// Initially use the default data
let portfolioData: PortfolioData = { ...defaultPortfolioData };

// Functions to manage portfolio data
export const getPortfolioData = (): PortfolioData => {
  const savedData = localStorage.getItem("portfolioData");
  if (savedData) {
    portfolioData = JSON.parse(savedData);
  }
  return portfolioData;
};

export const savePortfolioData = (data: PortfolioData): void => {
  portfolioData = data;
  localStorage.setItem("portfolioData", JSON.stringify(data));
};

export const resetPortfolioData = (): void => {
  portfolioData = { ...defaultPortfolioData };
  localStorage.setItem("portfolioData", JSON.stringify(portfolioData));
};
