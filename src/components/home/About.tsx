
import { getPortfolioData } from "@/data/portfolioData";
import { motion } from "framer-motion";

export default function About() {
  const { profile } = getPortfolioData();
  
  return (
    <section id="about" className="py-16 md:py-24 bg-muted/20">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            About Me
          </h2>
          <div className="mt-2 h-1 w-16 bg-primary mx-auto"></div>
        </motion.div>
        
        <div className="grid gap-8 items-center md:grid-cols-2">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-lg aspect-square md:aspect-[4/3]"
          >
            {profile.avatarUrl ? (
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                className="object-cover w-full h-full rounded-lg"
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center rounded-lg">
                <span className="text-6xl font-bold text-muted-foreground">
                  {profile.name.charAt(0)}
                </span>
              </div>
            )}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold">{profile.name}</h3>
            <h4 className="text-xl text-primary">{profile.title}</h4>
            <div className="prose dark:prose-invert">
              <p className="text-muted-foreground text-lg">
                {profile.summary}
              </p>
              <p className="text-muted-foreground">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p className="text-muted-foreground">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
