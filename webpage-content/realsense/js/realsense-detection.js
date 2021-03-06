function ValidatePlatform() {
 
    $("#platform-runtime-missing").hide();
    $("#platform-ready").hide();
    $("#platform-runtime-download").hide();
    $("#platform-browser").hide();
    $("#platform-detection").show();
    

    // check platform compatibility
    intel.realsense.SenseManager.detectPlatform(['hand', 'face3d', 'voice', 'nuance_en_us_cnc'],['front']).then(function (info) {
     
        if (info.nextStep == 'ready') {
            //good to go
           // console.log("realsense good");
            $("#platform-detection").hide();
            $("#platform-ready").show(200);
          
        }
        else if (info.nextStep == 'unsupported') {
            //console.warn('Platform is not supported for Intel(R) RealSense(TM) SDK: either you are missing the required camera, or your OS and browser are not supported ');
            $("#platform-detection").hide();
            $("#platform-browser").show(200);
            
        } else if (info.nextStep == 'driver') {
           // console.warn('Please upgrade RealSense(TM) Depth Camera Manager (DCM) and firmware before running the application  http://www.intel.com/realsense ');
            $("#platform-detection").hide();
            $("#platform-dcm-missing").show(200);
            
         
        } else if (info.nextStep == 'runtime') {
            //console.warn('please download and install runtime exe');
            $("#platform-detection").hide();
            $("#platform-runtime-missing").show(200);
           
        }

    }).catch(function (error) {
       // console.warn('other unknown failure. '+ JSON.stringify(error));
        $("#platform-detection").hide();
        
    });
}


$(document).ready(function() {
    ValidatePlatform();
 
    $('#install-button').click(function() {        
        
        $("#platform-runtime-missing").hide();
        $("#platform-runtime-download").show(200);
        
        //start download
        //TODO this is a temp link for testing only
        window.location = "file:///\\jfspercbits001.amr.corp.intel.com\RS_Outgoing\erpaulso\Web_Offline_Drop\webapp_offline_do_not_distribute_6.0.21.4168.exe";
            
        //TODO the right link for release !!!
        //window.location = "http://registrationcenter-download.intel.com/akdlm/irc_nas/7787/rs_sdk_runtime_webapp_v6.exe";
    });
    
    
    //checkboxes
    $('#age-checkbox').checkboxpicker();
    $('#age-checkbox').change(function() {
        if ($('#age-checkbox').prop('checked') == true){
            $('#install-button').removeProp('disabled');
        } else {
            $('#install-button').prop('disabled', 'disabled');
        }
    });
    
});