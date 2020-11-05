import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import Box from '@material-ui/core/Box';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import './App.css';
import {Login} from './components/Login';
import {TodoList} from "./components/TodoList";
import Drawer from './components/Drawer';
import {NewTask} from "./components/NewTask";
import {UserProfile} from "./components/UserProfile";
import Modal from "./components/Modal";
import { TransferWithinAStationSharp } from '@material-ui/icons';


class App extends Component {
  constructor(props) {
    super(props);    
  }

  handleNewTask() {
    window.location.replace("/NewTask");
  };

  componentDidMount() {
    fetch('http://localhost:8080/api/todo', {
      method: 'GET',
    }).then(response => response.json())
      .then(data => {
        console.log(data)
        if (localStorage.getItem("items") === null) {
          localStorage.setItem("items", JSON.stringify(data));
      }
      }).catch(error => {
        console.log(error)
    });
  }

  render(){
    let routeOptions;
    if(localStorage.getItem('isLoggedIn')==="true"){
      routeOptions = (
        <Switch>
      <Route exact path="/NewTask" >
        <Drawer/>
        <NewTask/>
      </Route>
      <Route exact path="/Filters" >
        <Drawer/>
        <Modal/>
        <TodoList todoList={
          localStorage.getItem("items") === null
          ? []
          : JSON.parse(localStorage.getItem("items"))
        }/>
                
          <Box component="span" className="buttonAdd" display="block" p={1} m={1}  >
              <Fab color="primary" aria-label="add" className="buttonAdd" onClick={this.handleNewTask}>
                <AddIcon />
            </Fab>
              </Box>
      </Route>
      <Route exact path="/UpdateProfile" >
        <Drawer/>
        <UserProfile/>
        
      </Route>
      <Route  path="/" >
        <Drawer/>
        <TodoList todoList={
          localStorage.getItem("items") === null
          ? []
          : JSON.parse(localStorage.getItem("items"))
        }/>
                
          <Box component="span" className="buttonAdd" display="block" p={1} m={1}  >
              <Fab color="primary" aria-label="add" className="buttonAdd" onClick={this.handleNewTask}>
                <AddIcon />
            </Fab>
              </Box>
      </Route>
      <Redirect to="/" />
    </Switch>


);
}else{
  routeOptions = (
    <Switch>
      <Route exact path="/Login" component={Login}/>
      <Redirect to="/Login" />
    </Switch>
);
}
    return(
      <Box component="span" display="block" p={5} m={5}  >
          <Router>{routeOptions}</Router>
      </Box>
      
    );
  }

}

export default App;