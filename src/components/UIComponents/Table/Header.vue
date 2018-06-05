<template>
  <th v-html="value" class="text-center"></th>
</template>

<script>
  export default {
    name: 'CTh',
    props: {
      column: {
        type: [String, Object],
        required: true
      }
    },
    computed: {
      value: function () {
        return typeof this.column === 'string' ? this.column : this.column.display
      }
    }
  }
</script>

<style scoped>

</style>
