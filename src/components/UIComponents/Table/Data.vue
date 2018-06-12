<template>
  <td class="text-center">
    <span v-if="overlarge" @click="alertValue">Click to see...</span>
    <div v-else-if="_.isArray(value)">
      <div v-for="el in value">
        <div v-if="_.isObject(el)" class="text-left">
          <p v-for="(value, key) in el">
            {{ `${capitalizeFirstLetter(key)}: ${value}` }}
          </p>
        </div>
        <div v-else>
          <p>{{ el }}</p>
        </div>
      </div>
    </div>
    <span v-else v-html="value"></span>
  </td>
</template>

<script>
  export default {
    name: 'CTd',
    props: {
      column: {
        type: [String, Object],
        required: true
      },
      item: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        booleans: {
          true: `<i class="fas fa-check"></i>`,
          false: `<i class="fas fa-minus"></i>`
        },
        strings: {
          male: `<i class="fas fa-male"></i>`,
          female: `<i class="fas fa-female"></i>`
        },
        empty: `<i class="fas fa-times"></i>`
      }
    },
    computed: {
      value: function () {
        if (this.itemHasProperty()) {
            let propertyValue = this.propertyValue();

            if ((this._.isArray(propertyValue) && propertyValue.length === 0) || propertyValue === null)
                return this.empty;

            return propertyValue;
        }

        return this.empty
      },
      overlarge: function () {
        return this.value && this.value.length > 100 && !this._.isArray(this.value)
      }
    },
    methods: {
      alertValue () {
        this.$swal({
          html: this.value
        })
      },
      itemHasProperty () {
        return this._.get(this.item, this.propertyActualName()) !== undefined
      },
      propertyValue () {
        const value = this._.get(this.item, this.propertyActualName())

        switch (typeof value) {
          case 'boolean':
            return this.filterBooleans(value)
          case 'string':
            return this.filterStrings(value)
          default:
            return value
        }
      },
      propertyActualName () {
        if (typeof this.column === 'string')
          return this.transformDisplayNameToActual(this.column)

        return this.column.hasOwnProperty('actual') ?
          this.column.actual : this.transformDisplayNameToActual(this.column.display)
      },
      transformDisplayNameToActual (propertyDisplayName) {
        return propertyDisplayName.replace(/\s+/g, '_').toLowerCase()
      },
      filterBooleans (value) {
        return value ? this.booleans.true : this.booleans.false
      },
      filterStrings (value) {
        return this.strings.hasOwnProperty(value) ? this.strings[value] : value
      },
      capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
    }
  }
</script>

<style scoped>

</style>
