import { create } from 'zustand';

export const useWorkspacesStore = create((set) => ({
    workspaces: [],
    workspacesList: (data) => set((state) => ({ Workspaces: data }))
  }));