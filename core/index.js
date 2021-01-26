import {effectWatch} from './reactivity/reactive.js'
import {mountElement} from './renderer/mountElement.js'
export function creatApp(rootComponent){
    return {
        //挂载到dom
        mount(rootContainer){
            const context = rootComponent.setup()
            effectWatch(()=>{
                rootContainer.innerHTML = ``
                //const element = rootComponent.render(context)
                const vdom  = rootComponent.render(context)
                //rootContainer.append(element)
                mountElement(vdom,rootContainer)
            })
        }
    }
}