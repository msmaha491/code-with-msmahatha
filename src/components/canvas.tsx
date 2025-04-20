'use client';

import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import React, {useState} from 'react';
import {suggestDesignImprovements} from '@/ai/flows/suggest-design-improvements';
import {Textarea} from '@/components/ui/textarea';
import {generateWebsite} from '@/ai/flows/generate-website';

const DesignSuggestionButton = () => {
  const handleDesignSuggestion = async () => {
    const suggestions = await suggestDesignImprovements({
      layout: 'Current website layout',
      style: 'Current website style',
    });
    console.log(suggestions);
  };

  return (
    <Button onClick={handleDesignSuggestion} className="mt-4">
      Get AI Design Suggestions
    </Button>
  );
};

const Canvas = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');

  const handleGenerateWebsite = async () => {
    const result = await generateWebsite({prompt});
    setGeneratedCode(result.code);
  };

  return (
    <div className="flex flex-col h-screen w-full items-center justify-center">
      <Card className="w-4/5 h-4/5 flex flex-col">
        <CardHeader>
          <CardTitle>Visual Editor</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col items-center justify-center">
          <Textarea
            placeholder="Describe the website you want to generate..."
            className="w-full h-48 mb-4"
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
          />
          <Button onClick={handleGenerateWebsite} className="mb-4">
            Generate Website
          </Button>
          {generatedCode && (
            <Textarea
              readOnly
              className="w-full h-48"
              value={generatedCode}
            />
          )}
        </CardContent>
      </Card>
      <DesignSuggestionButton />
    </div>
  );
};

export default Canvas;
