/**
 * @jest-environment jsdom
 */

import Vue from 'vue'
import VueTester from '../lib/vue-tester'
import { mount } from '@vue/test-utils'

const TestComponent = Vue.extend({
  template: `
    <div>
      <p>{{ message }}</p>
      <input name="message" type="text" v-model="inputValue"/>
      <button @click="buttonClick">Click Me!</button>
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
      const wrapper = mount(TestComponent)
      const buttonClick = jest.spyOn(wrapper.vm, 'buttonClick')

      // deprecated
      wrapper.setMethods({ buttonClick })

      const tester = new VueTester(wrapper)

      tester.click('button')
      expect(buttonClick).toHaveBeenCalled()
    })
  })

  describe('#integration', () => {
    it('produces expected diffs', async () => {
      const wrapper = mount(TestComponent)
      const tester = new VueTester(wrapper)

      expect(tester.current()).toMatchSnapshot()

      tester.fillIn('message', 'Hello Universe!')
      tester.click('button')
      expect(await tester.next()).toMatchSnapshot()
    })
  })
})
