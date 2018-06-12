<template>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <card>
                        <template slot="header">
                            <breadcrumbs
                                    :links="[
                                    { name: 'diagnostic_groups.index', title: 'Diagnostic groups' }
                                ]"
                            ></breadcrumbs>
                            <title-block
                                    title="All diagnostic groups"
                            ></title-block>
                        </template>
                        <c-table class="table table-hover table-striped table-responsive"
                                 :columns="tableColumns" :data="diagnosticGroups">
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
                diagnosticGroups: null
            }
        },
        created () {
            this.getDiagnosticGroups().then(diagnosticGroups => this.diagnosticGroups = diagnosticGroups);
        },
        methods: {
            async getDiagnosticGroups () {
                const response = await this.axios.get('/diagnostic-groups');

                return response.data;
            }
        }
    }
</script>
