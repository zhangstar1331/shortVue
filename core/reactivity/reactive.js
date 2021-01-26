//手写响应式
let currentEffect;
class Dep {
    constructor() {
       this.effects = new Set()//依赖收集集合，使用set防止其重复收集 
    }
    //依赖收集
    depend() {
        if(currentEffect){
            this.effects.add(currentEffect)
        }
    }
    //派发更新
    notice() {
        //遍历依次去执行收集到的依赖
        this.effects.forEach(effect=>{
            effect()
        })
    }
}

//建立键与dep直接的一一对应关系
let targetMap = new Map()
function getDep(target,key){
    let depsMap = targetMap.get(target)
    if(!depsMap){
        depsMap = new Map()
        targetMap.set(target, depsMap)
    }
    let dep = depsMap.get(key)
    if(!dep){
        dep = new Dep()
        depsMap.set(key,dep)
    }
    return dep
}

//响应式
export function reactivity(obj) {
    return new Proxy(obj,{
        get(target,key){
            const dep = getDep(target,key)
            //收集依赖
            dep.depend()
            return Reflect.get(target,key)
        },
        set(target,key,newVal){
            const dep = getDep(target,key)
            const ret = Reflect.set(target,key,newVal)
            //设置值之后再去触发更新
            dep.notice()
            return ret
        }
    })
}

//监听变化
export function effectWatch(effect) {
   currentEffect = effect
   effect()//第一次先执行依次
   currentEffect = null
}
