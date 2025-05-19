
import { getPortfolioData } from "@/data/portfolioData";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { format } from "date-fns";

export default function Experience() {
  const { experience, education } = getPortfolioData();
  
  // Format date function
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM yyyy");
    } catch (e) {
      return dateString;
    }
  };
  
  return (
    <section id="experience" className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Experience &amp; Education
          </h2>
          <div className="mt-2 h-1 w-16 bg-primary mx-auto"></div>
        </motion.div>
        
        <div className="grid gap-16 md:grid-cols-2">
          <div>
            <h3 className="text-2xl font-semibold mb-6">Work Experience</h3>
            <div className="space-y-8">
              {experience.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative pl-8 border-l-2 border-muted pb-8 last:pb-0"
                >
                  <div className="absolute top-0 left-[-9px] h-4 w-4 rounded-full bg-primary"></div>
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="text-lg font-semibold">{item.role}</h4>
                      <div className="text-sm text-muted-foreground">
                        {formatDate(item.startDate)} — {item.endDate ? formatDate(item.endDate) : 'Present'}
                      </div>
                    </div>
                    <div className="text-base font-medium">{item.company}</div>
                    <p className="text-muted-foreground">{item.description}</p>
                    {item.technologies && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        {item.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary">{tech}</Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
              
              {experience.length === 0 && (
                <p className="text-muted-foreground">No work experience added yet.</p>
              )}
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-semibold mb-6">Education</h3>
            <div className="space-y-8">
              {education.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative pl-8 border-l-2 border-muted pb-8 last:pb-0"
                >
                  <div className="absolute top-0 left-[-9px] h-4 w-4 rounded-full bg-primary"></div>
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="text-lg font-semibold">{item.degree}</h4>
                      <div className="text-sm text-muted-foreground">
                        {formatDate(item.startDate)} — {item.endDate ? formatDate(item.endDate) : 'Present'}
                      </div>
                    </div>
                    <div className="text-base font-medium">{item.institution}</div>
                    <div className="text-primary">{item.field}</div>
                    {item.description && (
                      <p className="text-muted-foreground">{item.description}</p>
                    )}
                  </div>
                </motion.div>
              ))}
              
              {education.length === 0 && (
                <p className="text-muted-foreground">No education information added yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
