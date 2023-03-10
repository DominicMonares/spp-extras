export type SelectedTool = 'questTracker' | 'accountAchievements' | null;

export interface Tool {
  selected: SelectedTool;
}

export interface ToolNavProps {
  tool: SelectedTool;
  name: string;
}
