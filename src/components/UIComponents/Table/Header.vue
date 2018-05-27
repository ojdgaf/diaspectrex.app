<template>
  <th>{{value}}</th>
</template>

<script>
  export default {
    name: 'TableHeader',
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
