"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, MapPin, Package, User, Settings, CreditCard } from "lucide-react";
import Image from "next/image";

export default function AccountPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">My Account</h1>

            <Tabs defaultValue="profile" className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-64 flex-shrink-0">
                    <div className="bg-muted/30 p-4 rounded-lg mb-4 text-center">
                        <div className="w-20 h-20 bg-primary/10 rounded-full mx-auto flex items-center justify-center mb-3">
                            <User className="w-10 h-10 text-primary" />
                        </div>
                        <h2 className="font-bold text-lg">John Doe</h2>
                        <p className="text-sm text-muted-foreground">john.doe@example.com</p>
                    </div>

                    <TabsList className="flex flex-col w-full h-auto bg-transparent gap-1 p-0">
                        <TabsTrigger
                            value="profile"
                            className="w-full justify-start gap-3 px-4 py-3 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                        >
                            <User className="w-4 h-4" /> Profile
                        </TabsTrigger>
                        <Link href="/account/orders">
                            <Button variant="ghost" className="w-full justify-start gap-3 px-4 py-3 font-normal">
                                <Package className="w-4 h-4" /> Orders
                            </Button>
                        </Link>
                        <TabsTrigger
                            value="address"
                            className="w-full justify-start gap-3 px-4 py-3 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                        >
                            <MapPin className="w-4 h-4" /> Addresses
                        </TabsTrigger>
                        <TabsTrigger
                            value="settings"
                            className="w-full justify-start gap-3 px-4 py-3 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                        >
                            <Settings className="w-4 h-4" /> Settings
                        </TabsTrigger>
                    </TabsList>

                    <Button variant="outline" className="w-full mt-8 gap-2 border-destructive/20 text-destructive hover:bg-destructive/10 hover:text-destructive">
                        <LogOut className="w-4 h-4" /> Sign Out
                    </Button>
                </div>

                <div className="flex-1">
                    {/* Profile Tab */}
                    <TabsContent value="profile" className="mt-0">
                        <div className="border rounded-lg p-6">
                            <h2 className="text-xl font-bold mb-6">Personal Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="profile-first-name">First Name</Label>
                                    <Input id="profile-first-name" defaultValue="John" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="profile-last-name">Last Name</Label>
                                    <Input id="profile-last-name" defaultValue="Doe" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="profile-email">Email</Label>
                                    <Input id="profile-email" defaultValue="john.doe@example.com" disabled />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="profile-phone">Phone</Label>
                                    <Input id="profile-phone" defaultValue="+1 234 567 8900" />
                                </div>
                            </div>
                            <Button className="mt-6">Save Changes</Button>
                        </div>
                    </TabsContent>



                    {/* Address Tab */}
                    <TabsContent value="address" className="mt-0">
                        <div className="border rounded-lg p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold">My Addresses</h2>
                                <Button variant="outline" size="sm">Add New Address</Button>
                            </div>

                            <div className="border rounded-md p-4 mb-4 relative hover:border-primary transition-colors cursor-pointer">
                                <span className="absolute top-4 right-4 text-xs font-bold bg-primary/10 text-primary px-2 py-1 rounded">Default</span>
                                <p className="font-bold mb-1">Home</p>
                                <p className="text-sm text-muted-foreground">
                                    123 Main Street, Apt 4B<br />
                                    New York, NY 10001<br />
                                    United States
                                </p>
                                <div className="mt-4 flex gap-2">
                                    <Button variant="link" size="sm" className="h-auto p-0">Edit</Button>
                                    <span className="text-muted-foreground">|</span>
                                    <Button variant="link" size="sm" className="h-auto p-0 text-destructive">Delete</Button>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
}
