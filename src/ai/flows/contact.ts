'use server';

import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { ContactFormSchema, ContactFormData } from '@/lib/schemas/contact';

export async function sendMessage(data: ContactFormData) {
  try {
    console.log('=== CONTACT FORM DEBUG START ===');
    console.log('Received data:', JSON.stringify(data, null, 2));
    console.log('Environment variables check:', {
      NODE_ENV: process.env.NODE_ENV,
      VERCEL: process.env.VERCEL,
      hasFirebaseProjectId: !!process.env.FIREBASE_PROJECT_ID,
      hasFirebaseApiKey: !!process.env.FIREBASE_API_KEY,
      hasFirebaseAuthDomain: !!process.env.FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.FIREBASE_PROJECT_ID, // Log actual value for debugging
    });

    // Validate the form data
    console.log('Validating form data...');
    const validatedData = ContactFormSchema.parse(data);
    console.log('Validation successful:', JSON.stringify(validatedData, null, 2));

    // Test Firebase connection
    console.log('Testing Firebase connection...');
    
    // Create the document data
    const documentData = {
      name: validatedData.name,
      email: validatedData.email,
      subject: validatedData.subject || '',
      message: validatedData.message,
      phone: validatedData.phone || '',
      company: validatedData.company || '',
      createdAt: Timestamp.now(),
      status: 'new',
      source: 'website',
      environment: process.env.NODE_ENV || 'unknown',
      timestamp: new Date().toISOString(),
    };

    console.log('Document data to save:', JSON.stringify(documentData, null, 2));

    // Attempt to save to Firestore
    console.log('Saving to Firestore collection: contacts');
    const docRef = await addDoc(collection(db, 'contacts'), documentData);
    
    console.log('✅ Document saved successfully with ID:', docRef.id);
    console.log('=== CONTACT FORM DEBUG END ===');
    
    return {
      success: true,
      message: `Message sent successfully! ID: ${docRef.id}`,
      id: docRef.id
    };

  } catch (error: any) {
    console.error('=== CONTACT FORM ERROR START ===');
    console.error('Error type:', error?.constructor?.name);
    console.error('Error message:', error?.message);
    console.error('Error code:', error?.code);
    console.error('Full error:', error);
    
    if (error?.stack) {
      console.error('Error stack:', error.stack);
    }
    
    // Log additional Firebase-specific error details
    if (error?.code) {
      console.error('Firebase error code:', error.code);
      console.error('Firebase error details:', {
        code: error.code,
        message: error.message,
        customData: error.customData,
      });
    }
    
    console.error('=== CONTACT FORM ERROR END ===');

    // Return more specific error messages
    if (error?.name === 'ZodError') {
      const errorMessages = error.errors.map((err: any) => `${err.path.join('.')}: ${err.message}`).join(', ');
      throw new Error(`Validation failed: ${errorMessages}`);
    }

    if (error?.code) {
      switch (error.code) {
        case 'permission-denied':
          throw new Error('Database permission denied. Please check Firestore rules.');
        case 'unavailable':
          throw new Error('Database service temporarily unavailable. Please try again.');
        case 'unauthenticated':
          throw new Error('Authentication failed. Please check Firebase configuration.');
        case 'failed-precondition':
          throw new Error('Database configuration error. Please contact support.');
        case 'not-found':
          throw new Error('Database collection not found. Please check Firebase setup.');
        default:
          throw new Error(`Database error (${error.code}): ${error.message}`);
      }
    }

    // Generic error handling
    if (error instanceof Error) {
      throw new Error(`Failed to send message: ${error.message}`);
    }

    throw new Error('An unexpected error occurred. Please try again later.');
  }
}