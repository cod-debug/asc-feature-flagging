<template>
    <q-page class="full-width full-height flex justify-center items-center bg-dark">
        <q-form>
            <q-card style="width: 600px; max-width: 90vw;" class="bg-grey-12">
                <q-card-section>
                    <div class="text-h6">Welcome to ASC Feature Flagging App</div>
                    <div class="text-caption">Sign in your account to continue</div>
                </q-card-section>

                <q-separator />

                <q-card-section>
                    <div>
                        <q-input label="Email" :rules="[$rules.required]" v-model="email" filled />
                    </div>
                    <div>
                        <q-input type="password" label="Password" :rules="[$rules.required]" v-model="password" filled />
                    </div>
                </q-card-section>

                <q-separator />

                <q-card-actions>
                    <q-btn label="Log In" color="blue-12" class="full-width" />
                </q-card-actions>
            </q-card>
        </q-form>
    </q-page>
</template>
<script setup>
import { ref } from 'vue';

const email = ref('');
const password = ref('');
</script>