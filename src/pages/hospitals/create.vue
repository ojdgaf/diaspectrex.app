<template>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <card>
                        <template slot="header">
                            <breadcrumbs :links="[
                                { name: 'hospitals.index', title: 'Hospitals' },
                                { name: 'hospitals.create', title: 'Create hospital' }
                            ]"/>
                            <h4 class="card-title">Create hospital</h4>
                        </template>
                        <div class="col-12">
                            <form action="">

                            </form>
                        </div>
                    </card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Card from 'src/components/UIComponents/Cards/Card'
    import axios from 'axios'
    import Breadcrumbs from 'src/components/UIComponents/Breadcrumbs'

    export default {
        components: {
            Card, Breadcrumbs
        },
        data () {
            return {

            }
        }
    }
</script>

<style scoped></style>