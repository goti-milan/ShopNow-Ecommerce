"use client";

import React from "react";
import { cn } from "@/lib/utils";

type HomeSectionHeaderProps = {
  label: string;
  heading: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
};

export default function HomeSectionHeader({
  label,
  heading,
  description,
  action,
  className,
}: HomeSectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-6 md:mb-8 lg:mb-12",
        className
      )}
    >
      <div className="space-y-2">
        <span className="text-primary font-semibold tracking-widest uppercase text-xs">
          {label}
        </span>

        <div className="flex justify-between items-center gap-3">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight whitespace-nowrap flex-shrink-0">
            {heading}
          </h2>

          {action ? (
            <div className="block md:hidden w-auto flex items-center gap-3 justify-end">
              {action}
            </div>
          ) : null}
        </div>
        {description ? (
          <p className="text-muted-foreground text-sm max-w-md">{description}</p>
        ) : null}
      </div>

      {action ? (
        <div className="hidden md:block w-full md:w-auto items-center gap-3 md:justify-end">
          {action}
        </div>
      ) : null}
    </div>
  );
}
