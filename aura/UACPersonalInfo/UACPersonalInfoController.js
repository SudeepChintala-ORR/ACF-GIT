({
   addRow: function(component, event, helper) {
        helper.addAccountRecord(component, event);
    },
     
    removeRow: function(component, event, helper) {
        //Get the account list
        var residentList = component.get("v.residentList");
        //Get the target object
        var selectedItem = event.currentTarget;
        //Get the selected item index
        var index = selectedItem.dataset.record;
        residentList.splice(index, 1);
        component.set("v.residentList", residentList);
    },
    addNameRow: function(component, event, helper) {
        helper.addNameRecord(component, event);
    },
     
    removeNameRow: function(component, event, helper) {
        //Get the account list
        var nameList = component.get("v.nameList");
        //Get the target object
        var selectedItem = event.currentTarget;
        //Get the selected item index
        var index = selectedItem.dataset.record;
        nameList.splice(index, 1);
        component.set("v.nameList", nameList);
    },
     
    save: function(component, event, helper) {
        if (helper.validateAccountList(component, event)) {
            helper.saveAccountList(component, event);
        }
    },
    
    init : function(component, event, helper) {
        console.log('inint');
              helper.addAccountRecord(component, event);
          helper.addNameRecord(component, event);

      var progressIndicator = component.find('progressIndicator');
      for (let step of component.get('v.stages')) {
         $A.createComponent(
            "lightning:progressStep",
            {
               "aura:id": "step_" + step,
               "label": step,
               "value": step
             },
             function(newProgressStep, status, errorMessage){
                // Add the new step to the progress array
                if (status === "SUCCESS") {
                   var body = progressIndicator.get("v.body");
                   body.push(newProgressStep);
                   progressIndicator.set("v.body", body);
                 }
                 else if (status === "INCOMPLETE") {
                    // Show offline error
                    console.log("No response from server, or client is offline.")
                  }
                  else if (status === "ERROR") {
                     // Show error message
                     console.log("Error: " + errorMessage);
                  }
              }
           );
       }
   },
    
   onButtonPressed: function(cmp, event, helper) {
       var actionClicked = event.getSource().getLocalId();
       helper.createRecords(cmp, event, helper);
       helper.createNameRecords(cmp, event, helper);
       
      // Figure out which action was called
      
      // Fire that action
      var navigate = cmp.get('v.navigateFlow');
      navigate(actionClicked);
   }
})