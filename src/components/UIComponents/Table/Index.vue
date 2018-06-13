<template>
  <div class="table-responsive">
    <table class="table table-hover">
      <thead>
      <slot name="columns">
        <th v-if="buttonsFirst && buttons.length" class="text-center">Operations</th>

        <template v-for="column in columns">
          <c-th :column="column"></c-th>
        </template>

        <th v-if="! buttonsFirst && buttons.length" class="text-center">Operations</th>
      </slot>
      </thead>
      <tbody>
      <tr v-for="item in data">
        <slot :row="item">
          <td v-if="buttonsFirst && buttons.length">
            <div class="flexible-operations-wrapper">
              <template v-for="button in buttons">
                <c-tb :item="item" :button="button"></c-tb>
              </template>
            </div>
          </td>

          <template v-for="column in columns">
            <c-td :item="item" :column="column"></c-td>
          </template>

          <td v-if="! buttonsFirst && buttons.length">
            <div class="flexible-operations-wrapper">
              <template v-for="button in buttons">
                <c-tb :item="item" :button="button"></c-tb>
              </template>
            </div>
          </td>
        </slot>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import CTh from './Header'
  import CTd from './Data'
  import CTb from './Button'

  export default {
    name: 'CTable',
    components: {
      CTh,
      CTd,
      CTb
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

<style scoped>
  .flexible-operations-wrapper {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
  }

  .flexible-operations-wrapper button{
    margin: 5px;
  }

</style>
