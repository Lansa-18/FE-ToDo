export interface TodoObj {
  id: number;
  text: string;
  completed: boolean;
}

export interface TodoObj2 {
  todoId: number;
  userId: number;
  isCompleted: boolean;
  title: string;
  createdAt: string;
}

export interface TodoResponse {
  userTodos: TodoObj2[];
}
