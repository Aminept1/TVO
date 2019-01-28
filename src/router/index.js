import Vue from 'vue'
import Router from 'vue-router'
// import App from '../App'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Client from '@/components/Client'
import Projects from '@/components/Projects'
import Tasks from '@/components/Tasks'
import UnderTasks from '@/components/UnderTasks'
import Collaborators from '@/components/Collaborators'
import About from '@/components/About'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },

    {
      path: '/Client',
      name: 'Client',
      component: Client
    },
    {
      path: '/Projects',
      name: 'Projects',
      component: Projects
    },
    {
      path: '/Tasks',
      name: 'Tasks',
      component: Tasks
    },
    {
      path: '/UnderTasks',
      name: 'UnderTasks',
      component: UnderTasks
    },
    {
      path: '/Collaborators',
      name: 'Collaborators',
      component: Collaborators
    },
    {
      path: '/About',
      name: 'About',
      component: About
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '*',
      redirect: '/'

    }
  ]
})
