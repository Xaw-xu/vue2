import initMixin from "./mixin"
import { initAssetRegisters } from "./assets"
import { ASSETS_TYPE } from "./const"
import { initExtend } from "./extend"

export function initGlobalAPI(Vue) {
    Vue.options = {}
    initMixin(Vue)
    
    ASSETS_TYPE.forEach(type=>{
        Vue.options[type+'s'] = {}
    })
    Vue.options._base = Vue
    initExtend(Vue)
    initAssetRegisters(Vue)
}