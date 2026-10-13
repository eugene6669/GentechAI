import { create } from 'zustand';

/**
 * Sidebar state — expanded vs collapsed.
 * On mobile (<768px) the sidebar is always hidden; a bottom nav replaces it.
 */
interface SidebarState {
  collapsed: boolean;
  toggle: () => void;
  setCollapsed: (v: boolean) => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  collapsed: false,
  toggle: () => set((s) => ({ collapsed: !s.collapsed })),
  setCollapsed: (collapsed) => set({ collapsed }),
}));
