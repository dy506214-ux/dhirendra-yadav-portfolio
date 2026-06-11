"use client";
import { motion } from "framer-motion";
import React from "react";

interface AnimatedHeadingProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export function AnimatedHeading({ children, className, delay = 0, as = "h2" }: AnimatedHeadingProps) {
  const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };
  
  const transition = { duration: 0.7, delay, ease: "easeOut" };
  const viewport = { once: true, margin: "-50px" };

  const MotionComponent = motion[as] as any;

  return (
    <MotionComponent
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      transition={transition}
      className={className}
    >
      {children}
    </MotionComponent>
  );
}
