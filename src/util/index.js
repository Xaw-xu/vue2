export function isObject(data) {
  return typeof data === "object" && data !== null;
}

export function def(data, key, value) {
  Object.defineProperty(data, key, {
    enumerable: false,
    configurable: false,
    value,
  });
}

export function proxy(vm, source, key) {
  Object.defineProperty(vm, key, {
    get() {
      return vm[source][key];
    },
    set(newValue) {
      vm[source][key] = newValue;
    },
  });
}

const LIFECYCLE_HOOKS = [
  "beforeCreate",
  "created",
  "beforeMount",
  "mounted",
  "beforeUpdate",
  "updated",
  "beforeDestroy",
  "destroyed",
];

let strats = {};
LIFECYCLE_HOOKS.forEach((hook) => {
  strats[hook] = mergeHook;
});

function mergeAssets(parentVal, childVal) {
  const res = Object.create(parentVal);
  if (childVal) {
    for (const key in childVal) {
      res[key] = childVal[key];
    }
  }
  return res
}

strats.components = mergeAssets;

function mergeHook(parentVal, childVal) {
  if (childVal) {
    if (parentVal) {
      return parentVal.concat(childVal);
    } else {
      return [childVal];
    }
  } else {
    return parentVal;
  }
}

export function mergeOptions(parent, child) {
  const options = {};
  for (const key in parent) {
      mergeFied(key);
  }
  for (const key in child) {
      mergeFied(key);
  }
  function mergeFied(key) {
    if (strats[key]) {
      return (options[key] = strats[key](parent?.[key], child?.[key]));
    }
    if (typeof parent?.[key] === "object" && typeof child?.[key] === "object") {
      options[key] = {
        ...parent[key],
        ...child[key],
      };
    } else if (child[key] == null) {
      options[key] = parent[key];
    } else {
      options[key] = child[key];
    }
  }
  return options;
}

export function isReservedTag(tagName) {
    let str = `p,div,span,input,button`
    let obj = {}
    str.split(',').forEach(tag=>{
        obj[tag] = true
    })
    return obj[tagName]
}
