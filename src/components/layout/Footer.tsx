
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { getPortfolioData } from "@/data/portfolioData";

export default function Footer() {
  const { contact } = getPortfolioData();
  
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t py-12 bg-muted/40">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-center text-sm text-muted-foreground md:text-left">
          © {currentYear} Portfolio. All rights reserved.
        </p>
        
        <div className="flex items-center gap-4">
          {contact.email && (
            <a 
              href={`mailto:${contact.email}`}
              aria-label="Email"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail className="h-5 w-5" />
            </a>
          )}
          
          {contact.github && (
            <a 
              href={contact.github} 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="GitHub"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
          )}
          
          {contact.linkedin && (
            <a 
              href={contact.linkedin} 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="LinkedIn"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          )}
          
          {contact.twitter && (
            <a 
              href={contact.twitter} 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Twitter"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Twitter className="h-5 w-5" />
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
