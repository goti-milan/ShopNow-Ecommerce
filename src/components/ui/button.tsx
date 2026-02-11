"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

/* ================= Base Styles ================= */

const baseStyles =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"

/* ================= Variants ================= */

export const buttonVariants = cva(baseStyles, {
  variants: {
    variant: {
      primary: "bg-primary text-white hover:bg-primary/90",
      secondary: "bg-secondary text-white hover:bg-secondary/80",
      outline: "border border-input bg-background hover:bg-accent",
      ghost: "hover:bg-accent",
      destructive: "bg-destructive text-white hover:bg-destructive/90",
      link: "text-primary underline-offset-4 hover:underline",
    },

    size: {
      xs: "h-7 px-2 text-xs",
      sm: "h-8 px-3 text-sm",
      md: "h-9 px-4",
      lg: "h-11 px-6 text-base",
      icon: "h-9 w-9",
    },

    fullWidth: {
      true: "w-full",
    },
  },

  defaultVariants: {
    variant: "primary",
    size: "md",
  },
})

/* ================= Types ================= */

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

/* ================= Component ================= */

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      asChild = false,
      loading = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button"

    return (
      <Comp
        ref={ref}
        className={cn(
          buttonVariants({ variant, size, fullWidth }),
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        )}
        {children}
      </Comp>
    )
  }
)

Button.displayName = "Button"
