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
                        <c-table class="table table-hover table-striped table-responsive"
                                 :columns="tableColumns" :data="patientCards" :buttons="tableButtons">
                        </c-table>

                    </card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CTable from 'src/components/UIComponents/Table/Index'

    export default {
        components: {
            CTable
        },
        data () {
            return {
                tableColumns: [
                    'ID', 'Code',
                    {display: 'Patient', actual: 'patient.name'},
                    {display: 'Patient type', actual: 'patient_type.display_name'},
                    'Allergies', 'Diseases'
                ],
                tableButtons: [
                    {
                        route: {
                            name: 'patient_cards.show',
                            params: {id: 'id'}
                        },
                        class: 'btn-default',
                        display: `<i class="fas fa-eye"></i>`
                    },
                    {
                        route: {
                            name: 'patient_cards.edit',
                            params: {id: 'id'}
                        },
                        display: `<i class="fas fa-pencil-alt"></i>`
                    },
                    {
                        method: this.deletePatientCard,
                        class: 'btn-danger',
                        display: `<i class="fas fa-trash"></i>`
                    }
                ],
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
            async deletePatientCard(patientCard) {
                this.$askForConfirmation('You are trying to delete patient card')
                    .then(async (deletingApproved) => {
                        if (deletingApproved) {
                            const response = await this.axios.delete(`/patient-cards/${patientCard.id}`);

                            if (response.data.success)
                                this.patientCards = response.data.patient_cards;
                        }
                    });
            }
        }
    }
</script>
