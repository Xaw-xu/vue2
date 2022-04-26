import { mergeOptions } from "../util/index";
export default function initMixin(Vue) {
    Vue.mixin = function(mixin) {
        this.options = mergeOptions(this.options,mixin)
    }
    Vue.mixin({
        beforeCreate() {
            // console.log('before1111');
        }
    })
}