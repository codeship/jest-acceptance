import AbstractTester from './abstract-tester'

export default class VueTester extends AbstractTester {
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
