<template>
  <table class="table">
    <thead>
    <slot name="columns">
      <th v-if="buttonsFirst && buttons.length">Operations</th>

      <template v-for="column in columns">
        <table-header :column="column"></table-header>
      </template>

      <th v-if="! buttonsFirst && buttons.length">Operations</th>
    </slot>
    </thead>
    <tbody>
    <tr v-for="item in data">
      <slot :row="item">
        <td v-if="buttonsFirst && buttons.length">
          <template v-for="button in buttons">
            <table-button :item="item" :button="button"></table-button>
          </template>
        </td>

        <template v-for="column in columns">
          <table-data :item="item" :column="column"></table-data>
        </template>

        <td v-if="! buttonsFirst && buttons.length">
          <template v-for="button in buttons">
            <table-button :item="item" :button="button"></table-button>
          </template>
        </td>
      </slot>
    </tr>
    </tbody>
  </table>
</template>
<script>
  import TableHeader from './Header'
  import TableData from './Data'
  import TableButton from './Button'

  export default {
    name: 'l-table',
    components: {
      TableHeader,
      TableData,
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
    }
  }
</script>
<style>
</style>
