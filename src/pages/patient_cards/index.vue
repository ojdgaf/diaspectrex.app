<template>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <card>
                        <template slot="header">
                            <breadcrumbs
                                    :links="[
                                    { name: 'patient_cards.index', title: 'Patient cards' }
                                ]"
                            ></breadcrumbs>
                            <title-block
                                    title="All patient cards"
                                    :add-link="{ name: 'patient_cards.create' }"
                            ></title-block>
                        </template>
                        <div class="table-responsive">
                            <table class="table table-hover table-striped">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Code</th>
                                    <th>Patient</th>
                                    <th>Patient type</th>
                                    <th>Allergies</th>
                                    <th>Diseases</th>
                                    <th>Operations</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="patientCard in patientCards">
                                    <td>{{ patientCard.id }}</td>
                                    <td>{{ patientCard.code }}</td>
                                    <!-- TODO define some data to render here fio + birthday, for example -->
                                    <td>{{ patientCard.patient }}</td>
                                    <td>{{ patientCard.patient_type }}</td>
                                    <td>{{ patientCard.allergies }}</td>
                                    <td>{{ patientCard.diseases }}</td>
                                    <td class="text-center">
                                        <div class="text-left">
                                            <button class="btn btn-info">
                                                <router-link :to="{name: 'patient_cards.edit', params: { id: patientCard.id} }">
                                                    <i class="fa fa-pencil"></i>
                                                </router-link>
                                            </button>
                                            <button class="btn btn-danger" @click="deletePatientCard(patientCard.id)">
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
    export default {
        data () {
            return {
                patientCards: null
            }
        },
        created () {
            this.getPatientCards().then(patientCards => this.patientCards = patientCards);
        },
        methods: {
            async getPatientCards () {
                const response = await this.axios.get('/patient-cards');

                return response.data;
            },
            async deletePatientCard(id) {
                /*this.$askForConfirmation('You are trying to delete patient card')
                    .then(async (deletingApproved) => {
                        if (deletingApproved) {
                            const response = await this.axios.delete(`/patient_cards/${id}`);

                            if (response.data.success)
                                this.hospitals = response.data.patient_cards;
                        }
                    });*/
            }
        }
    }
</script>
