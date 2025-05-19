
import { getPortfolioData } from "@/data/portfolioData";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Hero() {
  const { profile } = getPortfolioData();
  
  return (
    <section className="py-20 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
          <div className="order-2 md:order-1">
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Hi, I'm{" "}
                  <span className="text-primary animate-text bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent">
                    {profile.name}
                  </span>
                </h1>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="text-xl md:text-2xl font-medium text-muted-foreground">
                  {profile.title}
                </h2>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <p className="text-muted-foreground md:text-lg">
                  {profile.summary}
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                <Button asChild size="lg">
                  <a href="#projects">View My Work</a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="#contact">Get in Touch</a>
                </Button>
              </motion.div>
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="order-1 md:order-2 flex justify-center"
          >
            {profile.avatarUrl ? (
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/20">
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  className="object-cover w-full h-full"
                />
              </div>
            ) : (
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-5xl font-bold text-primary">
                  {profile.name.charAt(0)}
                </span>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
