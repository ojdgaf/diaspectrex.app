<template>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <card>
                        <template slot="header">
                            <breadcrumbs
                                :links="[
                                    { name: 'hospitals.index', title: 'Hospitals' }
                                ]"
                            ></breadcrumbs>
                            <title-block
                                title="All hospitals"
                                :add-link="{ name: 'hospitals.create' }"
                            ></title-block>
                        </template>
                        <div class="table-responsive">
                            <table class="table table-hover table-striped">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th>Address</th>
                                        <th>Operations</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="hospital in hospitals">
                                        <td>{{ hospital.id }}</td>
                                        <td>{{ hospital.name }}</td>
                                        <td>{{ hospital.desciption }}</td>
                                        <td>
                                            <span v-if="hospital.address">{{ hospital.address.full }}</span>
                                            <span v-else>Unknown</span>
                                        </td>
                                        <td class="text-center">
                                            <div class="text-left">
                                                <button class="btn btn-info">
                                                    <router-link :to="{name: 'hospitals.edit', params: { hospital: hospital.id} }">
                                                        <i class="fa fa-pencil"></i>
                                                    </router-link>
                                                </button>
                                                <button class="btn btn-danger" @click="deleteHospital(hospital.id)">
                                                    <i class="fa fa-trash"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import swal from 'vue-sweetalert2'

    export default {
        data () {
            return {
                hospitals: null
            }
        },
        created () {
            this.getHospitals().then(hospitals => this.hospitals = hospitals);
        },
        methods: {
            async getHospitals () {
                const response = await this.axios.get('/hospitals');

                return response.data;
            },
            async deleteHospital(id) {
                const response = await this.axios.delete(`/hospitals/${id}`);

                if (response.success){
                    this.$successfully('Hospital was successfully deleted!');
                    this.getHospitals().then(hospitals => this.hospitals = hospitals);
                }
                else
                    this.$unfortunately('Error occurs when trying to delete hospital!');
            }
        }
    }
</script>