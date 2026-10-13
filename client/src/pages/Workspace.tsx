import { useState } from 'react';
import {
  ClockIcon,
  TableCellsIcon,
  CalendarIcon,
  FolderIcon,
  LinkIcon,
  CodeBracketIcon,
  UserGroupIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';
import { TaskBoard } from '@/components/workspace/TaskBoard';

/**
 * Workspace — Main productivity hub with tabs for different tools
 * 
 * Tabs:
 * - Task Time Tracker
 * - Sheet
 * - Calendar
 * - My Files
 * - Links
 * - Snippets
 * - Clients
 * - Invoices
 */

type WorkspaceTab = 
  | 'task-board'
  | 'task-tracker'
  | 'sheet'
  | 'calendar'
  | 'files'
  | 'links'
  | 'snippets'
  | 'clients'
  | 'invoices';

const tabs = [
  { id: 'task-board', label: 'Task Board', icon: TableCellsIcon },
  { id: 'task-tracker', label: 'Task Time Tracker', icon: ClockIcon },
  { id: 'sheet', label: 'Sheet', icon: TableCellsIcon },
  { id: 'calendar', label: 'Calendar', icon: CalendarIcon },
  { id: 'files', label: 'My Files', icon: FolderIcon },
  { id: 'links', label: 'Links', icon: LinkIcon },
  { id: 'snippets', label: 'Snippets', icon: CodeBracketIcon },
  { id: 'clients', label: 'Clients', icon: UserGroupIcon },
  { id: 'invoices', label: 'Invoices', icon: DocumentTextIcon },
] as const;

export default function Workspace() {
  const [activeTab, setActiveTab] = useState<WorkspaceTab>('task-board');

  return (
    <div className="h-full flex flex-col">
      {/* Tab navigation */}
      <div className="border-b border-border bg-surface">
        <div className="flex items-center gap-1 px-6 overflow-x-auto scrollbar-thin">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as WorkspaceTab)}
                className={`
                  flex items-center gap-2 px-4 py-3 border-b-2 transition-colors duration-[var(--duration-fast)] whitespace-nowrap
                  ${isActive 
                    ? 'border-orange text-orange font-medium' 
                    : 'border-transparent text-muted hover:text-charcoal hover:bg-sand/50'
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-6 py-6">
          {activeTab === 'task-board' && <TaskBoard />}
          {activeTab === 'task-tracker' && <TaskTimeTracker />}
          {activeTab === 'sheet' && <Sheet />}
          {activeTab === 'calendar' && <Calendar />}
          {activeTab === 'files' && <MyFiles />}
          {activeTab === 'links' && <Links />}
          {activeTab === 'snippets' && <Snippets />}
          {activeTab === 'clients' && <Clients />}
          {activeTab === 'invoices' && <Invoices />}
        </div>
      </div>
    </div>
  );
}

function TaskTimeTracker() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-heading font-bold text-charcoal">Task Time Tracker</h2>
          <p className="text-sm text-muted mt-1">Track time spent on tasks and projects</p>
        </div>
        <button className="px-4 py-2 bg-orange text-white rounded-button hover:bg-[#E64800] transition-colors duration-[var(--duration-fast)]">
          Start Timer
        </button>
      </div>
      
      <div className="bg-surface rounded-card border border-border p-6">
        <p className="text-muted text-center py-12">No active timers. Click "Start Timer" to begin tracking.</p>
      </div>
    </div>
  );
}

function Sheet() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-heading font-bold text-charcoal">Sheet</h2>
          <p className="text-sm text-muted mt-1">Spreadsheet for data organization</p>
        </div>
        <button className="px-4 py-2 bg-orange text-white rounded-button hover:bg-[#E64800] transition-colors duration-[var(--duration-fast)]">
          New Sheet
        </button>
      </div>
      
      <div className="bg-surface rounded-card border border-border overflow-hidden">
        <div className="grid grid-cols-6 border-b border-border">
          {['A', 'B', 'C', 'D', 'E', 'F'].map((col) => (
            <div key={col} className="px-4 py-2 bg-sand text-center text-sm font-medium text-charcoal border-r border-border last:border-r-0">
              {col}
            </div>
          ))}
        </div>
        <div className="p-6">
          <p className="text-muted text-center py-12">Sheet functionality coming soon</p>
        </div>
      </div>
    </div>
  );
}

function Calendar() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-heading font-bold text-charcoal">Calendar</h2>
          <p className="text-sm text-muted mt-1">Manage your schedule and events</p>
        </div>
        <button className="px-4 py-2 bg-orange text-white rounded-button hover:bg-[#E64800] transition-colors duration-[var(--duration-fast)]">
          Add Event
        </button>
      </div>
      
      <div className="bg-surface rounded-card border border-border p-6">
        <p className="text-muted text-center py-12">Calendar view coming soon</p>
      </div>
    </div>
  );
}

function MyFiles() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-heading font-bold text-charcoal">My Files</h2>
          <p className="text-sm text-muted mt-1">Organize and manage your files</p>
        </div>
        <button className="px-4 py-2 bg-orange text-white rounded-button hover:bg-[#E64800] transition-colors duration-[var(--duration-fast)]">
          Upload File
        </button>
      </div>
      
      <div className="bg-surface rounded-card border border-border p-6">
        <p className="text-muted text-center py-12">No files uploaded yet</p>
      </div>
    </div>
  );
}

function Links() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-heading font-bold text-charcoal">Links</h2>
          <p className="text-sm text-muted mt-1">Save and organize important links</p>
        </div>
        <button className="px-4 py-2 bg-orange text-white rounded-button hover:bg-[#E64800] transition-colors duration-[var(--duration-fast)]">
          Add Link
        </button>
      </div>
      
      <div className="bg-surface rounded-card border border-border p-6">
        <p className="text-muted text-center py-12">No links saved yet</p>
      </div>
    </div>
  );
}

function Snippets() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-heading font-bold text-charcoal">Snippets</h2>
          <p className="text-sm text-muted mt-1">Store reusable code and text snippets</p>
        </div>
        <button className="px-4 py-2 bg-orange text-white rounded-button hover:bg-[#E64800] transition-colors duration-[var(--duration-fast)]">
          New Snippet
        </button>
      </div>
      
      <div className="bg-surface rounded-card border border-border p-6">
        <p className="text-muted text-center py-12">No snippets created yet</p>
      </div>
    </div>
  );
}

function Clients() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-heading font-bold text-charcoal">Clients</h2>
          <p className="text-sm text-muted mt-1">Manage your client relationships</p>
        </div>
        <button className="px-4 py-2 bg-orange text-white rounded-button hover:bg-[#E64800] transition-colors duration-[var(--duration-fast)]">
          Add Client
        </button>
      </div>
      
      <div className="bg-surface rounded-card border border-border p-6">
        <p className="text-muted text-center py-12">No clients added yet</p>
      </div>
    </div>
  );
}

function Invoices() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-heading font-bold text-charcoal">Invoices</h2>
          <p className="text-sm text-muted mt-1">Create and manage invoices</p>
        </div>
        <button className="px-4 py-2 bg-orange text-white rounded-button hover:bg-[#E64800] transition-colors duration-[var(--duration-fast)]">
          Create Invoice
        </button>
      </div>
      
      <div className="bg-surface rounded-card border border-border p-6">
        <p className="text-muted text-center py-12">No invoices created yet</p>
      </div>
    </div>
  );
}
