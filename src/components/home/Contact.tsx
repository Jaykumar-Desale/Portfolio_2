
import { useState } from "react";
import { getPortfolioData } from "@/data/portfolioData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Check, Github, Linkedin, Mail, MapPin, Phone, Send, Twitter } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "@/components/ui/use-toast";

export default function Contact() {
  const { contact } = getPortfolioData();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      
      toast({
        title: "Message Sent",
        description: "Thanks for reaching out! I'll get back to you soon.",
      });
      
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-muted/20">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Get In Touch
          </h2>
          <div className="mt-2 h-1 w-16 bg-primary mx-auto"></div>
        </motion.div>
        
        <div className="grid gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">Contact Information</h3>
              <p className="text-muted-foreground">
                Feel free to reach out to me through any of the following channels.
                I'm always open to discussing new projects, creative ideas, or opportunities.
              </p>
              
              <div className="space-y-4 mt-8">
                {contact.email && (
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-primary/10">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <a href={`mailto:${contact.email}`} className="font-medium hover:text-primary">
                        {contact.email}
                      </a>
                    </div>
                  </div>
                )}
                
                {contact.phone && (
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-primary/10">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <a href={`tel:${contact.phone}`} className="font-medium hover:text-primary">
                        {contact.phone}
                      </a>
                    </div>
                  </div>
                )}
                
                {contact.location && (
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-primary/10">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-medium">{contact.location}</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex gap-4 mt-8">
                {contact.github && (
                  <a 
                    href={contact.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                    aria-label="GitHub"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                )}
                
                {contact.linkedin && (
                  <a 
                    href={contact.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                )}
                
                {contact.twitter && (
                  <a 
                    href={contact.twitter} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                    aria-label="Twitter"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <Input 
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input 
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your email"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Subject
                </label>
                <Input 
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea 
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message"
                  rows={5}
                  required
                />
              </div>
              
              <Button type="submit" className="w-full" disabled={isSubmitting || isSubmitted}>
                {isSubmitting ? (
                  <>Sending...</>
                ) : isSubmitted ? (
                  <>
                    <Check className="mr-2 h-4 w-4" /> Sent!
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" /> Send Message
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
