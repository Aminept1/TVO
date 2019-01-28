<template>

<v-flex xs12 md10 offset-md1>

  <v-card style="width: 100%;">

    <edit-clients></edit-clients>

    <v-card-title>
      <v-spacer></v-spacer>
      <v-text-field
        append-icon="search"
        label="Search"
        single-line
        hide-details
        v-model="search"
      ></v-text-field>
    </v-card-title>

    <v-data-table
        v-bind:headers="headers"
        v-bind:items="clients"
        v-bind:search="search"
        item-key="_id"
      >
      <template slot="items" slot-scope="props">
        <tr>
            <!-- <td class="text-xs-left">{{ props.item.name }}</td> -->
          <td>
            <v-edit-dialog
              lazy
            > {{ props.item.name }}
              <v-text-field
                slot="input"
                label="Edit"
                v-model="props.item.name"
                single-line
              ></v-text-field>
            </v-edit-dialog>
          </td>
          <td class="text-xs-left">{{ props.item.groupe }}</td>
          <!-- <td class="text-xs-left" @click="props.expanded = !props.expanded">
            {{ props.item.description }}
          </td> -->
          <td class="text-xs-left">{{ props.item.nbPprojects }}</td>
          <td class="text-xs-left">{{ props.item.nbTasks }}</td>
          <td class="text-xs-left">{{ props.item.nbUnderTasks }}</td>
        </tr>
      </template>

      <template slot="expand" slot-scope="props">
        <v-card flat class="pl-5">
          <v-card-text class="text-xs-left">
            <v-text-field label="Note" v-model="props.item.notes"></v-text-field>
          </v-card-text>
        </v-card>
      </template>

      <template slot="pageText" slot-scope="{ pageStart, pageStop }">
        From {{ pageStart }} to {{ pageStop }}
      </template>

    </v-data-table>
  </v-card>

</v-flex>

</template>

<script>
import EditClients from './EditClients.vue'
import axios from 'axios'

export default {

  components: {
    EditClients
  },
  data () {
    return {
      clients: [

      ],
      search: '',
      pagination: {},
      headers: [
        { text: 'Nom ', align: 'left', sortable: true, value: 'name' },
        { text: 'Groupe', align: 'left', sortable: false, value: 'groupe' },
        { text: 'Nb. Projets', align: 'left', sortable: false, value: 'nbPprojects' },
        { text: 'Nb. Taches', align: 'left', sortable: false, value: 'nbTasks' },
        { text: 'Nb. Sous-taches', align: 'left', sortable: false, value: 'nbUnderTasks' }

      ]

    }
  },
  methods: {

  },
  created: function () {
    //   var self = this;
    axios.get('http://localhost:8056/clients')
      .then((response) => {
        console.log('AXIOS AXIOS AXIOS')
        console.log(response.data)
        this.clients = response.data
        console.log('**********')
        console.log(this.clients)
      })
  }

}
</script>

<style>

</style>
