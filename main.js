/**
 * Author: HELEX;
 * Create Time: 2016-12-20 14:15
 * Description:
 */

var fInfo;

function startRead(ele) {
    // obtain input element through DOM

    var file = ele.files[0];
    if(file){
        getAsText(file);
    }
}

function getAsText(readFile) {

    var reader = new FileReader();
    fInfo = readFile;
    // Read file into memory as UTF-8
    reader.readAsText(readFile, "UTF-8");

    // Handle progress, success, and errors
    reader.onprogress = updateProgress;
    reader.onload = loaded;
    reader.onerror = errorHandler;
}

function updateProgress(evt) {
    if (evt.lengthComputable) {
        // evt.loaded and evt.total are ProgressEvent properties
        var loaded = (evt.loaded / evt.total);
        if (loaded < 1) {
            // Increase the prog bar length
            // style.width = (loaded * 200) + "px";
        }
    }
}

function loaded(evt) {
    // Obtain the read file data
    var fileString = evt.target.result;
    // Handle UTF-8 file dump
    /*if(utils.regexp.isChinese(fileString)) {
        //Chinese Characters + Name validation
    }
    else {
        // run other charset test
    }*/
    // xhr.send(fileString)
    var points = [];
    var ext = getExt(fInfo.name);
    if(ext == "csv")
        points = parseCSV(fileString);
    else if(ext == "json"){
        points = parseJSON(fileString);
    }
    pointsProcess(points);
}

function parseCSV(str){
    return _.compact(str.split(/[\n]/)).map(function(val){
    var p =val.split(",");
    return [Number(p[1]), Number(p[0]), p[2]];
});
}

function parseJSON(str){
    var jf;
    try{
        jf = JSON.parse(document.getElementById("jf").value);
    }catch(err){
        alert("json-formating parsed error");
    }
    if(!jf.lon || !jf.lat) alert("json-formating lost lon or lat");
    return JSON.parse(str).map(function(val){
        return [val[jf.lon], val[jf.lat], val[jf.time]];
    });
}

function getExt(name){
    var sL = name.split(".");
    return sL[sL.length - 1];
}

function errorHandler(evt) {
    if(evt.target.error.name == "NotReadableError") {
        // The file could not be read
    }
}