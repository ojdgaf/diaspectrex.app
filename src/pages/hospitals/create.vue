<template>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <card>
                        <template slot="header">
                            <breadcrumbs :links="[
                                { name: 'hospitals.index', title: 'Hospitals' },
                                { name: 'hospitals.create', title: 'Create hospital' }
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
                                    ref="addressComponent"
                                ></address-component>
                                <div class="text-right">
                                    <button class="btn btn-success btn-fill"
                                            @click="saveHospital">Save</button>
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
    export default {
        data () {
            return {
                hospital: {
                    name: '',
                    description: '',
                    address_id: ''
                }
            }
        },
        methods: {
            async saveHospital () {
                this.hospital.address_id = await this.$refs.addressComponent.getAddressId();
                const response = await this.axios.post('/hospitals', this.hospital);
                if (response.data.success)
                    this.$successfully('Hospital was successfully created!');
                else
                    this.$unfortunately('Error occurs when trying to create hospital!');
            }
        }
    }
</script>
