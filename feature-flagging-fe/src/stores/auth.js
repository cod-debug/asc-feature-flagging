import axios from 'src/utils/axios';
import { defineStore, acceptHMRUpdate } from 'pinia';

const API_BASE_URL = process.env.VUE_APP_API_BASE_URL;
export const authStore = defineStore('authStore', {
  state: () => ({
    is_logged_in: false,
    token: null,
    login_request: {
      loading: false,
      error: null,
      data: null,
    },
  }),
  getters: {},
  actions: {
    async loginUser(payload){
      this.login_request.loading = true;
      try {
        const {data, status} = await axios({
          method: 'POST',
          url:`${API_BASE_URL}/api/v1/auth/login`,
          data: payload,
        });
        
        if([200,201].includes(status)){
          this.login_request.data = data;
          this.login_request.error = null;
        }
      } catch(error){
        this.login_request.data = null;
        this.login_request.error = error.response.data;
      } finally {
        this.login_request.loading = false;
      }
    },
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(authStore, import.meta.hot))
}
