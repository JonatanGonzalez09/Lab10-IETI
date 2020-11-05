import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import axios from 'axios'
import './Login.css'


export class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state={email:"",password:""};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeEmail=this.handleChangeEmail.bind(this);
        this.handleChangePassword=this.handleChangePassword.bind(this);
        
    }
    componentDidMount() {
        
      }
    
    render(){
        return (
            <React.Fragment>
                <CssBaseline />
                <main className="layout">
                    <Paper className="paper">
                        <Avatar className="avatar">
                            <LockIcon />
                        </Avatar>
                        <Typography variant="headline">Sign in</Typography>
                        <form className="form">
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="email">Email Address</InputLabel>
                                <Input id="email" name="email" autoComplete="email" autoFocus
                                    onChange={this.handleChangeEmail}
                                    />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input
                                    name="password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    onChange={this.handleChangePassword}
                                />
                            </FormControl>
                            <Button
                                type="submit"
                                fullWidth
                                variant="raised"
                                color="secondary"
                                className="submit"
                                onClick={this.handleSubmit}
                            >
                                Sign in
                            </Button>
                        </form>
                    </Paper>
                </main>
            </React.Fragment>
        );
    }

    handleSubmit(e) {
        
        axios.post('https://ieti-lab08.herokuapp.com/user/login', {
                 username: this.state.email,
                 password: this.state.password
             })
                 .then(function (response) {
                     console.log(response.data);
                     localStorage.setItem('Token',response.data.accessToken);
                     localStorage.setItem('isLoggedIn','true');
                     localStorage.setItem('Name','Jonatan');
                     localStorage.setItem('Email','jonatan@mail.com');
                 })
                 .catch(function (error) {
                     console.log(error);
                 });
           
    }

    handleChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    handleChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }
}