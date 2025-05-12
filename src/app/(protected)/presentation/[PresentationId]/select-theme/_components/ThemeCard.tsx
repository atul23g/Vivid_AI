import { Card } from "@/components/ui/card";
import { Theme } from "@/lib/types";

import { AnimationControls, motion } from "framer-motion";
import React from "react";


type Props = {
  title: string;
  description: string;
  content: React.ReactNode;
  variant: "left" | "main" | "right";
  theme: Theme;
  controls: AnimationControls;
};

const ThemeCard = ({
  content,
  controls,
  description,
  theme,
  title,
  variant,
}: Props) => {
  const variants = {
    left: {
      hidden: {
        opacity: 0,
        x: "-50%",
        y: "-50%",
        scale: 0.9,
        rotate: 0,
      },
      visible: {
        opacity: 1,
        x: "-25%",
        y: "-25%",
        scale: 0.95,
        rotate: -10,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 30,
          delay: 0.1,
        },
      },
    },
    right: {
      hidden: {
        opacity: 0,
        x: "50%",
        y: "50%",
        scale: 0.9,
        rotate: 0,
      },
      visible: {
        opacity: 1,
        x: "25%",
        y: "25%",
        scale: 0.95,
        rotate: 10,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 30,
          delay: 0.1,
        },
      },
    },
    main: {
      hidden: {
        opacity: 0,
        scale: 0.9,
      },
      visible: {
        opacity: 1,
        scale: 1,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 30,
          delay: 0.2,
        },
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate={controls}
      variants={variants[variant]}
      className="absolute w-full max-w-3xl"
      style={{ zIndex: variant === "main" ? 10 : 0 }}
    >
      <Card
        className="h-full shadow-2xl backdrop-blur-sm"
        style={{
          backgroundColor: theme.slideBackgroundColor,
          border: `1px solid ${theme.accentColor}20`,
        }}
      >
        {content}
      </Card>
    </motion.div>
  );
};

export default ThemeCard;