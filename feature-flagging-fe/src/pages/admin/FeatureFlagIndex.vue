<template>
    <q-page class="q-pa-md q-mx-auto" style="max-width: 80vw;">
        <div class="row">
            <div class="col-12 q-pa-sm">
                <q-dialog v-model="open_add_modal" persistent>
                    <q-card style="min-width: 500px; max-width: 90vw;" class="relative">
                        <q-btn v-close-popup icon="close" class="absolute" style="right: 0; z-index: 100;" flat
                            color="grey" />
                        <q-card-section>
                            <div class="text-h6">Add Feature</div>
                        </q-card-section>
                        <q-separator />
                        <q-card-section>
                            <add-feature @onSave="handleSaveFeature" />
                        </q-card-section>
                    </q-card>
                </q-dialog>
                <q-card>
                    <q-card-section>
                        <div class="flex justify-between items-center">
                            <div class="text-h6">Feature List <q-spinner v-if="list_request.loading" /></div>
                            <div>
                                <q-btn icon="add" color="primary" size="sm" label="Feature Flag" @click="open_add_modal = true" />
                            </div>
                        </div>
                    </q-card-section>
                    <q-separator />
                    <q-card-section>
                        <q-form @submit="getList">
                            <q-input filled outline type="search" v-model="list_payload.keyword" label="Search Feature">
                                <template v-slot:append>
                                    <q-btn type="submit" @click="getList" icon="search" color="primary" flat />
                                </template>
                            </q-input>
                        </q-form>
                        <feature-list :features="feature_list" class="q-my-md" />
                        <div v-if="feature_list.length === 0 && !list_request.loading">
                            No data found.
                        </div>
                        <div class="flex justify-between" v-if="feature_list.length > 0 && list_request && list_request.data">
                            <div>
                                Showing {{ list_request.data.from }} to {{ list_request.data.to }} of {{ list_request.data.total }}
                            </div>
                            <q-pagination v-if="feature_list.length > 0" v-model="list_payload.page"
                                :max="list_request.data.last_page" direction-links :max-pages="6" flat
                                @update:model-value="getList" color="grey" active-color="primary" />
                        </div>
                    </q-card-section>
                </q-card>
            </div>
        </div>
    </q-page>
</template>
<script setup>
import AddFeature from 'src/components/feature-flagging/AddFeature.vue';
import FeatureList from 'src/components/feature-flagging/FeatureList.vue';
import { onMounted, onUnmounted, ref } from 'vue';
import { featureFlaggingStore } from 'src/stores/feature_flagging';
import { storeToRefs } from 'pinia';
import { EventBus } from 'src/components/feature-flagging/FeatureFlagEventBus.vue';

const open_add_modal = ref(false);
const feature_flagging_store = featureFlaggingStore();
const { list } = feature_flagging_store;
const { list_request } = storeToRefs(feature_flagging_store);
const feature_list = ref([]);
const list_payload = ref({
    limit: 10,
    keyword: '',
    page: 1,
});

const getList = async () => {
    feature_list.value = [];
    await list(list_payload.value);
    const response = list_request.value;

    if (response.data) {
        feature_list.value = response.data.data.map((i) => {
            i.is_on = i.is_on === 1 ? true : false;
            return i;
        });
    }
}

const handleSaveFeature = () => {
    getList();
    open_add_modal.value = false;
}

onMounted(() => {
    getList();
    EventBus.on('get-list', getList);
});

onUnmounted(() => {
    EventBus.off('get-list', getList);
});
</script>