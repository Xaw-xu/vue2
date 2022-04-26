import {parseHTML} from './paser-html'
import { generate } from './generate';

export function compileToFunction(template) {
  let root = parseHTML(template);
  let code = generate(root)
  let renderFn = new Function(`with(this) {return ${code}}`)
  
  return renderFn
}
