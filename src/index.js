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
$('.preview').hide();

// Get csv file
var file = document.getElementById("file").files[0];
var timelineContent = '';

// Enable parse after file uploaded
$("#file").on("change", function () {
    if ($(this).val()) {
        $('#create').prop('disabled', false);
    }
});

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
            // Show Preview
            $('.preview').show();
            // Enable Download
            $('#download').prop('disabled', false);
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

// Create ZIP and download
var downloadbtn = document.getElementById('download');
downloadbtn.addEventListener('click', getZIP);

function getZIP() {
    var zip = new JSZip();
    var timelinescss;
    
    // Read file contents
    function readLocalFile(file) {
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", file, false);
        rawFile.onreadystatechange = function () {
            if (rawFile.readyState === 4) {
                if (rawFile.status === 200 || rawFile.status == 0) {
                    timelinescss = rawFile.responseText;
                }
            }
        }
        rawFile.send(null);
    }

    // Read _timeline.scss
    readLocalFile("src/partials/_timeline.scss");

    // Generate and populate scss directory
    var scss = zip.folder("scss");
    console.log(timelinescss);
    scss.file("_timeline.scss", timelinescss);

    // Create html file
    var timelinecontent = $('#timeline-content').html();
    zip.file("timeline.html", timelinecontent);

    // Generate the zip file asynchronously
    zip.generateAsync({ type: "blob" }).then(function (content) {
        // Force down of the Zip file
        saveAs(content, "agenda-timeline.zip");
    });
}