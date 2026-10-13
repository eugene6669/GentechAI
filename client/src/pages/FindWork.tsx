import { useState } from 'react';
import {
  BriefcaseIcon,
  MagnifyingGlassIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
  MapPinIcon,
  ClipboardDocumentListIcon
} from '@heroicons/react/24/outline';

/**
 * FindWork — Job search and application tracking hub
 * 
 * Tabs:
 * - OnlineJobs.ph
 * - LinkedIn Jobs
 * - Jobstreet PH
 * - VA Agencies
 * - Google Maps Lead Finder
 * - Job Application Tracker
 */

type FindWorkTab = 
  | 'onlinejobs'
  | 'linkedin'
  | 'jobstreet'
  | 'va-agencies'
  | 'maps-leads'
  | 'application-tracker';

const tabs = [
  { id: 'onlinejobs', label: 'OnlineJobs.ph', icon: BriefcaseIcon },
  { id: 'linkedin', label: 'LinkedIn Jobs', icon: BriefcaseIcon },
  { id: 'jobstreet', label: 'Jobstreet PH', icon: MagnifyingGlassIcon },
  { id: 'va-agencies', label: 'VA Agencies', icon: UserGroupIcon },
  { id: 'maps-leads', label: 'Google Maps Lead Finder', icon: MapPinIcon },
  { id: 'application-tracker', label: 'Job Application Tracker', icon: ClipboardDocumentListIcon },
] as const;

export default function FindWork() {
  const [activeTab, setActiveTab] = useState<FindWorkTab>('onlinejobs');

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
                onClick={() => setActiveTab(tab.id as FindWorkTab)}
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
          {activeTab === 'onlinejobs' && <OnlineJobsPH />}
          {activeTab === 'linkedin' && <LinkedInJobs />}
          {activeTab === 'jobstreet' && <JobstreetPH />}
          {activeTab === 'va-agencies' && <VAAgencies />}
          {activeTab === 'maps-leads' && <MapsLeadFinder />}
          {activeTab === 'application-tracker' && <ApplicationTracker />}
        </div>
      </div>
    </div>
  );
}

function OnlineJobsPH() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-heading font-bold text-charcoal">OnlineJobs.ph</h2>
          <p className="text-sm text-muted mt-1">Browse and apply for jobs on OnlineJobs.ph</p>
        </div>
        <a 
          href="https://www.onlinejobs.ph/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="px-4 py-2 bg-orange text-white rounded-button hover:bg-[#E64800] transition-colors duration-[var(--duration-fast)]"
        >
          Visit OnlineJobs.ph
        </a>
      </div>
      
      <div className="grid gap-4">
        <JobSearchCard
          title="Job Search Tips"
          description="Create a compelling profile with detailed work history and skills"
          items={[
            'Complete your profile 100%',
            'Add portfolio samples',
            'Get client testimonials',
            'Set competitive hourly rate'
          ]}
        />
      </div>
    </div>
  );
}

function LinkedInJobs() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-heading font-bold text-charcoal">LinkedIn Jobs</h2>
          <p className="text-sm text-muted mt-1">Professional networking and job opportunities</p>
        </div>
        <a 
          href="https://www.linkedin.com/jobs/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="px-4 py-2 bg-orange text-white rounded-button hover:bg-[#E64800] transition-colors duration-[var(--duration-fast)]"
        >
          Visit LinkedIn Jobs
        </a>
      </div>
      
      <div className="grid gap-4">
        <JobSearchCard
          title="LinkedIn Profile Tips"
          description="Optimize your LinkedIn presence for remote opportunities"
          items={[
            'Professional headshot photo',
            'Keyword-rich headline',
            'Detailed experience section',
            'Request recommendations'
          ]}
        />
      </div>
    </div>
  );
}

