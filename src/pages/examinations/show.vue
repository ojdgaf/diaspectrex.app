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
                                        params: { id: this.cardId } },
                                    { name: 'examinations.show', title: 'Show examination',
                                        params: { id: this.id, cardId: this.cardId }
                                    }
                                ]"
                            ></breadcrumbs>
                            <title-block
                                title="Show examination"
                            ></title-block>
                            <div class="col-xs-12 col-md-8">
                                <table class="table table-bordered">
                                    <tr>
                                        <td><strong>Name</strong></td>
                                        <td>{{ examination.name }}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Started at</strong></td>
                                        <td>{{ examination.started_at }}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Ended at</strong></td>
                                        <td>
                                            <span v-if="examination.ended_at">{{ examination.ended_at }}</span>
                                            <span v-else>Not ended yet</span>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </template>
                    </card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['id', 'cardId'],
        data () {
            return {
                examination: {
                    id: '',
                    name: '',
                    patient_card_id: 0,
                    started_at: '',
                    ended_at: ''
                }
            }
        },
        async created () {
            await this.getExamination().then(examination => this.examination = examination);
        },
        methods: {
            async getExamination () {
                return await this.axios.get(`/examinations/${this.id}`).then(res => res.data);
            }
        }
    }
</script>