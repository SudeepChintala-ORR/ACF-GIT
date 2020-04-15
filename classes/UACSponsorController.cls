public class UACSponsorController {

     @AuraEnabled
    public static void insertResidentHisotry(String residentList, String recordId) {
		//Sponsor__c sponsorInfo = [select id, name from Sponsor__c limit 1];
        List<ResidentialHistory__c> residentListFinal = (List<ResidentialHistory__c>)JSON.deserialize(residentList, List<ResidentialHistory__c>.class);

		System.debug('check2: '+residentListFinal);
        if(residentListFinal[0].Street_Address__c != null){
            
        
            for(Integer i = 0; i<residentListFinal.size(); i++){
                //residentListFinal[i].From_date__c = Date.valueOf(residentListFinal[i].From_date__c);
                //residentListFinal[i].To_date__c = Date.valueOf(residentListFinal[i].To_date__c);
                residentListFinal[i].Sponsor__c = recordId;
            }
            System.debug('check2: '+residentListFinal);
            try{
                insert residentListFinal;
            }catch(exception e){
                System.debug(e);
            }
        }
    }
    
     @AuraEnabled
    public static void insertNameHisotry(String nameList, String recordId) {
		//Sponsor__c sponsorInfo = [select id, name from Sponsor__c limit 1];
        List<Sponsor_Previous_Names__c> nameListFinal = (List<Sponsor_Previous_Names__c>)JSON.deserialize(nameList, List<Sponsor_Previous_Names__c>.class);

		System.debug('check2: '+nameListFinal);

        if(nameListFinal[0].PreviousName__c != null){

            for(Integer i = 0; i<nameListFinal.size(); i++){
                
                nameListFinal[i].Sponsor__c = recordId;
            }
            System.debug('check2: '+nameListFinal);
            try{
                insert nameListFinal;
            }catch(exception e){
                System.debug(e);
            }
        }
    }
    
    @AuraEnabled
    public static void insertMinorList(String minorList, String recordId) {
        List<UACSponsor__c> currentMinorList = [select id, UAC_Name__c from UACSponsor__c where Sponsor__c = :recordId];
        List<String> minorNames = new List<String>();
        for(UACSponsor__c min : currentMinorList){
			minorNames.add(min.UAC_Name__c);
        }
		//Sponsor__c sponsorInfo = [select id, name from Sponsor__c limit 1];
        List<UACSponsor__c> minorListFinal = (List<UACSponsor__c>)JSON.deserialize(minorList, List<UACSponsor__c>.class);
        Map<String, Id> minorMap = new Map<String, Id>();
		System.debug('check2: '+minorListFinal);

        for(Integer i = 0; i<minorListFinal.size(); i++){
            
            minorListFinal[i].Sponsor__c = recordId;
            if(minorNames.contains(minorListFinal[i].UAC_Name__c)){
                minorListFinal.remove(i);
            }
        }

        System.debug('check2: '+minorListFinal);
        try{
            insert minorListFinal;
        }catch(exception e){
			System.debug(e);
        }
    }
}