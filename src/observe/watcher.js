import {pushTarget,popTarget} from './dep'
import {queueWatcher} from './schedular'

let id = 0

class Watcher {
    constructor(vm,exprOrfn,callback,options){
        this.vm = vm
        this.callback = callback
        this.options = options
        this.id= id++
        this.getters = exprOrfn
        this.depsId = new Set()
        this.deps = []
        this.get()
    }
    addDep(dep) {
        let id = dep.id
        if(!this.depsId.has(id)){
            this.depsId.add(id)
            this.deps.push(dep)
            dep.addSub(this)
        }
    }
    get() {
        pushTarget(this)
        this.getters()
        popTarget()
    }
    update() {
        // this.get()
        queueWatcher(this)
    }
    run() {
        this.get()
    }
}



export default Watcher