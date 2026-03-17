"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
    ArrowDownToLine,
    ArrowUpRight,
    CreditCard,
    Gift,
    Plus,
    RefreshCw,
    ShieldCheck,
    Wallet,
} from "lucide-react";

type Transaction = {
    id: string;
    title: string;
    date: string;
    amount: number;
    type: "credit" | "debit";
};

const TRANSACTIONS: Transaction[] = [
    { id: "TXN-90821", title: "Order Refund", date: "Mar 10, 2026", amount: 1299, type: "credit" },
    { id: "TXN-90802", title: "Electronics Purchase", date: "Mar 09, 2026", amount: 4599, type: "debit" },
    { id: "TXN-90764", title: "Wallet Top-up", date: "Mar 07, 2026", amount: 2500, type: "credit" },
    { id: "TXN-90730", title: "Service Booking", date: "Mar 05, 2026", amount: 899, type: "debit" },
    { id: "TXN-90711", title: "Promo Cashback", date: "Mar 03, 2026", amount: 120, type: "credit" },
];

function getTransactionStyles(type: "credit" | "debit") {
    if (type === "credit") {
        return {
            amount: "text-emerald-600 dark:text-emerald-400",
            badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
            label: "Credit",
            sign: "+",
        };
    }

    return {
        amount: "text-red-600 dark:text-red-400",
        badge: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
        label: "Debit",
        sign: "-",
    };
}

const SAVED_CARDS = [
    { id: "card-1", brand: "VISA", last4: "4521", expiry: "08/28", default: true },
    { id: "card-2", brand: "MASTERCARD", last4: "9912", expiry: "11/27", default: false },
];

