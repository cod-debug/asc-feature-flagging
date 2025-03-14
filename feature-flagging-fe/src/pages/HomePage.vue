<template>
    <q-page class="full-width full-height flex justify-center items-center bg-dark">
        <q-form @submit="handleSubmit">
            <q-spinner v-if="login_request.loading" />
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
                    <q-btn type="submit" label="Log In" color="blue-12" class="full-width" />
                </q-card-actions>
            </q-card>
        </q-form>
    </q-page>
</template>
<script setup>
import { ref } from 'vue';
import { authStore } from 'stores/auth.js';
import { storeToRefs } from 'pinia';
import { Notify } from 'quasar';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const auth_store = authStore();
const router = useRouter();

const { login_request } = storeToRefs(auth_store);
const { loginUser } = auth_store;

const handleSubmit = async () => {
    const payload = {
        email: email.value,
        password: password.value,
    }

    await loginUser(payload);
    const response = login_request.value;

    if(response.data) {
        localStorage.setItem('__feature_flagging_app_fe_user_data', JSON.stringify(response.data.data));
        localStorage.setItem('__feature_flagging_app_fe_token', response.data.token);
        
        Notify.create({
          message: response.data.message,
          position: 'bottom-right',
          closeBtn: "X",
          timeout: 5000,
          color: 'green',
        });

        router.go({ name: 'feature-flag' });
    }

}
</script>