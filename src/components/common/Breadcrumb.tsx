"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
    className?: string;
}

export const Breadcrumb = ({ items, className }: BreadcrumbProps) => {
    return (
        <nav className={cn("flex flex-wrap items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-400", className)}>
            <Link
                href="/"
                className="flex items-center gap-1.5 hover:text-primary transition-colors py-1"
            >
                <Home className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Home</span>
            </Link>

            {items.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                    <ChevronRight className="w-3 h-3 text-slate-300 flex-shrink-0" />
                    {item.href ? (
                        <Link
                            href={item.href}
                            className="hover:text-primary transition-colors py-1"
                        >
                            {item.label}
                        </Link>
                    ) : (
                        <span className="text-slate-900 truncate max-w-[120px] md:max-w-xs">{item.label}</span>
                    )}
                </div>
            ))}
        </nav>
    );
};
