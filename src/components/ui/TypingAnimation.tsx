"use client";
import { motion } from "framer-motion";
import React from "react";

export function TypingAnimation({ 
  text, 
  className,
  delay = 0,
  highlight = "",
  highlightColor = "text-neon-blue"
}: { 
  text: string; 
  className?: string;
  delay?: number;
  highlight?: string;
  highlightColor?: string;
}) {
  const container = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: delay },
    },
  };

  const child = {
    visible: {
      opacity: 1,
    },
    hidden: {
      opacity: 0,
    },
  };

  let highlightStart = -1;
  let highlightEnd = -1;
  
  if (highlight && text.includes(highlight)) {
    highlightStart = text.indexOf(highlight);
    highlightEnd = highlightStart + highlight.length;
  }

  return (
    <motion.span
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {Array.from(text).map((letter, index) => {
        const isHighlight = index >= highlightStart && index < highlightEnd;
        return (
          <motion.span 
            variants={child} 
            key={index} 
            className={isHighlight ? highlightColor : ""}
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        );
      })}
    </motion.span>
  );
}
