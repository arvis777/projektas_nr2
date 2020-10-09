import Register from './Register';
import {mount} from '../library/mount';
import Posts from './Posts';
import {loginFromToken} from '../utility/loginFromToken';
import Component from '../library/Component';
import h from '../library/hyperscript';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputs: [
                {
                    placeholder: 'el@mail.com',
                    name: 'email',
                    type: 'email',
                    labelText: 'El - mail\'as'
                },
                {
                    placeholder: 'Password',
                    name: 'password',
                    type: 'password',
                    labelText: 'Slaptazodis'
                }
            ],
            buttons: [
                {
                    name: 'login',
                    type: 'submit',
                    title: 'Login'
                }
            ],
            credentials: {
                email: '',
                password: ''
            },
        };
    }

    login(e) {
        e.preventDefault();

        fetch('http://rest.stecenka.lt/login', {
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(this.state.credentials)
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(user => {
                console.log("veikia")
                if(user) {
                    localStorage.setItem('user', JSON.stringify(user));
                    this.props.setLoggedIn(true);
                }
            });
    }

    createCredentials(name, value) {
        this.state.credentials[name] = value;
    }

    render() {
        const inputs = this.state.inputs.map(input => {
            return h('label', {}, input.labelText,
                h(
                    'input',
                    {
                        placeholder: input.placeholder,
                        label: input.id,
                        type: input.type,
                        keyup: (e) => this.createCredentials(input.name, e.target.value)
                    }
                )
            );
        });

        const buttons = this.state.buttons.map(button => {
            return h(
                'button',
                {
                    name: button.name,
                    type: button.type
                },
                button.title
            );
        });

        const iconTop = h('i', {class: 'far fa-user-circle'});
        const paragraph = h('a', {}, );
        const icon = h('button', {class: 'fas fa-user-plus', click: () => this.props.route('register')}, 'First time?');

        const form = h('form', {submit: (e) => this.login(e)}, iconTop, ...inputs, ...buttons, paragraph, icon);
        return h('div', {class: 'loginForm'}, form);
    }
}

