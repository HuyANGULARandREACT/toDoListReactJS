export interface CreateTodoDto {
  text: string;
  deadLine?: Date
}

export interface UpdateTodoDto {
  text?: string;
  completed?: boolean;
  deadLine?: Date
}
