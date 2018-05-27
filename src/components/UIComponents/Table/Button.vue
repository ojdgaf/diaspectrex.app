<template>
  <div class="d-inline-block">
    <button v-if="isMethod" @click="executeMethod" class="btn btn-icon ml-1" :class="buttonClass">
      <span v-html="button.display"></span>
    </button>
    <button v-if="isRoute" class="btn btn-icon ml-1" :class="buttonClass">
      <router-link :to="getRoute()">
        <span v-html="button.display"></span>
      </router-link>
    </button>
  </div>
</template>

<script>
  export default {
    name: 'TableButton',
    props: {
      button: {
        type: Object,
        required: true
      },
      item: {
        type: Object,
        required: true
      }
    },
    computed: {
      isMethod: function () {
        return this.button.hasOwnProperty('method')
      },
      isRoute: function () {
        return this.button.hasOwnProperty('route')
      },
      buttonClass: function () {
        return this.button.class ? this.button.class : 'btn-info'
      }
    },
    methods: {
      executeMethod () {
        return this.button.method(this.item)
      },
      getRoute () {
        let params = {}

        for (let param in this.button.route.params) {
          params[param] = this.item[this.button.route.params[param]]
        }

        return {
          name: this.button.route.name,
          params
        }
      }
    }
  }
</script>

<style scoped>

</style>
