type IDiff = {
  diffA: string
  diffB: string
} | void

export default abstract class AbstractTester {
  private priorHtml: string

  constructor () {
    this.priorHtml = ''
  }

  setPriorHtml (html: string): void {
    this.priorHtml = html
  }

  current () {
    return this.priorHtml
  }

  nextSync (): IDiff {
    const diffA = this.priorHtml
    const diffB = this.nextHtmlSync()

    this.priorHtml = this.nextHtmlSync()

    return {
      diffA,
      diffB
    }
  }

  async next (): Promise<IDiff> {
    const diffA = this.priorHtml
    const diffB = await this.nextHtml()

    this.priorHtml = await this.nextHtml()

    return {
      diffA,
      diffB
    }
  }

  abstract fillIn (name: string, value: string): void
  abstract click (selector: Object | string): void

  protected abstract nextHtml (): Promise<string>
  protected abstract nextHtmlSync (): string
}
