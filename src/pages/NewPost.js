import Component from '../library/Component';
import h from '../library/hyperscript';
// import {user} from '../utility/loginFromToken';
import {navigation} from '../components/Navigation'

export default class NewPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputs: [
                {
                    placeholder: 'Selling',
                    name: 'title',
                    labelText: 'TITTLE'
                },
                {
                    placeholder: 'Add your ad',
                    name: 'body',
                    labelText: 'Addvertisement'
                }
            ],
            buttons: [
                {
                    name: 'publish',
                    type: 'submit',
                    title: 'PUBLISH'
                }
            ],
            newPost: {
                title: '',
                body: ''
            },
        };
    }

    newPosts(e) {
        e.preventDefault();

        const user = JSON.parse(localStorage.getItem('user'));
        console.log(this.state.newPost);


        fetch('http://rest.stecenka.lt/api/skelbimai', {
            headers: {
                'Content-type': 'application/json',
                'Authorization': user.token
            },
            method: 'POST',
            body: JSON.stringify(this.state.newPost)
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(user => {
                if (user) {
                    console.log('asd');
                    this.props.route('posts')
                }
            });

    }

    createNewPost(name, value) {
        this.state.newPost[name] = value;
    }

    render() {
        const inputs = this.state.inputs.map(input => {
            return h('label', {}, input.labelText,
                h(
                    'input',
                    {
                        placeholder: input.placeholder,
                        label: input.id,
                        keyup: (e) => this.createNewPost(input.name, e.target.value)
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

        const iconTop = h('i', {class: 'far fa-edit'});

        const form = h('form', {submit: (e) => {this.newPosts(e)}}, iconTop, ...inputs, ...buttons);
        return h('div', {class: 'loginForm'}, form);
    }
}


