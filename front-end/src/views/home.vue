<template>
<div>
  <form >
    <input v-model="searchInput" type="text" placeholder="Pesquisar">
    <button type="button" class="btn btn-secondary" @click="search">P</button>
  </form>
  
  <FullCalendar :options="calendarOptions" />
  
  <div id="modalSchedule" class="modal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5  class="modal-title">{{title}} consulta</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form>
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
        <button v-if="this.title == 'Agendar'" type="button" class="btn btn-primary" @click="create">Agendar</button>
        <button v-else type="button" class="btn btn-primary" @click="update">Salvar</button>
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
import Swal from 'sweetalert2'
import api from '@/services/request'

export default {
  directives: { maska },
  components: {
    FullCalendar // make the <FullCalendar> tag available
  },
  data() {
    return {
      modalBootstrap: '',
      calendarOptions: {
        plugins: [ dayGridPlugin, interactionPlugin ],
        initialView: 'dayGridMonth',
        locale: 'pt-br',
        events: null,
        dateClick: (info) => this.modalSchedule(info, true),
        eventClick: (info) => this.alertSchedule(info)
      },
      modal: {
        name: '',
        email: '',
        cpf: '',
        description: '',
        date: null,
        time: '',
      },
      title: 'Agendar',
      searchInput: ''
    }
    
  },

  async created(){
    this.loadEvents()
  },

  methods: {
    async loadEvents(){
      const appointment = await api.list('appointment',{showFinished: false})
      this.calendarOptions.events = appointment.data
    },

    modalSchedule(info, dateStr){
      if(dateStr){
        this.modal = {name: '', email: '', cpf: '', description: '', date: info.dateStr, time: '',}
        this.title = 'Agendar'
      }
      this.modalBootstrap = new Modal(document.getElementById('modalSchedule'))
      this.modalBootstrap.show();
          
    },

    async modalScheduleEdit(info, finish){
      const result = await api.retrieve(`appointment/${info.id}`)
      this.modal = result.data
      finish ? this.modal.finished = true : this.modalSchedule()
    },

    async alertSchedule(info){
      Swal.fire({
        title: info.event.title,
        text: 'O que você deseja fazer com essa consulta?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#77dd77',
        confirmButtonText: 'Finalizar',
        cancelButtonText: 'Editar'
      }).then(async (result) => {
        if (result.isConfirmed) {
          await this.modalScheduleEdit(info.event, true)
          this.update()
          alert("Consulta finalizada")
        }
        else {
          this.title = 'Editar'
          this.modalScheduleEdit(info.event)
        }
      })
    },

    create(){
      api.create(this.modal, 'appointment')
      window.location.reload(true)
    },

    async update(){
      api.update(this.modal, `appointment/${this.modal._id}`)
      window.location.reload(true)
      
    },

    search(){
      if(this.searchInput) this.$router.push({ path: '/search', query:{ search: this.searchInput } })
    }  
    }

}
</script>

<style scoped>

</style>

