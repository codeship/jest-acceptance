import isPromise from './isPromise'

type Diff = {
  diffA: string
  diffB: string
} | void

type VueWrapper = {
  html(): string
  find(selector: Object | string): any
}

class Tester {
  private wrapper: VueWrapper
  private priorHtml: string

  constructor (wrapper: VueWrapper) {
    this.wrapper = wrapper
    this.priorHtml = ''
  }

  init() {
    this.priorHtml = this.html()
    return this.priorHtml
  }

  next() : Diff {
    const diffA = this.priorHtml
    const diffB = this.html()
    this.priorHtml = this.html()
    return { diffA, diffB }
  }

  fillIn(name: string, value: string) : void {
    const input = this.wrapper.find(`[name="${name}"]`)
    input.element.value = value
    input.trigger('input')
  }

  click(selector: string | object) : void {
    this.wrapper.find(selector).trigger('click')
  }

  private html() : string {
    return this.wrapper.html()
  }
}

export default Tester
