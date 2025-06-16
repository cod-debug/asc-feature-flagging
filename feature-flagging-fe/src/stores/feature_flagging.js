import axios from 'src/utils/axios';
import { defineStore, acceptHMRUpdate } from 'pinia';

const API_BASE_URL = process.env.VUE_APP_API_BASE_URL;
export const featureFlaggingStore = defineStore('authStore', {
  state: () => ({
    is_logged_in: false,
    token: null,
    add_request: {
      loading: false,
      error: null,
      data: null,
    },
    update_request: {
      loading: false,
      error: null,
      data: null,
    },
    toggle_request: {
      loading: false,
      error: null,
      data: null,
    },
    list_request: {
      loading: false,
      error: null,
      data: null,
    },
    delete_request: {
      loading: false,
      error: null,
      data: null,
    },
    toggle_all_request: {
      loading: false,
      error: null,
      data: null,
    }
  }),
  getters: {},
  actions: {
    async add(payload) {
      this.add_request.loading = true;
      try {
        const { data, status } = await axios({
          method: 'POST',
          url: `${API_BASE_URL}/api/v1/feature`,
          data: payload,
        });

        if ([200, 201].includes(status)) {
          this.add_request.data = data;
          this.add_request.error = null;
        }
      } catch (error) {
        this.add_request.data = null;
        this.add_request.error = error.response.data;
      } finally {
        this.add_request.loading = false;
      }
    },
    async list(payload) {
      this.list_request.loading = true;
      try {
        const { data, status } = await axios({
          method: 'GET',
          url: `${API_BASE_URL}/api/v1/feature`,
          params: payload,
          headers: {
            'Content-Type': "application/json",
            Authorization: `Bearer ${localStorage.getItem('__feature_flagging_app_fe_token')}`
          },
        });

        if ([200, 201].includes(status)) {
          this.list_request.data = data;
          this.list_request.error = null;
        }
      } catch (error) {
        this.list_request.data = null;
        this.list_request.error = error.response.data;
      } finally {
        this.list_request.loading = false;
      }
    },
    async update(payload) {
      this.update_request.loading = true;
      try {
        const { data, status } = await axios({
          method: 'PUT',
          url: `${API_BASE_URL}/api/v1/feature/${payload.id}`,
          data: payload,
        });

        if ([200, 201].includes(status)) {
          this.update_request.data = data;
          this.update_request.error = null;
        }
      } catch (error) {
        this.update_request.data = null;
        this.update_request.error = error.response.data;
      } finally {
        this.update_request.loading = false;
      }
    },
    async toggle(payload) {
      this.toggle_request.loading = true;
      try {
        const { data, status } = await axios({
          method: 'PUT',
          url: `${API_BASE_URL}/api/v1/feature/toggle/${payload.id}`,
        });

        if ([200, 201].includes(status)) {
          this.toggle_request.data = data;
          this.toggle_request.error = null;
        }
      } catch (error) {
        this.toggle_request.data = null;
        this.toggle_request.error = error.response.data;
      } finally {
        this.toggle_request.loading = false;
      }
    },
    async delete(payload) {
      this.delete_request.loading = true;
      try {
        const { data, status } = await axios({
          method: 'DELETE',
          url: `${API_BASE_URL}/api/v1/feature/${payload.id}`,
        });

        if ([200, 201].includes(status)) {
          this.delete_request.data = data;
          this.delete_request.error = null;
        }
      } catch (error) {
        this.delete_request.data = null;
        this.delete_request.error = error.response.data;
      } finally {
        this.delete_request.loading = false;
      }
    },
    async toggleAll(payload) {
      this.toggle_all_request.loading = true;
      try {
        const { data, status } = await axios({
          method: 'PUT',
          url: `${API_BASE_URL}/api/v1/feature/toggle/all`,
          data: payload,
        });

        if ([200, 201].includes(status)) {
          this.toggle_all_request.data = data;
          this.toggle_all_request.error = null;
        }
      } catch (error) {
        this.toggle_all_request.data = null;
        this.toggle_all_request.error = error.response.data;
      } finally {
        this.toggle_all_request.loading = false;
      }
    },
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(featureFlaggingStore, import.meta.hot))
}
