import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1/todos';

export const getTodoList = () => {
    return axios.get(API_URL);
};

export const createTodo = (data) => {
    return axios.post(API_URL, data);
};

export const updateTodo = (id, data) => {
    return axios.put(`${API_URL}/${id}`, data);
};

export const deleteTodo = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};
