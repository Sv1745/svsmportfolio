'use server';

/**
 * @fileOverview Blog intro generation flow.
 *
 * - generateBlogIntro - A function that generates introductory paragraphs and headlines for a given blog topic.
 * - GenerateBlogIntroInput - The input type for the generateBlogIntro function.
 * - GenerateBlogIntroOutput - The return type for the generateBlogIntro function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateBlogIntroInputSchema = z.object({
  topic: z.string().describe('The topic of the blog post.'),
});
export type GenerateBlogIntroInput = z.infer<typeof GenerateBlogIntroInputSchema>;

const GenerateBlogIntroOutputSchema = z.object({
  introParagraphs: z.string().describe('Generated introductory paragraphs for the blog post.'),
  headlines: z.string().describe('Generated catchy headlines for the blog post.'),
});
export type GenerateBlogIntroOutput = z.infer<typeof GenerateBlogIntroOutputSchema>;

export async function generateBlogIntro(input: GenerateBlogIntroInput): Promise<GenerateBlogIntroOutput> {
  return generateBlogIntroFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateBlogIntroPrompt',
  input: {schema: GenerateBlogIntroInputSchema},
  output: {schema: GenerateBlogIntroOutputSchema},
  prompt: `You are a creative content writer specializing in generating engaging blog content. Given a topic, your task is to produce compelling introductory paragraphs and catchy headlines.

  Topic: {{{topic}}}

  Introductory Paragraphs:
  - Aim for 2-3 paragraphs that capture the reader's attention and clearly introduce the blog topic.

  Catchy Headlines:
  - Create 3-5 headlines that are attention-grabbing and relevant to the topic.
  - These headlines should be concise and encourage readers to click and read the full blog post.

  Output should be structured as:
  {
    "introParagraphs": "[Generated introductory paragraphs]",
    "headlines": "[Generated catchy headlines]"
  }
  `,
});

const generateBlogIntroFlow = ai.defineFlow(
  {
    name: 'generateBlogIntroFlow',
    inputSchema: GenerateBlogIntroInputSchema,
    outputSchema: GenerateBlogIntroOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
