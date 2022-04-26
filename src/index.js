import {initMixin} from './init'
import {renderMixin} from './render.js'
import {lifecycleMixin} from './lifecycle.js'
import { initGlobalAPI } from './initGlobalAPI/index'

function Vue(options) {
    this._init(options)
}
initMixin(Vue)
renderMixin(Vue)
lifecycleMixin(Vue)
initGlobalAPI(Vue)
export default Vue