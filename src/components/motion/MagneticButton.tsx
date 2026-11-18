"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { Button, ButtonProps } from "@/components/ui/Button";

export interface MagneticButtonProps extends ButtonProps {
  magneticStrength?: number;
}

export function MagneticButton({
  children,
  magneticStrength = 0.35,
  className,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Framer Motion motion values outside of React render cycle
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring return
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Check if device supports fine pointer (mouse)
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = (e.clientX - centerX) * magneticStrength;
    const distanceY = (e.clientY - centerY) * magneticStrength;

    x.set(distanceX);
    y.set(distanceY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="inline-block will-change-transform"
    >
      <Button variant="primary" className={className} {...props}>
        {children}
      </Button>
    </motion.div>
  );
}
