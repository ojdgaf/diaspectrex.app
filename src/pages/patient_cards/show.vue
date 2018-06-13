<template>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <card>
                        <template slot="header">
                            <breadcrumbs
                                    :links="[
                                    { name: 'patient_cards.index', title: 'Patient cards' },
                                    { name: 'patient_cards.show', title: 'View patient card',
                                        params: {id: this.id}
                                    }
                                ]"
                            ></breadcrumbs>
                            <title-block
                                    :title="`View patient card #${patientCard.code}`"
                            ></title-block>
                        </template>
                        <h4>Common information</h4>
                        <div class="table-responsive">
                            <table class="table table-bordered">
                                <tr>
                                    <td><strong>First name</strong></td>
                                    <td>{{ patient.first_name }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Middle name</strong></td>
                                    <td>{{ patient.middle_name }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Last name</strong></td>
                                    <td>{{ patient.last_name }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Age</strong></td>
                                    <td>{{ patient.birthday }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Address</strong></td>
                                    <td>{{ patient.address.full }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Patient type</strong></td>
                                    <td>{{ patientCard.patient_type.display_name }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Email</strong></td>
                                    <td>{{ patient.email}}</td>
                                </tr>
                                <tr>
                                    <td><strong>Phones</strong></td>
                                    <td>
                                        <div v-if="hasPhones()">
                                            <p v-for="phone in patient.phones">
                                                {{ phone.number }}
                                            </p>
                                        </div>
                                        <div v-else>
                                            <i class="fas fa-times"></i>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>Allergies</strong></td>
                                    <td>{{ patientCard.allergies }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Diseases</strong></td>
                                    <td>{{ patientCard.diseases }}</td>
                                </tr>
                            </table>
                        </div>
                        <hr>
                        <title-block
                            title="Examinations"
                            :add-link="{ name: 'examinations.create', params: { cardId: this.id } }"
                        ></title-block>
                        <c-table class="table table-hover table-striped table-responsive"
                                 :columns="examinationsTableColumns" :data="patientCard.examinations"
                                 :buttons="examinationsTableButtons">
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
        props: ['id'],
        data () {
            return {
                patientCard: {
                    code: '',
                    patient: {
                        first_name: '',
                        middle_name: '',
                        last_name: '',
                        birthday: '',
                        sex: '',
                        address: {
                            full: ''
                        },
                        email: '',
                        phones: []
                    },
                    patient_type: {
                        display_name: ''
                    },
                    allergies: '',
                    diseases: '',
                    examinations: []
                },
                examinationsTableColumns: [
                    'ID', 'Name',
                    {display: 'Started at', actual: 'started_at'},
                    {display: 'Ended at', actual: 'ended_at'}
                ],
                examinationsTableButtons: [
                    {
                        route: {
                            name: 'examinations.show',
                            params: {id: 'id', cardId: 'patient_card_id'}
                        },
                        class: 'btn-default',
                        display: `<i class="fas fa-eye"></i>`
                    },
                    {
                        method: this.deleteExamination,
                        class: 'btn-danger',
                        display: `<i class="fas fa-trash"></i>`
                    }
                ],
            }
        },
        created () {
            this.getPatientCard().then(patientCard => {
                patientCard.patient.birthday = this.$fromNow(patientCard.patient.birthday).split('ago')[0];
                this.patientCard = patientCard
            });
        },
        methods: {
            getPatientCard () {
                return this.axios.get(`/patient-cards/${this.id}`).then(res => res.data);
            },
            hasPhones () {
                if (this.patient.phones && this.patient.phones.length > 0)
                    return true;
                return false;
            },
            async deleteExamination(examination) {
                this.$askForConfirmation('You are trying to delete examination')
                    .then(async (deletingApproved) => {
                        if (deletingApproved) {
                            const response = await this.axios.delete(`/examinations/${examination.id}`);

                            if (response.data.success)
                                this.patientCard.examinations = response.data.examinations;
                        }
                    });
            }
        },
        computed: {
            patient: function () {
                if (this.patientCard !== null){
                    return this.patientCard.patient;
                }
            },
        }
    }
</script>