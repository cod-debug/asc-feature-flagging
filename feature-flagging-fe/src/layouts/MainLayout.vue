<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-orange-6 d-print-none">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          {{ app_title }}
        </q-toolbar-title>

        <div class="text-center profile-wrapper">
          <q-avatar>
            <q-img src="/assets/images/user.png" alt="user profile" />
          </q-avatar>
          <q-popup-proxy :offset="[25, 5]">
            <q-banner class="profile-context-menu" elevated style="width: 250px;">
              <div class="mat-menu-content ng-tns-c149-38">
                <div class="avatar-content text-center q-px-md q-pt-md">
                  <q-avatar size="80px">
                    <q-img src="/assets/images/user.png" alt="user profile" />
                  </q-avatar>
                </div>
                <div class="avatar-details text-center q-px-md q-pt-md">
                  <span class="text-grey-7 text-caption">{{ $helper.user_types[user_data.role-1].toUpperCase() }}</span>
                  <p class="user-role text-orange-5 text-bold">
                    {{ `${user_data?.first_name?.toUpperCase()} ${user_data?.last_name[0]?.toUpperCase()}.` || "UNKNOWN" }}
                  </p>
                </div>

                <q-separator class="q-my-lg" />

                <q-list>
                  <q-item clickable v-ripple :to="{ name: profiles_route_names[user_data.role-1] }">
                    <q-item-section avatar>
                      <q-icon color="primary" name="arrow_right" />
                    </q-item-section>
                    <q-item-section>View Profile</q-item-section>
                  </q-item>
                  
                  <q-item clickable v-ripple :to="{ name: 'update-alumni-profile' }" v-if="user_data.role === 2">
                    <q-item-section avatar>
                      <q-icon color="primary" name="arrow_right" />
                    </q-item-section>
                    <q-item-section>Update Profile</q-item-section>
                  </q-item>
                  
                  <q-item clickable v-ripple :to="{ name: 'change-password' }">
                    <q-item-section avatar>
                      <q-icon color="primary" name="arrow_right" />
                    </q-item-section>
                    <q-item-section>Change Password</q-item-section>
                  </q-item>

                  <q-item clickable v-ripple @click="logoutConfirm">
                    <q-item-section avatar>
                      <q-icon color="primary" name="arrow_right" />
                    </q-item-section>

                    <q-item-section>Logout</q-item-section>
                  </q-item>
                </q-list>
              </div>
            </q-banner>
          </q-popup-proxy>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      class="bg-grey-1 d-print-none"
      v-model="left_drawer_open"
      show-if-above
      bordered
      d-print-none
    >
      <q-list>
        <q-item-label
          header
        >
        <div class="text-center" style="position: sticky; top: 0;">
          <q-img src="/assets/images/logo.png" alt="logo" style="width: 70px;" />
          <div class="text-caption q-py-none q-my-none">{{ date_time ? date_time : $moment().format('MMMM DD, YYYY HH:mm:ss A')}}</div>
        </div>
        </q-item-label>
        <q-separator color="grey-10" />
        <app-main-layout-drawer />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-dialog v-model="confirm_logout" persistent class="d-print-none">
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
  </q-layout>
</template>

<script>
import MainLayoutDrawer from 'components/layout/MainLayoutDrawer.vue';
export default {
  data() {
    return {
      app_title: process.env.VUE_APP_TITLE,
      left_drawer_open: false,
      date_time: null,
      confirm_logout: false,
      profiles_route_names: [
          'admin-profile',
          'alumni-profile',
          'employer-profile',
      ],
      user_data: null,
    }
  },
  mounted(){
    this.initializeDateAndTime();
    this.user_data = JSON.parse(localStorage.getItem('__sunn_alumni_app_fe_user_data'));
  },
  methods: {
    toggleLeftDrawer(){
      this.left_drawer_open = !this.left_drawer_open
    },
    initializeDateAndTime(){
      setInterval(() => {
        this.date_time = this.$moment().format('MMMM DD, YYYY hh:mm:ss A')
      }, 1000);
    },
    logoutConfirm() {
        this.confirm_logout = true;
    },
    logout() {
        localStorage.clear();
        this.$router.push({ name: 'login' });
    },
  },
  components: {
    appMainLayoutDrawer: MainLayoutDrawer,
  },
}
</script>
