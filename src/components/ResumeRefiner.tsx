
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Section } from './Section';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { refineResume, RefineResumeOutput } from '@/ai/flows/refine-resume';
import { Loader2, UploadCloud, Wand2 } from 'lucide-react';

const FormSchema = z.object({
  resume: z.any().refine(files => files?.length === 1, 'Resume is required.'),
  jobRequirements: z.string().min(20, { message: 'Job requirements must be at least 20 characters.' }),
  tone: z.string({ required_error: 'Please select a tone.' }),
  length: z.string({ required_error: 'Please select a length.' }),
});

export function ResumeRefiner() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<RefineResumeOutput | null>(null);
  const [fileName, setFileName] = useState('');

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const fileRef = form.register('resume');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFileName(event.target.files[0].name);
    }
  };

  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const resumeFile = data.resume[0];
      const resumeDataUri = await toBase64(resumeFile);
      
      const response = await refineResume({
        resume: resumeDataUri,
        jobRequirements: data.jobRequirements,
        tone: data.tone,
        length: data.length,
      });
      setResult(response);
    } catch (error) {
      console.error('Error refining resume:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Section id="resume-refiner" title="Resume Refiner" subtitle="AI-Powered Cover Letter Generator" className="bg-card/20 backdrop-blur-sm">
      <div className="grid md:grid-cols-2 gap-12">
        <Card className="bg-card/80 border-primary/20 backdrop-blur-sm p-6 md:p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="resume"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Upload Resume</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type="file"
                          id="resume-upload"
                          accept=".pdf,.doc,.docx"
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          {...fileRef}
                          onChange={handleFileChange}
                        />
                        <div className="flex items-center justify-center w-full h-24 border-2 border-dashed border-border rounded-lg bg-background/50 hover:border-primary transition-colors">
                          <div className="text-center">
                            <UploadCloud className="mx-auto h-8 w-8 text-muted-foreground" />
                            <p className="mt-1 text-sm text-muted-foreground">
                              {fileName ? fileName : 'Click to upload or drag and drop'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="jobRequirements"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Requirements</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Paste the job description or requirements here..." className="min-h-[150px] bg-background" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="tone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tone</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-background">
                            <SelectValue placeholder="Select a tone" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="professional">Professional</SelectItem>
                          <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                          <SelectItem value="formal">Formal</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="length"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Length</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-background">
                            <SelectValue placeholder="Select a length" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="concise">Concise</SelectItem>
                          <SelectItem value="detailed">Detailed</SelectItem>
                          <SelectItem value="standard">Standard</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" disabled={isLoading} className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <><Wand2 className="mr-2 h-4 w-4" /> Refine & Generate</>}
              </Button>
            </form>
          </Form>
        </Card>
        
        <div className="space-y-6">
            <h3 className="text-2xl font-headline font-bold text-primary">Generated Cover Letter</h3>
            <Card className="bg-card/80 border-primary/20 backdrop-blur-sm p-6 min-h-[400px]">
                {isLoading && (
                    <div className="flex items-center justify-center h-full">
                        <Loader2 className="h-8 w-8 text-primary animate-spin" />
                    </div>
                )}
                {result && (
                    <div className="prose prose-invert max-w-none text-foreground/90">
                       <p className="whitespace-pre-wrap font-body">{result.coverLetter}</p>
                    </div>
                )}
                {!isLoading && !result && (
                    <div className="flex items-center justify-center h-full text-center text-muted-foreground">
                       <p>Your generated cover letter will appear here.</p>
                    </div>
                )}
            </Card>
        </div>
      </div>
    </Section>
  );
}
