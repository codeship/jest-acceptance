import AbstractTester from '../lib/abstract-tester'

type AppWrapper = {
  html (): string
}

class Tester extends AbstractTester {
  private wrapper: AppWrapper

  constructor (wrapper: AppWrapper) {
    super()
    this.wrapper = wrapper
    this.setPriorHtml(wrapper.html())
  }

  /* tslint:disable-next-line:no-empty */
  fillIn (name: string, value: string): void { }

  /* tslint:disable-next-line:no-empty */
  click (selector: Object | string): void { }

  async nextHtml (): Promise<string> {
    return this.wrapper.html()
  }
}

describe('AbstractTester', () => {
  describe('#current', () => {
    it('returns the last recorded html state within the tester', () => {
      const html = jest.fn(() => '<p>Hello World!</p>')
      const tester = new Tester({ html })

      expect(tester.current()).toBe('<p>Hello World!</p>')
    })
  })

  describe('#next', () => {
    it('updates the html state within the tester', async () => {
      const html = jest.fn(() => '<p>Hello World!</p>')
      const tester = new Tester({ html })

      expect(tester.current()).toBe('<p>Hello World!</p>')

      html.mockReturnValue('<p>Hello Universe!</p>')
      
      await tester.next()

      expect(tester.current()).toBe('<p>Hello Universe!</p>')
    })

    it('returns an object containing the old and new html', async () => {
      const html = jest.fn(() => '<p>Hello World!</p>')
      const tester = new Tester({ html })

      expect(tester.current()).toBe('<p>Hello World!</p>')

      html.mockReturnValue('<p>Hello Universe!</p>')
      expect(await tester.next()).toEqual({
        diffA: '<p>Hello World!</p>',
        diffB: '<p>Hello Universe!</p>'
      })
    })
  })
})
