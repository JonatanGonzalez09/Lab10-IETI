import React from 'react';
import moment from "moment";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Typography from "@material-ui/core/Typography";
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import axios from 'axios'
import './NewTask.css'

export class NewTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {items: [], file:'',url:'', description: '', nameResponsible: '', emailResponsible: '', status: '', dueDate: moment()};
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleNameResponsibleChange = this.handleNameResponsibleChange.bind(this);
        this.handleEmailResponsibleChange = this.handleEmailResponsibleChange.bind(this);
        this.handleStatusChange = this.handleStatusChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render(){
        return(
            <React.Fragment>
                <Grid container spacing={3} direction="row" justify="center" alignItems="center">
                    <Grid item xs={8}>
                        <Typography className="letterTittle" variant="h3" >New Task</Typography>
                        <form onSubmit={this.handleSubmit} className="todo-form">
                            <FormControl margin="normal" required fullWidth>
                                <TextField
                                id="description"
                                onChange={this.handleDescriptionChange}
                                value={this.state.description}
                                label="Description"
                                variant="outlined"
                                />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <TextField
                                id="name"
                                onChange={this.handleNameResponsibleChange}
                                value={this.state.nameResponsible}
                                label="Name"
                                variant="outlined"
                                />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <TextField
                                id="email"
                                onChange={this.handleEmailResponsibleChange}
                                value={this.state.emailResponsible}
                                label="Email"
                                variant="outlined"
                                />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel >Status</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    value={this.getStatus}
                                    onChange={this.handleStatusChange}
                                    label="Name"
                                    variant="outlined"
                                    >
                                    <MenuItem value="Ready">Ready</MenuItem>
                                    <MenuItem value="In progress">In progress</MenuItem>
                                    <MenuItem value="Done">Done</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
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
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                            <TextField type="file" id="file" onChange={this.handleInputChange}/>
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <Button variant="contained" color="primary" onClick={this.handleSubmit} >
                                    Add new Task
                                </Button>
                            </FormControl>
                        </form>
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }

    handleDescriptionChange(e) {
        this.setState({
            description: e.target.value
        });
    }

    handleNameResponsibleChange(e) {
        this.setState({
            nameResponsible: e.target.value
        });
    }
    handleEmailResponsibleChange(e) {
        this.setState({
            emailResponsible: e.target.value
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
        let data = new FormData();
        data.append('file', e.target.files[0]);
        axios.post('http://localhost:8080/api/files', data)
        .then(function (response) {
            console.log(response.data);
            this.setState({
                url:response.data
            })
    })
    .catch(function (error) {
        console.log("failed file upload", error);
    });
    
        this.setState({
            file: e.target.files[0]
        });                
    }

    handleSubmit(e) {

        e.preventDefault();

        if (!this.state.description.length || !this.state.nameResponsible.length || !this.state.emailResponsible.length || !this.state.status.length || !this.state.dueDate)
            return;
        const newItem = {
            description: this.state.description,
            responsible:{name:this.state.nameResponsible,
            email: this.state.emailResponsible},
            status: this.state.status,
            dueDate: this.state.dueDate,
            fileUrl: this.state.url,
            priority:10
        };
        this.setState(prevState => ({
            items: prevState.items.concat(newItem),
            description: '',
            nameResponsible: '',
            emailResponsible: '',
            status: '',
            dueDate: '',
            file:''
        }));
        console.log(newItem)
        axios.post('http://localhost:8080/api/todo', 
        newItem,{})
            .then(response => { 
                console.log(response);
                alert("Agregado correctamente");
                    let items = JSON.parse(localStorage.getItem("items"));
                    items.push(newItem);
                    localStorage.setItem("items", JSON.stringify(items));
            })
            .catch(error => {    
                console.log(error);
                alert("No se ha agregado correctamente");
            });        
        /* window.location.replace("/"); */

        
    }

}