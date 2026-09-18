import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "solid" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
};

export function BuyButton({
  className,
  variant = "solid",
  size = "md",
  ...props
}: Props) {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex items-center justify-center rounded-2xl font-medium tracking-wide transition-all duration-300 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        size === "sm" && "px-5 py-2.5 text-xs uppercase tracking-[0.16em]",
        size === "md" && "px-7 py-3.5 text-sm uppercase tracking-[0.16em]",
        size === "lg" && "w-full px-8 py-5 text-sm uppercase tracking-[0.2em]",
        variant === "solid" &&
          "bg-primary text-primary-foreground shadow-card hover:bg-terracotta hover:shadow-soft",
        variant === "outline" &&
          "border border-primary/30 text-primary hover:border-primary hover:bg-primary/15",
        variant === "ghost" && "text-primary hover:opacity-70",
        className,
      )}
    />
  );
}
