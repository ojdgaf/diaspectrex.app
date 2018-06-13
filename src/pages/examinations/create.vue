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
                                        params: {id: this.cardId} },
                                    { name: 'examinations.create', title: 'Create examination' }
                                ]"
                            ></breadcrumbs>
                            <title-block
                                    title="Create examination"
                            ></title-block>
                        </template>
                        <div class="col-xs-12 col-md-9">
                            <c-input v-model="examination.name" v-validate="'required'"
                                     ll="Name" ph="Name..." >
                            </c-input>
                            <div class="text-right">
                                <button class="btn btn-success btn-fill">Start examination</button>
                            </div>
                        </div>
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
        props: ['cardId'],
        data () {
            return {
                examination: {
                    name: '',
                    patient_card_id: this.cardId,
                    seances: []
                },
            }
        },
        created () {

        },
        methods: {
            async saveExamination () {
                const response = await this.axios.post('/examinations', this.examination);

                if (response.data.success){
                    this.$router.push({name: ''});
                }
            }
        }
    }
</script>