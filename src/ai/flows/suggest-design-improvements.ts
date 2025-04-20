'use server';
/**
 * @fileOverview An AI agent for suggesting design improvements to a website.
 *
 * - suggestDesignImprovements - A function that suggests design improvements.
 * - SuggestDesignImprovementsInput - The input type for the suggestDesignImprovements function.
 * - SuggestDesignImprovementsOutput - The return type for the suggestDesignImprovements function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';
import {getDesignSuggestions, DesignSuggestion} from '@/services/design-suggestions';

const SuggestDesignImprovementsInputSchema = z.object({
  layout: z.string().describe('The current website layout.'),
  style: z.string().describe('The current website style.'),
});
export type SuggestDesignImprovementsInput = z.infer<typeof SuggestDesignImprovementsInputSchema>;

const SuggestDesignImprovementsOutputSchema = z.object({
  suggestions: z.array(
    z.object({
      description: z.string().describe('A description of the design suggestion.'),
      suggestedChanges: z.array(
        z.string().describe('Suggested changes to implement the design suggestion.')
      ),
    })
  ).describe('An array of design suggestions.'),
});
export type SuggestDesignImprovementsOutput = z.infer<typeof SuggestDesignImprovementsOutputSchema>;

export async function suggestDesignImprovements(
  input: SuggestDesignImprovementsInput
): Promise<SuggestDesignImprovementsOutput> {
  return suggestDesignImprovementsFlow(input);
}

const suggestDesignImprovementsFlow = ai.defineFlow<
  typeof SuggestDesignImprovementsInputSchema,
  typeof SuggestDesignImprovementsOutputSchema
>(
  {
    name: 'suggestDesignImprovementsFlow',
    inputSchema: SuggestDesignImprovementsInputSchema,
    outputSchema: SuggestDesignImprovementsOutputSchema,
  },
  async input => {
    const suggestions: DesignSuggestion[] = await getDesignSuggestions(input.layout, input.style);
    return {suggestions};
  }
);
