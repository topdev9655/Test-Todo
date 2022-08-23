import * as React from 'react';
import * as classNames from 'classnames';
// import * as Styles from './index.css';

import { Todo } from '../model';
import TodoTextInput from './TodoTextInput';

interface TodoItemProps {
  todo: Todo;
  editTodo: (todo:Todo, text:string)=>void;
  deleteTodo: (todo:Todo)=>void;
  completeTodo: (todo:Todo)=>void;
  key?: any;
}
interface TodoItemState {
  editing: boolean;
};

class TodoItem extends React.Component<TodoItemProps, TodoItemState> {
  constructor(props, context) {
    super(props, context);
    this.state = {
      editing: false
    };
  }

  handleDoubleClick() {
    this.setState({ editing: true });
  }

  handleSave(todo:Todo, text:string) {
    if (text.length === 0) {
      this.props.deleteTodo(todo);
    } else {
      this.props.editTodo(todo, text);
    }
    this.setState({ editing: false });
  }

  render() {
    const {todo, completeTodo, deleteTodo} = this.props;

    let element;
    if (this.state.editing) {
      element = (
        <TodoTextInput text={todo.text}
                       editing={this.state.editing}
                       onSave={(text) => this.handleSave(todo, text)}/>
      );
    } else {
      element = (
        <div className="view" style={{"display":"flex","marginLeft":"10px","alignItems":"center"}}>
          <input
                //  className="toggle"
                 style={{"width":"1.5em","height":"1.5em","border-radius":"50%"}}
                 type="checkbox"
                 checked={todo.completed}
                 onChange={() => completeTodo(todo)} />
          <label onDoubleClick={this.handleDoubleClick.bind(this)}>
            {todo.text}
          </label>
          <button className="destroy"
                  onClick={() => deleteTodo(todo)} />
        </div>
      );
    }

    return (
      <li className={classNames({
        completed: todo.completed,
        editing: this.state.editing
      })}>
        {element}
      </li>
    );
  }
}

export default TodoItem;
