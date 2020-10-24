// Convert CSV to Json
let csvToJson = require('convert-csv-to-json');
 
let fileInputName = 'csv/test.csv'; 
let fileOutputName = 'csv/test.json';
 
csvToJson.generateJsonFileFromCsv(fileInputName,fileOutputName);

// Parse Json File
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
      .get('csv/test.json')
      .then(response => (this.agendaItems = response.data))
  }
});