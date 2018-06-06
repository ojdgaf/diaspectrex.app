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
                        <div class="col-xs-12 col-md-8">

                        </div>
                    </card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {

    }
</script>