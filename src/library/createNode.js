export function createNode(virtualNode) {
    console.log(virtualNode);
    const element = document.createElement(virtualNode.nodeName);

  for (const attributeName in virtualNode.attributes) {
      if (typeof virtualNode.attributes[attributeName] === 'function') {
          element.addEventListener(attributeName, virtualNode.attributes[attributeName]);
      } else {
          element.setAttribute(attributeName, virtualNode.attributes[attributeName]);
      }
  }

  virtualNode.children.forEach(child => {
      if (typeof child === 'string') {
          const textNode = document.createTextNode(child);
          element.append(textNode);
      } else {
          element.append(createNode(child));
      }
  });

  return element;
}
