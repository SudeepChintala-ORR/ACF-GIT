({
    addRow: function(component, event, helper) {
        helper.addminorRecord(component, event);
    },
     
    removeRow: function(component, event, helper) {
        //Get the account list
        var minorList = component.get("v.minorList");
        //Get the target object
        var selectedItem = event.currentTarget;
        //Get the selected item index
        var index = selectedItem.dataset.record;
        minorList.splice(index, 1);
        component.set("v.minorList", minorList);
    },
        
    save: function(component, event, helper) {
        if (helper.validateAccountList(component, event)) {
            helper.saveAccountList(component, event);
        }
    },

   init : function(component, event, helper) {
       helper.addminorRecord(component, event);
      var progressIndicator = component.find('progressIndicator');
       console.log(component.get('v.currentStage'));
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
       if(actionClicked != 'BACK'){
       	helper.createRecords(cmp, event, helper);
       }
      // Figure out which action was called
      var actionClicked = event.getSource().getLocalId();
      // Fire that action
      var navigate = cmp.get('v.navigateFlow');
      navigate(actionClicked);
   }
    
})