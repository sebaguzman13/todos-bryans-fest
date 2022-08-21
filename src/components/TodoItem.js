import { useEffect, useState } from "react"
import './TodoItem.css';

export const TodoItem = ({ item, deleteItem, addComment, user }) => {
    const [comment, setComment] = useState('');
    const [isCommenting, setIsCommenting] = useState(false);

    useEffect(() => {
        setIsCommenting(false);
    }, [user])

    const handleIsCommenting = () => {
        setIsCommenting(!isCommenting)
    }

    const handleComment = (e) => {
        setComment(e.target.value);
    }

    const handleDelete = () => {
        deleteItem(item.id)
    }

    const canComment = () => {
        return item.isCommentable && item.ownerGroupId === user.groupId;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addComment(comment, item.id);
        setIsCommenting(false);
        setComment('');
    }

    return (
        <article className="todo-item">
            <h5>{item.title}</h5>
            <p>{item.content}</p>

            <button onClick={handleDelete}>DELETE</button>
            {canComment() && (
                <>
                    <button onClick={handleIsCommenting}>{isCommenting ? 'CANCEL' : 'COMMENT'}</button>
                    {isCommenting && (
                        <form onSubmit={handleSubmit}>
                            <label htmlFor={`new-comment-${item.id}`}><b>Commenting</b> {item.title}</label>
                            <input type="text" name={`new-comment-${item.id}`} value={comment} onChange={handleComment} />

                            <button type="submit">Comment</button>
                        </form>
                    )}
                </>
            )}
            <ul>
                {item.comments?.map((itemComment, index) => (
                    <li key={`${index}-comment-${item.id}`}>
                        <p>{itemComment}</p>
                    </li>
                ))}
            </ul>
        </article>
    )
}

export default TodoItem;