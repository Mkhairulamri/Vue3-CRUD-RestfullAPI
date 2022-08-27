<template>
    <div class="container my-5">
        <div class="row justify-content-center">
            <div class="col-8">
                <router-link 
                    :to="{name:'transaction.create'}" 
                    class="btn btn-primary btn rounded shadow mb-3">
                    Add Transaction
                </router-link>
                <div class="card rounded-shadow">
                    <div class="card-header">
                        Transaction List
                    </div>
                    <div class="card-body">
                        <table class="table">
                            <thead>
                                <th>Title</th>
                                <th>Amount</th>
                                <th>Type</th>
                                <th>Action</th>
                            </thead>
                            <tbody>
                                <tr v-for="(transaction,index) in transaction.data " :key="index">
                                    <td>{{transaction.title}}</td>
                                    <td>{{transaction.amount}}</td>
                                    <td>{{transaction.type}}</td>
                                    <td>
                                        <!-- <div class="btn-group"> -->
                                            <router-link :to="{name:'transaction.edit', params:{id:transaction.id}}" class="btn btn-sm btn-outline-info">
                                            Edit
                                            </router-link>
                                            <button class="btn btn-outline-danger btn-sm" @click.prevent="destroy(transaction.id,index)">Hapus</button>
                                        <!-- </div> -->
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>

import axios from 'axios'
import {onMounted,ref} from 'vue'

export default{
    setup(){
        const transaction = ref([])
        
        onMounted(()=>{
            axios.get('http://127.0.0.1:8000/api/transaction')
            .then((result)=>{
                transaction.value = result.data
            }).catch((err)=>{
                console.log(err.response)
            })
        })

        function destroy(id,index){
            axios.delete(`http://127.0.0.1:8000/api/transaction/${id}`)

            .then(()=>{
                transaction.value.data.splice(index,1)
            })
            .catch((err)=>{
                console.log(err.result.data)
            })
        }
    

        return {
            transaction,
            destroy
        }
    },

    

}

</script>