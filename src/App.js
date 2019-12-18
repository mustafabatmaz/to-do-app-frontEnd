import React from 'react';
import logo from './logo.svg';
import './App.css';
import LoginScreen from './screens/Login';
import RegisterScreen from './screens/Register';
import ToDoListsScreen from './screens/ToDoLists';
import ToDoListDetailScreen from './screens/ToDoListDetail';
import history from "./history";

const PAGES = {
    '': LoginScreen,
    'login': LoginScreen,
    'register': RegisterScreen,
    'todolist': ToDoListsScreen,
    'todolistdetails': ToDoListDetailScreen,
};

const PROTECTED_PAGES = ['todolists', 'todolistdetails']

class App extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            pathname: window.location.pathname,
            items: [{id:1, name:"a1"}, {id:2, name:"a2"}]
        }

        history.onChange(pathname => {
            this.setState({pathname: pathname});
        });

    }

    render() {

        let isAuth = localStorage.getItem('token') != null;

        let [, path, ...rest] = this.state.pathname.split("/");

        let extraData = {};
        for (let i=0; i<rest.length; i=i+2){
            let key=rest[i];
            let value=rest[i+1];
            extraData[key] = value;
        }

        if(PROTECTED_PAGES.includes(path) && !isAuth) {
            return <LoginScreen />
        } else if(!isAuth && path != "login") {
            history.push("/login")
        }

        const Handler = PAGES[path] || LoginScreen;

        return <Handler requestData={extraData}/>;
    }
}

export default App;
