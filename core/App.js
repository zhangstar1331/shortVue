import { reactivity } from './reactivity/reactive.js'
import { h } from './h.js'
export default {
    //渲染函数 template -> render
    render(context) {
        // const div = document.createElement('div')
        // div.innerText = context.state.count
        // return div

        //转为虚拟dom表示
        return h("div", {
            id: 'app-id',
            class: 'check'
        }, 
        //String(context.state.count)
        [h('p',null,'aaa'),h('p',null,'bbb')]
        )
    },
    //响应式
    setup() {
        const state = reactivity({
            count: 1
        })
        window.state = state
        return { state }
    }
}
