<template>
    <div class="container my-5">
        <div class="row justify-content-center">
            <div class="col-8">
                <router-link 
                    :to="{name:'transaction.index'}" 
                    class="btn btn-primary btn rounded shadow mb-3">
                    Index
                </router-link>
                <div class="card rounded-shadow">
                    <div class="card-header">
                        Edit Transaction 
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="update()">
                        <div class="mb-3">
                            <label for="" class="form-label">Title</label>
                            <input type="text" class="form-control" id="title" v-model="transaction.title">
                            <div v-if="validation.title" class="text-danger">{{validation.title[1]}}</div>
                        </div>
                        <div class="mb-3">
                            <label for="" class="form-label">Amount</label>
                            <input type="number" class="form-control" id="amount" v-model="transaction.amount">
                            <div class="text-danger" v-if="validation.amount">{{validation.amount[1]}}</div>
                        </div>
                        <div class="mb-3">
                            <label for="" class="form-label">Time</label>
                            <input type="datetime" class="form-control" id="amount" placeholder="yyyy-mm-dd hh:mm:ss" v-model="transaction.time">
                            <div class="text-danger" v-if="validation.time">{{validation.time[1]}}</div>
                        </div>
                        <div class="mb-3">
                            <label for="" class="form-label">Type</label>
                            <select name="" id="type" class="form-select" v-model="transaction.type">
                                <option value="">Select Option...</option>
                                <option value="expense" >Expense</option>
                                <option value="Revenue">Revenue</option>
                            </select>
                            <div class="text-danger" v-if="validation.type">{{validation.type[1]}}</div>
                        </div>
                        <input type="submit" class="btn btn-outline-primary" value="simpan">
                        <button class="btn btn-outline-primary" type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import {reactive, ref ,onMounted} from 'vue'
import {useRouter, useRoute} from 'vue-router'
import axios from 'axios'

export default{
    // data() {
    //     return {
    //         title:'',
    //         amount:'',
    //         time:'',
    //         type:''
    //     }
    // },
    setup(){
        let transaction = reactive({
            title:"",
            amount:"",
            time:"",
            type:""
        })

        const validation= ref([]);

        const router = useRouter();
        const route = useRoute();

        onMounted(()=>{
            axios.get(`http://127.0.0.1:8000/api/transaction/${route.params.id}`)
        })
        .then((result)=>{
            transaction.title = result.data.data.title
            transaction.amount = result.data.data.amount
            transaction.time = result.data.data.time
            transaction.type = result.data.data.type  
        })
        .catch((err)=>{
            console.log(err.response.data)
        })

        function update(e){
            axios.post(
                `http://127.0.0.1:8000/api/transaction/${route.params.id}`,
                transaction
            )
            .then(()=>{
                router.go({
                    name:'/'
                })
            })
            .catch((err)=>{
                validation.value = err.response.data
            })
        }


        return {
            transaction,
            testValid,
            validation,
            onMounted,
            update,
            router
        }
    }
}


</script>