import React, { useState } from "react";
import Header from "./StoryGenerator/Header";
import { motion, useScroll, useTransform } from "framer-motion";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Brain,
  Code,
  Sparkles,
  Users,
} from "lucide-react";

const AnimatedText = ({ text }: { text: string }) => {
  return (
    <div className="overflow-hidden">
      {text.split(" ").map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-2"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: i * 0.05 }}
          viewport={{ once: true }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
};

const About = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  const teamMembers = [
    {
      name: "Dr. Sarah Chen",
      role: "AI Research Lead",
      bio: "With a Ph.D. in Computational Linguistics, Sarah leads our AI research team in developing advanced natural language generation models.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    },
    {
      name: "Michael Rodriguez",
      role: "Senior Developer",
      bio: "Michael brings 15 years of software engineering experience, specializing in scalable web applications and AI integration.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
    },
    {
      name: "Aisha Patel",
      role: "UX/UI Designer",
      bio: "Aisha crafts intuitive user experiences that make complex AI technology accessible and enjoyable for everyone.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=aisha",
    },
    {
      name: "James Wilson",
      role: "Content Strategist",
      bio: "James works with authors and educators to ensure NarrativeForge meets the needs of creative professionals and educational institutions.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=james",
    },
  ];

  return (
    <div className={`min-h-screen bg-background ${isDarkMode ? "dark" : ""}`}>
      <Header isDarkMode={isDarkMode} onThemeToggle={handleThemeToggle} />

      <main className="container mx-auto px-4 py-8 space-y-16">
        {/* Hero Section */}
        <motion.div
          className="relative h-[60vh] flex items-center justify-center"
          style={{ opacity, scale }}
        >
          <div className="absolute inset-0 w-full h-full bg-primary/5">
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-8xl font-bold text-primary">NF</div>
            </div>
          </div>
          <div className="relative z-10 text-center">
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6 text-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              About NarrativeForge
            </motion.h1>
            <motion.p
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Revolutionizing storytelling through artificial intelligence
            </motion.p>
          </div>
        </motion.div>

        {/* Our Mission */}
        <section className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-foreground">
                <AnimatedText text="Our Mission" />
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  At NarrativeForge, we believe that storytelling is a
                  fundamental human experience that connects us across cultures,
                  generations, and experiences. Our mission is to democratize
                  creative writing by providing powerful AI tools that inspire,
                  assist, and enhance the storytelling process.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  We're not replacing human creativity—we're amplifying it.
                  Whether you're a professional author seeking inspiration, an
                  educator creating learning materials, or someone who simply
                  loves stories, NarrativeForge is designed to be your creative
                  companion.
                </motion.p>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-primary/5 rounded-lg p-8 border border-primary/20"
            >
              <div className="flex justify-center mb-6">
                <Sparkles className="h-16 w-16 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-center text-foreground">
                Our Vision
              </h3>
              <p className="text-muted-foreground text-center">
                To create a world where everyone has the tools to tell their
                story, where AI and human creativity work in harmony to produce
                narratives that educate, entertain, and inspire.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Technology */}
        <section className="py-16 bg-muted/30 rounded-xl p-8">
          <h2 className="text-3xl font-bold mb-12 text-center text-foreground">
            <AnimatedText text="Powered by Advanced Technology" />
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Brain className="h-12 w-12 text-primary" />,
                title: "Google Gemini 1.5 Pro",
                description:
                  "Our story generator leverages Google's state-of-the-art large language model to create coherent, creative, and contextually relevant narratives.",
              },
              {
                icon: <Code className="h-12 w-12 text-primary" />,
                title: "Custom Algorithms",
                description:
                  "We've developed proprietary algorithms that enhance the AI's storytelling capabilities, ensuring diverse plots, consistent characters, and engaging narratives.",
              },
              {
                icon: <Users className="h-12 w-12 text-primary" />,
                title: "User-Centered Design",
                description:
                  "Every feature is designed with our users in mind, making powerful AI technology accessible through an intuitive, responsive interface.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-background p-6 rounded-lg shadow-sm border border-border"
              >
                <div className="flex justify-center mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-center text-foreground">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-center">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="py-16">
          <h2 className="text-3xl font-bold mb-12 text-center text-foreground">
            <AnimatedText text="Meet Our Team" />
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-background p-6 rounded-lg shadow-sm border border-border text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary/20">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-1 text-foreground">
                  {member.name}
                </h3>
                <p className="text-primary font-medium mb-3">{member.role}</p>
                <p className="text-sm text-muted-foreground">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary/5 rounded-xl p-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6 text-foreground">
              Experience NarrativeForge Today
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Join thousands of writers, educators, and storytellers who are
              already using our AI to enhance their creative process.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/generator">
                  Start Creating <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/examples">
                  View Examples <BookOpen className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="py-6 text-center text-muted-foreground border-t border-border">
        <p>
          © {new Date().getFullYear()} NarrativeForge | Powered by Google
          Gemini 1.5 Pro API
        </p>
      </footer>
    </div>
  );
};

export default About;
