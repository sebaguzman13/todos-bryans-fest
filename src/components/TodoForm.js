import { useState } from "react";

const initialTodo = {
    title: '',
    content: '',
    comments: [],
    isCommentable: false,
    ownerGroupId: null
}

export const TodoForm = ({ onSubmit, userGroupId }) => {
    const [newTodo, setNewTodo] = useState({ ...initialTodo });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(newTodo);
        setNewTodo({ ...initialTodo})
    }

    const handleChange = (e) => {
        setNewTodo({ ...newTodo, [e.target.name]: e.target.value })
    }

    return (
        <form onSubmit={handleSubmit} className="create-form">
            <h4>Create TODO</h4>
            <label htmlFor="title">Title</label>
            <input type="text" name="title" value={newTodo.title} onChange={handleChange} />

            <label htmlFor="content">Content</label>
            <input type="text" name="content" value={newTodo.content} onChange={handleChange} />

            <label htmlFor="isCommentable">Accept comments ?</label>
            <input type="checkbox" name="isCommentable" checked={newTodo.isCommentable} onChange={handleChange} />

            <button type="submit">ADD</button>
        </form>
    )
}

export default TodoForm;