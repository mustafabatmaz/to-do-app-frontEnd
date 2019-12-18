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

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            shouldShowError: false,
        };
    }

    onFormSubmit = (button) => {
        this.login({
            username: this.state.username,
            password: this.state.password
        })
    }

    login = async (data) => {
        try {
            const response = await Api.POST('http://localhost:8080/auth/login', data)
            let authHeader = response.headers.get("authorization");
            if (response.status == 200){
                localStorage.setItem('token', authHeader);
                history.push("/todolist")
            }
            else{
                console.log("Username or password is wrong !");
                this.setState({shouldShowError: true});
            }

        } catch (e) {
            console.log(e);
            this.setState({shouldShowError: true});
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
                        <h1>Login page</h1>
                        {this.state.shouldShowError && <span>Username or password wrong !!</span>}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="Enter username" value={this.state.username}
                                              onChange={(event) => this.handleChange("username", event)}/>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" value={this.state.password}
                                              onChange={(event) => this.handleChange("password", event)}/>
                            </Form.Group>
                            <Button variant="primary" type="button" onClick={this.onFormSubmit}>
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
                <Row style={{marginTop:10}}>
                    <Col>
                        <Button onClick={()=> history.push("/register")}>
                            Register
                        </Button>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Login;