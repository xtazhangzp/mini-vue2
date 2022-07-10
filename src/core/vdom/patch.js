export function patch(oldVnode,vnode){
  // NOTE 1、真实dom节点
  let el = null
  const isRealElement = oldVnode.nodeType
  if(isRealElement){
    const oldElm = oldVnode
    // 先把新的虚拟dom创建为真的dom元素，插入到和当前同一层级，再把原来的自己删掉
    const parentElm = oldVnode.parentNode

    const elm = createElm(vnode)
    el = parentElm.insertBefore(elm, oldVnode.nextSibling)
    // insertBefore() 方法在您指定的已有子节点之前插入新的子节点。
    parentElm.removeChild(oldElm)
    
  }
  return el
}

function createElm(vnode){
  const {tag,attrs,children,text,vm} = vnode
  // 普通元素
  if(typeof tag === "string"){
    vnode.el = document.createElement(tag)
    updateProperties(vnode)
    children.forEach(child => {//递归创建儿子节点
      vnode.el.appendChild(createElm(child))
    });
  }else{
    vnode.el = document.createTextNode(text)
  }
  return vnode.el
}

// 更新属性
function updateProperties(vnode){
  const newProps = vnode.data || {};
  const el = vnode.el;
}