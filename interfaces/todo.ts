export interface ITodo {
  _id: string
  title: string
  description: string
  start_date: string
  end_date: string
  is_completed: boolean
  createdAt: string
  updatedAt: string
  __v: number
}

export interface IUpdateTodoBody {
  is_completed: boolean
  _id: string
}

export interface IAddTodoBody {
  title: string
  description: string
  start_date: string
  end_date: string
}

export interface IAddTodoRes {
  message: string
  data: ITodo
}
