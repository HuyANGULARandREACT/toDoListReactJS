import { Request, Response } from "express";
import Todo from "../models/todo.model";
import { CreateTodoDto, UpdateTodoDto } from "../dto/todo.dto";

export const getTodos = async(req: Request, res: Response)=>{
    const todos = await Todo.find();
    res.json(todos);
}
export const createTodo = async(req: Request, res: Response)=>{
    const data: CreateTodoDto = req.body
    const newTodo = new Todo({text: data.text})
    const saved = await newTodo.save()
    res.status(201).json(saved)
}
export const updateTodo = async(req: Request, res: Response)=>{
    const data: UpdateTodoDto = req.body
    const updated = await Todo.findByIdAndUpdate(req.params.id, data, {new: true})
    res.json(updated)
}
export const deleteTodo = async(req: Request, res: Response)=>{
    await Todo.findByIdAndDelete(req.params.id)
    res.json({message: "Todo deleted"})
}