({
	recordUpdated : function(component, event, helper) {
        
        var Contact = component.get("v.SimpleCont");
        console.log(Contact.Id);
        
        var DateofBirth = new Date(Contact.Birthdate);
        console.log(DateofBirth);
        
                
    var year = DateofBirth.getFullYear();
    var month = DateofBirth.getMonth();
    var day = DateofBirth.getDate();
    var eighteenbirthday = new Date(year+18,month,day);  
    var alertstrtdate = new Date(eighteenbirthday);
    alertstrtdate.setDate(alertstrtdate.getDate()-90);
    
   console.log(eighteenbirthday.getTime());
   console.log(alertstrtdate.getTime());
   
   var date = new Date();
   console.log(date.getTime());
if(date.getTime() > alertstrtdate.getTime() && date.getTime() < eighteenbirthday.getTime())
{

       
            console.log("priyanka");
            component.set("v.uacAgeOut",true);
        
		
	}
    
    }})