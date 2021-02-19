import vue from 'jest-serializer-vue'
import diff from 'snapshot-diff-serializer'

function test (value: string): boolean {
  return vue.test(value) || diff.test(value)
}

function print (value: string, serializer: any): string {
  if (vue.test(value)) {
    return vue.print.apply(null, [value, serializer])
  } else if (diff.test(value)) {
    return diff.print.apply(null, [value, serializer])
  }
  return ''
}

export {
  test,
  print
}
