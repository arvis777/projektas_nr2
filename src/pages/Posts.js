import Component from '../library/Component';
import h from '../library/hyperscript';
import {user} from '../utility/loginFromToken';
import Navigation from '../components/Navigation'

export default class Posts extends Component {
    constructor(props) {
        console.log(props);
        super(props);
        this.state = {
            posts: []
        };
        this.getPosts()
    }

    getPosts() {
        const user = JSON.parse(localStorage.getItem('user'));

        fetch('http://rest.stecenka.lt/api/skelbimai', {
            headers: {
                'Content-type': 'application/json',
                'Authorization': user.token
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
            })
            .then(data => {

                this.setState({posts: data})
                console.log(this.state.posts)
            })
    }

    createPosts(name, value) {
        this.state.posts[name] = value;
    }

    render() {
        const allPosts = this.state.posts.map(post => {

            const postAll = h(
                'div',
                {class: 'post-card'},
                h('h2', {}, post.title),
                h('h6', {}, post.created_at.split('T')[0]),
                h('p', {}, post.body),
                post.user_id === JSON.parse(localStorage.getItem('user')).id ? h('button',
                    {click: () => deletePost(post.id)}, "Delete") : ''
            )
            return postAll;
        })

        return h('div', {class: 'navBar'}, ...allPosts)
    }
}

function deletePost(id) {
    fetch('http://rest.stecenka.lt/api/skelbimai/' + id, {
        headers: {
            'Content-type': 'application/json',
            'Authorization': user.token
        },
        method: 'DELETE'
    }) .then(user => {
        location.reload()
    });

}