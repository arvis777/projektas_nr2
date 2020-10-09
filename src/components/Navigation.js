import {hyperscript} from "../library/hyperscript";

export function navigation() {
    const navigationLinks = links.map(link =>  {
        return hyperscript('a',{href: link.href}, link.title);
    });

    const ul = hyperscript('ul', {}, ...navigationLinks);
    return hyperscript('nav', {class: 'navigation'}, ul);
}

const links = [
    {
        href: '/home',
        title: 'Home',
    },
    {
        href: '/login',
        title: 'Login',
    },
    {
        href: '/register',
        title: 'Register',
    }
];