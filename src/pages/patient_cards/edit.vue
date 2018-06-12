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
                                    { name: 'patient_cards.edit', title: 'Edit patient card' }
                                ]"
                            ></breadcrumbs>
                            <title-block
                                    title="Edit patient card"
                            ></title-block>
                        </template>
                        <div class="col-xs-12 col-md-8">
                            <c-input v-model="patientCard.code" v-validate="'required'"
                                     ll="Code" ph="Code..." >
                            </c-input>

                            <c-input v-model="patientCard.patient"
                                     v-validate="'required'" :options="patients" :multiple="false"
                                     label="name" track-by="id" ll="Patient"
                                     ph="Select patient..." component="multiselect">
                            </c-input>

                            <c-input v-model="patientCard.patient_type"
                                     v-validate="'required'" :options="patientTypes" :multiple="false"
                                     label="display_name" track-by="id" ll="Patient type"
                                     ph="Select patient type..." component="multiselect">
                            </c-input>

                            <c-input v-model="patientCard.allergies"
                                     ll="Allergies" ph="Allergies..." component="wysiwyg">
                            </c-input>

                            <c-input v-model="patientCard.diseases"
                                     ll="Diseases" ph="Diseases..." component="wysiwyg">
                            </c-input>

                            <div class="text-right">
                                <button class="btn btn-success btn-fill"
                                        @click="updateCard">Edit</button>
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
        props: ['id'],
        data () {
            return {
                patientCard: {
                    code: '',
                    patient: null,
                    patient_type: null,
                    allergies: '',
                    diseases: ''
                },
                patients: [],
                patientTypes: []
            }
        },
        created () {
            this.getPatients().then(patients => this.patients = patients);
            this.getPatientTypes().then(patientTypes => this.patientTypes = patientTypes);
            this.getCard(this.id).then(card => this.patientCard = card);
        },
        methods: {
            async updateCard () {
                const response = await this.axios.put(`/patient-cards/${this.id}`, this.createPatientCardToUpdate())

                if (response.data.success)
                    this.$router.push({ name: 'patient_cards.index' });
                else
                    this.$unfortunately('Error occurs when trying to update patient\'s card!');
            },
            getCard (id) {
                return this.axios.get(`/patient-cards/${id}`).then(res => res.data);
            },
            getPatients () {
                return this.axios.get(`/users?role=patient`).then(res => res.data);
            },
            getPatientTypes () {
                return this.axios.get(`/patient-types`).then(res => res.data);
            },
            createPatientCardToUpdate () {
                return {
                    code: this.patientCard.code,
                    patient_id: this.patientCard.patient.id,
                    patient_type_id: this.patientCard.patient_type.id,
                    allergies: this.patientCard.allergies,
                    diseases: this.patientCard.diseases
                };
            }

        }
    }
</script>