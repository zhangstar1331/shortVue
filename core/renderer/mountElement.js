//将vdom -> dom
export function mountElement(vnode,rootContainer){
    const {tag,props,children} = vnode
    const el = document.createElement(tag)
    //处理属性
    if(props){
        for(let key in props){
            el.setAttribute(key,props[key])
        }
    }
    //处理子节点内容
    if(typeof children === 'string'){
        const textNode = document.createTextNode(children)
        el.append(textNode) 
    }else if(Array.isArray(children)){
        children.forEach(v=>{
            //递归处理子节点
            mountElement(v,el)
        })
    }
    rootContainer.append(el)
}