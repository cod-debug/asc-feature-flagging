<template>
    <div class="text-right">
        <q-btn label="Turn On All Features" @click="confirmToggleFeatures(true)" size="sm" color="green-6" />
        &nbsp;
        <q-btn label="Turn Off All Features" @click="confirmToggleFeatures(false)" size="sm" color="red-6" />
        
        <q-dialog v-model="showConfirmation" persistent>
            <q-card style="width: 550px; max-width: 90vw;">
                <q-card-section>
                    <div class="text-h6">Confirmation</div>
                </q-card-section>
                <q-separator />
                <q-card-section>
                    Are you sure you want to turn <strong>{{ selectedType ? 'ON' : 'OFF' }}</strong> all features?
                </q-card-section>
                <q-separator />
                <q-card-section class="flex justify-between">
                    <q-btn label="No" :disable="isSubmitting" color="secondary" v-close-popup outline />
                    <q-btn :label="isSubmitting ? 'Submitting...' : 'Yes'" :disable="isSubmitting" color="primary" @click="handleConfirmSubmit" />
                </q-card-section>
            </q-card>
        </q-dialog>
    </div>
</template>

<script setup>
import { ref } from 'vue';

import { featureFlaggingStore } from 'src/stores/feature_flagging';
import { EventBus } from './FeatureFlagEventBus.vue';
import { storeToRefs } from 'pinia';
import { Notify } from 'quasar';

const store = featureFlaggingStore();
const { toggleAll } = store;
const { toggle_all_request } = storeToRefs(store);

const showConfirmation = ref(false);
const selectedType = ref(null);
const isSubmitting = ref(false);


const confirmToggleFeatures = (type) => {
    selectedType.value = type;
    showConfirmation.value = true;
}

const handleConfirmSubmit = async () => {
    const payload = {
        type: selectedType.value
    }
    
    isSubmitting.value = true;
    await toggleAll(payload);
    
    const response = toggle_all_request.value;
    if(response.data){
        Notify.create({
          message: response.data.message,
          position: 'top',
          closeBtn: "X",
          timeout: 5000,
          color: 'green',
        });
        EventBus.emit('get-list');
    } else {
        Notify.create({
          message: response.error.message,
          position: 'top',
          closeBtn: "X",
          timeout: 5000,
          color: 'red',
        });
    }

    showConfirmation.value = false;
    isSubmitting.value = false;
}
</script>