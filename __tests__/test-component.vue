<template>
  <div>
    <p>{{ message }}</p>
    <input name="message" type="text" v-model="inputValue"/>
    <button @click="buttonClick">Click Me!</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputValue: ''
      message: 'Hello World'
    }
  }

  methods: {
    buttonClick() {
      this.message = this.inputValue
    }
  }
}
</script>
