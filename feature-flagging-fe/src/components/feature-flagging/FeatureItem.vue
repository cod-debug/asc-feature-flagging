<template>
    <q-card flat style="border-bottom: 1px solid lightgray;">
        <q-card-section>
            <q-toggle v-model="feature.is_on" @update:model-value="handleToggleFeatureFlag">
                <div>{{ feature.display_name }}</div>
                <div class="text-caption text-grey-8"><strong>Key:</strong> {{ feature.key }} </div>
            </q-toggle>
        </q-card-section>
    </q-card>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import { Notify } from 'quasar';
import { featureFlaggingStore } from 'src/stores/feature_flagging';
const props = defineProps(['feature']);
const feature = props.feature;
const store = featureFlaggingStore();
const { toggle } = store;
const { toggle_request } = storeToRefs(store);

const handleToggleFeatureFlag = async () => {
    const payload = {
        id: feature.id
    }

    await toggle(payload);
    const response = toggle_request.value;
    if(response.data){
        Notify.create({
          message: response.data.message,
          position: 'top',
          closeBtn: "X",
          timeout: 5000,
          color: 'green',
        });
    } else {
        Notify.create({
          message: response.error.message,
          position: 'top',
          closeBtn: "X",
          timeout: 5000,
          color: 'red',
        });
    }
}
</script>