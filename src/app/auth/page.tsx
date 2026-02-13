"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Facebook, Github, Mail } from "lucide-react";

export default function AuthPage() {
    return (
        <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-[80vh]">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
                    <p className="text-muted-foreground">
                        Manage your account, check orders, and more.
                    </p>
                </div>

                <Tabs defaultValue="login" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-8">
                        <TabsTrigger value="login">Login</TabsTrigger>
                        <TabsTrigger value="register">Register</TabsTrigger>
                    </TabsList>

                    <TabsContent value="login" className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="m@example.com" />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Password</Label>
                                <a
                                    href="#"
                                    className="text-xs text-primary hover:underline font-medium"
                                >
                                    Forgot password?
                                </a>
                            </div>
                            <Input id="password" type="password" />
                        </div>
                        <Button className="w-full">Sign In</Button>
                    </TabsContent>

                    <TabsContent value="register" className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="first-name">First name</Label>
                                <Input id="first-name" placeholder="John" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="last-name">Last name</Label>
                                <Input id="last-name" placeholder="Doe" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="reg-email">Email</Label>
                            <Input id="reg-email" type="email" placeholder="m@example.com" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="reg-password">Password</Label>
                            <Input id="reg-password" type="password" />
                        </div>
                        <Button className="w-full">Create Account</Button>
                    </TabsContent>
                </Tabs>

                <div className="mt-8">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-6">
                        <Button variant="outline" className="gap-2">
                            <Github className="w-4 h-4" /> Github
                        </Button>
                        <Button variant="outline" className="gap-2">
                            <Facebook className="w-4 h-4 text-blue-600" /> Facebook
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
