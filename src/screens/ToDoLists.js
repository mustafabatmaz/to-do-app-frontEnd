import React from 'react';
import {
    Button,
    Container,
    Row,
    Col,
    Form, Table,
} from 'react-bootstrap';
import Api from "../Api";
import history from "../history";


class ToDoLists extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            name : "",
            todoLists: [],
            errorMessage : false

        }
        this.fetchTodoLists(this.props.requestData["id"]);

    }
    fetchTodoLists = async () => {
        try {
            const  response = await Api.GET('http://localhost:8080/todolists/');
            let json = await response.json();
            this.setState({todoLists: json})
        } catch (e) {
            console.log(e);
        }
    }

    onFormSubmit = async (button) => {
        if (!this.state.name)
            return ;
        const response = await Api.POST('http://localhost:8080/todolists/', {name : this.state.name}, true )
        if (response.status != 200){
            console.log("To do list didn't add")
            this.setState({errorMessage: true})
        }else {
            let json = await response.json();
            this.setState({todoLists: [...this.state.todoLists, json]})
        }


    }
    todoListDelete = async (todoListId) => {
        const response = await Api.DELETE('http://localhost:8080/todolists/' + todoListId)
        if(response.status == 200){
            this.fetchTodoLists(this.props.requestData["id"])
        }else {
            console.log("To do list could't delete")
        }
    }
    logOut = async (button) => {
            localStorage.removeItem('token')
            history.push("/login")
    }
    handleChange = (key, event) => {
        this.setState({[key]: event.target.value});
    }
    getTodolistStatus = (toDoList) => {
        if (!toDoList.items || toDoList.items.length == 0)
            return "";
        let result = toDoList.items.filter(item => item.status == 'NOT_COMPLETED')
        if(result.length > 0){
           return 'NOT_COMPLETED';
        }else {
            return 'COMPLETED';

        }
    }
    render() {
        return (
          <Container>
              <Row>
                  <Col>
                      <h1>TO-DO LISTS</h1>
                  </Col>
              </Row>
              <Row>
                  <Col><Button onClick={this.logOut}>Logout</Button></Col>
              </Row>
              <Row>
                  <Col> {this.state.errorMessage && <span>Error occurred while adding To Do</span>}</Col>
              </Row>
              <Row>
                  <Col>
                      <Form>
                          <Form.Group controlId="formBasicName">
                              <Form.Label>To-Do Name</Form.Label>
                              <Form.Control type="text" placeholder="Enter To-Do List Name" value={this.state.name}
                                            onChange={(event) => this.handleChange("name", event)}/>
                          </Form.Group>

                          <Button variant="primary" type="button" onClick={this.onFormSubmit}>
                              Add
                          </Button>
                      </Form>
                  </Col>
              </Row>
              <Row>
                  <Col>
                      <Table striped bordered hover>
                          <thead>
                          <tr>
                              <th>Name</th>
                              <th>Items</th>
                              <th>Status</th>
                              <th>Delete</th>
                          </tr>
                          </thead>
                          <tbody>
                      {this.state.todoLists.map(toDoList => {
                          return <tr>
                              <td>{toDoList.name}</td>
                              <td><Button onClick={() => history.push("/todolistdetails/id/" + toDoList.id)}> Items</Button></td>
                              <td>
                                  {this.getTodolistStatus(toDoList)}
                              </td>
                              <td><Button onClick={() => this.todoListDelete(toDoList.id)}>Delete To Do</Button></td>
                          </tr>;
                      })}

                          </tbody>
                      </Table>
                  </Col>
              </Row>
          </Container>
        );
    }
}
export default ToDoLists;