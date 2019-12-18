import React from 'react';
import Register from "./Register";
import {Button, Col, Container, Form, Row, Table} from "react-bootstrap";
import Api from "../Api";
import history from "../history";

class ToDoListDetail extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            "name": "",
            "description": "",
            "deadline": "",
            "sort":"name",
            "direction":"asc",
            "details": {
                "id": 1,
                "name": "Yapılacaklar Listem-3",
                "status": "NOT_COMPLETED",
                "createDateTime": "2019-12-15T00:33:56.445756",
            },
            "items": [
            ],
        }

        this.fetchDetails(this.props.requestData["id"]);
    }

    fetchDetails = async () => {
        try {
            let url = 'http://localhost:8080/todolists/' + this.props.requestData["id"] + '?sort=' + this.state.sort + '&direction=' + this.state.direction;
            const response = await Api.GET(url)
            let json = await response.json();
            this.setState({"details": json, items: json.items})
        } catch (e) {
            console.log(e);
        }
    }

    onFormSubmit = async () => {
        const response = await Api.POST('http://localhost:8080/todolists/' + this.props.requestData["id"] + "/items",
            {
                name: this.state.name,
                description: this.state.description,
                deadline: this.state.deadline
            }, true)
        if (response.status != 200) {
            console.log("Error occurred while adding Item")
            this.setState({errorMessage: true})
        } else {
            let json = await response.json();
            this.setState({items: [...this.state.items, json]})
        }
    }
    DeleteItem = async (itemId) =>{
        const response = await Api.DELETE('http://localhost:8080/todolists/' + this.props.requestData["id"] + "/items/" +itemId)
        if(response.status == 200){
            this.fetchDetails(this.props.requestData["id"])
        }else{
            console.log("Couldn't delete")
        }
    }
    UpdateItem = async (itemId) =>{
        const response = await Api.UPDATE('http://localhost:8080/todolists/' + this.props.requestData["id"] + "/items/" +itemId )
        if(response.status == 200){
            if (this.state.status == 'NOT_COMPLETED'){
                this.setState({status : 'COMPLETED'})
            }
            else if (this.state.status == 'COMPLETED '){
                this.setState({status: 'NOT_COMPLETED'})
            }
            this.fetchDetails(this.props.requestData["id"])
        }else{
            console.log("Couldn't update")
        }
    }
    sortItems = async (sort, direction) => {
        this.setState({sort, direction},() => this.fetchDetails())
    }

    handleChange = (key, event) => {
        this.setState({[key]: event.target.value});
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <h1>TO-DO LIST DETAIL</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form>
                            <Form.Group controlId="formBasicName">
                                <Form.Label>Item Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter Item Name" value={this.state.name}
                                              onChange={(event) => this.handleChange("name", event)}/>
                            </Form.Group>
                            <Form.Group controlId="formBasicDescription">
                                <Form.Label>Item Description</Form.Label>
                                <Form.Control type="text" placeholder="Enter Item Description"
                                              value={this.state.description}
                                              onChange={(event) => this.handleChange("description", event)}/>
                            </Form.Group>
                            <Form.Group controlId="formBasicDeadline">
                                <Form.Label>Item Deadline</Form.Label>
                                <Form.Control type="text" placeholder="Enter Item Deadline" value={this.state.deadline}
                                              onChange={(event) => this.handleChange("deadline", event)}/>
                            </Form.Group>

                            <Button variant="primary" type="button" onClick={this.onFormSubmit}>
                                Add Item
                            </Button>
                            <Button onClick={() => history.push("/todolist")}>
                                To-Do Lists
                            </Button>
                        </Form>
                    </Col>
                </Row>
                <hr/>
                <Row>
                    <Col>
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>Name
                                    <Button onClick={() => this.sortItems('name', 'asc')}>Sort Asc</Button>
                                    <Button onClick={() => this.sortItems('name', 'desc')}>Sort Desc</Button>
                                </th>
                                <th>Description</th>
                                <th>Deadline
                                    <Button onClick={() => this.sortItems('deadline', 'asc')}>Sort Asc</Button>
                                    <Button onClick={() => this.sortItems('deadline', 'desc')}>Sort Desc</Button></th>
                                <td>Status
                                    <Button onClick={() => this.sortItems('status', 'asc')}>Sort Asc</Button>
                                    <Button onClick={() => this.sortItems('status', 'desc')}>Sort Desc</Button></td>
                                <th>Delete</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.items.map((item) => {

                                return <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>{item.description}</td>
                                    <td>{item.deadline}</td>
                                    <td>{item.status}  <Button onClick={() => this.UpdateItem(item.id)}>
                                        Status Change
                                    </Button></td>
                                    <td><Button onClick={() => this.DeleteItem(item.id)}>
                                       Delete Item
                                    </Button></td>
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

export default ToDoListDetail;