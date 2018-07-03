export default function isPromise(thing: any) : boolean {
  return !!thing && typeof thing.then === 'function'
}
