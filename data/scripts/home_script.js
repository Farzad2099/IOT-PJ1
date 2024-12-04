let toggleButtonDevice = document.getElementsByClassName('device_toggle_button');
let toggleButtonDevicePoint = document.getElementsByClassName('device_toggle_button_point');
let backgroundOfDevices = document.getElementsByClassName('devices');
let navButtons = document.getElementsByClassName('navbar_icon');

let icon1 = document.getElementsByClassName('navbar_icon1');
let icon4 = document.getElementsByClassName('navbar_icon4');
let icon5 = document.getElementsByClassName('navbar_icon5');

let sd1,sd2,sd3,sd4;
let Fan1,Fan2,Light1,Light2;
let FanLock1,FanLock2,LightLock1,LightLock2;
let handleRequest=0;

function statusAll(){
    setTimeout(() => {
        (function Apply1(){
            const httpStatusRequest = new XMLHttpRequest();
            httpStatusRequest.onload=function(){
        sd1=this.responseText;
        
        if(sd1==="false" || Fan1==="on"){
        
            console.log("pin4 must be active");
            if(FanLock1==="true"){
                console.log("this is active")
            }else{
                toggleActive(0,0,0,4);
            }
            
        
        }else{
            console.log("pin4 doesnt have eny change");
        }
        
            }
            httpStatusRequest.open("GET", "/status1");
            httpStatusRequest.send();
        
        })();
      }, "5100");

    
      setTimeout(() => {
        (function Apply2(){
            const httpStatusRequest = new XMLHttpRequest();
            httpStatusRequest.onload=function(){
        sd2=this.responseText;
        
        if(sd2==="false" || Fan2==="on"){
            console.log("pin5 must be active");
            if(FanLock2==="true"){
                console.log("this is active")
            }else{
                toggleActive(1,1,1,5);
            }
            
        
        }else{
            console.log("pin5 doesnt have eny change");
        }
        
            }
            httpStatusRequest.open("GET", "/status2");
            httpStatusRequest.send();
        
        })();
      }, "5300");


      setTimeout(() => {
        (function Apply3(){
            const httpStatusRequest = new XMLHttpRequest();
            httpStatusRequest.onload=function(){
        sd3=this.responseText;
        
        if(sd3==="false" || Light1==="on"){
            console.log("pin18 must be active");
            if(LightLock1==="true"){
                console.log("this is active")
            }else{
                toggleActive(2,2,2,18);
            }
           
        
        }else{
            console.log("pin18 doesnt have eny change");
        }
        
            }
            httpStatusRequest.open("GET", "/status3");
            httpStatusRequest.send();
         
        })();
      }, "5500");

      setTimeout(() => {
        (function Apply4(){
            const httpStatusRequest = new XMLHttpRequest();
            httpStatusRequest.onload=function(){
        sd4=this.responseText;
        
        if(sd4==="false" || Light2==="on"){
            
            console.log("pin19 must be active");
            if(LightLock2==="true"){
                console.log("this is active")
            }else{
                toggleActive(3,3,3,19);
            }
            
        
        }else{
            console.log("pin19 doesnt have eny change");
        }
            }
            httpStatusRequest.open("GET", "/status4");
            httpStatusRequest.send();
        
        })();
      }, "5700");
           /*       
      setTimeout(() => {
        (function LockStatus1(){
            const httpStatusRequest = new XMLHttpRequest();
            httpStatusRequest.onload=function(){
        FanLock1=this.responseText;
        
        if(FanLock1==="true"){
            document.getElementsByClassName('device_toggle')[0].style.display="none";
            if(document.getElementsByClassName('device_toggle')[0].style.display="none"){console.log("fan 1 is active already")}else{

                toggleActive(0,0,0,4);
            }
            
        }else{
            
        }
            }
            httpStatusRequest.open("GET", "/Fan1LockStatus");
            httpStatusRequest.send();
        
        })();
      }, "5900");

      setTimeout(() => {
        (function LockStatus2(){
            const httpStatusRequest = new XMLHttpRequest();
            httpStatusRequest.onload=function(){
        FanLock2=this.responseText;
        
        if(FanLock2==="true"){
            document.getElementsByClassName('device_toggle')[1].style.display="none";
            if(document.getElementsByClassName('device_toggle')[1].style.display="none"){console.log("fan 2 is active already")}else{
                toggleActive(1,1,1,5);
            }
            
        }
            }
            httpStatusRequest.open("GET", "/Fan2LockStatus");
            httpStatusRequest.send();
        
        })();
      }, "6000");

      setTimeout(() => {
        (function LockStatus3(){
            const httpStatusRequest = new XMLHttpRequest();
            httpStatusRequest.onload=function(){
        LightLock1=this.responseText;
        
        if(LightLock1==="true"){
            document.getElementsByClassName('device_toggle')[2].style.display="none";
            if(document.getElementsByClassName('device_toggle')[2].style.display="none"){console.log("light 1 is active already")}else{
                toggleActive(2,2,2,18);
            }
            
        }
            }
            httpStatusRequest.open("GET", "/Light1LockStatus");
            httpStatusRequest.send();
        
        })();
      }, "6200");

      setTimeout(() => {
        (function LockStatus4(){
            const httpStatusRequest = new XMLHttpRequest();
            httpStatusRequest.onload=function(){
        LightLock2=this.responseText;
        
        if(LightLock2==="true"){
            document.getElementsByClassName('device_toggle')[3].style.display="none";
            if(document.getElementsByClassName('device_toggle')[3].style.display="none"){console.log("light 2 is active already")}else{
                toggleActive(3,3,3,19);
            }
            
        }
            }
            httpStatusRequest.open("GET", "/Light2LockStatus");
            httpStatusRequest.send();
        
        })();
      }, "6400");
*/
}


