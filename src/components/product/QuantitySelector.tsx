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
        <div className="flex items-center gap-4 bg-slate-50 border border-slate-200 rounded-2xl p-1.5 w-fit shadow-inner">
            <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-xl hover:bg-white hover:shadow-sm transition-all duration-200"
                onClick={decrement}
                disabled={quantity <= 1}
            >
                <Minus className="h-4 w-4" />
            </Button>
            <span className="w-10 text-center font-bold text-slate-900 text-base">{quantity}</span>
            <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-xl hover:bg-white hover:shadow-sm transition-all duration-200"
                onClick={increment}
                disabled={quantity >= maxStock}
            >
                <Plus className="h-4 w-4" />
            </Button>
        </div>
    );
};
