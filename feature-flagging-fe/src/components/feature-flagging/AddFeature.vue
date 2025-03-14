<template>
    <div>
        <q-form @submit="handleSubmit">
            <div class="q-pa-sm">
                <q-input label="Display Name" v-model="add_form.display_name" :rules="[$rules.required]" filled />
            </div>
            <div class="q-pa-sm">
                <q-input label="Key" hint="Leaving this field blank will allow the system to create a key for you. This will be use as identifier for the feature" v-model="add_form.key" filled />
            </div>
            <div class="q-pa-sm">
                <q-btn type="submit" label="Submit" color="primary" />
            </div>
        </q-form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { featureFlaggingStore } from 'src/stores/feature_flagging';
import { storeToRefs } from 'pinia';
import { Notify } from 'quasar';

const $store = featureFlaggingStore();
const { add } = $store;
const { add_request } = storeToRefs($store);

const add_form = ref({
    display_name: '',
    key: '',
    is_on: true,
});

const handleSubmit = async () => {
    await add(add_form.value);
    const response = add_request.value;

    if(response.data){
        Notify.create({
          message: response.data.message,
          position: 'top-center',
          closeBtn: "X",
          timeout: 5000,
          color: 'green',
        });
    }
}

</script>