# jest-acceptance

`jest-acceptance` is a strategy for getting close to user acceptance quality testing, without the overhead of full on browser automation.

This strategy attempts to allow for a minimally mocked approach to ensure the interactions your users are having with your components, produce the expected interface changes.  We do this by combining Jest's [snapshot testing](https://jestjs.io/docs/en/snapshot-testing) ability, with a serialization strategy that allows you to compare the ways your interface change as a result of user interactions by surfacing the before/after interaction diff as a snapshot itself.

Currently targeted at only Vue applications.

## Usage

```js
import { mount } from '@vue/test-utils'
import Tester from 'jest-acceptance'
import MyApp from './src/index.vue'

describe('MyApp', () => {
  it('should work', () => {
    // Mount a new component wrapper with `@vue/test-utils`
    const wrapper = mount(MyApp)

    // Create a new instance
    const tester = new Tester(wrapper)

    // Initialize and test initial HTML output
    expect(tester.init()).toMatchSnapshot()

    // Perform some user interactions, producing/checking diffs along the way.
    tester.fillIn('name', 'Jane')
    tester.click({ ref: 'saveBtn' })
    expect(tester.next()).toMatchSnapshot()

    ui.click({ ref: 'cancelBtn' })
    expect(tester.next()).toMatchSnapshot()
  })
})
```

This would produce three snapshots:

1. The initial rendered HTML of the component
2. The effect the users interactions have on the HTML, in the form of a diff.
3. The effect the users interactions have on the HTML, in the form of a diff.

We find the interaction diffs more useful than full repeated HTML snapshots because many times it is very difficult to spot the key interface changes you expect.  This approach allows you to follow the diffs like a story.
