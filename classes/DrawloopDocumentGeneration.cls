public class DrawloopDocumentGeneration {
    public static void drawloopDocumentGeneration() {
        try {
            
            List<Loop__DDP__c> ddps = [SELECT Id, (SELECT Id FROM Loop__Custom_Integration_Options__r WHERE Name = 'Attach') FROM Loop__DDP__c WHERE Name = 'UAC Sponsor']; 
        	System.debug('ddps: '+ddps);
            Loop__DDP__c ddp = ddps[0];
            
            
            Loop.loopMessage lm = new Loop.loopMessage();
            lm.sessionId = UserInfo.getSessionId();
        
            // SET DESIRED BATCH NOTIFICATION. IF THIS IS NOT DONE, THE DEFAULT IS 'NONE'
            // THIS IS AVAILABLE IN LOOP 6.7 / 9.56 AND ABOVE
            lm.batchNotification = Loop.loopMessage.Notification.BEGIN_AND_COMPLETE;
            
            for(Contact c : [Select Id from Contact where Id = '0033h000005beDR']) {
                Map<string, string> variables; // MAIN RECORD ID - SAME OBJECT AS THE DDP RECORD TYPE SPECIFIES' // DDP ID
                lm.requests.add(new Loop.loopMessage.loopMessageRequest( c.Id, ddp.Id, new Map<string, string> { 'deploy' => ddp.Loop__Custom_Integration_Options__r[0].Id, 'SFContact' => c.Id } ));
            }
            // SEND ALL DDP RUN REQUESTS IN A SINGLE CALL OUT
            lm.sendAllRequests();
            }
            catch(Exception e){
            system.debug('error:'+e); 
        }
    }
}