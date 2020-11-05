import React from 'react';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Box from '@material-ui/core/Box';
import './Todo.css';

export class Todo extends React.Component {

    render() {
        return (
            <Box component="span" display="block" p={1} m={1}  >
            <Card className="root"  >
                <CardContent>
                <Typography><b>Description:</b> {this.props.description}</Typography>
                <Typography><b>Name Responsible:</b> {this.props.name}</Typography>
                <Typography><b>Email Resonsible:</b> {this.props.email}</Typography>
                <Typography><b>Status:</b> {this.props.status}</Typography>
                <Typography><b>Due Date:</b> {this.props.dueDate}</Typography>
                <Typography><b>Image</b>{this.props.fileUrl ? <img src={this.props.fileUrl} /> :"" }</Typography>
                </CardContent>
            </Card>
            </Box>
            
        );
    }

}