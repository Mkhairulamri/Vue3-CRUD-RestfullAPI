import {createRouter, createWebHistory} from 'vue-router';
import Index from '../views/transaction/index.vue'

const routes = [
    //cara import component 1 yaitu import di namespace dengan satu variabel dan di panggil
    {
        path:'/',
        name:'transaction.index',
        component:Index
    },
    //cara import 2 yaitu import langsung menggunakan method import dengan lansung memanggil filenya
    {
        path:'/create',
        name:'transaction.create',
        component:()=> import("../views/transaction/create.vue")
    },
    {
        path:'/edit/:id',
        name:'transaction.edit',
        component:()=> import("../views/transaction/edit.vue")
    }
];

const router = createRouter({
    history : createWebHistory(),
    routes
});

export default router;