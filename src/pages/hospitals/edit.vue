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
                                    title="Create hospital"
                            ></title-block>
                        </template>
                        <div class="col-12">
                            <div class="col-8">
                                <div class="form-group">
                                    <label>Name:</label>
                                    <input type="text" v-model="hospital.name" class="form-control" placeholder="Name...">
                                </div>
                                <div class="form-group">
                                    <label>Description:</label>
                                    <wysiwyg v-model="hospital.description"></wysiwyg>
                                </div>
                                <address-component
                                        :address-id="hospital.address_id"
                                        :has-flat="false"
                                        ref="addressComponent"
                                ></address-component>
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
                    address_id: 0
                }
            }
        },
        created () {
            this.getHospital().then(hospital => {
                this.hospital.name = hospital.name;
                this.hospital.description = hospital.description;
                this.hospital.address_id = hospital.address ? hospital.address.id : 0;
            });
        },
        methods: {
            async getHospital () {
                const response = await this.axios.get(`/hospitals/${this.id}`);
                return response.data;
            },
            async updateHospital () {
                if (this.hospital.address_id)
                    this.hospital.address_id = await this.$refs.addressComponent.getAddressId();
                else
                    this.hospital.address_id = await this.$refs.addressComponent.getAddressId();

                const response = await this.axios.put(`/hospitals/${this.id}`, this.hospital);
                if (response.data.success)
                    this.$successfully('Hospital was successfully edited!');
                else
                    this.$unfortunately('Error occurs when trying to edit hospital!');
            }
        }
    }
</script>