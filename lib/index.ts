import Interactions from './interactions'
import isPromise from './isPromise'

type InteractionCallback = (ui: Interactions) => any

type Diff = {
  diffA: string
  diffB: string
} | void

type App = {
  html(): string
}

class User {
  private app: App
  private priorHtml: string
  private ui: Interactions

  constructor (app: App) {
    this.app = app
    this.priorHtml = ''
    this.ui = new Interactions(app)
  }

  init() {
    this.priorHtml = this.app.html()
    return this.priorHtml
  }

  act(interaction: InteractionCallback) : Promise<Diff> | Diff {
    const result = interaction(this.ui)

    if (isPromise(result)) {
      return result.then(() => this.nextDiff())
    } else {
      return this.nextDiff()
    }
  }

  private nextDiff() : Diff {
    const diffA = this.priorHtml
    const diffB = this.app.html()
    this.priorHtml = this.app.html()
    return { diffA, diffB }
  }
}

export default User
