import {createNode} from './createNode';

export function mount(virtualNode, parent) {
    const element = createNode(virtualNode);
    parent.append(element);
}
