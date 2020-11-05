import React from 'react';
import {Todo} from './Todo'
import { Box } from '@material-ui/core';

export class TodoList extends React.Component {

    render() {
        const todoList = this.props.todoList.map((todo, i) => {
            if(todo!= null){
            return (
                <Todo key={i} description={todo.description} name={todo.responsible.name} email={todo.responsible.email} status={todo.status}  dueDate={todo.dueDate} img={"http://localhost:8080/api/files/"+todo.fileUrl}/>
                );
            }
        });
        return (
            <Box component="span" display="block" p={1} m={1}  >
                {todoList}
            </Box>
        );


    }

}