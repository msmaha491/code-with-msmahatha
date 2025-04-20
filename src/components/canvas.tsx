'use client';

import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import React, {useState} from 'react';
import {Textarea} from '@/components/ui/textarea';
import {generateWebsite} from '@/ai/flows/generate-website';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {CopyToClipboard} from '@/components/copy-to-clipboard';
import {Loader2} from 'lucide-react';

const Canvas = () => {
  const [prompt, setPrompt] = useState('');
  const [htmlCode, setHtmlCode] = useState('');
  const [cssCode, setCssCode] = useState('');
  const [jsCode, setJsCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateWebsite = async () => {
    setIsLoading(true);
    try {
      const result = await generateWebsite({prompt});
      setHtmlCode(result.htmlCode);
      setCssCode(result.cssCode);
      setJsCode(result.jsCode);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen w-full items-center justify-center">
      <Card className="w-4/5 h-4/5 flex flex-col">
        <CardHeader>
          <CardTitle>Code With Msmahatha</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col">
          <div className="grid grid-cols-2 gap-4 h-full">
            <div className="flex flex-col">
              <Textarea
                placeholder="Describe the website you want to generate..."
                className="w-full h-32 mb-4"
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
              />
              <Button
                onClick={handleGenerateWebsite}
                className="mb-4"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  'Generate Website'
                )}
              </Button>
            </div>

            {htmlCode || cssCode || jsCode ? (
              <div className="w-full">
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
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">
                  Describe your website and click "Generate Website" to see the
                  code.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Canvas;
