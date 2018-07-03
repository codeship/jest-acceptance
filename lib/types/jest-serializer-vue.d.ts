declare module 'jest-serializer-vue' {
  export function test(value: string): boolean
  export function print(value: string, serializer: any): string
}
