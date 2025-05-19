
import { getPortfolioData } from "@/data/portfolioData";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

export default function Skills() {
  const { skills } = getPortfolioData();
  
  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    const category = skill.category || "Other";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);
  
  // Get categories in order
  const categories = Object.keys(groupedSkills).sort();

  return (
    <section id="skills" className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            My Skills
          </h2>
          <div className="mt-2 h-1 w-16 bg-primary mx-auto"></div>
        </motion.div>
        
        <div className="grid gap-8 lg:gap-12">
          {categories.map((category, categoryIndex) => (
            <div key={category}>
              <h3 className="text-xl font-semibold mb-4">{category}</h3>
              <div className="grid gap-y-6">
                {groupedSkills[category].map((skill, skillIndex) => (
                  <motion.div 
                    key={skill.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: skillIndex * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-muted-foreground">{skill.proficiency}%</span>
                    </div>
                    <Progress value={skill.proficiency} className="h-2" />
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
