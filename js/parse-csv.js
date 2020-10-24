// Convert CSV to Json

// Parse Json File
new Vue({
  el: '#agenda',
  data() {
    return {
      title: 'Agenda Items',
      agendaItems: null
    }
  },
  mounted() {
    axios
      .get('csv/test.json')
      .then(response => (this.agendaItems = response))
  }
});