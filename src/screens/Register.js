import React from 'react';
import {
    Button,
    Container,
    Row,
    Col,
    Form,
} from 'react-bootstrap';

import history from "../history";
import Api from "../Api";

class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            name: "",
            lastname: "",
            password: "",
            confirmPassword: "",
            shouldShowError : false
        };
    }

    onFormSubmit = (button) => {
        this.register({
            username: this.state.username,
            password: this.state.password,
            name: this.state.name,
            lastname: this.state.lastname
        })
    }
    register  = async (data) => {
        try {
            const response = await Api.POST('http://localhost:8080/auth/register', data);
            if (response.status == 200)
            {
                history.push("/login");
            }
            else {
                console.log("Error occurred while registering !!")
                this.setState({shouldShowError: true})
            }
        }
        catch (e) {
            console.log(e);
            this.setState({shouldShowError : true});
        }
    }

    handleChange = (key, event) => {
        this.setState({[key]: event.target.value});
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <h1>Register page</h1>
                        {this.state.shouldShowError && <span>Error occurred while registering !!</span>}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form>
                            <Form.Group controlId="formBasicUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="Enter username" value={this.state.username}
                                              onChange={(event) => this.handleChange("username", event)}/>
                            </Form.Group>
                            <Form.Group controlId="formBasicName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter name" value={this.state.name}
                                              onChange={(event) => this.handleChange("name", event)}/>
                            </Form.Group>
                            <Form.Group controlId="formBasicLastname">
                                <Form.Label>Lastname</Form.Label>
                                <Form.Control type="text" placeholder="Enter lastname" value={this.state.lastname}
                                              onChange={(event) => this.handleChange("lastname", event)}/>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={this.state.password}
                                          onChange={(event) => this.handleChange("password", event)}/>
                        </Form.Group>
                            <Button variant="primary" type="button" onClick={this.onFormSubmit}>
                                Register
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Register;