let oldArrayMethods = Array.prototype;

export let arrayMethods = Object.create(oldArrayMethods);

const methods = [
  "push",
  "unshift",
  "pop",
  "shift",
  "sort",
  "reveres",
  "splice",
];

methods.forEach((method) => {
  arrayMethods[method] = function (...args) {
    let result = oldArrayMethods[method].apply(this, args);
    let inserted;
    let ob = this.__ob__;
    switch (method) {
      case "push":
      case "unshift":
        inserted = args;
        break;
      case "splice":
        inserted = args.slice(2);
      default:
        break;
    }
    if (inserted) {
      ob.observeArray(inserted);
    }
    ob.dep.notify()
    return result;
  };
});