export default function WalletPage() {
    const [amount, setAmount] = useState("");

    return (
        <div className="min-h-screen bg-surface">
            <div className="container mx-auto px-4 py-10 max-w-6xl">
                <div className="flex items-center gap-3 mb-6">
                    <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                        <Wallet className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">ShopNow Wallet</h1>
                        <p className="text-sm text-muted-foreground">Track balance, add money, and manage payment methods.</p>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    <Card className="lg:col-span-2 border-border bg-background shadow-sm">
                        <div className="p-6 md:p-8">
                            <div className="flex items-center justify-between gap-6">
                                <div>
                                    <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Available Balance</p>
                                    <p className="text-4xl font-semibold text-foreground mt-2">₹12,640</p>
                                    <p className="text-sm text-muted-foreground mt-1">Updated a few seconds ago</p>
                                </div>
                                <div className="hidden md:flex items-center gap-2 rounded-full bg-accent text-primary px-4 py-2 text-xs font-semibold">
                                    <ShieldCheck className="h-4 w-4" />
                                    Protected balance
                                </div>
                            </div>

                            <div className="mt-6 grid gap-3 sm:grid-cols-3">
                                <div className="rounded-2xl border border-border bg-muted/50 p-4">
                                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Pending</p>
                                    <p className="text-lg font-bold text-foreground mt-1">₹1,240</p>
                                </div>
                                <div className="rounded-2xl border border-border bg-muted/50 p-4">
                                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Rewards</p>
                                    <p className="text-lg font-bold text-foreground mt-1">₹620</p>
                                </div>
                                <div className="rounded-2xl border border-border bg-muted/50 p-4">
                                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Spent</p>
                                    <p className="text-lg font-bold text-foreground mt-1">₹38,910</p>
                                </div>
                            </div>

                            <div className="mt-6 grid gap-3 sm:grid-cols-3">
                                <Button className="h-12 rounded-xl">
                                    <Plus className="h-4 w-4" />
                                    Add Money
                                </Button>
                                <Button variant="outline" className="h-12 rounded-xl">
                                    <ArrowUpRight className="h-4 w-4" />
                                    Send to Bank
                                </Button>
                                <Button variant="outline" className="h-12 rounded-xl">
                                    <ArrowDownToLine className="h-4 w-4" />
                                    Withdraw
                                </Button>
                            </div>
                        </div>
                    </Card>

                    <Card className="border-border bg-background shadow-sm">
                        <div className="p-6 md:p-8">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-bold text-foreground">Quick Top‑up</h2>
                                <RefreshCw className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">Add money instantly with saved cards.</p>

                            <div className="mt-5 grid gap-3">
                                <Input
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder="Enter amount (₹)"
                                    className="h-12 rounded-xl"
                                />
                                <div className="grid grid-cols-3 gap-2">
                                    {["500", "1000", "2000"].map((v) => (
                                        <button
                                            key={v}
                                            onClick={() => setAmount(v)}
                                            className="h-10 rounded-lg border border-border bg-muted/60 text-sm font-semibold text-foreground transition-colors hover:bg-accent hover:text-primary"
                                        >
                                            ₹{v}
                                        </button>
                                    ))}
                                </div>
                                <Button className="h-12 rounded-xl">Add ₹{amount || "0"}</Button>
                            </div>

                            <div className="mt-6 rounded-2xl border border-border bg-muted/40 p-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center">
                                            <CreditCard className="h-4 w-4 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-foreground">VISA •••• 4521</p>
                                            <p className="text-xs text-muted-foreground">Default card</p>
                                        </div>
                                    </div>
                                    <Button variant="outline" size="sm" className="rounded-lg">Change</Button>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                <div className="grid gap-6 lg:grid-cols-3 mt-8">
                    <Card className="lg:col-span-2 border-border bg-background shadow-sm">
                        <div className="p-6 md:p-8">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-bold text-foreground">Recent Transactions</h2>
                                <Button variant="link" size="sm" className="h-auto p-0">View all</Button>
                            </div>
                            <div className="mt-4 divide-y divide-border">
                                {TRANSACTIONS.map((t) => (
                                    <div key={t.id} className="flex items-center justify-between py-4">
                                        {(() => {
                                            const styles = getTransactionStyles(t.type);

                                            return (
                                                <>
                                                    <div>
                                                        <p className="text-sm font-semibold text-foreground">{t.title}</p>
                                                        <p className="text-xs text-muted-foreground">{t.date} • {t.id}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className={`text-sm font-bold ${styles.amount}`}>
                                                            {styles.sign}₹{t.amount.toLocaleString()}
                                                        </p>
                                                        <span
                                                            className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${styles.badge}`}
                                                        >
                                                            {styles.label}
                                                        </span>
                                                    </div>
                                                </>
                                            )
                                        })()}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>

                    <Card className="border-border bg-background shadow-sm">
                        <div className="p-6 md:p-8">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-bold text-foreground">Saved Cards</h2>
                                <Button variant="outline" size="sm" className="rounded-lg">
                                    <Plus className="h-4 w-4" />
                                    Add
                                </Button>
                            </div>
                            <div className="mt-5 grid gap-3">
                                {SAVED_CARDS.map((card) => (
                                    <div key={card.id} className="rounded-2xl border border-border p-4 transition hover:border-primary/30 hover:shadow-sm">
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-semibold text-foreground">{card.brand} •••• {card.last4}</p>
                                            {card.default ? (
                                                <span className="text-[10px] font-semibold bg-accent text-primary px-2 py-0.5 rounded-full uppercase">Default</span>
                                            ) : null}
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-1">Expiry {card.expiry}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>
                </div>

                <Card className="mt-8 border-border bg-background shadow-sm">
                    <div className="p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                                <Gift className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-foreground">Earn more with ShopNow Rewards</h3>
                                <p className="text-sm text-muted-foreground">Get up to 5% cashback on wallet payments across categories.</p>
                            </div>
                        </div>
                        <Button className="rounded-xl">Explore Rewards</Button>
                    </div>
                </Card>
            </div>
        </div>
    );
}
