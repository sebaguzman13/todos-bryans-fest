import { useState } from "react";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";

/*
    Todo model: {
        id: number,
        title: string,
        content: string,
        comments: string[],
        isCommentable: boolean
        ownerGroupId: number | string
    }
*/

const users = [
    { name: "Hugo", groupId: 1 },
    { name: "Jimena", groupId: 2 },
    { name: "Parcerito", groupId: 3 },
    { name: "Regaeetonero", groupId: 1 },
    { name: "Laura", groupId: 2 }
]

export const TodosList = () => {
    const [todos, setTodos] = useState([]);
    const [user, setUser] = useState(users[0])

    const handleAdd = (todo) => {
        todo.id = Date.now();
        todo.ownerGroupId = user.groupId;
        setTodos([...todos, todo])
    }

    const handleDelete = (id) => {
        const updated = todos.filter(item => item.id !== id)
        setTodos(updated)
    }

    const handleSelect = (e) => {
        setUser(users[e.target.value])
    }

    const handleNewComment = (comment, itemId) => {
        const index = todos.findIndex(todo => todo.id === itemId);
        let copy = [...todos];
        copy[index] = { ...copy[index], comments: [...copy[index].comments, comment] };
        setTodos(copy);
    }

    return (
        <>
            <section>
                <label htmlFor="selected-user">User</label>
                <select name="selected-user" onChange={handleSelect}>
                    {users?.map((user, index) => (
                        <option key={`${index}-${user.name}`} value={index}>{user.name}</option>
                    ))}
                </select>
                <p>Group Id: {user.groupId}</p>
            </section>
            <section>
                <TodoForm onSubmit={handleAdd} />
                {todos?.map((todo, index) => (
                    <TodoItem
                        key={`${index}-${todo.id}`}
                        item={todo}
                        onSubmit={handleAdd}
                        deleteItem={handleDelete}
                        user={user}
                        addComment={handleNewComment}
                    />
                ))}
            </section>
        </>
    )
}

export default TodosList;