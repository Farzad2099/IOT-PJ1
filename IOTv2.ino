#include <ESPAsyncWebSrv.h>
#include <LITTLEFS.h>
#include <WiFi.h>
#include <TM1637.h>

int CLK=22;
int DIO=21;

TM1637 tm(CLK,DIO);


const char* ssid = "testP1";
const char* password = "123456789";

 
AsyncWebServer server(80);

boolean pin4=true,pin5=true,pin18=true,pin19=true;
String lockTime="false",FanLock1="false",FanLock2="false",LightLock1="false",LightLock2="false",MIN2,MIN1;

int Min=0,period=1000,MIN22=0,MIN11=0,HOUR1=0,HOUR2=0,SEC1=0,SEC2=0;

unsigned long time_now=0;



void setup() {
  Serial.begin(115200);
  
  WiFi.softAP(ssid, password);
 
  Serial.println(WiFi.softAPIP());
 


  pinMode(4,OUTPUT);
  pinMode(5,OUTPUT);
  pinMode(18,OUTPUT);
  pinMode(19,OUTPUT);
  pinMode(23,OUTPUT);
  digitalWrite(23,LOW);
  digitalWrite(4,HIGH);
  digitalWrite(5,HIGH);
  digitalWrite(18,HIGH);
  digitalWrite(19,HIGH);

  tm.init();
  tm.set(2);
 

 

  if (!LITTLEFS.begin()) {
    Serial.println("An error has occurred while mounting LITTLEFS");
    return;
  }

  
//the last satus
  server.on("/status1", HTTP_GET, [](AsyncWebServerRequest * request){
    if(pin4==true){
      request->send(200, "text/plain", "true");
      }else{
        request->send(200, "text/plain", "false");
      }
  });
 server.on("/status2", HTTP_GET, [](AsyncWebServerRequest * request){
    if(pin5==true){
      request->send(200, "text/plain", "true");
      }else{
        request->send(200, "text/plain", "false");
      }
  });
  
  server.on("/status3", HTTP_GET, [](AsyncWebServerRequest * request){
    if(pin18==true){
      request->send(200, "text/plain", "true");
      }else{
        request->send(200, "text/plain", "false");
      }
  });
  
  server.on("/status4", HTTP_GET, [](AsyncWebServerRequest * request){
    if(pin19==true){
      request->send(200, "text/plain", "true");
      }else{
        request->send(200, "text/plain", "false");
      }
  });
  

 
 
 

  //this section is for time page information

 server.on("/lockTimeStatus", HTTP_GET, [](AsyncWebServerRequest * request){
    
      
      if(request->hasParam("lock") && request->hasParam("FanLock1") && request->hasParam("FanLock2") && request->hasParam("LightLock1") && request->hasParam("LightLock1")){
        FanLock1=request->getParam("FanLock1")->value();
        FanLock2=request->getParam("FanLock2")->value();
        LightLock1=request->getParam("LightLock1")->value();
        LightLock2=request->getParam("LightLock2")->value();
        lockTime = request->getParam("lock")->value();
      }
      if(FanLock1=="true"){pin4=false;}else{pin4=true;}
      if(FanLock2=="true"){pin5=false;}else{pin5=true;}
      if(LightLock1=="true"){pin18=false;}else{pin18=true;}
      if(LightLock2=="true"){pin19=false;}else{pin19=true;}
    
  });
  server.on("/lockTimeStatusRead", HTTP_GET, [](AsyncWebServerRequest * request){
     request->send(200, "text/plain", lockTime);
  });
  server.on("/Fan1LockStatus", HTTP_GET, [](AsyncWebServerRequest * request){
     request->send(200, "text/plain", FanLock1);
  });
  server.on("/Fan2LockStatus", HTTP_GET, [](AsyncWebServerRequest * request){
     request->send(200, "text/plain", FanLock2);
  });
  server.on("/Light1LockStatus", HTTP_GET, [](AsyncWebServerRequest * request){
     request->send(200, "text/plain", LightLock1);
  });
  server.on("/Light2LockStatus", HTTP_GET, [](AsyncWebServerRequest * request){
     request->send(200, "text/plain", LightLock2);
  });
  server.on("/clockHour", HTTP_GET, [](AsyncWebServerRequest * request){
      //not complete
  });
   server.on("/clockMinute", HTTP_GET, [](AsyncWebServerRequest * request){
       if(request->hasParam("minute")){
         
          MIN2=request->getParam("minute")->value();
          MIN22=MIN2.toInt();
          tm.point(1);
           if(MIN22<10){
           MIN11=0;
           SEC1=5;
           SEC2=9;
            tm.display(0,MIN11);
            tm.display(1,MIN22);
            tm.display(2,SEC1);
            tm.display(3,SEC2);
            
          }else{
            SEC1=5;
            SEC2=9;
            MIN1=MIN2.substring(0,1);
            MIN2=MIN2.substring(1,2);
            MIN22=MIN2.toInt();
            MIN11=MIN1.toInt();
            tm.display(0,MIN11);
            tm.display(1,MIN22);
            tm.display(2,SEC1);
            tm.display(3,SEC2);
          }
          
       }
  });

 
  // HTML

    server.on("/", HTTP_GET, [](AsyncWebServerRequest * request) {
    request->send(LITTLEFS, "/home_index.html", "text/html");
  });

  server.on("/home_index.html", HTTP_GET, [](AsyncWebServerRequest * request) {
    request->send(LITTLEFS, "/home_index.html", "text/html");
  });
  server.on("/home_index2.html", HTTP_GET, [](AsyncWebServerRequest * request) {
    request->send(LITTLEFS, "/home_index2.html", "text/html");
  });

 
  server.on("/time_index.html", HTTP_GET, [](AsyncWebServerRequest * request) {
    request->send(LITTLEFS, "/time_index.html", "text/html");
  }); 

  // JavaScript

 
  server.on("/scripts/home_script.js", HTTP_GET, [](AsyncWebServerRequest * request) {
    request->send(LITTLEFS, "/scripts/home_script.js", "text/javascript");
  });
 
  server.on("/scripts/time_script.js", HTTP_GET, [](AsyncWebServerRequest * request) {
    request->send(LITTLEFS, "/scripts/time_script.js", "text/javascript");
  });

  // CSS
 
   server.on("/css/home_style.css", HTTP_GET, [](AsyncWebServerRequest * request) {
    request->send(LITTLEFS, "/css/home_style.css", "text/css");
  });
    server.on("/css/font.css", HTTP_GET, [](AsyncWebServerRequest * request) {
    request->send(LITTLEFS, "/css/font.css", "text/css");
  });
  server.on("/css/reset.css", HTTP_GET, [](AsyncWebServerRequest * request) {
    request->send(LITTLEFS, "/css/reset.css", "text/css");
  });
  
  server.on("/css/time_style.css", HTTP_GET, [](AsyncWebServerRequest * request) {
    request->send(LITTLEFS, "/css/time_style.css", "text/css");
  });

  // Fonts

  server.on("/css/Fonts/Lalezar-Regular.ttf", HTTP_GET, [](AsyncWebServerRequest * request) {
    request->send(LITTLEFS, "/css/Fonts/Lalezar-Regular.ttf", "font/ttf");
  });
  server.on("/css/Fonts/Katibeh-Regular.ttf", HTTP_GET, [](AsyncWebServerRequest * request) {
    request->send(LITTLEFS, "/css/Fonts/Katibeh-Regular.ttf", "font/ttf");
  });
  
  server.on("/css/Fonts/Inter Black.otf", HTTP_GET, [](AsyncWebServerRequest * request) {
    request->send(LITTLEFS, "/css/Fonts/Inter Black.otf", "font/otf");
  });
  
  

  // Images

  server.on("/backgrounds/man1.png", HTTP_GET, [](AsyncWebServerRequest * request) {
    request->send(LITTLEFS, "/backgrounds/man1.png", "image/png");
  });
  server.on("/backgrounds/woman 1.png", HTTP_GET, [](AsyncWebServerRequest * request) {
    request->send(LITTLEFS, "/backgrounds/woman 1.png", "image/png");
  });
  server.on("/backgrounds/backgroundLight.jpg", HTTP_GET, [](AsyncWebServerRequest * request) {
    request->send(LITTLEFS, "/backgrounds/backgroundLight.jpg", "image/jpg");
  });

  server.on("/backgrounds/null.jpg", HTTP_GET, [](AsyncWebServerRequest * request) {
    request->send(LITTLEFS, "/backgrounds/null.jpg", "image/jpg");
  });
  

  // Send a GET request to <ESP_IP>/update?output=<inputMessage1>&state=<inputMessage2>
 
 
  server.on("/lamp", HTTP_GET, [] (AsyncWebServerRequest * request) {
    String inputMessage1;
    String inputMessage2;
    
    // GET input1 value on <ESP_IP>/update?output=<inputMessage1>&state=<inputMessage2>
    if (request->hasParam("output") && request->hasParam("state")) {
      inputMessage1 = request->getParam("output")->value();
      inputMessage2 = request->getParam("state")->value();
      
      if(inputMessage1.toInt() == 4 && FanLock1=="true"){
        Serial.print("this device (FanLock1) is lock");
        digitalWrite(inputMessage1.toInt(),0);
      }else{
        digitalWrite(inputMessage1.toInt(),inputMessage1.toInt());
      }
       if(inputMessage1.toInt() == 5 && FanLock2=="true"){
        Serial.print("this device (FanLock2) is lock");
        digitalWrite(inputMessage1.toInt(),0);
        
      }else{
        digitalWrite(inputMessage1.toInt(),inputMessage1.toInt());
      }
       if(inputMessage1.toInt() == 18 && LightLock1=="true"){
        Serial.print("this device (LightLock1) is lock");
        digitalWrite(inputMessage1.toInt(),0);
      }else{
        digitalWrite(inputMessage1.toInt(),inputMessage1.toInt());
      }
       if(inputMessage1.toInt() == 19 && LightLock2=="true"){
        Serial.print("this device (LightLock2) is lock");
        digitalWrite(inputMessage1.toInt(),0);
      }else{
        digitalWrite(inputMessage1.toInt(),inputMessage1.toInt());
      }

      switch(inputMessage1.toInt()){
        case 4:
        if(inputMessage2.toInt()==0){
          pin4=false;
        }else{
          pin4=true;
        }
        break;
        case 5:
        if(inputMessage2.toInt()==0){
           pin5=false;
        }else{
           pin5=true;
        }
        break;
        case 18:
        if(inputMessage2.toInt()==0){
          pin18=false;
        }else{
           pin18=true;
        }
        break;
        case 19:
        if(inputMessage2.toInt()==0){
          pin19=false;
        }else{
           pin19=true;
        }
        break;
      }
    }
    else {
      inputMessage1 = "No message sent";
      inputMessage2 = "No message sent";
    }
    Serial.print("GPIO: ");
    Serial.print(inputMessage1);
    Serial.print(" - Set to: ");
    Serial.println(inputMessage2);
    Serial.println(pin4);
    Serial.println(pin5);
    Serial.println(pin18);
    Serial.println(pin19);
    request->send(200, "text/plain", "OK");
  });

 
 
   
   server.begin();
  
}

void loop() {
 
 if(millis()>=time_now+period){
  time_now+=period;
 
 SEC2--; 
 
 }
  if(SEC2<0 ){
  SEC2=9;
  if(SEC1==0){SEC1=5;}else{SEC1--;}
  
  }
 if(SEC1==0 && SEC2<0){
  if(MIN22==0){MIN22=9; MIN11--;}else{MIN22--;}
    SEC1=5;
    SEC2=9;
    
  }
  
  if(MIN22<0 && MIN11<0 && SEC1<0 && SEC2<0){
    lockTime="false";
    FanLock1="false";
    FanLock2="false";
    LightLock1="false";
    LightLock2="false";
    MIN11=0;
    MIN22=0;
    SEC1=0;
    SEC2=0;
  
  }

 tm.display(0,MIN11);
 tm.display(1,MIN22);
 tm.display(2,SEC1);
 tm.display(3,SEC2);
  
 
  
 
 
  
}
