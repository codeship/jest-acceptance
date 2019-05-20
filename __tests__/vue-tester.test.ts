import Vue from 'vue'
import VueTester from '../lib/vue-tester'
import { mount } from '@vue/test-utils'

const TestComponent = Vue.extend({
  template: `
    <div>
      <p>{{ message }}</p>
      <input name="message" type="text" v-model="inputValue"/>
      <button @click="buttonClick">Click Me!</button>
      <ul class="list">
        <li class="old-message">Hello Test <button @click="buttonClick">Remove</button></button></li>
      </ul>
    </div>
  `,

  data () {
    return {
      inputValue: '',
      message: 'Hello World'
    }
  },

  methods: {
    buttonClick () {
      this.message = this.inputValue
    }
  }
})

describe('VueTester', () => {
  describe('#fillIn', () => {
    it('updates the named input value', () => {
      const wrapper = mount(TestComponent)
      const tester = new VueTester(wrapper)

      tester.fillIn('message', 'Hello Universe!')
      expect(wrapper.vm.inputValue).toBe('Hello Universe!')
    })
  })

  describe('#click', () => {
    it('it triggers a click on the selected element', () => {
      const buttonClick = jest.fn()
      const wrapper = mount(TestComponent, {
        methods: { buttonClick }
      })
      const tester = new VueTester(wrapper)

      tester.click('button')
      expect(buttonClick).toHaveBeenCalled()
    })

    it('allows for deep selectors', () => {
      const buttonClick = jest.fn()
      const wrapper = mount(TestComponent, {
        methods: { buttonClick }
      })

      const tester = new VueTester(wrapper)

      tester.click('.list .old-message button')
      expect(buttonClick).toHaveBeenCalled()
    })
  })

  describe('#integration', () => {
    it('produces expected diffs', () => {
      const wrapper = mount(TestComponent)
      const tester = new VueTester(wrapper)

      expect(tester.current()).toMatchSnapshot()

      tester.fillIn('message', 'Hello Universe!')
      tester.click('button')
      expect(tester.next()).toMatchSnapshot()
    })
  })
})
