import { defineRouter } from '#q-app/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'
import { Notify } from 'quasar';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default defineRouter(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })

  Router.beforeEach((to, from, next) => {
    const access_token = localStorage.getItem('__feature_flagging_app_fe_token');
    const user_data = JSON.parse(localStorage.getItem('__feature_flagging_app_fe_user_data'));
    const requires_auth = !to.meta.notRequiredAuth || false;
    const allowed_users = to.meta?.allowed_users || [];

    if (requires_auth && !access_token) {
      // check if route requires auth and client don't have an access token
      Notify.create({
        message: `Unauthorized user detected.`,
        position: 'top-right',
        closeBtn: "X",
        timeout: 2000,
        color: 'red',
        icon: "warning",
      })
      next({ name: "login" });
    } else if(allowed_users?.length > 0 && !allowed_users.includes(user_data.role)){
      // check if route has allowed users and if allowed user role does not match with allowed users, client should be redirected to dashboard
      next({ name: "dashboard" });
    } else if(!requires_auth && access_token){
      // check if route does not require auth and client have access token
      next({ name: "dashboard" });
    } else {
      // if route and client information matches proceed to next route
      next();
    }
  });

  return Router
})
