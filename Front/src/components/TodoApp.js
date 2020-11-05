import React from 'react';
import {TodoList} from './TodoList';
import moment from "moment";
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './TodoApp.css'
import axios from 'axios';
export class TodoApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {items: [], description: '', name: '', email: '', status: '', dueDate: moment(),file};
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleStatusChange = this.handleStatusChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render(){
        return(
            <div>
                <br/>
                <br/>
                <form onSubmit={this.handleSubmit} className="todo-form">
                <Box color="primary.main"><h1>New Tasks</h1></Box>
                <Box component="span" p={1}>
                    <TextField
                    id="description"
                    onChange={this.handleDescriptionChange}
                    value={this.state.description}
                    label="Description"
                    variant="outlined"
                    />
                    </Box>
                    <Box component="span" p={1}>
                    <TextField
                    id="name"
                    onChange={this.handleNameChange}
                    value={this.state.name}
                    label="Name"
                    variant="outlined"
                    />
                    </Box>
                    <Box component="span" p={1}>
                    <TextField
                    id="email"
                    onChange={this.handleEmailChange}
                    value={this.state.email}
                    label="Email"
                    variant="outlined"
                    />
                    </Box>
                    <Box component="span" p={1}>
                    <TextField
                    id="status"
                    onChange={this.handleStatusChange}
                    value={this.state.status}
                    label="Status"
                    variant="outlined"
                    />
                    </Box>
                    <Box component="span"  p={1}>
                    <TextField
                        id="dueDate"
                        label="Due Date"
                        type="Date"
                        variant="outlined"
                        onChange={this.handleDateChange}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                    </Box>
                    <Box component="span"  p={1}>
                    <TextField type="file" id="file" onChange={this.handleInputChange}/>
                    </Box>
                    <Box component="span" display="block" p={1}>
                    <Button variant="contained" color="primary" onClick={this.handleSubmit} >
                    Add #{this.state.items.length + 1}
                    </Button>
                    </Box>
                   
                </form>
                <br/>
                <br/>
                <TodoList todoList={this.state.items}/>
            </div>
        )
    }

    handleDescriptionChange(e) {
        this.setState({
            description: e.target.value
        });
    }

    handleNameChange(e) {
        this.setState({
            name: e.target.value
        });
    }
    handleEmailChange(e) {
        this.setState({
            email: e.target.value
        });
    }
    handleStatusChange(e) {
        this.setState({
            status: e.target.value
        });
    }

    handleDateChange(e) {
        this.setState({
            dueDate: e.target.value
        });
    }

    handleInputChange(e) {
        this.setState({
            file: e.target.files[0]
        });                
    }

    handleSubmit(e) {

        e.preventDefault();

        if (!this.state.description.length || !this.state.name.length || !this.state.email.length || !this.state.status.length || !this.state.dueDate)
            return;

        const newItem = {
            description: this.state.description,
            name: this.state.name,
            email: this.state.email,
            status: this.state.status,
            dueDate: this.state.dueDate,

        };
        this.setState(prevState => ({
            items: prevState.items.concat(newItem),
            description: '',
            name: '',
            email: '',
            status: '',
            dueDate: ''
        }));
        let data = new FormData();
        data.append('file', this.state.file);
        axios.post('files', data)
            .then(function (response) {
                console.log("file uploaded!", data);
        })
        .catch(function (error) {
            console.log("failed file upload", error);
        });
    }

}