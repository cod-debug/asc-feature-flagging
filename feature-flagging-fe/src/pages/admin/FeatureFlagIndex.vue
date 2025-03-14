<template>
    <q-page class="q-pa-md">
        <div class="row">
            <div class="col-12 col-md-8 q-pa-sm">
                <q-card>
                    <q-card-section>
                        <div class="text-h6">Feature List <q-spinner v-if="list_request.loading" /></div>
                    </q-card-section>
                    <q-separator />
                    <q-card-section>
                        <feature-list :features="feature_list"  />
                    </q-card-section>
                </q-card>
            </div>
            <div class="col-12 col-md-4 q-pa-sm">
                <q-card>
                    <q-card-section>
                        <div class="text-h6">Add Feature</div>
                    </q-card-section>
                    <q-separator />
                    <q-card-section>
                        <add-feature @onSave="getList" />
                    </q-card-section>
                </q-card>
            </div>
        </div>
    </q-page>
</template>
<script setup>
import AddFeature from 'src/components/feature-flagging/AddFeature.vue';
import FeatureList from 'src/components/feature-flagging/FeatureList.vue';
import { onMounted, ref } from 'vue';
import { featureFlaggingStore } from 'src/stores/feature_flagging';
import { storeToRefs } from 'pinia';

const feature_flagging_store = featureFlaggingStore();
const { list } = feature_flagging_store;
const { list_request } = storeToRefs(feature_flagging_store);
const feature_list = ref([]);

const getList = async () => {
    await list();
    const response = list_request.value;

    if(response.data){
        feature_list.value = response.data.map((i) => {
            i.is_on = i.is_on === 1 ? true : false;
            return i;
        });
    }
}

onMounted(() => {
    getList();
});
</script>