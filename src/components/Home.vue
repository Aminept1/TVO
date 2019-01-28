<template>
    <div>
        <client></client>
    </div>
</template>

<script>
import Client from './Client.vue'
import EditClients from './EditClients.vue'
export default {
  components: {
    Client,
    EditClients
  },
  data: () => ({
    dialog: false,
    drawer: null
  })
}
</script>

<style>

</style>
