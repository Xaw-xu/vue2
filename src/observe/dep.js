let id = 0;
class Dep {
  constructor() {
    this.id = id++;
    this.subs = [];
  }
  addSub(watcher) {
    this.subs.push(watcher);
  }
  depend() {
    Dep.target.addDep(this)
  }
  notify() {
    this.subs.forEach((w) => w.update());
  }
}

let stack = [];

export function pushTarget(watcher) {
  Dep.target = watcher;
  stack.push(watcher);
}

export function popTarget(watcher) {
  stack.pop();
  Dep.target = stack[stack.length - 1];
}

export default Dep;
