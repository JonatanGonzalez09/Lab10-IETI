import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Typography from "@material-ui/core/Typography";

export class UserProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {users: [], pass: '', pass2: '', name: '', email: ''};
        this.handleChangePass2 = this.handleChangePass2.bind(this);
        this.handleChangePass = this.handleChangePass.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleStatusChange = this.handleStatusChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render(){
        return(
            <React.Fragment>
                    <Typography className="letterTittle" variant="h3">Registration</Typography>
                <form onSubmit={this.handleSubmit} className="todo-form">
                        <FormControl margin="normal" required fullWidth>
                    <TextField
                    id="name"
                    onChange={this.handleNameChange}
                    value={this.state.name}
                    label="Name"
                    variant="outlined"
                    />
                     </FormControl>
                        <FormControl margin="normal" required fullWidth>
                    <TextField
                    id="pass"
                    type="password"
                    onChange={this.handleChangePass}
                    value={this.state.pass}
                    label="Password"
                    variant="outlined"
                    />
                     </FormControl>
                        <FormControl margin="normal" required fullWidth>
                    <TextField
                    type="password"
                    id="pass2"
                    onChange={this.handleChangePass2}
                    value={this.state.pass2}
                    label="Confirm Password"
                    variant="outlined"
                    />
                     </FormControl>
                        <FormControl margin="normal" required fullWidth>
                    <TextField
                    id="email"
                    onChange={this.handleEmailChange}
                    value={this.state.email}
                    label="Email"
                    variant="outlined"
                    />
                     </FormControl>
                        
                        <FormControl margin="normal" required fullWidth>
                    <Button variant="contained" color="primary" onClick={this.handleSubmit} >
                    Save
                    </Button>
                    </FormControl>
                </form>
                </React.Fragment>
        )
    }

    handleChangePass(e) {
        this.setState({
            pass: e.target.value
        });
    }
    handleChangePass2(e) {
        this.setState({
            pass2: e.target.value
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

    handleSubmit(e) {

        e.preventDefault();
        if(this.state.pass !==this.state.pass2){
            alert("No coinciden las contraseñas")
            return;
        }

        if (!this.state.pass.length || !this.state.pass2.length || !this.state.name.length || !this.state.email.length)
        return;
        console.log("New Name: "+this.state.name)
        localStorage.setItem("Name", this.state.name)
        localStorage.setItem("Password", this.state.pass)
        localStorage.setItem("Email", this.state.email)
        
        document.location.href = "/";
    }

}