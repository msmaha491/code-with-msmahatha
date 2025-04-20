'use server';

/**
 * @fileOverview An AI agent for generating website code based on user input.
 *
 * - generateWebsite - A function that generates website code from a prompt.
 * - GenerateWebsiteInput - The input type for the generateWebsite function.
 * - GenerateWebsiteOutput - The return type for the GenerateWebsite function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const GenerateWebsiteInputSchema = z.object({
  prompt: z.string().describe('A detailed description of the website to generate.'),
});
export type GenerateWebsiteInput = z.infer<typeof GenerateWebsiteInputSchema>;

const GenerateWebsiteOutputSchema = z.object({
  htmlCode: z.string().describe('The generated HTML code for the website.'),
  cssCode: z.string().describe('The generated CSS code for the website.'),
  jsCode: z.string().describe('The generated JavaScript code for the website.'),
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
      htmlCode: z.string().describe('The generated HTML code for the website, including the basic structure and content.'),
      cssCode: z.string().describe('The generated CSS code for the website, including styles and layout.'),
      jsCode: z.string().describe('The generated JavaScript code for the website, including any interactive functionality.'),
    }),
  },
  prompt: `You are an expert web developer who specializes in generating clean, functional, and well-documented website code based on user descriptions.

  Based on the following description, generate the complete HTML, CSS, and JavaScript code for the website.
  Separate the code into three distinct sections: HTML, CSS, and JavaScript.
  Ensure each section is clearly marked and well-formatted. Include necessary comments to explain different sections of the code. Ensure the code is responsive and follows modern web development best practices.

  Description: {{{prompt}}}

  **Output Format:**

  \`\`\`html
  <!-- HTML Code -->
  ...
  \`\`\`

  \`\`\`css
  /* CSS Code */
  ...
  \`\`\`

  \`\`\`javascript
  // JavaScript Code
  ...
  \`\`\`
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
