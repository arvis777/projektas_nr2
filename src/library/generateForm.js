import {hyperscript} from '../library/hyperscript';

export function generateForm(inputs = [], buttons = [], handler) {
    const inputNodes = inputs.map(inputAttributes => {
        inputAttributes.change = (e) => {
            inputAttributes.value = e.taget.value;
        };

        return hyperscript('input', inputAttributes);
    });

    const buttonNodes = buttons.map(buttonAttributes => {
        return hyperscript('button', buttonAttributes, buttonAttributes.title);
    });

    return hyperscript(
        'form',
        {
            class: 'form form-login',
            method: 'POST',
            submit: handler
        },
        ...inputNodes,
        ...buttonNodes
    );
}
