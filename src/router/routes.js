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
import UsersIndex from '@/pages/management/users/index.vue'
import UsersCreate from '@/pages/management/users/create.vue'
import UsersEdit from '@/pages/management/users/edit.vue'

// Admin pages
import Overview from 'src/components/Dashboard/Views/Overview.vue'
import UserProfile from 'src/components/Dashboard/Views/UserProfile.vue'
import TableList from 'src/components/Dashboard/Views/TableList.vue'
import Typography from 'src/components/Dashboard/Views/Typography.vue'
import Icons from 'src/components/Dashboard/Views/Icons.vue'
// import Maps from 'src/components/Dashboard/Views/Maps.vue'
import Notifications from 'src/components/Dashboard/Views/Notifications.vue'

// Hospitals
import AllHospitals from '@/pages/hospitals/all'
import CreateHospital from '@/pages/hospitals/create'
import EditHospital from '@/pages/hospitals/edit'

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
      
      // users
      {
        path: 'management',
        name: 'management',
        component: ManagementMain
      },
      {
        path: 'management/users',
        name: 'users.index',
        component: UsersIndex
      },
      {
        path: 'management/users/create',
        name: 'users.create',
        component: UsersCreate,
        props: true
      },
      {
        path: 'management/users/:id/edit',
        name: 'users.edit',
        component: UsersEdit,
        props: true
      },
      
      // hospitals
      {
        path: 'hospitals',
        name: 'hospitals.index',
        component: AllHospitals
      },
      {
        path: 'hospitals/create',
        name: 'hospitals.create',
        component: CreateHospital
      },
      {
        path: 'hospitals/:hospital/edit',
        name: 'hospitals.edit',
        component: EditHospital
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
