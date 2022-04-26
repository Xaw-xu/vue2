import Watcher from "./observe/watcher"
import { patch } from "./vdom/patch"
export function lifecycleMixin(Vue){
    Vue.prototype._update = function(vnode) {
        const vm = this
        vm.$el = patch(vm.$el,vnode)
    }
}

export function mountComponent(vm,el) {
    const options = vm.$options
    vm.$el = el
    callHook(vm,'beforeMount')
    let updateComponent = ()=>{
        vm._update(vm._render())
    }
    new Watcher(vm,updateComponent,()=>{},true)
    callHook(vm,'mounted')
}

export function callHook(vm,hook) {
    const handlers = vm.$options?.[hook]
    if(handlers){
        for (let i = 0; i < handlers.length; i++) {
            handlers[i].call(vm)
        }
    }
}