statusAll();

let http = new XMLHttpRequest();

function toggleActive(button, point, device ,pin) {
    toggleButtonDevice[button].classList.toggle("device_toggle_button_active");
    toggleButtonDevicePoint[point].classList.toggle("device_toggle_button_point_active");
    backgroundOfDevices[device].classList.toggle("devices_active");
    if (toggleButtonDevicePoint[point].classList.toggle("device_toggle_point_active")) {
        http.open("GET", "/lamp?output=" + pin + "&state=0");
        http.send();
    } else {
        http.open("GET", "/lamp?output=" + pin + "&state=1");
        http.send();
    }

   
}


function select(num) {

    for (let i = 0; i <= icon1.length - 1; i++) {
        icon1[i].style.stroke = "black";
    }
   
    for (let i = 0; i <= icon5.length - 1; i++) {
        icon5[i].style.stroke = "black";
    }
    switch (num) {
        case 1:
            for (let i = 0; i <= icon1.length - 1; i++) {
                icon1[i].style.stroke = "#5DBFA1";
            }

            (function load_home_page() {
                const xhttp = new XMLHttpRequest();
                xhttp.onload = function() {

                    document.getElementById('main').innerHTML = this.responseText;
                    statusAll();
                    
                }
                xhttp.open("GET", "home_index2.html");
                xhttp.send();
            })();
            break;
       
        
        case 5:
            for (let i = 0; i <= icon5.length - 1; i++) {
                icon5[i].style.stroke = "#5DBFA1";
            }


            (function load_time_page() {
                const xhttp = new XMLHttpRequest();
                xhttp.onload = function() {
                    document.getElementById('main').innerHTML = this.responseText;
                }
                xhttp.open("GET", "time_index.html");
                xhttp.send();
            })();
            setTimeout(() => {
            (function timeFormStatus() {
                let httpTimeFormStatus = new XMLHttpRequest(); 
                httpTimeFormStatus.onload = function() {
            
                    lock = this.responseText;
                    if(lock==="true"){
                        send();
                    }else{
                        console.log("time form is open to use...");
                    }
                    
                }
                httpTimeFormStatus.open("GET", "/lockTimeStatusRead");
                httpTimeFormStatus.send();
            })();
        }, "500");
            break;
    }

}