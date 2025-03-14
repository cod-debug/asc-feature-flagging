<template>
    <q-page class="q-pa-md">
        <div class="row">
            <div class="col-12 col-md-6 q-pa-sm">
                <q-card>
                    <q-card-section>
                        <div class="text-h6">Add Feature</div>
                    </q-card-section>
                    <q-separator />
                    <q-card-section>
                        <add-feature />
                    </q-card-section>
                </q-card>
            </div>
            <div class="col-12 col-md-6 q-pa-sm">
                <q-card>
                    <q-card-section>
                        <div class="text-h6">Feature List</div>
                    </q-card-section>
                    <q-separator />
                    <q-card-section>
                        list of features with toggle to on/off goes here...
                    </q-card-section>
                </q-card>
            </div>
        </div>
    </q-page>
</template>
<script setup>
import AddFeature from 'src/components/feature-flagging/AddFeature.vue';
</script>