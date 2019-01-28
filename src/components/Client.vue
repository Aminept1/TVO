<template>
  <div>
    <v-toolbar flat color="white" style="padding-bottom: 50px;" >

      <!-- <v-toolbar-title>Espace clients</v-toolbar-title> -->

        <!-- <v-spacer></v-spacer> -->

        <v-text-field
        append-icon="search"
        label="Recherche / Filtre"
        single-line
        hide-details
        v-model="search"
        ></v-text-field>

      <v-spacer></v-spacer>

      <v-dialog v-model="dialog" max-width="500px">
        <v-btn  slot="activator" color="primary" dark class="mb-2"> + </v-btn>
        <v-card>
          <v-card-title>
            <span class="subheading grey--text">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md12>
                  <v-text-field v-model="editedItem.name" label="Nom"></v-text-field>
                </v-flex>

                <v-flex xs12 sm6 md12>
                  <v-text-field v-model="editedItem.groupe" label="Groupe"></v-text-field>
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
      :items="clients"
      v-bind:search="search"
      header-key="clients.name"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.name }}</td>
        <td class="text-xs-left">{{ props.item.groupe }}</td>
        <td class="text-xs-left">{{ props.item.nbPprojects }}</td>
        <td class="text-xs-left">{{ props.item.nbTasks }}</td>
        <td class="text-xs-left">{{ props.item.nbUnderTasks }}</td>
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
      </template>
      <template slot="no-data">
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data: () => ({
    url: 'http://localhost:8063/clients/',
    search: '',
    dialog: false,
    headers: [
      { text: 'Nom', value: 'name'},
      { text: 'Groupe ', value: 'groupe' },
      { text: 'Nb. Projets ', value: 'nbPprojects' },
      { text: 'Nb. Tâche ', value: 'nbTasks' },
      { text: 'Nb. Sous-tâche ', value: 'nbUnderTasks' },
      { text: 'Actions', value: 'name', sortable: false }
    ],
    clients: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      groupe: 'Aucun',
      nbPprojects: 0,
      nbTasks: 0,
      nbUnderTasks: 0
    },
    defaultItem: {
      name: '',
      groupe: 'Aucun',
      nbPprojects: 0,
      nbTasks: 0,
      nbUnderTasks: 0
    }
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Nouveau client' : 'Modifier le client'
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
          this.clients = response.data
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
      confirm('Voulez vous vraiments suprimer le client ' + item.name + ' ?')
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
    }
  }
}
</script>

<style>

</style>
