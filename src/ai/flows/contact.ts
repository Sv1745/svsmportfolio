'use server';

import { z } from 'zod';
import { ai } from '@/ai/genkit';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { ContactFormSchema } from '@/components/Contact';

type ContactFormData = z.infer<typeof ContactFormSchema>;

export async function sendMessage(data: ContactFormData) {
    return sendMessageFlow(data);
}

const sendMessageFlow = ai.defineFlow(
  {
    name: 'sendMessageFlow',
    inputSchema: ContactFormSchema,
    outputSchema: z.string(),
  },
  async (data) => {
    try {
      const docRef = await addDoc(collection(db, 'contacts'), {
        ...data,
        createdAt: Timestamp.now(),
      });
      return `Message sent with ID: ${docRef.id}`;
    } catch (error) {
      console.error("Error adding document: ", error);
      throw new Error("Could not send message.");
    }
  }
);
