<template>
    <div class="flex column" style="gap: .2rem;">
        <feature-item :feature="feature" v-for="(feature) in features" :key="feature.id"  />
    </div>
</template>
<script setup>
import FeatureItem from './FeatureItem.vue';
const { features } = defineProps(['features']);
</script>