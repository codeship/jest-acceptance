import AbstractTester from './abstract-tester'

interface VueWrapper {
  html (): string
  // Find is deprecated
  find (selector: string | object): any
  findComponent (selector: string | object): any
  vm: {
    $nextTick (): Promise<void>
  }
}

export default class VueTester extends AbstractTester {
  private wrapper: VueWrapper

  constructor (wrapper: VueWrapper) {
    super()
    this.wrapper = wrapper
    this.setPriorHtml(wrapper.html())
  }

  fillIn (name: string, value: string): void {
    const input = this.wrapper.find(`[name="${name}"]`)
    input.element.value = value
    input.trigger('input')
  }

  click (selector: string | object): void {
    const findMethod = typeof selector === 'string' ? 'find' : 'findComponent'

    this.wrapper[findMethod](selector).trigger('click')
  }

  protected async nextHtml (): Promise<string> {
    await this.wrapper.vm.$nextTick()

    return this.wrapper.html()
  }

  protected nextHtmlSync (): string {
    return this.wrapper.html()
  }
}
