<template>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <card>
                        <template slot="header">
                            <breadcrumbs :links="[
                                { name: 'hospitals.index', title: 'Hospitals' },
                                { name: 'hospitals.edit', title: 'Edit hospital' }
                            ]"></breadcrumbs>
                            <title-block
                                title="Edit hospital"
                            ></title-block>
                        </template>
                        <div class="col-12">
                            <div class="col-8">
                                <c-input v-model="hospital.name" v-validate="'required'"
                                         ll="Name" ph="Name..." >
                                </c-input>
                                <c-input v-model="hospital.description"
                                         ll="Description" ph component="wysiwyg">
                                </c-input>
                                <div class="form-group">
                                    <b-card no-body>
                                        <b-tabs card>
                                            <b-tab title="Address">
                                                <address-component
                                                    ref="addressComponent"
                                                    :entity-address="hospital.address"
                                                ></address-component>
                                            </b-tab>
                                            <b-tab title="Phones" >
                                                <phone-component
                                                    ref="phonesComponent"
                                                    :entity-phones="hospital.phones"
                                                ></phone-component>
                                            </b-tab>
                                        </b-tabs>
                                    </b-card>
                                </div>
                                <div class="text-right">
                                    <button class="btn btn-success btn-fill"
                                            @click="updateHospital">Edit</button>
                                </div>
                            </div>
                        </div>
                    </card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import wysiwyg from 'vue-wysiwyg'

    export default {
        props: [ 'id' ],
        data () {
            return {
                hospital: {
                    name: '',
                    description: '',
                    address: null,
                    phones: []
                }
            }
        },
        created () {
            this.getHospital().then(hospital => {
                this.hospital.name        = hospital.name;
                this.hospital.description = hospital.description;
                this.hospital.address     = hospital.address;
                this.hospital.phones      = hospital.phones;
            });
        },
        methods: {
            async getHospital () {
                const response = await this.axios.get(`/hospitals/${this.id}`);
                return response.data;
            },
            async updateHospital () {
                this.hospital.address = this.$refs.addressComponent.getAddress();
                this.hospital.phones = this.$refs.phonesComponent.getPhones();

                const response = await this.axios.put(`/hospitals/${this.id}`, this.hospital);
                if (response.data.success)
                    this.$router.push({ name: 'hospitals.index' });
                else
                    this.$unfortunately('Error occurs when trying to edit hospital!');
            }
        }
    }
</script>