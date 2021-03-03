// CSS
import './partials/main.scss';

// JS
import $ from 'jquery';
import Papa from 'papaparse';
import JSZip from 'jszip';
import saveAs from 'file-saver';

if (process.env.NODE_ENV === 'development') {
    console.log('Mode: ' + process.env.NODE_ENV)
}

// Hide Preview
$('.preview-header, #timeline-content').hide();

// Get csv file
var file = document.getElementById("file").files[0];
var timelineContent = '';

// Button parse CSV
var createbtn = document.getElementById('create');
createbtn.addEventListener('click', parseCSV);

// Parse CSV
function parseCSV() {
    var file = document.getElementById("file").files[0];
    parseFile(file);
}

// Parse the data
function parseFile(url, callBack) {
    Papa.parse(url, {
        header: true,
        keepEmptyRows: false,
        skipEmptyLines: true,
        complete: function (results) {
            $('.preview-header, #timeline-content').show();
            var timelineContent = results.data;
            $.each(timelineContent, function (timelineID, timelineItem) {
                const array = [timelineItem]
                array.forEach(function (item, index) {
                    var start = item.Start;
                    var end = item.End;
                    var title = item.Title;
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

// Create ZIP and Download
var downloadbtn = document.getElementById('download');
downloadbtn.addEventListener('click', getZIP);

function getZIP() {
    var zip = new JSZip();

    // Generate CSS Directory
    var scss = zip.folder("scss");

    // Get CSS Files
    const timelinescss = '_timeline.scss';
    fetch('downloads/' + timelinescss)
    .then(res => res.arrayBuffer())
    .then(ab => {
        scss.file(timelinescss, ab);
    })

    // Create html file
    var timelinecontent = $('#timeline-content').html();
    zip.file("timeline.html", timelinecontent);

    // Generate the zip file asynchronously
    zip.generateAsync({ type: "blob" }).then(function (content) {
        // Force down of the Zip file
        saveAs(content, "agenda-timeline.zip");
    });
}