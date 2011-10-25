### What's this?
      
An app which alerts you when your system is down.


### Features

- SMS / voice notifications via [twilio](https://www.twilio.com/)     
- email notifications via [mail gun](http://mailgun.net)
- support for [Alert Birds](https://alertbirds.appspot.com/)      
- add your own plugins via [beanpole](https://github.com/spiceapps/beanpole)                 

### To-Do
                              

- scan directory for configs  
- accept ini, or JSON configs                                                  
                          


### API Methods

#### /alert/:source/:event

Triggers a notification on the server   

- `source` - the source of the notification. E.g: alertbird
- `event` - the event that handles the given notification. E.g: myapp-errors, myapp-warnings    

##### Example:

**http://user@pass:teamdigest-sysalert.heroku.com/alert/alertbird/server-down?description=...**



### Configuration

In your sysalert.cont file:  





````ini     
                              
       
#optional      
[auth]
username=basicuser
password=basicpass     
               

# event for notifications
[event:X]
email=me@email.com another@email.com          
sms=+1XXXXXXXXXX
voice=+1XXXXXXXXXX 
message=general message to display

[keys:sysalert_notify_part_twilio]
token=XXXXXXXXXXXXX  
sid=XXXXXXXXXXXXX
phoneNumber=+1XXXXXXXXXX   
hostname=XXXX.localtunnel.com

[keys:sysalert_notify_part_mailgun]
key=XXXXXXXXXX           
         
#to-do
[include]
directories=/etc/syslog/*.conf
   
                        

````



       
                        



