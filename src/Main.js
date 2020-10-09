import {loginFromToken} from './utility/loginFromToken';
import h from './library/hyperscript';
import Navigation from './components/Navigation';
import Component from './library/Component';
import Login from './pages/Login';
import Register from './pages/Register';
import Posts from './pages/Posts';
import NewPost from './pages/NewPost';
import {user} from './utility/loginFromToken';


export default class Main extends Component {
    constructor() {
        super();
        this.state = {
            isLoggedIn: false,
            route: 'login',
            navigationLinks: ['Home', 'Login', 'Register']
        }
        this.login();
    }

    login() {
        this.state.isLoggedIn = loginFromToken();
    }

    changeRoute = (routeName) => {
        this.setState({route: routeName});
    }

    setUser = (user) => {
        this.setState({isLoggedIn: user});
    }
    
    render() {
        if (this.state.isLoggedIn) {
            return h('main', {class: 'mainPage'}, h(Navigation, {route: this.changeRoute, setLoggedIn: this.setUser, exit: this.logout}),
                this.state.route === 'newPost' ? h(NewPost) : h(Posts));
        }
        if (this.state.route === 'register') {
            return h(Register, {route: this.changeRoute})
        }
        if (this.state.route === 'login') {
            return h(Login, {route: this.changeRoute, setLoggedIn: this.setUser})
        }
    }
}
