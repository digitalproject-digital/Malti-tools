
export interface Tool {
  id: number;
  name: string;
  category: string;
  icon: string;
  description: string;
  filename: string;
}

export interface Category {
  name: string;
  icon: string;
}

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark'
}
