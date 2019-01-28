<template>
    <div>

        <v-btn

            left
            color= #1976d2
            dark
            absolute
            @click="dialog = !dialog"
            >
            <v-icon>add</v-icon>
        </v-btn>

        <v-dialog v-model="dialog" width="800px">
            <v-card>
                <v-card-title
                    class="grey lighten-4 py-4 title"
                    >
                    Client
                </v-card-title>
                <v-container grid-list-sm class="pa-4">
                    <v-layout row wrap>
                        <v-flex xs12>
                            <v-text-field
                                placeholder="Nom"
                                v-model="client.name"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field
                                placeholder="Groupe"
                                v-model="client.groupe"
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-container>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="dialog = false">Annuler</v-btn>
                    <v-btn flat @click="saveTransaction">Enregistrer</v-btn>
                </v-card-actions>

            </v-card>
        </v-dialog>

    </div>
</template>

<script>
export default {

  data: () => ({
    dialog: false,
    client: {
      id: null,
      name: '',
      groupe: ''

    }
  }),
  methods: {
    saveTransaction: function () {
      console.log('Saving transaction record:')
      // TODO: wire up Vuex action

      this.dialog = false
    },
    showEditClientDialog: function () {
      this.dialog = true
    }

  }

}
</script>

<style>

</style>
