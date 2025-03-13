import Axios from 'axios';

const user_token = localStorage.getItem('__feature_flagging_app_fe_token');

Axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
Axios.defaults.headers.common['Content-Type'] = "application/json";
Axios.defaults.headers.common['Authorization'] = `Bearer ${user_token}`;

// Add a response interceptor
Axios.interceptors.response.use(
    response => response, // If the response is successful, return it.
    error => {
        if (error.response && error.response.status === 401) {
            console.warn("Unauthorized request. Redirecting to login...");
            
            // Optionally, clear the token and redirect to login
            localStorage.clear();
            window.location.reload();
        }
        return Promise.reject(error);
    }
);


export default Axios;