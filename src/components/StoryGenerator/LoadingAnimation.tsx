import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { cn } from "../../lib/utils";
import {
  Sparkles,
  BookOpen,
  Wand2,
  Stars,
  Feather,
  Bookmark,
  Pencil,
  Lightbulb,
} from "lucide-react";

interface LoadingAnimationProps {
  isLoading?: boolean;
  text?: string;
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary" | "accent";
}

const LoadingAnimation = ({
  isLoading = true,
  text = "Generating your story...",
  size = "md",
  color = "primary",
}: LoadingAnimationProps) => {
  // Make sure text is visible
  const displayText = text || "Generating your story...";
  const [rotation, setRotation] = useState(0);
  const controls = useAnimation();

  // Size mappings
  const sizeClasses = {
    sm: "w-24 h-24",
    md: "w-40 h-40",
    lg: "w-64 h-64",
  };

  // Color mappings
  const colorClasses = {
    primary: "text-blue-600",
    secondary: "text-purple-600",
    accent: "text-amber-600",
  };

  // Background color mappings
  const bgColorClasses = {
    primary: "from-blue-100/30 to-blue-500/10",
    secondary: "from-purple-100/30 to-purple-500/10",
    accent: "from-amber-100/30 to-amber-500/10",
  };

  // Animation variants for the dots
  const dotVariants = {
    initial: { y: 0, opacity: 0.5 },
    animate: (i: number) => ({
      y: [0, -15, 0],
      opacity: [0.5, 1, 0.5],
      transition: {
        y: {
          repeat: Infinity,
          duration: 1,
          ease: "easeInOut",
          delay: i * 0.2,
        },
        opacity: {
          repeat: Infinity,
          duration: 1,
          ease: "easeInOut",
          delay: i * 0.2,
        },
      },
    }),
  };

  // Animation variants for the container
  const containerVariants = {
    initial: { opacity: 0, scale: 0.8, rotateX: 10, rotateY: -10 },
    animate: {
      opacity: 1,
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      rotateX: -10,
      rotateY: 10,
      transition: {
        duration: 0.5,
        ease: "easeIn",
      },
    },
  };

  // Animation variants for the icons
  const iconVariants = {
    initial: { opacity: 0, scale: 0, z: -20 },
    animate: (i: number) => ({
      opacity: [0, 1, 0],
      scale: [0, 1.2, 0],
      z: [-20, 30, -20],
      rotateX: [0, i % 2 === 0 ? 180 : -180, 0],
      rotateY: [0, i % 3 === 0 ? 180 : -180, 0],
      rotateZ: [0, i % 2 === 0 ? 90 : -90, 0],
      transition: {
        opacity: { repeat: Infinity, duration: 3, delay: i * 0.5 },
        scale: { repeat: Infinity, duration: 3, delay: i * 0.5 },
        z: { repeat: Infinity, duration: 3, delay: i * 0.5 },
        rotateX: { repeat: Infinity, duration: 3, delay: i * 0.5 },
        rotateY: { repeat: Infinity, duration: 3, delay: i * 0.5 },
        rotateZ: { repeat: Infinity, duration: 3, delay: i * 0.5 },
      },
    }),
  };

  // Animation for the progress bar
  const progressVariants = {
    initial: { width: "0%" },
    animate: {
      width: "100%",
      transition: {
        duration: 8,
        ease: "easeInOut",
      },
    },
  };

  // Animation for the text
  const textVariants = {
    initial: { opacity: 0, y: 10, rotateX: 30 },
    animate: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
        delay: 0.3,
      },
    },
  };

  // Animation for the background pulse
  const pulseVariants = {
    initial: { opacity: 0.5, scale: 0.9 },
    animate: {
      opacity: [0.5, 0.8, 0.5],
      scale: [0.9, 1.05, 0.9],
      transition: {
        opacity: { repeat: Infinity, duration: 3, ease: "easeInOut" },
        scale: { repeat: Infinity, duration: 3, ease: "easeInOut" },
      },
    },
  };

  // 3D floating particles
  const particleVariants = {
    initial: { opacity: 0, scale: 0 },
    animate: (i: number) => ({
      opacity: [0, 0.7, 0],
      scale: [0, 0.8, 0],
      x: [0, (Math.random() - 0.5) * 100, 0],
      y: [0, (Math.random() - 0.5) * 100, 0],
      z: [0, Math.random() * 50, 0],
      filter: ["blur(0px)", "blur(2px)", "blur(0px)"],
      boxShadow: [
        "0 0 0px rgba(59, 130, 246, 0)",
        "0 0 15px rgba(59, 130, 246, 0.5)",
        "0 0 0px rgba(59, 130, 246, 0)",
      ],
      transition: {
        opacity: {
          repeat: Infinity,
          duration: 2 + Math.random() * 2,
          delay: i * 0.2,
        },
        scale: {
          repeat: Infinity,
          duration: 2 + Math.random() * 2,
          delay: i * 0.2,
        },
        x: {
          repeat: Infinity,
          duration: 2 + Math.random() * 2,
          delay: i * 0.2,
        },
        y: {
          repeat: Infinity,
          duration: 2 + Math.random() * 2,
          delay: i * 0.2,
        },
        z: {
          repeat: Infinity,
          duration: 2 + Math.random() * 2,
          delay: i * 0.2,
        },
        filter: {
          repeat: Infinity,
          duration: 2 + Math.random() * 2,
          delay: i * 0.2,
        },
        boxShadow: {
          repeat: Infinity,
          duration: 2 + Math.random() * 2,
          delay: i * 0.2,
        },
      },
    }),
  };

  // 3D rotating ring
  const ringVariants = {
    initial: { opacity: 0, rotateZ: 0, rotateX: 60 },
    animate: {
      opacity: [0, 0.5, 0],
      rotateZ: [0, 360],
      rotateX: [60, 60],
      transition: {
        opacity: { repeat: Infinity, duration: 8, ease: "easeInOut" },
        rotateZ: { repeat: Infinity, duration: 8, ease: "linear" },
        rotateX: { repeat: Infinity, duration: 8, ease: "linear" },
      },
    },
  };

  // Simulate 3D rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 1) % 360);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Random animation sequence
  useEffect(() => {
    const sequence = async () => {
      while (isLoading) {
        await controls.start({
          rotateY: [0, 5, -5, 0],
          rotateX: [0, -5, 5, 0],
          transition: { duration: 4, ease: "easeInOut" },
        });
      }
    };
    sequence();
  }, [controls, isLoading]);

  if (!isLoading) return null;

  // All possible icons for more variety
  const allIcons = [
    Sparkles,
    BookOpen,
    Wand2,
    Stars,
    Feather,
    Bookmark,
    Pencil,
    Lightbulb,
  ];

  return (
    <div className="flex flex-col items-center justify-center bg-background p-8 rounded-lg shadow-lg relative overflow-hidden perspective-[1000px]">
      {/* 3D perspective container */}
      <div className="relative w-full h-full" style={{ perspective: "1000px" }}>
        {/* Background gradient effect */}
        <motion.div
          className={cn(
            "absolute inset-0 rounded-lg bg-gradient-to-br",
            bgColorClasses[color],
          )}
          variants={pulseVariants}
          initial="initial"
          animate="animate"
          style={{
            transform: `rotateX(${rotation / 20}deg) rotateY(${rotation / 30}deg)`,
          }}
        />

        {/* 3D rotating rings */}
        <motion.div
          className={cn(
            "absolute inset-0 border-4 border-dashed rounded-full",
            color === "primary"
              ? "border-blue-300/20"
              : color === "secondary"
                ? "border-purple-300/20"
                : "border-amber-300/20",
          )}
          style={{ width: "150%", height: "150%", left: "-25%", top: "-25%" }}
          variants={ringVariants}
          initial="initial"
          animate="animate"
        />

        <motion.div
          className={cn(
            "absolute inset-0 border-2 border-dashed rounded-full",
            color === "primary"
              ? "border-blue-400/20"
              : color === "secondary"
                ? "border-purple-400/20"
                : "border-amber-400/20",
          )}
          style={{ width: "130%", height: "130%", left: "-15%", top: "-15%" }}
          variants={ringVariants}
          initial="initial"
          animate={{
            ...ringVariants.animate,
            rotateZ: [0, -360],
          }}
        />

        {/* Floating particles */}
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className={cn(
              "absolute rounded-full",
              color === "primary"
                ? "bg-blue-400"
                : color === "secondary"
                  ? "bg-purple-400"
                  : "bg-amber-400",
            )}
            style={{
              width: Math.random() * 8 + 3,
              height: Math.random() * 8 + 3,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              zIndex: 5,
            }}
            custom={i}
            variants={particleVariants}
            initial="initial"
            animate="animate"
          />
        ))}

        <motion.div
          className={cn(
            "flex flex-col items-center justify-center relative z-10 transform-style-3d",
            sizeClasses[size],
          )}
          variants={containerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          style={{ transformStyle: "preserve-3d" }}
          animate={controls}
        >
          {/* 3D Floating icons with more variety */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ transformStyle: "preserve-3d" }}
          >
            {allIcons.map((Icon, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  top: `${10 + Math.random() * 80}%`,
                  left: `${10 + Math.random() * 80}%`,
                  transformStyle: "preserve-3d",
                }}
                custom={i}
                variants={iconVariants}
                initial="initial"
                animate="animate"
              >
                <Icon className={cn("h-6 w-6", colorClasses[color])} />
              </motion.div>
            ))}
          </div>

          {/* 3D Bouncing dots */}
          <div
            className="flex space-x-3 mb-4"
            style={{ transformStyle: "preserve-3d" }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className={cn(
                  "w-4 h-4 rounded-full shadow-lg",
                  colorClasses[color],
                )}
                custom={i}
                variants={dotVariants}
                initial="initial"
                animate="animate"
                style={{ transformStyle: "preserve-3d" }}
              />
            ))}
          </div>

          {/* 3D Text content */}
          <motion.div
            className="mt-4 text-center w-full"
            variants={textVariants}
            initial="initial"
            animate="animate"
            style={{ transformStyle: "preserve-3d" }}
          >
            <p className="text-foreground font-medium text-xl whitespace-normal break-words bg-background/80 px-4 py-2 rounded-md shadow-sm border border-border">
              {displayText}
            </p>
            <p className="text-muted-foreground text-sm mt-2 whitespace-normal break-words bg-background/80 px-4 py-2 rounded-md shadow-sm border border-border">
              This may take a moment as we craft your unique story
            </p>
          </motion.div>

          {/* 3D Progress bar */}
          <div
            className="w-full h-3 bg-muted/50 rounded-full mt-6 overflow-hidden shadow-inner border border-border"
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.div
              className={cn(
                "h-full rounded-full shadow-lg",
                color === "primary"
                  ? "bg-blue-600"
                  : color === "secondary"
                    ? "bg-purple-600"
                    : "bg-amber-600",
              )}
              variants={progressVariants}
              initial="initial"
              animate="animate"
            />
          </div>

          {/* Percentage indicator */}
          <motion.div
            className="mt-2 text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              Processing your request...
            </motion.span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoadingAnimation;
