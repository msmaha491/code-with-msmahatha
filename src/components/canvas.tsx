'use client';

import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import React from 'react';
import {suggestDesignImprovements} from '@/ai/flows/suggest-design-improvements';

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
  return (
    <div className="flex flex-col h-screen w-full items-center justify-center">
      <Card className="w-4/5 h-4/5 flex flex-col">
        <CardHeader>
          <CardTitle>Visual Editor</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow flex items-center justify-center">
          <div className="border-2 border-dashed border-muted-foreground w-full h-full flex items-center justify-center">
            Canvas Area
          </div>
        </CardContent>
      </Card>
      <DesignSuggestionButton />
    </div>
  );
};

export default Canvas;
