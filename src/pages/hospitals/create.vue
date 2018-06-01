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
                        <div class="col-8">
                            <div class="form-group">
                                <label>Name:</label>
                                <input type="text" v-model="hospital.name" class="form-control" placeholder="Name...">
                            </div>
                            <div class="form-group">
                                <label>Description:</label>
                                <wysiwyg v-model="hospital.description"></wysiwyg>
                            </div>
                            <div class="form-group">
                                <b-card no-body>
                                    <b-tabs card>
                                        <b-tab title="Address">
                                            <address-component
                                                ref="addressComponent"
                                            ></address-component>
                                        </b-tab>
                                        <b-tab title="Phones" >
                                            <phone-component
                                                entity-model="Hospital"
                                                ref="phoneComponent"
                                            ></phone-component>
                                        </b-tab>
                                    </b-tabs>
                                </b-card>
                            </div>
                            <div class="text-right">
                                <button class="btn btn-success btn-fill"
                                        @click="saveHospital">Save</button>
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
                    address: null,
                    phones: null
                }
            }
        },
        methods: {
            async saveHospital () {
                this.hospital.address = this.$refs.addressComponent.getAddress();
                this.hospital.phones = this.$refs.phoneComponent.getPhones();

                const response = await this.axios.post('/hospitals', this.hospital);
                if (response.data.success)
                    this.$router.push({ name: 'hospitals.index' });
                else
                    this.$unfortunately('Error occurs when trying to create hospital!');
            }
        }
    }
</script>
