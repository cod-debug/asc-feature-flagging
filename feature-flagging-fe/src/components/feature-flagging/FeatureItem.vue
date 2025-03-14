<template>
    <q-card flat style="border-bottom: 1px solid lightgray;">
        <q-card-section>
            <q-toggle v-model="feature.is_on" >
                <div>{{ feature.display_name }}</div>
                <div class="text-caption text-grey-8"><strong>Key:</strong> {{ feature.key }} </div>
            </q-toggle>
        </q-card-section>
    </q-card>
</template>
<script setup>
const props = defineProps(['feature']);
const feature = props.feature;
</script>