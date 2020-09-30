import {createNode} from '../library/createNode';
import {user} from '../utility/login';
import {sveikinimas} from './sveikinimas';
import {addPostForm} from './addPostForm';

export function mainPage() {

    fetch('http://rest.stecenka.lt/api/sveikinimai', {
        headers: {
            'Content-type': 'application/json',
            'Authorization': user.token,
        }
    })
        .then(response => response.json())
        .then(sveikinimai => {
            const sveikinimoElementai = sveikinimai.map(sveikinimasData => sveikinimas(sveikinimasData));
            const main = createNode('main', {}, ...sveikinimoElementai);
            mount(main);
        });
    //     main.append(addPostForm());
    //
    // return main;
}