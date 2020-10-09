import Component from '../library/Component';
import h from '../library/hyperscript';
import Login from './Login';

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputs: [
                {
                    placeholder: 'Name',
                    name: 'name',
                    type: 'vardas',
                    labelText: 'Name'
                },
                {
                    placeholder: 'Last Name',
                    name: 'surname',
                    type: 'pavarde',
                    labelText: 'Last Name'
                },
                {
                    placeholder: 'El@mail.com',
                    name: 'email',
                    type: 'email',
                    labelText: 'E-mail'
                },
                {
                    placeholder: 'Password',
                    name: 'password',
                    type: 'password',
                    labelText: 'Password'
                }
            ],
            buttons: [
                {
                    name: 'register',
                    type: 'submit',
                    title: 'Register'
                }
            ],
            credentials: {},
        }
    }

    createCredentials(name, value) {
        this.state.credentials[name] = value;
    }

    register(e) {
        e.preventDefault();

        fetch('http://rest.stecenka.lt/register', {
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(this.state.credentials)
        })
            .then(response => response.json())
            .then(data => {
                if(data === 'success') {
                    this.props.route('login')
                }
            });
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
                        keyup: (e) => this.createCredentials(input.name, e.target.value),
                    }
                )
            );
        });

        const buttons = this.state.buttons.map(button => {
            return h(
                'button',
                {
                    name: button.name,
                    type: button.type,
                },
                button.title
            );
        });

        const iconTop = h('i', {class: 'fas fa-user-plus'});
        const paragraph = h('p', {},);
        const icon = h('button', {class: 'far fa-user-circle', click: () => this.props.route('login')}, 'Go to Login');

        const form = h('form', {submit: (e) => this.register(e)}, iconTop, ...inputs, ...buttons, paragraph, icon);
        return h('div', {class: 'loginForm'}, form);
    }
}