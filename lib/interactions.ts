class Interactions {
  wrapper: any

  constructor (wrapper: any) {
    this.wrapper = wrapper
  }

  fillIn(name: string, value: string) {
    const input = this.wrapper.find(`[name="${name}"]`)
    input.element.value = value
    input.trigger('input')
  }

  click(selector: string | object) {
    this.wrapper.find(selector).trigger('click')
  }
}

export default Interactions
