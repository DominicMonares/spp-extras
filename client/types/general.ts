export interface Expansion {
  selected: SelectedExpansion;
}

export type SelectedExpansion = 'classic' | 'tbc' | 'wotlk' | null;

export type SelectedTool = 'questTracker' | 'accountAchievements' | null;

export interface TabsProps {
  openModal: (xpac: SelectedExpansion) => void;
}

export interface Tool {
  selected: SelectedTool;
}

export interface ToolNavProps {
  tool: SelectedTool;
  name: string;
}
