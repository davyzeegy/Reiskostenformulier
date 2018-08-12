function Initialize() {
 
  var triggers = ScriptApp.getProjectTriggers();
 
  for(var i in triggers) {
    ScriptApp.deleteTrigger(triggers[i]);
  }
  
  ScriptApp.newTrigger("SendGoogleForm")
  .forSpreadsheet(SpreadsheetApp.getActiveSpreadsheet())
  .onFormSubmit()
  .create();
  
}
 
function SendGoogleForm(e) 
{  
  try 
  {      
    // You may replace this with another email address
    var Footprint = e.values[3]
    var email = e.values[4];
    var n = email.indexOf(",");
    n = n+1;
    var res = email.substr(n);
    
    // Optional but change the following variable
    // to have a custom subject for Google Form email notifications
    var subject = "Reiskostenvergoeding verzoek " + e.values[0];
       
    var htmlBody = "Beste " + e.values[1] + "," + 
      "<br/><br/><br/>Wij hebben jouw verzoek voor een reiskostenvergoeding ontvangen. Hieronder zie je de specificaties.<br/><br/>" +
        "<b>Postcode vertrek:</b> " + e.values[4] +
          "<br/><b>Postcode bestemming:</b> " + e.values[5] +
            "<br/><b>Aantal minuten onderweg:</b> " + e.values[7] + " <i>(volgens Google Maps)</i>" +
              "<br/><br/>Dit komt neer op een bedrag van <b>€ " + Math.round(((e.values[7]-30)*0.4)*100)/100 +
                "<br/></b><i>(Voor elke minuut na het eerste half uur wordt er €0,40 gerekend)</i>" +  
                  "<br/><br/><br/>Met vriendelijke groet, <br/><br/>Het Guidion Coax Team" +
                    "<br/><br/><i>Dit is een automatisch bericht, voor vragen kan je bellen naar onze planning of mailen naar coax-facturatie@guidion.net . Dit verzoek is ingevoerd door </i>" + e.values[9];
    
    var optAdvancedArgs = {name: "Reiskostenvergoedingen", htmlBody: htmlBody};
  
        
    // This is the MailApp service of Google Apps Script
    // that sends the email. You can also use GmailApp for HTML Mail.
    
  GmailApp.sendEmail(res, subject, htmlBody, optAdvancedArgs); 
    
  } catch (e) {
    Logger.log(e.toString());
  }
    
}