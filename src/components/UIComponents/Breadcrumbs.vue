<template>
    <div class="breadcrumbs">
        <ul>
            <li>
                <router-link :to="{name: 'Index'}">
                  <i class="fas fa-home"></i>
                </router-link>
            </li>
            <li v-for="link in links">
                <router-link :to="{ name: link.name, params: link.params }">
                    {{ link.title }}
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        props: {
            links: {
                type: Array,
                required: true
            }
        }
    }
</script>

<style scoped>
    ul {
        margin: 5px 0;
        padding: 10px 15px;
        background-color: #f1f1f1;
        font-size: 1em;
    }

    ul > li {
        list-style-type: none;
        display: inline;
    }

    ul > li:first-child:before{
        content: '';
    }

    ul > li:before{
        content: '>';
        margin: 0 1px;
        color: #17a2b8;
    }
</style>
