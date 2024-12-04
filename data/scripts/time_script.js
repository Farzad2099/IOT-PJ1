

function rangeNumber(value){
    document.getElementById('range_value').innerHTML=value;
    if(value !=0){
        document.getElementById('range_value').style.backgroundColor="#4AA7BB"; 
    }else{
        document.getElementById('range_value').style.backgroundColor="#8F87B0"; 
    }
    }
   

   
    let statusCheckBox=0;
    let lock;

    
    function activeOrDeActiveTimeFilds(){
        if(statusCheckBox==0){
    
            document.getElementById('time1').disabled=false;
            document.getElementById('time2').disabled=false;
           document.getElementById('time_range').value=0;
           document.getElementById('range_value').innerHTML=0;
           document.getElementById('time_range').disabled=true;
            statusCheckBox++;
        }else if(statusCheckBox==1){
            document.getElementById('time1').disabled=true;
            document.getElementById('time2').disabled=true;
            document.getElementById('time1').value="";
            document.getElementById('time2').value="";
            document.getElementById('time_range').disabled=false;
            statusCheckBox--;
        }
        console.log(statusCheckBox);
    }
    function calculateTimeDifference() {
        const startTimeValue = document.getElementById('time1').value;
        const endTimeValue = document.getElementById('time2').value;
        

        // Extracting hours and minutes from the 24-hour format time inputs
        const [startHours, startMinutes] = startTimeValue.split(':').map(Number);
        const [endHours, endMinutes] = endTimeValue.split(':').map(Number);

        // Get current time without leading zeros
        const now = new Date();
        const currentHour = now.getHours(); // No leading zero
        const currentMinute = now.getMinutes(); // No leading zero

        // Send a GET request with current time, start, and end times
        const xhr = new XMLHttpRequest();
        const url = `/clockHour?currentHour=${currentHour}&currentMinute=${currentMinute}&startHour=${startHours}&startMinute=${startMinutes}&endHour=${endHours}&endMinute=${endMinutes}`; // Replace with your URL
        xhr.open('GET', url, true);
        
        
        xhr.send();
        
    }




function send() {
    let value=document.getElementById('time_range').value
    let http = new XMLHttpRequest();
    document.getElementById('cancel_button').style.display="block";
    document.getElementById('visible_dash').style.marginTop="29px";
    document.getElementById('visible_dash2').style.marginTop="0px";
    document.getElementById('time1').disabled=true;
            document.getElementById('time2').disabled=true;
            document.getElementById('time1').value="";
            document.getElementById('time2').value="";
            document.getElementById('time_range').value=0;
           document.getElementById('range_value').innerHTML=0;
           document.getElementById('time_range').disabled=true;
           FanLock1=document.getElementById('check1').checked ? 'true' : 'false';
           FanLock2=document.getElementById('check2').checked ? 'true' : 'false';
           LightLock1=document.getElementById('check3').checked ? 'true' : 'false';
           LightLock2=document.getElementById('check4').checked ? 'true' : 'false';
           if(document.getElementById('check5').checked==true){
            calculateTimeDifference()

           }else{
            let httpClockMin = new XMLHttpRequest();
            
            httpClockMin.open("GET", "/clockMinute?minute="+value);
            httpClockMin.send();
           }
           http.open("GET", "/lockTimeStatus?lock=true&FanLock1="+FanLock1+"&FanLock2="+FanLock2+"&LightLock1="+LightLock1+"&LightLock2="+LightLock2);
           
           http.send();
        }
  
  function cancel(){
    let http = new XMLHttpRequest();
    document.getElementById('cancel_button').style.display="none";
    document.getElementById('visible_dash').style.marginTop="60px";
    document.getElementById('visible_dash2').style.marginTop="70px";
            document.getElementById('time1').value="";
            document.getElementById('time2').value="";
            document.getElementById('time_range').value=0;
           document.getElementById('range_value').innerHTML=0;
           document.getElementById('time_range').disabled=false;
           FanLock1=document.getElementById('check1').checked=false;
           FanLock2=document.getElementById('check2').checked=false;
           LightLock1=document.getElementById('check3').checked=false;
           LightLock2=document.getElementById('check4').checked=false;
           document.getElementById('check5').checked==false;
           http.open("GET", "/lockTimeStatus?lock=false&FanLock1=false&FanLock2=false&LightLock1=false&LightLock2=false");
           http.send();
  }

  
  

   
 

        
    
    
    
    
    

