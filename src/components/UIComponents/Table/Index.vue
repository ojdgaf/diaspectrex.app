<template>
  <table class="table">
    <thead>
    <slot name="columns">
      <th v-if="buttonsFirst && buttons.length">Operations</th>
      <th v-for="column in columns">{{displayPropertyName(column)}}</th>
      <th v-if="! buttonsFirst && buttons.length">Operations</th>
    </slot>
    </thead>
    <tbody>
    <tr v-for="item in data">
      <slot :row="item">
        <template v-if="! buttonsFirst">
          <td v-for="column in columns" v-if="hasProperty(item, column)">{{itemProperty(item, column)}}</td>
        </template>

        <td v-if="buttons.length">
          <template v-for="button in buttons">
            <table-button :button="button" :data="item"></table-button>
          </template>
        </td>

        <template v-if="buttonsFirst">
          <td v-for="column in columns" v-if="hasProperty(item, column)">{{itemProperty(item, column)}}</td>
        </template>
      </slot>
    </tr>
    </tbody>
  </table>
</template>
<script>
  import TableButton from './Button'

  export default {
    name: 'l-table',
    components: {
      TableButton
    },
    props: {
      columns: Array,
      data: Array,
      buttons: {
        type: Array,
        default: () => []
      },
      buttonsFirst: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      hasProperty (item, column) {
        return item[this.propertyActualName(column)] !== 'undefined'
      },
      itemProperty (item, column) {
        return item[this.propertyActualName(column)]
      },
      propertyActualName(column) {
        if (typeof column === 'string')
          return this.transformToActualName(column)

        return column.actual ? column.actual : this.transformToActualName(column.display)
      },
      displayPropertyName(column) {
        return typeof column === 'string' ? column : column.display
      },
      transformToActualName(propertyDisplayName) {
        return propertyDisplayName.replace(/\s+/g, '_').toLowerCase()
      },
    }
  }
</script>
<style>
</style>
