import * as vue from 'jest-serializer-vue'
import * as diff from 'snapshot-diff-serializer'

function test(value: string) : boolean {
  return vue.test(value) || diff.test(value)
}

function print(value: string, serializer: any) : string {
  let result = ''

  if (vue.test(value)) {
    result = vue.print.apply(null, arguments)
  } else if (diff.test(value)) {
    result = diff.print.apply(null, arguments)
  }

  return result
}

export { test, print }
