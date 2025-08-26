export interface CreateTodoDto {
  text: string;
}

export interface UpdateTodoDto {
  text?: string;
  completed?: boolean;
}
