export type SelectedTool = 'accountAchievements' | 'questTracker' | 'accountReputations' | 'accountPetsAndMounts' | '';

export interface Tool {
  selected: SelectedTool;
}

export interface ToolsProps {
  setInstalled: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ToolNavProps {
  tool: SelectedTool;
  name: string;
}
