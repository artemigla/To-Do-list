import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import Item from './Item';
import './Style/Style.css';

const Todo = ({ name }) => {
    const [state, setState] = useState('');
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const saveTask = localStorage.getItem("data")
        setTodos(JSON.parse(saveTask))
    }, []);

    useEffect(() => {
        localStorage.setItem("data", JSON.stringify(todos));
    }, [todos]);

    const handlerInput = (event) => setState(event.target.value);

    const addToTaskList = () => {
        if (state !== "") {
            setTodos([...todos,
            {
                id: uuidv4(),
                text: state
            }
            ]);
        }
        setState("");
    }

    const deleteTodo = (id) => setTodos(todos.filter(item => item.id !== id));

    const itemList = todos.length > 0 ? (
        <div>
            {todos.map((item) => {
                return (
                    <Item key={item.id}
                        item={item}
                        setTodos={setTodos}
                        todos={todos}
                        deleteTodo={deleteTodo}
                    />
                )
            })}
        </div>
    ) : (<h3>The task list is empty</h3>)

    return (
        <div className="todo-list">
            <div>
                <div className="name-header">
                    <h3>{name}</h3>
                </div>
                <div className="block-add">
                    <input type="text"
                        className="npt"
                        placeholder="Add a task"
                        onInput={(e) => handlerInput(e)}
                        value={state} />
                    <button className="btn-add" onClick={addToTaskList} value={todos}>ADD</button>
                </div>

                <div>
                    {itemList}
                </div>
            </div>
        </div>
    )
}

Todo.propTypes = {
    id: PropTypes.string,
    text: PropTypes.string,
    itemList: PropTypes.array,
    state: PropTypes.string,
    setState: PropTypes.func,
    todos: PropTypes.array,
    setTodos: PropTypes.func,
    handlerInput: PropTypes.func,
    addToTaskList: PropTypes.func,
    deleteTodo: PropTypes.func
}
export default Todo;