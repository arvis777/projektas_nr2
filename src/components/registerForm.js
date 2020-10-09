import {generateForm} from './generateForm';
import {main} from '../pages/main';
import {loginForm} from './loginForm';
import {mount} from '../library/mount';
import {createNode} from '../library/createNode'

export function registerForm() {
    return generateForm(inputs, buttons, register);
}

function register(e) {
    e.preventDefault();

    const credentials = {};

    inputs.forEach(inputData => {
        credentials[inputData.name] = inputData.value;
    })

    fetch('http://rest.stecenka.lt/register', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(credentials)
    })
        .then(response => response.json())
        .then(data => {
            if(data === 'success') {
                mount(loginForm());
            }
        });
};

const inputs = [
    {
        placeholder: 'Name',
        name: 'vardas',
        type: 'vardas'
    },
    {
        placeholder: 'Last Name',
        name: 'pavarde',
        type: 'pavarde'
    },
    {
        placeholder: 'El@mail.com',
        name: 'email',
        type: 'email'
    },
    {
        placeholder: 'Password',
        name: 'password',
        type: 'password'
    }
]

const buttons = [
    {
        name: 'register',
        type: 'submit',
        title: 'Register'
    }
]