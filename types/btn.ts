export interface btn {
  id: number;
  children: string;
  type: 'functional' | 'basic' | 'arithmetic';
  isActive?: boolean;
}
