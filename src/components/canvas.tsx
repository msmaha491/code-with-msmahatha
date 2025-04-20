'use client';

import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import React, {useState, useEffect} from 'react';
import {Textarea} from '@/components/ui/textarea';
import {generateWebsite} from '@/ai/flows/generate-website';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {CopyToClipboard} from '@/components/copy-to-clipboard';
import {Loader2} from 'lucide-react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {dracula} from 'react-syntax-highlighter/dist/esm/styles/hljs';

const Canvas = () => {
  const [prompt, setPrompt] = useState('');
  const [htmlCode, setHtmlCode] = useState('');
  const [cssCode, setCssCode] = useState('');
  const [jsCode, setJsCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [websiteContent, setWebsiteContent] = useState<string | null>(null);

  const handleGenerateWebsite = async () => {
    setIsLoading(true);
    try {
      const result = await generateWebsite({prompt});
      setHtmlCode(result.htmlCode);
      setCssCode(result.cssCode);
      setJsCode(result.jsCode);
      setWebsiteContent(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Generated Website</title>
          <style>${result.cssCode}</style>
        </head>
        <body>
          ${result.htmlCode}
          <script>${result.jsCode}</script>
        </body>
        </html>
      `);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // No need to create an iframe or inject the HTML directly.
    // The iframe method has security concerns.
  }, [websiteContent]);

  return (
    <div className="flex flex-col md:flex-row h-screen w-full items-center justify-center p-4">
      <Card className="w-full md:w-2/5 h-auto md:h-3/4 flex flex-col">
        <CardHeader>
          <CardTitle>Code With Msmahatha</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col">
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
        </CardContent>
      </Card>

      {websiteContent ? (
        <div className="w-full md:w-3/5 h-full flex flex-col">
          <Tabs defaultValue="website" className="w-full flex-1">
            <TabsList>
              <TabsTrigger value="html">HTML</TabsTrigger>
              <TabsTrigger value="css">CSS</TabsTrigger>
              <TabsTrigger value="javascript">JavaScript</TabsTrigger>
              <TabsTrigger value="website">Website</TabsTrigger>
            </TabsList>
            <TabsContent value="html" className="outline-none">
              <div className="flex items-center justify-end mb-2">
                <CopyToClipboard text={htmlCode} />
              </div>
              <SyntaxHighlighter language="html" style={dracula} className="w-full h-64 rounded-md text-sm">
                {htmlCode}
              </SyntaxHighlighter>
            </TabsContent>
            <TabsContent value="css" className="outline-none">
              <div className="flex items-center justify-end mb-2">
                <CopyToClipboard text={cssCode} />
              </div>
              <SyntaxHighlighter language="css" style={dracula} className="w-full h-64 rounded-md text-sm">
                {cssCode}
              </SyntaxHighlighter>
            </TabsContent>
            <TabsContent value="javascript" className="outline-none">
              <div className="flex items-center justify-end mb-2">
                <CopyToClipboard text={jsCode} />
              </div>
              <SyntaxHighlighter language="javascript" style={dracula} className="w-full h-64 rounded-md text-sm">
                {jsCode}
              </SyntaxHighlighter>
            </TabsContent>
            <TabsContent value="website" className="outline-none h-full">
              <div className="w-full h-full overflow-hidden">
                <iframe
                  srcDoc={websiteContent}
                  title="Generated Website"
                  className="w-full h-full"
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      ) : (
        <div className="w-full md:w-3/5 h-full flex items-center justify-center">
          <p className="text-muted-foreground">
            Describe your website and click "Generate Website" to see the
            code.
          </p>
        </div>
      )}
    </div>
  );
};

export default Canvas;
