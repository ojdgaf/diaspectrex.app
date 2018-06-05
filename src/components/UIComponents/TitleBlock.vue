<template>
    <div class="title-wrapper">
        <h4 class="card-title col-md-6">{{ title }}</h4>
        <router-link :to="addLink ? addLink : '#'" class="btn btn-success" v-show="addLink">
          <i class="fas fa-plus"></i>
        </router-link>
    </div>
</template>

<script>
    export default {
        props: {
            title: {
                type: String,
                required: true
            },
            addLink: {
                type: Object
            }
        }
    }
</script>

<style scoped>
    .title-wrapper{
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        align-items: center;
    }

    .title-wrapper > a {
        color: #87CB16;
    }

    .title-wrapper > a:hover {
        color: #049F0C;
    }
</style>
