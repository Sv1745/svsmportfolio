'use client';
import { Section } from "./Section";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Mail } from "lucide-react";
import { useState } from "react";
import { sendMessage } from "@/ai/flows/contact";

export const ContactFormSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email." }),
    message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export function Contact() {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof ContactFormSchema>>({
        resolver: zodResolver(ContactFormSchema),
        defaultValues: { name: "", email: "", message: "" },
    });

    async function onSubmit(data: z.infer<typeof ContactFormSchema>) {
        setIsLoading(true);
        try {
            await sendMessage(data);
            form.reset();
            toast({
                title: "Message Sent!",
                description: "Thanks for reaching out. I'll get back to you soon.",
            });
        } catch (error) {
            console.error("Failed to send message:", error);
            toast({
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Section 
            id="contact" 
            title="Contact" 
            subtitle="Let's Connect and Create Something Amazing" 
            className="bg-transparent"
        >
            <Card className="max-w-2xl mx-auto bg-card/80 border-primary/30 p-6 md:p-8">
                 <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField control={form.control} name="name" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl><Input placeholder="Your Name" {...field} className="bg-background" /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>
                         <FormField control={form.control} name="email" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl><Input placeholder="your.email@example.com" {...field} className="bg-background" /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>
                         <FormField control={form.control} name="message" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Message</FormLabel>
                                <FormControl><Textarea placeholder="Your message..." className="min-h-[150px] bg-background" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>
                        <Button type="submit" disabled={isLoading} className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto">
                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <><Mail className="mr-2 h-4 w-4" /> Send Message</>}
                        </Button>
                    </form>
                </Form>
            </Card>
        </Section>
    );
}
