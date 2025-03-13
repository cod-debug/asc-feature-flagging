<template>
    <q-layout>
        <q-page-container class="relative">
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script>
    export default {

    }
</script>

<style scoped>
    .background-top {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
    }

    .background-bottom {
        position: absolute;
        bottom: 0;
        transform: scale(-1);
        left: 0;
        width: 100%;
    }
</style>