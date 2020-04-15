({
    addminorRecord: function(component, event) {
        //get the account List from component  
        var minorList = component.get("v.minorList");
        //Add New Account Record
        minorList.push({
            'sobjectType': 'UACSponsor__c',
            'UAC_Name__c':'',
            'UAC_Date_of_Birth__c': ''
            
        });
        component.set("v.minorList", minorList);
    },
    
    
    validateAccountList: function(component, event) {
        //Validate all account records
        var isValid = true;
        var accountList = component.get("v.accountList");
        for (var i = 0; i < accountList.length; i++) {
            if (accountList[i].Name == '') {
                isValid = false;
                alert('Account Name cannot be blank on row number ' + (i + 1));
            }
        }
        return isValid;
    },
     
    saveAccountList: function(component, event, helper) {
        //Call Apex class and pass account list parameters
        var action = component.get("c.saveAccounts");
        action.setParams({
            "accList": component.get("v.accountList")
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.accountList", []);
                alert('Account records saved successfully');
            }
        }); 
        $A.enqueueAction(action);
    },
    createRecords: function(component, event, helper) {

       var action = component.get("c.insertMinorList");
       action.setParams({ minorList : JSON.stringify(component.get("v.minorList")), recordId :  component.get("v.recordId")});

        // Create a callback that is executed after 
        // the server-side action returns
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
            }
            else if (state === "INCOMPLETE") {
                // do something
            }
            else if (state === "ERROR") {
var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                                 errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }            }
        });

        $A.enqueueAction(action);
   }
})