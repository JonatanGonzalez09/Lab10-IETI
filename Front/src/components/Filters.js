import React from 'react';
import moment from "moment";
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Typography from "@material-ui/core/Typography";
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import {TodoList} from './TodoList';
import './NewTask.css'
import './Filters.css'

export class Filters extends React.Component {

    constructor(props) {
        super(props);
        this.state = {items: [], description: '', nameResponsible: '', emailResponsible: '', status: '', dueDate: moment()};
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleNameResponsibleChange = this.handleNameResponsibleChange.bind(this);
        this.handleEmailResponsibleChange = this.handleEmailResponsibleChange.bind(this);
        this.handleStatusChange = this.handleStatusChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    render(){
        return(
            <React.Fragment>
                <Grid container spacing={3} direction="row" justify="center" alignItems="center">
                    <Grid item xs={6}>
                        <Typography variant="h3" className="letterTittle">Filters</Typography>
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
                           
                        </form>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h3" className="letterTittle">Results</Typography>
                        <TodoList todoList={this.state.items}/>
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }

    handleDescriptionChange(e) {
        let descip =e.target.value;
        let bitems =[]
        let items = JSON.parse(localStorage.getItem("items"));
        var x = items.map(function(item,i){
            if(item !=null && item.description === descip){
                const newItem = {
                    description: item.description,
                    nameResponsible: item.nameResponsible,
                    emailResponsible: item.emailResponsible,
                    status: item.status,
                    dueDate: item.dueDate,
                };
                bitems = bitems.concat(newItem);
            }
        })
        this.setState({
            description: e.target.value,
            items: bitems,
            nameResponsible: '',
            emailResponsible: '',
            status: '',
            dueDate: ''
        });
    }

    handleNameResponsibleChange(e) {
        let nam =e.target.value;
        let bitems =[]
        let items = JSON.parse(localStorage.getItem("items"));
        var x = items.map(function(item,i){
            console.log(item)
            console.log(i)
            if(item !=null && item.nameResponsible === nam){
                const newItem = {
                    description: item.description,
                    nameResponsible: item.nameResponsible,
                    emailResponsible: item.emailResponsible,
                    status: item.status,
                    dueDate: item.dueDate,
                };
                bitems = bitems.concat(newItem);
                
            }
        })
        this.setState({
            nameResponsible: e.target.value,
            items: bitems,
            description: '',
            emailResponsible: '',
            status: '',
            dueDate: ''
        });
    }
    handleEmailResponsibleChange(e) {
        let ema =e.target.value;
        let bitems =[]
        let items = JSON.parse(localStorage.getItem("items"));
        var x = items.map(function(item,i){
            if(item !=null && item.emailResponsible === ema){
                const newItem = {
                    description: item.description,
                    nameResponsible: item.nameResponsible,
                    emailResponsible: item.emailResponsible,
                    status: item.status,
                    dueDate: item.dueDate,
                };
                bitems = bitems.concat(newItem);   
            }
        })
        this.setState({
            emailResponsible: e.target.value,
            items: bitems,
            description: '',
            nameResponsible: '',
            status: '',
            dueDate: ''
        });
    }
    handleStatusChange(e) {
        let stat =e.target.value;
        let bitems =[]
        let items = JSON.parse(localStorage.getItem("items"));
        var x = items.map(function(item,i){
            if(item !=null && item.status === stat){
                const newItem = {
                    description: item.description,
                    nameResponsible: item.nameResponsible,
                    emailResponsible: item.emailResponsible,
                    status: item.status,
                    dueDate: item.dueDate,
                };
                bitems = bitems.concat(newItem);
                
            }
        })
        this.setState({
            status: e.target.value,
            items: bitems,
            description: '',
            nameResponsible: '',
            emailResponsible: '',
            dueDate: ''
        });
    }

    handleDateChange(e) {
        let dat =e.target.value;
        let bitems =[]
        let items = JSON.parse(localStorage.getItem("items"));
        var x = items.map(function(item,i){
            if(item !=null && item.dueDate === dat.toString()){
                const newItem = {
                    description: item.description,
                    nameResponsible: item.nameResponsible,
                    emailResponsible: item.emailResponsible,
                    status: item.status,
                    dueDate: item.dueDate,
                };
                bitems = bitems.concat(newItem);
            }
        })
        this.setState({
            dueDate: e.target.value,
            items: bitems,
            description: '',
            nameResponsible: '',
            emailResponsible: '',
            status: ''
        });

    }

  

}