import {generateForm} from './generateForm';
import {main} from '../pages/main';
import {mount} from '../library/mount';
import {user} from '../utility/loginFromToken';

export function loginForm() {
    return generateForm(inputs, buttons, fn);
}

function fn(e) {
    e.preventDefault();

    const credentials = {};

    inputs.forEach(inputData => {
        credentials[inputData.name] = inputData.value;
    })

    fetch('http://rest.stecenka.lt/login', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(credentials)
    })
        .then(response => {
            if(response.ok) {
                return response.json();
            }
        })
        .then(token => {
            if(token) {
                localStorage.setItem('token', token);
                user.token = 'Bearer ' + token;
                mount(mainPage());
            }
        });
}

const inputs = [
    {
        placeholder: 'Email',
        name: 'email',
        type: 'email',
        value: ''
    },
    {
        placeholder: 'Password',
        name: 'password',
        type: 'password',
        value: ''
    }
]

const buttons = [
    {
        name: 'login',
        type: 'submit',
        title: 'Log in'
    }
]
