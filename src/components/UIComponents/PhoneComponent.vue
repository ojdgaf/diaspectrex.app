<template>
    <div>
        <label class="hint" v-show="phones.length > 0 && phones[0].number !== ''">
                To delete phone just clear the field with desired phone.
        </label>
        <div role="group" v-for="phone in phones">
            <b-form-input
                  v-model.trim="phone.number"
                  type="text"
                  :state="isNumberValid(phone.number)"
                  placeholder="Type the phone number..."
            >
            </b-form-input>
            <b-form-invalid-feedback>
                Phone(s) must contain only numbers, without plus, with country code, length: from 10 to 12 numbers.
            </b-form-invalid-feedback>
        </div>
        <div class="text-right add-btn-wrapper">
            <button class="btn btn-default btn-fill btn-icon" @click="addPhoneField">
                <i class="fa fa-plus"></i>
            </button>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            entityModel: {
                type: String,
                required: true
            }
        },
        data () {
            return {
                phones: [
                    {
                        number: '',
                        phoneable_type: this.entityModel
                    }
                ]
            }
        },
        mounted: function () {
          if (this.phones.length === 0)
              this.phones.push(
                  {
                      number: '',
                      phoneable_type: this.entityModel
                  }
              );
        },
        methods: {
            addPhoneField () {
                if (this.phones[this.phones.length - 1].number){
                    if (this.isAllPhonesValid())
                        this.phones.push( {
                            number: '',
                            phoneable_type: this.entityModel
                        } );
                    else
                        this.$unfortunately('Invalid phone(s)! Phone(s) must contain only numbers, without plus, ' +
                            'with country code, length: from 10 to 12 numbers. Check all before add next one.');
                }
                else
                    this.$unfortunately('Firstly, fill the previous phone field!');
            },
            isNumberValid ( number ) {
                if (!number)
                    return null;
                return /^[0-9]{10,20}$/.test(number);
            },
            isAllPhonesValid () {
                let isAllPhonesValid = true;

                for (let index in this.phones)
                    isAllPhonesValid &= this.isNumberValid(this.phones[index].number);

                return isAllPhonesValid;
            },
            async savePhones () {
                const response = await this.axios.post('/phones', { phones: this.phones });
                return response.data.success;
            },
            getPhones() {
                return this.phones.filter( phone => phone.number !== '');
            }
        }
    }
</script>

<style scoped>
    input {
        margin: 15px 0;
    }

    .add-btn-wrapper {
        margin-top: 15px;
    }

    .hint{
        color: #8e8e8e;
        font-size: 14px;
    }
</style>