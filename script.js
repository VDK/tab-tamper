

function init(datafile = "COVID-19 hospitalizations in Denmark.tab") {
  var response = fetchJSON(datafile);
  var headers = response.schema.fields;
  var enHeaders = [];
  for (var x in headers){
    enHeaders.push(headers[x]['title']['en']);
  }
  response.data.unshift(enHeaders)
  return response.data;

}



function merge(datafile = "COVID-19 hospitalizations in Denmark.tab", sheetName = 'edit', trigger = null) {
  
  var response = fetchJSON(datafile);
  
  var sheets = SpreadsheetApp.getActiveSpreadsheet();

  sheet = sheets.getSheetByName(sheetName);
  sheet.activate();
  var newData = sheet.getDataRange().getValues();
  let emptyColumnCount = new Array(sheet.getLastColumn()).fill(0); 
  for (var x in newData){
    for (var y in newData[x]){
      if (newData[x][y] == ""){
        emptyColumnCount[y]++;
      }
    }
  }
  for (var x in emptyColumnCount){
    if (emptyColumnCount[x] == sheet.getLastRow()){
      for (var y in newData){
        newData[y].splice(x);
      }
    }
  }
  
  //remove headers:
  newData.shift();
  
  newData = newData.filter(emptyRow);
  
  
  newData = newData.filter(dateFormat);
  
  response.data = newData;
  return JSON.stringify(response, replacer);
  
  
}



function replacer(key, value) {
  // set empty strings as null
  if (value === "") {
    return null;
  }
  return value;
}


function fetchJSON(datafile){
  datafile = datafile.replace(" ", "_");
  datafile = datafile.replace(/^[dD]ata:/, '');
  //add url encoding?
  
  var url = 'https://commons.wikimedia.org/w/index.php?title=Data:'+datafile+'&action=raw';
  
  return JSON.parse(UrlFetchApp.fetch(url));
  
}

function emptyRow(row){
  var i = 0;
  for (x in row){
    if (row[x] == ''){
      i++
    }
  }
  if (i == row.length){
    return null
  }
  else{
    return row;
  }
}


var months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
function dateFormat(row){
  var d = new Date(row[0]);
  row[0] = d.getFullYear()+"-"+months[d.getMonth()]+"-"+appendLeadingZeroes(d.getDate());
  return row;
}

function appendLeadingZeroes(n){
  if(n <= 9){
    return "0" + n;
  }
  return n
}


function resetButton(){
  var sheets = SpreadsheetApp.getActiveSpreadsheet();
  
  sheet = sheets.getSheetByName("interface");
  sheet.activate();
  sheet.getRange(2,1).setValue("");
  sheet.getRange(4,2).setValue("");

  
  sheet = sheets.getSheetByName("edit");
  sheet.activate();
  var cCount = sheet.getLastColumn();
  var rCount = sheet.getLastRow();
  if (cCount < 12 ){
   cCount = 12; 
  }
  else if (cCount > 24){
    cCount = 24;
  }
  if (rCount < 150){
    rCount = 150;
  }
  for (var i = 1; i < rCount - 1; i++){
    for (var j=1; j < cCount - 1; j++){
      sheet.getRange(i, j).setValue("=load!"+String.fromCharCode(j+64)+i);
    }
  }  
}


function mergeButton(){
  var sheets = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = sheets.getSheetByName("interface");
  sheet.activate();
  var datafile = sheet.getRange(1,1).getValue(); 
  var json = merge(datafile, "edit");
  sheet.activate(); 
  sheet.getRange(2,1).setValue(json);
 
}

  
  
  