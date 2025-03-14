<template>
    <q-card flat style="border-bottom: 1px solid lightgray;" class="feature-item">
        <q-card-section>
            <div class="toggle-action-buttons">
                <div class="flex justify-end items-center full-height" style="gap: .5rem;">
                    <template v-if="!is_edit">
                        <q-btn icon="edit" size="sm" color="green-14" @click="openEdit" />
                        <q-btn icon="delete" size="sm" color="red-12" />
                    </template>
                    <template v-else>
                        <q-btn icon="check" @click="handleUpdateFeature" size="sm" color="green-14" />
                        <q-btn  icon="close" @click="is_edit = false" color="grey-8" size="sm" />
                    </template>
                </div>
            </div>
            <q-toggle v-model="feature.is_on" @update:model-value="handleToggleFeatureFlag" :disable="toggle_request.loading" v-if="!is_edit">
                <div>{{ feature.display_name }}</div>
                <div class="text-caption text-grey-8"><strong>Key:</strong> {{ feature.key }}</div>
            </q-toggle>
            <q-form @submit="handleUpdateFeature" v-else>
                <div class="row">
                    <div class="col-12 col-md-6 q-pa-sm">
                        <q-input label="Display Name" filled v-model="update_form.display_name" />
                    </div>
                    <div class="col-12 col-md-6 q-pa-sm">
                        <q-input label="key" filled v-model="update_form.key" />
                    </div>
                </div>
            </q-form>
        </q-card-section>
    </q-card>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import { Notify } from 'quasar';
import { featureFlaggingStore } from 'src/stores/feature_flagging';
import { ref } from 'vue';

const props = defineProps(['feature']);
const feature = props.feature;
const store = featureFlaggingStore();
const { toggle } = store;
const { toggle_request } = storeToRefs(store);
const is_edit = ref(false);

const update_form = ref({ display_name: '', key: '' })

const openEdit = () => {
    is_edit.value = true;
    // get current feature
    const current_feature = {...feature};

    // set value to update form
    update_form.value.display_name = current_feature.display_name;
    update_form.value.key = current_feature.key;
}

const handleUpdateFeature = async () => {
}
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
<style scoped>
.toggle-action-buttons {
    position: absolute;
    opacity: 0;
    z-index: 1;
    top: 0;
    right: 0;
    height: 100%;
    transition: all ease-in .3s;
}

.feature-item:hover .toggle-action-buttons {
    opacity: 1;
}

</style>