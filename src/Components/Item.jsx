import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Style/Style.css';

const Item = ({ item, setTodos, todos, deleteTodo }) => {
    const [edit, setEdit] = useState(false);
    const [todo, setTodo] = useState(item.text);

    const handleEditChange = (event) => {
        setTodo(event.target.value);
    }

    const handleEdit = () => {
        setEdit(!edit);
    }

    const handleEditSubmit = (id) => {
        const editedTask = todos.map((item) => {
            if (item.id === id) {
                item.text = todo;
            }
            return item;
        });
        localStorage.setItem("data", JSON.stringify(editedTask));
        setTodos(editedTask);
        handleEdit();
    };

    return (
        <div>
            <div key={item.id}>
                {!edit ? (
                    <div className="tasks">
                        <p>{item.text}</p>
                        <div className="btns-delete-edit">
                            <button onClick={handleEdit}>Edit</button>
                            <button onClick={() => deleteTodo(item.id)}>Delete</button>
                        </div>
                    </div>
                ) : (
                    <div className="tasks">
                        <input type="text" value={todo} onChange={handleEditChange} />
                        <button onClick={handleEdit}>Cancel</button>
                        <button type="submit" onClick={() => handleEditSubmit(item.id)}>Save</button>
                    </div>
                )}
            </div>
        </div>
    )
}

Item.propTypes = {
    edit: PropTypes.bool,
    setEdit: PropTypes.func,
    todo: PropTypes.string,
    setTodo: PropTypes.func,
    handleEditChange: PropTypes.func,
    handleEdit: PropTypes.func,
    handleEditSubmit: PropTypes.func,
    editedTask: PropTypes.array
}
export default Item;