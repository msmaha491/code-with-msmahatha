'use client';

import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import React, {useState} from 'react';
import {Textarea} from '@/components/ui/textarea';
import {generateWebsite} from '@/ai/flows/generate-website';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {CopyToClipboard} from '@/components/copy-to-clipboard';

const Canvas = () => {
  const [prompt, setPrompt] = useState('');
  const [htmlCode, setHtmlCode] = useState('');
  const [cssCode, setCssCode] = useState('');
  const [jsCode, setJsCode] = useState('');

  const handleGenerateWebsite = async () => {
    const result = await generateWebsite({prompt});
    // Split the code into HTML, CSS, and JavaScript
    const htmlMatch = result.code.match(/<html[\s\S]*<\/html>/i);
    const cssMatch = result.code.match(/<style[\s\S]*<\/style>/i);
    const jsMatch = result.code.match(/<script[\s\S]*<\/script>/i);

    setHtmlCode(htmlMatch ? htmlMatch[0] : '');
    setCssCode(cssMatch ? cssMatch[0] : '');
    setJsCode(jsMatch ? jsMatch[0] : '');
  };

  return (
    <div className="flex flex-col h-screen w-full items-center justify-center">
      <Card className="w-4/5 h-4/5 flex flex-col">
        <CardHeader>
          <CardTitle>Code With Msmahatha</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col">
          <Textarea
            placeholder="Describe the website you want to generate..."
            className="w-full h-32 mb-4"
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
          />
          <Button onClick={handleGenerateWebsite} className="mb-4">
            Generate Website
          </Button>

          {htmlCode || cssCode || jsCode ? (
            <Tabs defaultValue="html" className="w-full flex-1">
              <TabsList>
                <TabsTrigger value="html">HTML</TabsTrigger>
                <TabsTrigger value="css">CSS</TabsTrigger>
                <TabsTrigger value="javascript">JavaScript</TabsTrigger>
              </TabsList>
              <TabsContent value="html" className="outline-none">
                <div className="flex items-center justify-end mb-2">
                  <CopyToClipboard text={htmlCode} />
                </div>
                <Textarea
                  readOnly
                  className="w-full h-96"
                  value={htmlCode}
                />
              </TabsContent>
              <TabsContent value="css" className="outline-none">
                <div className="flex items-center justify-end mb-2">
                  <CopyToClipboard text={cssCode} />
                </div>
                <Textarea
                  readOnly
                  className="w-full h-96"
                  value={cssCode}
                />
              </TabsContent>
              <TabsContent value="javascript" className="outline-none">
                <div className="flex items-center justify-end mb-2">
                  <CopyToClipboard text={jsCode} />
                </div>
                <Textarea
                  readOnly
                  className="w-full h-96"
                  value={jsCode}
                />
              </TabsContent>
            </Tabs>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground">
                Describe your website and click "Generate Website" to see the
                code.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Canvas;
