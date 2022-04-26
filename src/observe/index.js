import {arrayMethods} from './array.js'
import { isObject,def } from "../util/index";
import Dep from './dep.js';

class Observ {
    constructor(value) {
        this.dep = new Dep()
        def(value,'__ob__',this)
        if(Array.isArray(value)){
            // value.__ob__=this
            // Object.defineProperty(value,'__ob__',{
            //     enumerable:false,
            //     configurable:false,
            //     value:this
            // })
            value.__proto__ = arrayMethods
            this.observeArray(value)
        }else{
            this.walk(value)
        }
    }
    observeArray(value) {
        for (let i = 0; i < value.length; i++) {
           observe(value[i])
        }
    }
    walk(data) {
        let keys = Object.keys(data)
        for (let index = 0; index < keys.length; index++) {
            let key = keys[index]
            let value = data[key]
            defineReactive(data,key,value)
        }
    }
}

function defineReactive(data,key,value) {
    let dep = new Dep()
    let childob = observe(value)
    Object.defineProperty(data,key,{
        configurable:true,
        enumerable:true,
        get() {
            if(Dep.target) {
                dep.depend()
                if(childob) {
                    childob?.dep?.depend()
                    if(Array.isArray(value)){
                        dependArray(value)
                    }
                }
            }
            return value
        },
        set(newValue) {
            if(newValue===value) return
            observe(newValue)
            value = newValue
            dep.notify()
        }
    })
}

function dependArray(value) {
    for (let i = 0; i < value.length; i++) {
        let current = value[i]
        current.__ob__&&current.__ob__.dep.depend()
        if(Array.isArray(current)) {
            dependArray(current)
        }
    }
}

export function observe(data) {
    if(!isObject(data)) {
        return
    }
    return new Observ(data)
}