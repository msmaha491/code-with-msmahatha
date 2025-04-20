import {SidebarProvider} from '@/components/ui/sidebar';
import {Toaster} from '@/components/ui/toaster';
import Canvas from '@/components/canvas';

export default function Home() {
  return (
    <SidebarProvider>
      <Canvas />
      <Toaster />
    </SidebarProvider>
  );
}

