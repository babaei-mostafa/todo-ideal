export interface ITodo {
  _id: string
  title: string
  description: string
  start_date: string
  end_date: string
  is_completed: boolean
  createdAt: string
  updatedAt: string
}

export interface IUpdatedTodo {
  is_completed: boolean
  _id: string
}
