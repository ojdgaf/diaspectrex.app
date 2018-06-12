<template>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <card>
                        <template slot="header">
                            <breadcrumbs
                                    :links="[
                                    { name: 'classifiers.index', title: 'Classifiers' }
                                ]"
                            ></breadcrumbs>
                            <title-block
                                    title="All classifiers"
                            ></title-block>
                        </template>
                        <c-table class="table table-hover table-striped table-responsive"
                                 :columns="tableColumns" :data="classifiers">
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
                    'ID',
                    {display: 'Patient type', actual: 'patient_type.display_name'},
                    {display: 'Name', actual: 'display_name'},
                    'Description'
                ],
                classifiers: null
            }
        },
        created () {
            this.getClassifiers().then(classifiers => this.classifiers = classifiers);
        },
        methods: {
            async getClassifiers () {
                const response = await this.axios.get('/classifiers');

                return response.data;
            }
        }
    }
</script>
