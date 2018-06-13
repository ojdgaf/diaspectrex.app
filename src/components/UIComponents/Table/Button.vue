<template>
  <div class="d-inline-block">
    <button v-if="isMethod" @click="executeMethod" class="btn btn-icon ml-1" :class="buttonClass">
      <span v-html="button.display"></span>
    </button>
    <button v-if="isRoute" class="btn btn-icon ml-1" :class="buttonClass">
      <router-link :to="routeObject">
        <span v-html="button.display"></span>
      </router-link>
    </button>
  </div>
</template>

<script>
  export default {
    name: 'CTb',
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
      routeObject: function () {
        let params = {}

        for (let param in this.button.route.params) {
          params[param] = this.item[this.button.route.params[param]]
        }
        
        return {
          name: this.button.route.name,
          params
        }
      },
      buttonClass: function () {
        return this.button.class ? this.button.class : 'btn-info'
      }
    },
    methods: {
      executeMethod () {
        return this.button.method(this.item)
      }
    }
  }
</script>

<style scoped>

  button.btn-default > a {
     color: #888;
  }

  button.btn-default > a:hover,
  button.btn-default > a:active,
  button.btn-default > a:visited {
    color: #868686;
  }

</style>
