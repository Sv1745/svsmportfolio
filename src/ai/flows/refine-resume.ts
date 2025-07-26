
'use server';
/**
 * @fileOverview A flow for refining a resume and generating a cover letter.
 *
 * - refineResume - A function that takes a resume and job requirements to generate a tailored cover letter.
 * - RefineResumeInput - The input type for the refineResume function.
 * - RefineResumeOutput - The return type for the refineResume function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const RefineResumeInputSchema = z.object({
  resume: z.string().describe("A user's resume, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."),
  jobRequirements: z.string().describe('The requirements for the job the user is applying for.'),
  tone: z.string().describe('The desired tone for the cover letter (e.g., professional, enthusiastic, formal).'),
  length: z.string().describe('The desired length for the cover letter (e.g., concise, standard, detailed).'),
});
export type RefineResumeInput = z.infer<typeof RefineResumeInputSchema>;

const RefineResumeOutputSchema = z.object({
  coverLetter: z.string().describe('The generated cover letter, tailored to the resume and job requirements.'),
});
export type RefineResumeOutput = z.infer<typeof RefineResumeOutputSchema>;

export async function refineResume(input: RefineResumeInput): Promise<RefineResumeOutput> {
  return refineResumeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'refineResumePrompt',
  input: { schema: RefineResumeInputSchema },
  output: { schema: RefineResumeOutputSchema },
  prompt: `You are an expert career coach and resume writer. Your task is to craft a compelling cover letter for a job application.

You will be given the applicant's resume, the job requirements, a desired tone, and a desired length.

Use the information from the resume to highlight the most relevant skills and experiences that match the job requirements.

**Resume:**
(Content is provided via media input)
{{media url=resume}}

**Job Requirements:**
{{{jobRequirements}}}

**Tone:** {{{tone}}}
**Length:** {{{length}}}

**Instructions:**
1.  Analyze the resume and the job requirements carefully.
2.  Identify the key qualifications, experiences, and skills from the resume that align with the job description.
3.  Write a cover letter that is tailored to the specified tone and length.
4.  The cover letter should be professional, engaging, and clearly articulate why the candidate is a strong fit for the role.
5.  Do not make up any information. Only use the data provided in the resume.
6.  Address the cover letter to a generic hiring manager if no specific name is provided.
7.  Ensure the final output is only the text of the cover letter.
`,
});


const refineResumeFlow = ai.defineFlow(
  {
    name: 'refineResumeFlow',
    inputSchema: RefineResumeInputSchema,
    outputSchema: RefineResumeOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
