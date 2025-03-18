import React from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Sparkles, Star, Zap } from "lucide-react";
import PricingSection from "./LandingPage/PricingSection";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5 z-0" />

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden z-0">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-primary/10 dark:bg-primary/5"
              style={{
                width: Math.random() * 300 + 50,
                height: Math.random() * 300 + 50,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, Math.random() * 100 - 50],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-6">
                <span className="text-primary">NarrativeForge</span>: AI-Powered
                Story Creation
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Unleash your creativity with our advanced AI story generator.
                Create captivating narratives with just a few clicks.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button asChild size="lg" className="px-8 py-6 text-lg">
                <Link to="/generator">
                  Start Creating <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="px-8 py-6 text-lg"
              >
                <Link to="/examples">
                  View Examples <BookOpen className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 text-foreground">
            Powerful Features
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Sparkles className="h-10 w-10 text-primary" />,
                title: "Google Gemini 1.5 Pro API",
                description:
                  "Powered by Google's cutting-edge AI technology to generate creative and coherent stories based on your prompts.",
              },
              {
                icon: <Zap className="h-10 w-10 text-primary" />,
                title: "Customizable Parameters",
                description:
                  "Fine-tune your story with genre, tone, length, and character customization options.",
              },
              {
                icon: <Star className="h-10 w-10 text-primary" />,
                title: "Story History",
                description:
                  "Save and revisit your favorite generated stories with our comprehensive history feature.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-background p-6 rounded-lg shadow-sm border border-border hover:border-primary/50 transition-all"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <PricingSection />

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 text-foreground">
            What Our Users Say
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "NarrativeForge has completely transformed how I brainstorm for my novels. The stories it generates provide incredible inspiration.",
                author: "Sarah J., Author",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
              },
              {
                quote:
                  "As a teacher, I use NarrativeForge to create engaging story prompts for my students. They love the creative results!",
                author: "Michael T., Educator",
                avatar:
                  "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
              },
              {
                quote:
                  "The customization options are fantastic. I can generate exactly the type of story I'm looking for with just a few clicks.",
                author: "Elena R., Content Creator",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=elena",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-background p-6 rounded-lg shadow-sm border border-border relative"
              >
                <div className="absolute -top-5 left-6 bg-primary text-primary-foreground rounded-full p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                  </svg>
                </div>
                <p className="text-muted-foreground mb-4 mt-4 italic">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <span className="font-medium text-foreground">
                    {testimonial.author}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              Ready to Create Your Story?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of writers, educators, and creative minds using
              NarrativeForge.
            </p>
            <Button asChild size="lg" className="px-8 py-6 text-lg">
              <Link to="/generator">
                Start Creating Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-muted/50 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold text-foreground">
                NarrativeForge
              </h2>
              <p className="text-muted-foreground">AI-Powered Story Creation</p>
            </div>
            <div className="flex flex-col md:flex-row gap-4 md:gap-8">
              <Link
                to="/"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Home
              </Link>
              <Link
                to="/generator"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Generator
              </Link>
              <Link
                to="/examples"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Examples
              </Link>
              <Link
                to="/about"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                About
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>
              © {new Date().getFullYear()} NarrativeForge. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
