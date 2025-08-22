import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const gamingButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        
        // Gaming variants with glows and effects
        glow: "btn-glow-cyan text-primary-foreground font-semibold border-0 shadow-glow-cyan",
        reward: "btn-glow-reward text-reward-foreground font-semibold border-0 shadow-glow-reward",
        magic: "bg-gradient-magic text-magic-foreground font-semibold border-0 shadow-glow-magic hover:shadow-glow-magic hover:scale-105",
        hero: "bg-gradient-primary text-primary-foreground font-bold text-lg px-8 py-4 shadow-glow-cyan hover:shadow-glow-cyan hover:scale-105",
        panel: "game-panel hover:game-panel-glow text-foreground font-medium border border-card-border",
        floating: "floating-panel game-panel hover:game-panel-glow text-foreground font-medium border border-card-border",
        pulse: "bounce-pulse bg-gradient-reward text-reward-foreground font-semibold shadow-glow-reward",
        shimmer: "shimmer-unlock bg-gradient-primary text-primary-foreground font-semibold shadow-glow-cyan"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-lg px-8",
        xl: "h-12 rounded-xl px-10 text-base",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface GamingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof gamingButtonVariants> {
  asChild?: boolean;
}

const GamingButton = React.forwardRef<HTMLButtonElement, GamingButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(gamingButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
GamingButton.displayName = "GamingButton";

export { GamingButton, gamingButtonVariants };