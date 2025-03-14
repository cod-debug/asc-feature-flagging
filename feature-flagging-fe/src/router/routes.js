const routes = [
  {
    path: '/',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/HomePage.vue'),
        name: 'login',
        meta: {
          notRequiredAuth: true
        },
      },
    ]
  },
  {
    path: '/feature-flag',
    component: () => import('layouts/FeatureFlaggingLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/admin/FeatureFlagIndex.vue'),
        name: 'feature-flag'
      }
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  },
]

export default routes
