<template>
  <div>
    <v-toolbar flat color="white" style="padding-bottom: 50px;" >

        <v-text-field
        append-icon="search"
        label="Recherche / Filtre"
        single-line
        hide-details
        v-model="search"
        ></v-text-field>

      <v-spacer></v-spacer>

      <v-dialog v-model="dialog" max-width="800px">
        <v-btn  slot="activator" color="primary" dark class="mb-2"> + </v-btn>
        <v-card>
          <v-card-title>
            <span class="subheading grey--text">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>

                <v-flex xs12 sm6 md12>
                    <v-switch :label="`Statut`" v-model="editedItem.status" color="success"></v-switch>
                </v-flex>

                <v-flex xs12 sm6 md12>
                  <v-text-field v-model="editedItem.name" label="Nom / Libellé"></v-text-field>
                </v-flex>

                <v-flex xs12 sm6 md12>
                     <v-select :items="projectsss" item-text="label" v-model="editedItem.type" label="Type"></v-select>
                </v-flex>

                <v-flex xs12 sm6 md12>
                  <v-select :items="projectsss" item-text="label" v-model="editedItem.client" label="Choisissez un client"></v-select>
                </v-flex>

                <v-flex xs12 sm12>
                  <v-select v-bind:items="projectsss" item-text="label" v-model="editedItem.team" label="Assignez une équipe" autocomplete multiple chips></v-select>
                </v-flex>

                <v-flex xs12 sm6 md6>
                    <v-menu
                        ref="menu"
                        :close-on-content-click="false"
                        v-model="menu"
                        :nudge-right="40"
                        :return-value.sync="date"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        min-width="290px"
                    >
                        <v-text-field
                        slot="activator"
                        v-model="date"
                        label="Date de demmarage"
                        prepend-icon="event"
                        readonly
                        color="green"
                        ></v-text-field>
                        <v-date-picker v-model="editedItem.startDate" no-title scrollable color="green">
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                        <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                        </v-date-picker>
                    </v-menu>

                </v-flex>

                <v-flex xs12 sm6 md6>
                    <v-text-field v-model="editedItem.expectedDuration" type="number" label="Durée estimée" append-outer-icon="add" @click:append-outer="increment" prepend-icon="remove" @click:prepend="decrement"></v-text-field>
                </v-flex>

                <v-flex xs12 sm6 md12>
                    <v-radio-group v-model="editedItem.state" row>
                    <v-radio
                        label="Demmarage"
                        color="success"
                        value="start"
                    ></v-radio>
                    <v-radio
                        label="Progression"
                        color="info"
                        value="inProgress"
                    ></v-radio>
                    <v-radio
                        label="Suspendu"
                        color="orange"
                        value="bug"
                    ></v-radio>
                    <v-radio
                        label="Terminer"
                        color="teal"
                        value="done"
                    ></v-radio>
                    </v-radio-group>
                </v-flex>

              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Annuler</v-btn>
            <v-btn color="blue darken-1" flat @click="save(editedItem)">Enregistrer</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>

    <v-data-table
      :headers="headers"
      :items="projects"
      v-bind:search="search"
      :expand="expand"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <tr @click="props.expanded = !props.expanded">
        <td class="text-xs-left">{{ props.item.label }}</td>
        <td class="text-xs-left">{{ props.item.client.name }}</td>
        <td class="text-xs-left">{{ props.item.startDate }}</td>
        <td class="text-xs-left">{{ props.item.expectedDuration }}</td>
        <td class="text-xs-left">{{ props.item.nbTasks }}</td>
        <td class="text-xs-left">{{ props.item.nbUnderTasks }}</td>
        <td class="text-xs-left">
                <v-badge v-if="props.item.status" color="green"> <span slot="badge">!</span> </v-badge>
                <v-badge v-else color="red"> <span slot="badge">!</span> </v-badge>
        </td>

        <td class="text-xs-left">
            <v-chip v-if="props.item.state=='start'" color="green" text-color="white">Demmarage</v-chip>
            <v-chip v-if="props.item.state=='inProgress'" color="info" text-color="white">En cours</v-chip>
            <v-chip v-if="props.item.state=='bug'" color="red" text-color="white">Bug</v-chip>
            <v-chip v-if="props.item.state=='done'" color="teal" text-color="white">Terminé</v-chip>
        </td>
                 
        <td class="justify-center layout px-0">
          <v-icon
            small
            class="mr-2"
            @click="editItem(props.item)"
          >
            edit
          </v-icon>
          <v-icon
            small
            @click="deleteItem(props.item)"
          >
            delete
          </v-icon>
        </td>
        </tr>
      </template>
      <template slot="expand" slot-scope="props">
        <v-card flat class="text-xs-left">
          <v-card-text>{{props.item.label}}</v-card-text>
        </v-card>
      </template>
      <!-- <template slot="no-data">
        <v-btn color="primary" @click="initialize">Actualiser</v-btn>
      </template> -->
    </v-data-table>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data: () => ({
    url: 'http://localhost:8063/projects/',
    search: '',
    expand:true,
    dialog: false,
    headers: [
      { text: 'Nom', value: 'name'},
      { text: 'Client ', value: 'client' },
      { text: 'Date de démmarage ', value: 'startDate' },
      { text: 'Durée estimée ', value: 'expectedDuration' },
      { text: 'Nb. tâche ', value: 'nbTasks' },
      { text: 'Nb. Sous-tâche ', value: 'nbUnderTasks' },
      { text: 'Statut ', value: 'status' },
      { text: 'Etat ', value: 'state' },
      { text: 'Actions', value: 'name', sortable: false }
    ],
    client:'',
    team:[],
    expectedDuration :0,
    status : true,
    date: new Date().toISOString().substr(0, 10),
    menu: false,

    projects : [],
    projectsss: [
    {
      id: 1,
      label: "FitNesse",
      type:'Full Project',
      client: "Local",
      startDate: new Date().toISOString().slice(0,10),
      expectedDuration: "3",
      nbTasks: 3,
      nbUnderTasks: 5,
      status: true, 
      state:'inProgress'
    }
    ],

    clients: [],
    collaborators:[],
    editedIndex: -1,
    editedItem: {
      label: '',
      type:'',      
      client:'',
      team:[],
      startDate: new Date().toISOString().substr(0, 10),
      expectedDuration :0, 
      status: true,
      state:'start'
    },
    defaultItem: {
      label: '',
      type:'',
      client:'',
      team:[],
      startDate: new Date().toISOString().substr(0, 10),
      expectedDuration :0, 
      status: true,
      state:'start'
    }
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Nouveau projet' : 'Modifier le projet'
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    }
  },

  created () {
    this.initialize()
  },

  methods: {
    initialize () {
      axios.get(this.url)
        .then((response) => {
          this.projects = response.data
          console.log("***************")
          console.log(this.projects)
        })
        .catch(error => {
          console.log(error)
        })
    },

    editItem (item) {
      this.editedIndex = item.id
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      confirm('Voulez vous vraiments suprimer le projet ' + item.name + ' ?')
      const id = item.id
      axios.delete(this.url + id)
        .then((response) => {
          this.close()
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    },

    close () {
      this.dialog = false
      setTimeout(() => {
        this.initialize()
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    save (editedItem) {
      if (this.editedIndex > -1) {
        axios.post(this.url, editedItem)
          .then((response) => {
            console.log(response)
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        axios.post(this.url, editedItem)
          .then((response) => {
            console.log(response)
          })
          .catch(error => {
            console.log(error)
          })
      }
      this.close()
    },
    increment () {
        console.log("yoho")
      this.expectedDuration = parseInt(this.expectedDuration,10) + 3
    },
    decrement () {
      this.expectedDuration = parseInt(this.expectedDuration,10) - 3
    }
  }
}
</script>

<style>

</style>
