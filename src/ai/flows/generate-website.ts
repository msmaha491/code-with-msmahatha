'use server';

/**
 * @fileOverview An AI agent for generating website code based on user input.
 *
 * - generateWebsite - A function that generates website code from a prompt.
 * - GenerateWebsiteInput - The input type for the generateWebsite function.
 * - GenerateWebsiteOutput - The return type for the generateWebsite function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const GenerateWebsiteInputSchema = z.object({
  prompt: z.string().describe('A detailed description of the website to generate.'),
});
export type GenerateWebsiteInput = z.infer<typeof GenerateWebsiteInputSchema>;

const GenerateWebsiteOutputSchema = z.object({
  code: z.string().describe('The generated HTML, CSS, and JavaScript code for the website.'),
});
export type GenerateWebsiteOutput = z.infer<typeof GenerateWebsiteOutputSchema>;

export async function generateWebsite(input: GenerateWebsiteInput): Promise<GenerateWebsiteOutput> {
  return generateWebsiteFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateWebsitePrompt',
  input: {
    schema: z.object({
      prompt: z.string().describe('A detailed description of the website to generate, including layout, style, and functionality.'),
    }),
  },
  output: {
    schema: z.object({
      code: z.string().describe('The generated HTML, CSS, and JavaScript code for the website. Ensure the code is well-formatted and includes necessary comments.'),
    }),
  },
  prompt: `You are an expert web developer who specializes in generating clean, functional, and well-documented website code based on user descriptions.

  Based on the following description, generate the complete HTML, CSS, and JavaScript code for the website. Include necessary comments to explain different sections of the code. Ensure the code is responsive and follows modern web development best practices.
  Description: {{{prompt}}}
  `,
});

const generateWebsiteFlow = ai.defineFlow<
  typeof GenerateWebsiteInputSchema,
  typeof GenerateWebsiteOutputSchema
>(
  {
    name: 'generateWebsiteFlow',
    inputSchema: GenerateWebsiteInputSchema,
    outputSchema: GenerateWebsiteOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
