export default function h(nodeNameOrComponent, attributes = {}, ...children) {
    return {nodeNameOrComponent, attributes, children};
}
