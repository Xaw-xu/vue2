export function patch(oldVnode, vnode) {
  debugger
  if (!oldVnode) {
    // 组件
    return createElm(vnode)
  } else {
    const isRealElement = oldVnode.nodeType;
    if (isRealElement) {
      const oldElm = oldVnode;
      const parentElm = oldElm.parentNode;

      let el = createElm(vnode);
      parentElm.insertBefore(el, oldElm.nextSibling);
      parentElm.removeChild(oldElm);

      return el;
    }
  }
}

function createComponent(vnode) {
  let i = vnode.data;
  if ((i = i.hook) && (i = i.init)) {
    i(vnode);
  }
  // vnode.init()
  if(vnode.componentInstance) {
    return true
  }
}

function createElm(vnode) {
  let { tag, children, key, data, text } = vnode;
  if (typeof tag === "string") {
    if (createComponent(vnode)) {
      return vnode.componentInstance.$el
    }

    vnode.el = document.createElement(tag);
    updateProperties(vnode);
    children.forEach((child) => {
      return vnode.el.appendChild(createElm(child));
    });
  } else {
    vnode.el = document.createTextNode(text);
  }
  return vnode.el;
}

function updateProperties(vnode) {
  let newProps = vnode.data;
  let el = vnode.el;
  for (const key in newProps) {
    if (key === "style") {
      for (const styleName in newProps[key]) {
        if (newProps[key][styleName]) {
          el.style[styleName] = newProps.style[styleName];
        } else if (key === "class") {
          el.className = newProps.class;
        } else {
          el.setAttribute(key, newProps[key]);
        }
      }
    }
  }
}
