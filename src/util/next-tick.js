let callbacks = []

let waiting = false

function flushCallback() {
    callbacks.forEach(f=>f())
    waiting = false
    callbacks = []
}
export function nextTick(cb) {
    callbacks.push(cb)
    if(!waiting) {
        setTimeout(flushCallback, 0);
        waiting = true
    }
}