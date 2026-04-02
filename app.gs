// Load exercise data from the local Data sheet (kept live via IMPORTRANGE from the shared Data spreadsheet)
var ws=SpreadsheetApp.getActiveSpreadsheet();
var ss=ws.getSheetByName('Data')
var data=ss.getDataRange().getValues()

function dropdown() {
  var activeCell=SpreadsheetApp.getActiveRange();
  var activeRow=activeCell.getRow()
  var activeColumn=activeCell.getColumn()
  var activeValue=activeCell.getValue()
  var activeSheet=activeCell.getSheet()
  var activeSheetName=activeSheet.getName();

  // Column B: muscle group selected — populate column C with matching exercises
  if(activeSheet.getName()=='Exercises' && activeRow > 8 && activeColumn >=2 && activeColumn <=2) {
    var list=data.filter(row=>row[0]==activeValue).map(row=>row[1])
    var validation=SpreadsheetApp.newDataValidation().requireValueInList(list).setAllowInvalid(false).build()
    activeCell.offset(0,1).setDataValidation(validation)
  }

  // Column C: exercise selected — look up its video link from the Data sheet
  if(activeColumn==3 && activeRow > 8){
    var list= data.map(row => row[1] === activeValue ? row[2] : null).find(value => value !== null);
    var richValue = SpreadsheetApp.newRichTextValue().setText("Link").setLinkUrl(list).build();
    //activeCell.offset(0,5).setRichTextValue(richValue)
    //SpreadsheetApp.getActive().toast(activeColumn);
  }
}

function onEdit() {
  dropdown();
}
