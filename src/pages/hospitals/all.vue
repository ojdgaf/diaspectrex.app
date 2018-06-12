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
                        <c-table class="table table-hover table-striped table-responsive"
                                 :columns="tableColumns" :data="hospitals" :buttons="tableButtons">
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
                hospitals: null,
                tableColumns: [
                    'ID', 'Name', 'Description',
                    {display: 'Address', actual: 'address.full'},
                    'Phones'
                ],
                tableButtons: [
                    {
                        route: {
                            name: 'hospitals.edit',
                            params: {id: 'id'}
                        },
                        display: `<i class="fas fa-pencil-alt"></i>`
                    },
                    {
                        method: this.deleteHospital,
                        class: 'btn-danger',
                        display: `<i class="fas fa-trash"></i>`
                    }
                ]
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
            async deleteHospital(hospital) {
                this.$askForConfirmation('You are trying to delete hospital')
                    .then(async (deletingApproved) => {
                        if (deletingApproved) {
                            const response = await this.axios.delete(`/hospitals/${hospital.id}`);

                            if (response.data.success)
                                this.hospitals = response.data.hospitals;
                        }
                    });
            }
        }
    }
</script>

<style scoped>

    p {
        margin: 0;
    }

    .flexible-button-wrapper {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
    }

    .flexible-button-wrapper button{
        margin: 5px;
    }

</style>