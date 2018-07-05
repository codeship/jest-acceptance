import AbstractTester from './abstract-tester'

type VueWrapper = {
  html(): string
  find(selector: object | string): any
}

export default class VueTester extends AbstractTester {
  private wrapper: VueWrapper

  constructor (wrapper: VueWrapper) {
    super()
    this.wrapper = wrapper
    this.setPriorHtml(this.nextHtml())
  }

  fillIn(name: string, value: string) : void {
    const input = this.wrapper.find(`[name="${name}"]`)
    input.element.value = value
    input.trigger('input')
  }

  click(selector: string | object) : void {
    this.wrapper.find(selector).trigger('click')
  }

  protected nextHtml() : string {
    return this.wrapper.html()
  }
}
