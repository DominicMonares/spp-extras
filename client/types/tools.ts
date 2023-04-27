export type SelectedTool = 'acctAchievements' | 'questTracker' | 'acctReps' | 'acctMountsPets' | '';

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
