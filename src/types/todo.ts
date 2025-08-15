export interface Todo {
  id: number
  text: string
  completed: boolean
  createdAt: Date
  updatedAt: Date
}

export interface TodoFilter {
  all: boolean
  active: boolean
  completed: boolean
}

export type FilterType = 'all' | 'active' | 'completed'