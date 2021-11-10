// Main D3.js Code

// Variables
var _data = [];

//Load data as browser opens
window.onload = function(){
    loadData("BCAirQuality.csv");
};


// Load data from CSV as JSON
function loadData(path){
    d3.csv(path).then(function(data){
        _data = data;
        console.log(_data);
    });
}