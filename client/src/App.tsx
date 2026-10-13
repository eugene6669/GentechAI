import { Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppShell } from '@/components/layout/AppShell';
import { CommandPalette } from '@/components/layout/CommandPalette';
import Home from '@/pages/Home';
import ToolsGrid from '@/pages/ToolsGrid';
import Workspace from '@/pages/Workspace';
import FindWork from '@/pages/FindWork';
import Clients from '@/pages/Clients';
import Growth from '@/pages/Growth';
import AI from '@/pages/AI';
import GHLTools from '@/pages/GHLTools';
import Extensions from '@/pages/Extensions';
import Guides from '@/pages/Guides';
import Courses from '@/pages/Courses';
import Learn from '@/pages/Learn';
import Login from '@/pages/Login';
import SignUp from '@/pages/SignUp';
import { toolRegistry } from '@/tools/registry';

/**
 * App — root component with routing and global keyboard shortcuts.
 *
 * ROUTING:
 *   The app has 6 main nav items (Home, Workspace, Clients, Growth, Tools, AI)
 *   plus dynamic routes for each tool. All tool components are lazy-loaded
 *   via the registry so the initial bundle stays small.
 *
 * COMMAND PALETTE:
 *   Ctrl/Cmd+K opens the command palette from anywhere in the app.
 *   Esc closes it.
 */

function App() {
  const [paletteOpen, setPaletteOpen] = useState(false);

  // Global keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K → open command palette
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setPaletteOpen(true);
      }
      // Esc → close command palette
      if (e.key === 'Escape') {
        setPaletteOpen(false);
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Auth routes - no AppShell */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        
        {/* Main app routes - with AppShell */}
        <Route path="*" element={
          <AppShell>
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                {/* Main pages */}
                <Route path="/" element={<Home />} />
                <Route path="/workspace" element={<Workspace />} />
                <Route path="/find-work" element={<FindWork />} />
                <Route path="/clients" element={<Clients />} />
                <Route path="/growth" element={<Growth />} />
                <Route path="/tools" element={<ToolsGrid />} />
                <Route path="/ai" element={<AI />} />
                
                {/* New sections */}
                <Route path="/ghl-tools" element={<GHLTools />} />
                <Route path="/extensions" element={<Extensions />} />
                <Route path="/guides" element={<Guides />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/learn" element={<Learn />} />

                {/* Dynamic tool routes */}
                {toolRegistry.map((tool) => (
                  <Route
                    key={tool.id}
                    path={tool.route}
                    element={<tool.component />}
                  />
                ))}

                {/* 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </AppShell>
        } />
      </Routes>

      {/* Command palette */}
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </BrowserRouter>
  );
}

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-muted">Loading...</div>
    </div>
  );
}

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <h1 className="text-4xl font-heading font-bold text-charcoal mb-2">404</h1>
      <p className="text-muted mb-6">Page not found</p>
      <a
        href="/"
        className="px-4 py-2 bg-orange text-white rounded-button font-medium hover:bg-[#E64800]"
      >
        Go home
      </a>
    </div>
  );
}

export default App;
