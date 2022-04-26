import { ASSETS_TYPE } from "./const";

export function initAssetRegisters(Vue) {
  ASSETS_TYPE.forEach((type) => {
    Vue[type] = function (id, definition) {
      if (type === "component") {
        definition = this.options._base.extend(definition);
      } else if (type === "filter") {
      } else if (type === "directive") {
      }
      this.options[type+'s'][id] = definition
    };
  });
}
