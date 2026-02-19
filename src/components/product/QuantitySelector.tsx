"use client";

import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuantitySelectorProps {
    quantity: number;
    onChange: (value: number) => void;
    maxStock?: number;
}

export const QuantitySelector = ({ quantity, onChange, maxStock = 99 }: QuantitySelectorProps) => {
    const increment = () => {
        if (quantity < maxStock) {
            onChange(quantity + 1);
        }
    };

    const decrement = () => {
        if (quantity > 1) {
            onChange(quantity - 1);
        }
    };

    return (
        <div className="flex items-center gap-4 border border-slate-200 rounded-lg p-1 w-fit">
            <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-slate-100 transition-all"
                onClick={decrement}
                disabled={quantity <= 1}
            >
                <Minus className="h-3 w-3" />
            </Button>
            <span className="w-6 text-center text-xs font-bold text-slate-900">{quantity}</span>
            <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-slate-100 transition-all"
                onClick={increment}
                disabled={quantity >= maxStock}
            >
                <Plus className="h-3 w-3" />
            </Button>
        </div>
    );
};
