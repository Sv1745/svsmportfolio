'use server';

import { z } from 'zod';
import { ai } from '@/ai/genkit';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
// import { ContactFormSchema, ContactFormData } from '@/lib/schemas/contact';
import { ContactFormSchema, ContactFormData } from '@/lib/schemas/contact';

const sendMessageFlow = ai.defineFlow(
  {
    name: 'sendMessageFlow',
    inputSchema: ContactFormSchema,
    outputSchema: z.string(),
  },
  async (data: ContactFormData) => {
    try {
      // Validate data before processing
      const validatedData = ContactFormSchema.parse(data);
      
      // Add document to Firestore
      const docRef = await addDoc(collection(db, 'contacts'), {
        ...validatedData,
        createdAt: Timestamp.now(),
        status: 'new',
      });
      
      console.log('Message saved successfully with ID:', docRef.id);
      return `Message sent successfully with ID: ${docRef.id}`;
    } catch (error) {
      console.error('Error in sendMessageFlow:', error);
      
      if (error instanceof z.ZodError) {
        // Handle validation errors
        const errorMessages = error.errors.map(err => `${err.path.join('.')}: ${err.message}`).join(', ');
        throw new Error(`Validation failed: ${errorMessages}`);
      }
      
      if (error instanceof Error) {
        console.error("Error adding document:", error.message, error.stack);
        throw new Error(`Could not send message: ${error.message}`);
      } else {
        console.error("Unknown error adding document:", error);
        throw new Error("Could not send message. Unknown error occurred.");
      }
    }
  }
);

export async function sendMessage(data: ContactFormData) {
  try {
    console.log('Received contact form data:', data);
    return await sendMessageFlow(data);
  } catch (error) {
    console.error('Error in sendMessage action:', error);
    
    if (error instanceof Error) {
      throw error; // Re-throw the error to maintain the error message
    }
    
    throw new Error('Failed to send message. Please try again later.');
  }
}