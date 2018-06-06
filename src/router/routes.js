import DashboardLayout from '../components/Dashboard/Layout/DashboardLayout.vue'
// GeneralViews
import NotFound from '../components/GeneralViews/NotFoundPage.vue'

// Auth pages
import Login from '@/pages/auth/login'
import Register from '@/pages/auth/register'
import PasswordRequest from '@/pages/auth/password/request'
import PasswordReset from '@/pages/auth/password/reset'

// Management pages
import ManagementMain from '@/pages/management/main.vue'

// Management of users
import UsersIndex from 'src/pages/management/users/index.vue'
import UsersCreate from 'src/pages/management/users/create.vue'
import UsersEdit from 'src/pages/management/users/edit.vue'

// Management of roles
import RolesIndex from 'src/pages/management/roles/index.vue'
import RolesCreate from 'src/pages/management/roles/create.vue'
import RolesEdit from 'src/pages/management/roles/edit.vue'

// Admin pages
import Overview from 'src/components/Dashboard/Views/Overview.vue'
import UserProfile from 'src/components/Dashboard/Views/UserProfile.vue'
import TableList from 'src/components/Dashboard/Views/TableList.vue'
import Typography from 'src/components/Dashboard/Views/Typography.vue'
import Icons from 'src/components/Dashboard/Views/Icons.vue'
import Notifications from 'src/components/Dashboard/Views/Notifications.vue'

// Hospitals
import HospitalsIndex from '@/pages/hospitals/all.vue'
import HospitalsCreate from '@/pages/hospitals/create.vue'
import HospitalsEdit from '@/pages/hospitals/edit.vue'

// Patient cards
import PatientCardsIndex from '@/pages/patient_cards/index.vue'
import PatientCardsCreate from '@/pages/patient_cards/create.vue'
import PatientCardsEdit from '@/pages/patient_cards/edit.vue'

import ServicesIndex from 'src/pages/services/index'
import ServicesCreate from 'src/pages/services/create'
import ServicesEdit from 'src/pages/services/edit'

const routes = [
  {
    path: '/',
    name: 'Index',
    component: DashboardLayout,
    redirect: '/admin/overview',
    meta: {auth: true}
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {auth: false}
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {auth: false}
  },
  {
    path: '/password/reset',
    name: 'Password request',
    component: PasswordRequest,
    meta: {auth: false}
  },
  {
    path: '/password/reset/:token',
    name: 'Password reset',
    component: PasswordReset,
    meta: {auth: false}
  },
  {
    path: '/admin',
    component: DashboardLayout,
    redirect: '/admin/overview',
    // TODO change to true on prod
    meta: {auth: true},
    children: [
      {
        path: 'overview',
        name: 'Overview',
        component: Overview
      },
      {
        path: 'user',
        name: 'User',
        component: UserProfile
      },
      {
        path: 'table-list',
        name: 'Table List',
        component: TableList
      },
      {
        path: 'typography',
        name: 'Typography',
        component: Typography
      },
      {
        path: 'icons',
        name: 'Icons',
        component: Icons
      },
      {
        path: 'notifications',
        name: 'Notifications',
        component: Notifications
      },
      
      // management
      {
        path: 'management',
        name: 'management',
        component: ManagementMain
      },
      
      // users
      {
        path: 'management/users',
        name: 'users.index',
        component: UsersIndex
      },
      {
        path: 'management/users/create',
        name: 'users.create',
        component: UsersCreate
      },
      {
        path: 'management/users/:id(\\d+)/edit',
        name: 'users.edit',
        component: UsersEdit,
        props: true
      },
      
      // roles
      {
        path: 'management/roles',
        name: 'roles.index',
        component: RolesIndex
      },
      {
        path: 'management/roles/create',
        name: 'roles.create',
        component: RolesCreate
      },
      {
        path: 'management/roles/:id(\\d+)/edit',
        name: 'roles.edit',
        component: RolesEdit,
        props: true
      },
      
      // hospitals
      {
        path: 'hospitals',
        name: 'hospitals.index',
        component: HospitalsIndex
      },
      {
        path: 'hospitals/create',
        name: 'hospitals.create',
        component: HospitalsCreate,
        props: true
      },
      {
        path: 'hospitals/:id(\\d+)/edit',
        name: 'hospitals.edit',
        component: HospitalsEdit,
        props: true
      },
      
      // patient cards
      {
        path: 'patient-cards',
        name: 'patient_cards.index',
        component: PatientCardsIndex
      },
      {
        path: 'patient-cards/create',
        name: 'patient_cards.create',
        component: PatientCardsCreate,
        props: true
      },
      {
        path: 'patient-cards/:id(\\d+)/edit',
        name: 'patient_cards.edit',
        component: PatientCardsEdit,
        props: true
      },
      
      // services
      {
        path: 'services',
        name: 'services.index',
        component: ServicesIndex
      },
      {
        path: 'services/create',
        name: 'services.create',
        component: ServicesCreate
      },
      {
        path: 'services/:id(\\d+)/edit',
        name: 'services.edit',
        component: ServicesEdit,
        props: true
      }
    ]
  },
  {path: '*', component: NotFound}
]

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
 function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes
