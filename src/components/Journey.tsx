
'use client';
import { Section } from "./Section";
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Loader2, Wand2 } from "lucide-react";
import { Card3D } from "./Card3D";
import { generateBlogIntro, GenerateBlogIntroOutput } from "@/ai/flows/generate-blog-intro";
import { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

const blogPosts = [
    { 
        title: "My Journey into the Cosmos of Code", 
        image: "https://placehold.co/600x400.png", 
        imageHint: "coding space", 
        description: "Exploring the parallels between navigating the vast universe and the endless possibilities in software development.",
        topic: "The connection between space exploration and software development"
    },
    { 
        title: "The Art of 3D Storytelling", 
        image: "https://placehold.co/600x400.png", 
        imageHint: "3d render", 
        description: "A deep dive into how Blender and other tools can be used to create compelling narratives in three dimensions.",
        topic: "Using Blender for 3D storytelling"
    },
    { 
        title: "Decoding the Universe with ML", 
        image: "https://placehold.co/600x400.png", 
        imageHint: "neural network", 
        description: "How machine learning models are becoming the new telescopes for modern astronomers, finding patterns in cosmic data.",
        topic: "Machine learning applications in astronomy"
    }
];

export function Journey() {
    const [generatedContent, setGeneratedContent] = useState<Record<string, GenerateBlogIntroOutput | null>>({});
    const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});

    const handleGenerateIntro = async (topic: string, title: string) => {
        setLoadingStates(prev => ({...prev, [title]: true}));
        try {
            const result = await generateBlogIntro({ topic });
            setGeneratedContent(prev => ({ ...prev, [title]: result }));
        } catch (error) {
            console.error("Failed to generate blog intro:", error);
            setGeneratedContent(prev => ({ ...prev, [title]: null }));
        } finally {
            setLoadingStates(prev => ({...prev, [title]: false}));
        }
    };

    return (
        <Section id="journey" title="My Journey" subtitle="Thoughts on Tech, Space, and Creativity" className="bg-card/20 backdrop-blur-sm">
            <div className="grid lg:grid-cols-3 gap-8 mb-16">
                {blogPosts.map(post => (
                    <Card3D key={post.title} className="flex flex-col overflow-hidden bg-card/80 border-primary/20 backdrop-blur-sm">
                        <CardHeader className="p-0">
                            <Image src={post.image} alt={post.title} width={600} height={400} className="w-full h-48 object-cover rounded-t-lg" data-ai-hint={post.imageHint} />
                        </CardHeader>
                        <CardContent className="p-6 flex-grow">
                            <CardTitle className="font-headline text-xl mb-2 text-primary">{post.title}</CardTitle>
                            <CardDescription>{post.description}</CardDescription>
                            
                            {generatedContent[post.title] && (
                                <div className="mt-4 p-4 bg-background/50 rounded-lg border border-primary/20">
                                    <h4 className="font-bold text-primary mb-2">Generated Intro</h4>
                                    <p className="text-sm text-foreground/80 mb-4">{generatedContent[post.title]?.introParagraphs}</p>
                                    <h4 className="font-bold text-primary mb-2">Suggested Headlines</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {generatedContent[post.title]?.headlines.split('\n').map((headline, i) => (
                                           headline.trim() && <Badge key={i} variant="secondary">{headline.replace(/-/g, '').trim()}</Badge>
                                        ))}
                                    </div>
                                </div>
                            )}

                        </CardContent>
                        <CardFooter className="p-6 pt-0 flex justify-between items-center">
                            <Link href="#" className="flex items-center text-primary font-semibold group">
                                Read More <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                            <Button 
                                size="sm" 
                                variant="ghost"
                                onClick={() => handleGenerateIntro(post.topic, post.title)}
                                disabled={loadingStates[post.title]}
                                className="text-primary hover:bg-primary/20 hover:text-primary"
                            >
                                {loadingStates[post.title] ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                                Write Intro
                            </Button>
                        </CardFooter>
                    </Card3D>
                ))}
            </div>
        </Section>
    )
}
