import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { updateProfile } from '@/lib/api';
import { Button } from '@/components/ui';
import { LogOut, Crown, User as UserIcon, Tag, Globe, FileText } from 'lucide-react';

/**
 * Profile — shows user info, role tags, plan badge, and sign out.
 *
 * The user can edit their role tags, bio, and timezone.
 * Plan management is a placeholder (Phase 14 will add payments).
 */

const ROLE_OPTIONS = ['Freelancer', 'Virtual Assistant', 'Student', 'Developer', 'Designer', 'Writer'];
const TIMEZONE_OPTIONS = [
  'Asia/Manila',
  'Asia/Singapore',
  'Asia/Tokyo',
  'America/New_York',
  'America/Los_Angeles',
  'Europe/London',
  'UTC',
];

export default function Profile() {
  const { user, signOut, refetch } = useAuth();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  // Local form state
  const [roleTags, setRoleTags] = useState<string[]>(user?.role_tags ?? []);
  const [bio, setBio] = useState(user?.bio ?? '');
  const [timezone, setTimezone] = useState(user?.timezone ?? 'Asia/Manila');

  if (!user) return null;

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateProfile({ role_tags: roleTags, bio, timezone });
      await refetch();
      setEditing(false);
    } catch (err) {
      console.error('Failed to save profile:', err);
    } finally {
      setSaving(false);
    }
  };

  const toggleRole = (role: string) => {
    setRoleTags((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role],
    );
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 md:py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        {user.avatar_url ? (
          <img
            src={user.avatar_url}
            alt={user.name ?? 'Avatar'}
            className="w-16 h-16 rounded-full border-2 border-border"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-orange-tint flex items-center justify-center">
            <UserIcon className="text-orange-accessible" size={28} />
          </div>
        )}
        <div className="flex-1">
          <h1 className="text-2xl font-heading font-bold text-charcoal">
            {user.name ?? 'Anonymous'}
          </h1>
          <p className="text-sm text-muted">{user.email}</p>
        </div>
        {/* Plan badge */}
        <div
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
            user.plan === 'pro'
              ? 'bg-orange text-white'
              : 'bg-sand text-muted border border-border'
          }`}
        >
          {user.plan === 'pro' && <Crown size={12} />}
          {user.plan === 'pro' ? 'Pro' : 'Free'}
        </div>
      </div>

      {/* Profile card */}
      <div className="bg-surface border border-border rounded-card p-5 shadow-soft mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading font-semibold text-lg text-charcoal">Profile</h2>
          {!editing ? (
            <Button variant="ghost" size="sm" onClick={() => setEditing(true)}>
              Edit
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setEditing(false);
                  setRoleTags(user.role_tags ?? []);
                  setBio(user.bio ?? '');
                  setTimezone(user.timezone ?? 'Asia/Manila');
                }}
              >
                Cancel
              </Button>
              <Button size="sm" onClick={handleSave} disabled={saving}>
                {saving ? 'Saving...' : 'Save'}
              </Button>
            </div>
          )}
        </div>

        {/* Role tags */}
        <div className="mb-5">
          <label className="flex items-center gap-2 text-sm font-medium text-charcoal mb-2">
            <Tag size={14} className="text-muted" />
            Role Tags
          </label>
          {editing ? (
            <div className="flex flex-wrap gap-2">
              {ROLE_OPTIONS.map((role) => (
                <button
                  key={role}
                  onClick={() => toggleRole(role)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    roleTags.includes(role)
                      ? 'bg-teal text-white'
                      : 'bg-sand text-muted hover:bg-border'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {(user.role_tags ?? []).length > 0 ? (
                user.role_tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-teal-tint text-teal rounded-full text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))
              ) : (
                <span className="text-sm text-muted">No roles set</span>
              )}
            </div>
          )}
        </div>

        {/* Bio */}
        <div className="mb-5">
          <label className="flex items-center gap-2 text-sm font-medium text-charcoal mb-2">
            <FileText size={14} className="text-muted" />
            Bio
          </label>
          {editing ? (
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              maxLength={500}
              rows={3}
              className="w-full px-3 py-2 bg-canvas border border-border rounded-button text-sm
                         focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent
                         resize-none"
              placeholder="Tell us about yourself..."
            />
          ) : (
            <p className="text-sm text-muted">{user.bio || 'No bio yet'}</p>
          )}
        </div>

        {/* Timezone */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-charcoal mb-2">
            <Globe size={14} className="text-muted" />
            Timezone
          </label>
          {editing ? (
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="px-3 py-2 bg-canvas border border-border rounded-button text-sm
                         focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent"
            >
              {TIMEZONE_OPTIONS.map((tz) => (
                <option key={tz} value={tz}>
                  {tz}
                </option>
              ))}
            </select>
          ) : (
            <p className="text-sm text-muted">{user.timezone}</p>
          )}
        </div>
      </div>

      {/* Account info */}
      <div className="bg-surface border border-border rounded-card p-5 shadow-soft mb-6">
        <h2 className="font-heading font-semibold text-lg text-charcoal mb-3">Account</h2>
        <dl className="space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted">Email</dt>
            <dd className="text-charcoal">{user.email}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted">Plan</dt>
            <dd className="text-charcoal font-medium">
              {user.plan === 'pro' ? '✨ Pro' : 'Free'}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted">Member since</dt>
            <dd className="text-charcoal">
              {new Date(user.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </dd>
          </div>
        </dl>
      </div>

      {/* Sign out */}
      <Button
        variant="ghost"
        icon={<LogOut size={16} />}
        onClick={signOut}
        className="text-red-500 hover:bg-red-50 dark:hover:bg-red-950"
      >
        Sign out
      </Button>
    </div>
  );
}
