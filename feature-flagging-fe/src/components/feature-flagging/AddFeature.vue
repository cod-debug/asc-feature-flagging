<template>
    <div>
        <q-spinner v-if="add_request.loading" />
        <q-form @submit="handleSubmit">
            <div class="q-pa-sm">
                <q-input label="Display Name" v-model="add_form.display_name" :rules="[$rules.required]" filled :disable="add_request.loading" />
            </div>
            <div class="q-pa-sm">
                <q-input label="Key" hint="Leaving this field blank will allow the system to create a key for you. This will serve as identifier for the feature" v-model="add_form.key" filled :disable="add_request.loading" />
            </div>
            <div class="q-pa-sm text-right">
                <q-btn type="submit" label="Submit" color="primary" :disable="add_request.loading" />
            </div>
        </q-form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { featureFlaggingStore } from 'src/stores/feature_flagging';
import { storeToRefs } from 'pinia';
import { Notify } from 'quasar';

const emit = defineEmits(['onSave']);
const $store = featureFlaggingStore();
const { add } = $store;
const { add_request } = storeToRefs($store);

const add_form = ref({display_name: '',key: ''});

const handleSubmit = async () => {
    await add(add_form.value);
    const response = add_request.value;

    if(response.data){
        Notify.create({
          message: response.data.message,
          position: 'top',
          closeBtn: "Okay",
          timeout: 5000,
          color: 'green',
        });
        add_form.value = {display_name: '',key: ''};
        emit('onSave');
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