const BASE_URL = import.meta.env.VITE_API_URL;
import axios from "axios";

const getTodoList = async ()=>{
    try{
        const response = await axios.get(BASE_URL);
        return response.data
    }catch(error){
        console.error("Error fetching todo list:", error);
        throw error;
    }
}
const createTodo = async (todo)=>{
    try{
        const response = await axios.post(BASE_URL, todo);
        return response.data
    }catch(error){
        console.error("Error creating todo:", error);
        throw error;
    }
}
const updateTodo = async (id, updatedTodo)=>{
    try{
        const response = await axios.put(`${BASE_URL}/${id}`, updatedTodo);
        return response.data
    }catch(error){
        console.error("Error updating todo:", error);
        throw error;
    }

}
const deleteTodo = async (id)=>{
    try{
        const response = await axios.delete(`${BASE_URL}/${id}`)
        return response.data
    }catch(error){
        console.error("Error deleting todo:", error);
        throw error;
    }
}

export { getTodoList, createTodo, updateTodo, deleteTodo };