function JobstreetPH() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-heading font-bold text-charcoal">Jobstreet Philippines</h2>
          <p className="text-sm text-muted mt-1">Find local and remote jobs in the Philippines</p>
        </div>
        <a 
          href="https://www.jobstreet.com.ph/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="px-4 py-2 bg-orange text-white rounded-button hover:bg-[#E64800] transition-colors duration-[var(--duration-fast)]"
        >
          Visit Jobstreet PH
        </a>
      </div>
      
      <div className="grid gap-4">
        <JobSearchCard
          title="Jobstreet Success Tips"
          description="Stand out in the Philippine job market"
          items={[
            'Upload updated resume',
            'Set job alerts for your field',
            'Apply within 24 hours of posting',
            'Follow up on applications'
          ]}
        />
      </div>
    </div>
  );
}

function VAAgencies() {
  const agencies = [
    { name: 'Time Etc', url: 'https://web.timeetc.com/' },
    { name: 'Belay', url: 'https://www.belaysolutions.com/' },
    { name: 'Fancy Hands', url: 'https://www.fancyhands.com/' },
    { name: 'MyOutDesk', url: 'https://www.myoutdesk.com/' },
    { name: 'Worldwide101', url: 'https://www.worldwide101.com/' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-heading font-bold text-charcoal">Virtual Assistant Agencies</h2>
        <p className="text-sm text-muted mt-1">Top VA agencies hiring remote workers</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        {agencies.map((agency) => (
          <a
            key={agency.name}
            href={agency.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-surface border border-border rounded-card p-6 hover:border-orange transition-colors duration-[var(--duration-fast)] group"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-heading font-semibold text-charcoal group-hover:text-orange transition-colors">
                  {agency.name}
                </h3>
                <p className="text-sm text-muted mt-1">Click to visit careers page</p>
              </div>
              <BuildingOfficeIcon className="w-6 h-6 text-muted group-hover:text-orange transition-colors" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

function MapsLeadFinder() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-heading font-bold text-charcoal">Google Maps Lead Finder</h2>
          <p className="text-sm text-muted mt-1">Find potential clients and businesses to reach out to</p>
        </div>
        <a 
          href="https://www.google.com/maps" 
          target="_blank" 
          rel="noopener noreferrer"
          className="px-4 py-2 bg-orange text-white rounded-button hover:bg-[#E64800] transition-colors duration-[var(--duration-fast)]"
        >
          Open Google Maps
        </a>
      </div>
      
      <div className="grid gap-4">
        <JobSearchCard
          title="Lead Generation Strategy"
          description="Use Google Maps to find businesses that need your services"
          items={[
            'Search for target businesses in your niche',
            'Extract contact information (email, phone)',
            'Research company website and social media',
            'Prepare personalized outreach message',
            'Track leads in Application Tracker'
          ]}
        />
        
        <div className="bg-surface border border-border rounded-card p-6">
          <h3 className="font-heading font-semibold text-charcoal mb-4">Search Examples</h3>
          <div className="space-y-2">
            <div className="px-3 py-2 bg-canvas rounded text-sm text-charcoal">
              "real estate agents near [city]"
            </div>
            <div className="px-3 py-2 bg-canvas rounded text-sm text-charcoal">
              "dental clinics in [city]"
            </div>
            <div className="px-3 py-2 bg-canvas rounded text-sm text-charcoal">
              "law firms in [city]"
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ApplicationTracker() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-heading font-bold text-charcoal">Job Application Tracker</h2>
          <p className="text-sm text-muted mt-1">Track all your job applications in one place</p>
        </div>
        <button className="px-4 py-2 bg-orange text-white rounded-button hover:bg-[#E64800] transition-colors duration-[var(--duration-fast)]">
          Add Application
        </button>
      </div>
      
      <div className="bg-surface border border-border rounded-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-sand">
              <th className="px-4 py-3 text-left text-sm font-semibold text-charcoal">Company</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-charcoal">Position</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-charcoal">Date Applied</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-charcoal">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={4} className="px-4 py-12 text-center text-muted">
                No applications tracked yet. Click "Add Application" to start.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function JobSearchCard({ title, description, items }: { title: string; description: string; items: string[] }) {
  return (
    <div className="bg-surface border border-border rounded-card p-6">
      <h3 className="font-heading font-semibold text-charcoal mb-2">{title}</h3>
      <p className="text-sm text-muted mb-4">{description}</p>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-2 text-sm text-charcoal">
            <span className="text-orange mt-1">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
