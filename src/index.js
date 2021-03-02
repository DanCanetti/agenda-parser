import $ from 'jquery';
import Papa from 'papaparse';

// Convert CSV to Json
function parseData(url, callBack) {
    Papa.parse(url, {
        download: true,
        dynamicTyping: true,
        complete: function (results) {
            callBack(results.data);
        }
    });
}

// Get csv file
var file = document.getElementById("file").files[0];
var timelineContent = '';

// Button parse CSV
var submit_button = document.getElementById('submit_button');
submit_button.addEventListener('click', parseCSV);

// Parse CSV
function parseCSV() {
    console.log('Parsing Array!');
    var timelineContent = [];
    var file = document.getElementById("file").files[0];
    parseMe(file);
}

// Parse the data
function parseMe(url, callBack) {
    Papa.parse(url, {
        header: true,
        keepEmptyRows:false,
        skipEmptyLines: true,
        complete: function (results) {
            //callBack(results.data[0]);
            var timelineContent = results.data;
            console.log(timelineContent);
            $.each(timelineContent, function (timelineID, timelineItem) {
                const array = [timelineItem]
                array.forEach(function (item, index) {
                    /*
                    console.log(item.Start);
                    console.log(item.End);
                    console.log(item.Title);
                    console.log(item.Speaker);
                    */
                    var start   = item.Start;
                    var end     = item.End;
                    var title   = item.Title;
                    var speaker = item.Speaker;
                    // Append to list
                    $('.timeline__body').append('<tr>\
                    <td>' + start + ' - ' + end + '</td>\
                    <td>\
                        <span class="item">\
                            <strong>' + title + '</strong>\
                            <span class="speaker-name">' + speaker + '</span>\
                        </span>\
                    </td>\
                    ');
                });
            });
        }
    });
}

// Get the timeline data
function createTimeline(data) {
    console.log('Array: ' + data);
    console.log('Timeline will contain: ' + timelineContent);
    // Create the timeline
    $.each(data, function (timelineID, timelineItem) {
        // Append to list
        $('.timeline__body').append('<tr>\
        <td>' + data.Start + ' - ' + data.End + '</td>\
        <td>\
            <span class="item">\
                <strong>' + data.Title + '</strong>\
                <span class="speaker-name">' + data.Speaker + '</span>\
            </span>\
        </td>\
        ');
    });
}