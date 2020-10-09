import h from '../library/hyperscript';
import Component from '../library/Component';
import NewPost from '../pages/NewPost'

export default class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return h(
            'div', {},
            h('form', {},
                h('i', {click: () => this.props.route('Posts')}),
                h('i', {click: () => this.props.route('newPost')})
            ),
            h('i', {click: () => this.props.exit()})
        )
    }
}