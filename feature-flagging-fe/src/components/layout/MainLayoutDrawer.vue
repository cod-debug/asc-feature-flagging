<template>
    <div>
        <div style="padding-bottom: 50px;">
            <div v-for="(item, key) in drawer_items" :key="key" class="relative">
                <q-expansion-item dense-toggle expand-separator :icon="item.icon" :label="item.label"
                    v-if="item.children && item.children.length > 0" class="custom_nav_expansion text-green-5">
                    <q-item clickable v-ripple class="q-pl-lg nav-item-child" v-for="(i, k) in item.children" :key="k"
                        :to="{name: i.route_name}" exact>
                        <q-item-section avatar>
                            <q-icon :name="i.icon" class="q-mx-auto"></q-icon>
                        </q-item-section>

                        <q-item-section class="text-red-15">
                            {{ i.label || "N/A" }}
                        </q-item-section>
                    </q-item>
                </q-expansion-item>
                <q-item clickable v-ripple class="nav-item text-green-5" :to="{ name: item.route_name }" exact v-else>
                    <q-item-section avatar>
                        <q-icon :name="item.icon" class="q-mx-auto"></q-icon>
                    </q-item-section>

                    <q-item-section>
                        {{ item.label || "N/A" }}
                    </q-item-section>
                </q-item>
            </div>
        </div>
        <div class="absolute bg-black text-white full-width" style="bottom: 0; left: 0; height: 50px;">
            <q-item @click="logoutConfirm" clickable>
                <q-item-section avatar>
                    <q-icon name="logout" class="q-mx-auto"></q-icon>
                </q-item-section>
                <q-item-section>
                    Logout
                </q-item-section>
            </q-item>
        </div>

        <q-dialog v-model="confirm_logout" persistent>
            <q-card>
                <q-card-section class="row items-center">
                    <q-avatar icon="question_mark" color="red-5" text-color="white" />
                    <span class="q-ml-sm">Are you sure you want to logout?</span>
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat label="Cancel" color="green-5" v-close-popup />
                    <q-btn flat label="Confirm" color="red-5" @click="logout" />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>
<script>
import adminRoutes from './adminRoutes.js';

export default {
    data() {
        return {
            drawer_items: [],
            confirm_logout: false,
        }
    },
    methods: {
        initApp() {
            const admin_routes = adminRoutes;

            const user_role = JSON.parse(localStorage.getItem('__feature_flagging_app_user_data')).role;
            if(user_role === 1){
                this.drawer_items = admin_routes;
            } else {
                this.drawer_items = [];
            }
        },
        logoutConfirm() {
            this.confirm_logout = true;
        },
        logout() {
            localStorage.clear();
            this.$router.push({ name: 'login' });
        },
    },
    mounted() {
        this.initApp()
    }
}
</script>
<style>
    .custom_nav_expansion .q-item__section .q-icon {
        margin: auto;
    }
</style>