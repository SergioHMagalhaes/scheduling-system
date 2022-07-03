<template>
<div>
  <FullCalendar :options="calendarOptions" />
  
  <div id="modalSchedule" class="modal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Agendar consulta</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form method="POST" action="/articles/update">
          <input v-model="modal.name" class="form-control w-75 p-2 my-4 m-auto" type="text" name="name" placeholder="Nome do paciente">
          <input v-model="modal.email" class="form-control w-75 p-2 my-4 m-auto" type="email" name="email" placeholder="E-mail do paciente">
          <input v-model="modal.cpf" class="form-control w-75 p-2 my-4 m-auto" type="text" name="cpf" placeholder="CPF do paciente" v-maska="'###.###.###-##'">
          <input v-model="modal.description" class="form-control w-75 p-2 my-4 m-auto" type="text" name="description" placeholder="Descrição">
          <div class="d-flex mx-5 mb-4">
            <input v-model="modal.date" class="ms-2 me-4 form-control  p-2 input-date" type="date" name="date">
            <input v-model="modal.time" class="form-control p-2  me-2  input-date" type="time" name="time">
          </div>
            
        </form>
      </div>
      <div class="modal-footer  mx-5">
        <button type="button" class="btn btn-light" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-primary" @click="create">Salvar</button>
      </div>
    </div>
  </div>
</div>
</div>
   
</template>

<script>
import { Modal } from 'bootstrap'
import '@fullcalendar/core/vdom' // solves problem with Vite
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import  { maska }  from  'maska'
import api from '@/services/request'

export default {
  directives: { maska },
  components: {
    FullCalendar // make the <FullCalendar> tag available
  },
  data() {
    return {
      calendarOptions: {
        plugins: [ dayGridPlugin, interactionPlugin ],
        initialView: 'dayGridMonth',
        locale: 'pt-br',
        dateClick: (info) => this.modalSchedule(info), 
      },
      modal: {
        name: '',
        email: '',
        cpf: '',
        description: '',
        date: null,
        time: '',
      }
    }
  },

  methods: {
    modalSchedule(info){
      this.modal.date = info.dateStr
          const modal = new Modal(document.getElementById('modalSchedule'))
          modal.show();
          
    },

    create(){
      api.create(this.modal, 'appointment')
    }
  }

}
</script>

<style scoped>

</style>

