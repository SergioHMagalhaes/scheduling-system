<template>
    <div class="container">
          <form>
                <input type="text" placeholder="Pesquisar">
                <button type="button" class="btn btn-secondary" @click="search">P</button>
            </form> 
        <table class="table table-sm mt-4">
        
            <caption>List of users</caption>
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

<style>

</style>