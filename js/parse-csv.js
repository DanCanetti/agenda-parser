new Vue({
  el: '#agenda',
  data() {
    return {
      title: 'Agenda Items',
      agendaItems: []
    }
  },
  mounted() {
    axios
      .get('csv/test.csv')
      .then(response => (this.agendaItems = response.data))
  }
});