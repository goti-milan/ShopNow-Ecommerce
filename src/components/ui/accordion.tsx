"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const AccordionContext = React.createContext<{
    value?: string
    onValueChange: (value: string) => void
} | null>(null)

const Accordion = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & { type?: "single" | "multiple"; collapsible?: boolean; defaultValue?: string }
>(({ className, type, collapsible, defaultValue, ...props }, ref) => {
    const [value, setValue] = React.useState(defaultValue || "")

    const handleValueChange = (newValue: string) => {
        setValue(prev => (prev === newValue && collapsible ? "" : newValue))
    }

    return (
        <AccordionContext.Provider value={{ value, onValueChange: handleValueChange }}>
            <div ref={ref} className={className} {...props} />
        </AccordionContext.Provider>
    )
})
Accordion.displayName = "Accordion"

const AccordionItem = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & { value: string }
>(({ className, value, ...props }, ref) => (
    <div ref={ref} className={cn("border-b", className)} data-value={value} {...props} />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
    const context = React.useContext(AccordionContext)
    // We need to find the value from the parent Item context or similar, 
    // but for simplicity in this flat structure without complex context nesting,
    // we normally would need a context from Item. 
    // Let's implement a simpler version where we just pass value OR assume it's used correctly.
    // Actually, standard shadcn/radix approach uses a complex context. 
    // I'll make a simplifying assumption: The trigger is always inside an Item, so I can't easily get the value unless I create another context.
    // Let's add ItemContext.

    const itemContext = React.useContext(AccordionItemContext)
    const expanded = context?.value === itemContext?.value

    return (
        <div className="flex">
            <button
                ref={ref}
                className={cn(
                    "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
                    className
                )}
                onClick={() => context?.onValueChange(itemContext?.value || "")}
                data-state={expanded ? "open" : "closed"}
                {...props}
            >
                {children}
                <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
            </button>
        </div>
    )
})
AccordionTrigger.displayName = "AccordionTrigger"

const AccordionContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
    const context = React.useContext(AccordionContext)
    const itemContext = React.useContext(AccordionItemContext)
    const expanded = context?.value === itemContext?.value

    if (!expanded) return null

    return (
        <div
            ref={ref}
            className={cn(
                "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
                className
            )}
            {...props}
        >
            <div className="pb-4 pt-0">{children}</div>
        </div>
    )
})
AccordionContent.displayName = "AccordionContent"

// Helper context for Item
const AccordionItemContext = React.createContext<{ value: string } | null>(null)

// Re-implement Item to provide context
const AccordionItemWithContext = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & { value: string }
>(({ className, value, ...props }, ref) => (
    <AccordionItemContext.Provider value={{ value }}>
        <div ref={ref} className={cn("border-b", className)} {...props} />
    </AccordionItemContext.Provider>
))
AccordionItemWithContext.displayName = "AccordionItem"

export { Accordion, AccordionItemWithContext as AccordionItem, AccordionTrigger, AccordionContent }
