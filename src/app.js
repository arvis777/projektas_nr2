import {loginFromToken} from './utility/login';
// import {login} from './pages/login';
import {loginForm} from './components/loginForm';
import {registerForm} from './components/registerForm';
// import {main} from './pages/main';
import {createNode} from './library/createNode';
import {mount} from './library/mount';
import {hyperscript} from './library/hyperscript';
import {navigation} from './components/navigation';

const root = document.getElementById('kibiras');

mount(loginForm(), root);



