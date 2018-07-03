# vue-acceptance

`vue-accept` is a strategy for getting close to user acceptance quality testing, without the overhead of full on browser automation.

This strategy attempts to allow for a minimally mocked approach to ensure the interactions your users are having, produce the expected UI changes.  We do this by combining Jest's [snapshot testing]() ability, with a serialization strategy that allows you to compare the ways your UI change as a result of user interactions surfacing the before/after interaction diff as a snapshot itself.

## Usage

```js
import { mount } from '@vue/test-utils'
import User from 'vue-acceptance'
import MyApp from './src/index.vue'

describe('MyApp', () => {
  it('should work', () => {
    // Mount a new component wrapper with `@vue/test-utils`
    const wrapper = mount(MyApp)

    // Create a new instance
    const user = new User(wrapper)

    // Initialize and test initial HTML output
    expect(user.init()).toMatchSnapshot()

    // Perform some user interactions, producing/checking diffs along the way.
    return user
      .act((ui) => {
        ui.fillIn('name', 'Jane')
        ui.click({ ref: 'saveBtn' })
      })
      .then((diff) => {
        // Check this diff
        expect(diff).toMatchSnapshot()
      })
      .then(() => {
        return user.act((ui) => {
          ui.click({ ref: 'cancelBtn' })
        })
      })
      .then((diff) => {
        // Check the next diff
        expect(diff).toMatchSnapshot()
      })
    })
  })
})
```

with async/await

```js
import { mount } from '@vue/test-utils'
import User from 'vue-acceptance'
import MyApp from './src/index.vue'

describe('MyApp', () => {
  it('should work', async () => {
    // Mount a new component wrapper with `@vue/test-utils`
    const wrapper = mount(MyApp)

    // Create a new instance
    const user = new User(wrapper)

    // Initialize and test initial HTML output
    expect(user.init()).toMatchSnapshot()

    // Perform some user interactions, producing/checking diffs along the way.
    let diff

    diff = await user.act(async (ui) => {
      ui.fillIn('name', 'Jane')
      ui.click({ ref: 'saveBtn' })
    })
    // Check this diff
    expect(diff).toMatchSnapshot()

    diff = await user.act(async (ui) => {
      ui.click({ ref: 'cancelBtn' })
    })
    // Check this diff
    expect(diff).toMatchSnapshot()
  })
})
```
