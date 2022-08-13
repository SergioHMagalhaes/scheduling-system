<template>
  <div>
    <FullCalendar ref="fullCalendar" class="FullCalendar" :options="calendarOptions" />
    <div id="modalSchedule" class="modal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{title}} consulta</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form>
              <input v-model="modal.name" class="form-control w-75 p-2 my-4 m-auto" type="text" name="name"
                placeholder="Nome do paciente">
              <input v-model="modal.email" class="form-control w-75 p-2 my-4 m-auto" type="email" name="email"
                placeholder="E-mail do paciente">
              <input v-model="modal.cpf" class="form-control w-75 p-2 my-4 m-auto" type="text" name="cpf"
                placeholder="CPF do paciente" v-maska="'###.###.###-##'">
              <input v-model="modal.description" class="form-control w-75 p-2 my-4 m-auto" type="text"
                name="description" placeholder="Descrição">
              <div class="d-flex mx-5 mb-4">
                <input v-model="modal.date" class="ms-2 me-4 form-control  p-2 input-date" type="date" name="date">
                <input v-model="modal.time" class="form-control p-2  me-2  input-date" type="time" name="time">
              </div>
            </form>
          </div>
          <div class="modal-footer  mx-5">
            <button type="button" class="btn btn-light" data-bs-dismiss="modal">Cancelar</button>
            <button v-if="this.title == 'Agendar'" type="button" class="btn btn-secondary"
              @click="create">Agendar</button>
            <button v-else type="button" class="btn btn-secondary" @click="update">Salvar</button>
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
import timeGridPlugin from '@fullcalendar/timegrid'
import  { maska }  from  'maska'
import Swal from 'sweetalert2'
import api from '@/services/request'

export default {
  directives: {
    maska
  },
  components: {
    FullCalendar // make the <FullCalendar> tag available
  },
  data() {
    return {
      windowSize: window.innerWidth,
      modalBootstrap: '',
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
        initialView: window.innerWidth <= 650 ? 'timeGridDay' : 'dayGridMonth',
        locale: 'pt-br',
        events: null,
        dateClick: (info) => this.modalSchedule(info, true),
        eventClick: (info) => this.alertSchedule(info),
        eventColor: '#3c4043',
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
    }

  },

  props: {
    openModal: {
      type: Boolean
    },
  },

  async created() {
    this.loadEvents()
  },

  watch: {
    openModal: function () {
      this.modalSchedule()
    },
  },

  mounted() {
    window.addEventListener('resize', () => {
      this.windowSize = window.innerWidth
      this.mobileScreen()
    })
  },

  methods: {
    async loadEvents() {
      const appointment = await api.list('appointment', {
        showFinished: false
      })
      this.calendarOptions.events = appointment.data
    },

    modalSchedule(info, dateStr) {
      if (dateStr) {
        this.modal = {
          name: '',
          email: '',
          cpf: '',
          description: '',
          date: info.dateStr,
          time: '',
        }
        this.title = 'Agendar'
      }
      this.modalBootstrap = new Modal(document.getElementById('modalSchedule'))
      this.modalBootstrap.show();

    },

    async modalScheduleEdit(info, finish) {
      const result = await api.retrieve(`appointment/${info.id}`)
      this.modal = result.data
      finish ? this.modal.finished = true : this.modalSchedule()
    },

    async alertSchedule(info) {
      Swal.fire({
        title: info.event.title,
        text: 'O que você deseja fazer com essa consulta?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#20232A',
        cancelButtonColor: '#76828e',
        confirmButtonText: 'Finalizar',
        cancelButtonText: 'Editar'
      }).then(async (result) => {
        document.querySelector('body').style.padding = '0px'
        if (result.isConfirmed) {
          await this.modalScheduleEdit(info.event, true)
          Swal.fire({
            icon: 'success',
            title: 'Consulta Finalizada',
            confirmButtonColor: '#20232A',
          }).then(async () => this.update())
        } else {
          this.title = 'Editar'
          this.modalScheduleEdit(info.event)
        }
      })
    },

    create() {
      api.create(this.modal, 'appointment')
      window.location.reload(true)
    },

    async update() {
      api.update(this.modal, `appointment/${this.modal._id}`)
      window.location.reload(true)

    },

    mobileScreen() {
      const calendarApi = this.$refs.fullCalendar.getApi()
      this.windowSize <= 650 ? calendarApi.changeView('timeGridDay') : calendarApi.changeView('dayGridMonth')
    }
  }

}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

.fc-event-title, .fc-event-time, .fc-daygrid-day-number, .fc-col-header-cell-cushion {
  font-family: 'Roboto', sans-serif;
  color: #3c4043;

}
.fc-daygrid-day-number{
  color: #787D81;
  text-decoration: none;
}

.FullCalendar{
  width: 100%;
  padding: 25px;
  min-height: 100vh;
}

.fc-toolbar-title{
  font-family: 'Roboto', sans-serif;
  color: #2c2c2c;
  font-weight: 700;
}

.fc .fc-button-primary {
  margin-right: 5px;
  background-color: #20232A;
}

.fc-scrollgrid-sync-inner{
  height: 50px;
  
}

.fc th{
  background-color: #20232A !important;
}

.fc-col-header-cell-cushion {
  position: relative;
  top: 50%;
  transform: translateY(-50%); 
  color: #fff;
  text-decoration: none;
}

.fc-day-today{
   background-color: #f5f5f5 !important;
}


@media screen and (max-width: 650px){
  .FullCalendar{
    margin-top: 20px;
    padding: 6px;
  }

  #fc-dom-1{
    font-size: 20px;
    text-align: center 
  }
  .fc-button-group, .fc-toolbar-chunk{
    display: flex;
  }
  .fc-event-title {
    color: #fff;
  }
}
</style>

