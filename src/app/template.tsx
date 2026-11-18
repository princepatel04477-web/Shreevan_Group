import React from "react";
import { Stamp } from "@/components/motion/Stamp";

export default function Template({ children }: { children: React.ReactNode }) {
  return <Stamp>{children}</Stamp>;
}
