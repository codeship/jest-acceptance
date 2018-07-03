type Diff = {
  diffA: string
  diffB: string
} | void

export default abstract class AbstractTester {
  private priorHtml: string
  protected wrapper: any

  constructor (wrapper: any) {
    this.wrapper = wrapper
    this.priorHtml = this.nextHtml()
  }

  current() {
    return this.priorHtml
  }

  next() : Diff {
    const diffA = this.priorHtml
    const diffB = this.nextHtml()
    this.priorHtml = this.nextHtml()
    return { diffA, diffB }
  }

  abstract fillIn(name: string, value: string): void
  abstract click(selector: Object | string): void
  protected abstract nextHtml(): string
}
