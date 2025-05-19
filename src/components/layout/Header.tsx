
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import ResumeDownload from "@/components/home/ResumeDownload";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { label: "Home", path: "/" },
    { label: "About", path: "/#about" },
    { label: "Skills", path: "/#skills" },
    { label: "Projects", path: "/#projects" },
    { label: "Experience", path: "/#experience" },
    { label: "Contact", path: "/#contact" }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <div className="font-bold text-2xl">
          <Link to="/" className="flex items-center gap-2">
            Portfolio<span className="text-primary">.</span>
          </Link>
        </div>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <ul className="flex items-center gap-6">
            {navItems.map((item) => (
              <li key={item.path}>
                <a 
                  href={item.path} 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          
          <div className="flex items-center gap-4">
            <ResumeDownload />
            <ThemeToggle />
            
            {isAuthenticated ? (
              <Button variant="outline" onClick={logout} size="sm">
                Logout
              </Button>
            ) : (
              <Button variant="outline" size="sm" asChild>
                <Link to="/login">Edit</Link>
              </Button>
            )}
          </div>
        </nav>
        
        {/* Mobile toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <ResumeDownload />
          <ThemeToggle />
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleMenu} 
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="container md:hidden py-4 pb-6">
          <ul className="flex flex-col gap-4">
            {navItems.map((item) => (
              <li key={item.path}>
                <a 
                  href={item.path} 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
            
            {isAuthenticated ? (
              <li>
                <Button variant="outline" onClick={logout} className="w-full">
                  Logout
                </Button>
              </li>
            ) : (
              <li>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    Edit
                  </Link>
                </Button>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
}
