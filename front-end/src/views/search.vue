<template>
    <div class="container">
        <div class="table-responsive-md">
            <table class="table mt-4">
        
            <caption>List of appointment</caption>
                <tbody>
                    <tr v-for="item in result" :key="item.id">
                        <th>{{item.name}}</th>
                        <th>{{item.email}}</th>
                        <th>{{item.description}}</th>
                        <th>{{item.cpf}}</th>
                        <th>{{item.date}}</th>
                        <th>{{item.time}}</th>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import api from '@/services/request'
export default {
    data() {
        return {
            result: [],
        }
    },
   async created(){
        const result= await api.list('appointment/search', {search:  this.$route.query.search})
        this.result = result.data
   }

}
</script>