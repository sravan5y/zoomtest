import { Component, OnInit } from '@angular/core';
import { ZoomMtg } from '@zoomus/websdk';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'zoomtest';
  API_KEY = 'KQ4JETjyS3uDct-vnRtPEA';
  API_SECRET = 'WuIvLd6roLTF4RyEVEredQ2wkj7krqnYKeVB';
  meeting_number;
  display_name;
  constructor() { 

  }
  ngOnInit(): void {

    debugger;
        console.log('checkSystemRequirements');
      console.log(JSON.stringify(ZoomMtg.checkSystemRequirements()));
      ZoomMtg.setZoomJSLib('https://source.zoom.us/1.7.0/lib', '/av');
      ZoomMtg.preLoadWasm()
      ZoomMtg.prepareJssdk();
      }
    
      join_meeting()
      {

        debugger;
      var meetConfig = {
        apiKey: this. API_KEY,
        apiSecret:this.API_SECRET,
        meetingNumber: this.meeting_number,
        userName: this.display_name,
        passWord: "",
        leaveUrl: "http://localhost:4200",
        role: 0
    };


    var signature = ZoomMtg.generateSignature({
      meetingNumber: meetConfig.meetingNumber,
      apiKey: meetConfig.apiKey,
      apiSecret: meetConfig.apiSecret,
      role: meetConfig.role,
      success: (res) => {
        console.log(res.result);
      }
  });

  console.log(signature);

  ZoomMtg.init({
    leaveUrl: 'http://localhost:4200',
    isSupportAV: true,
    success: (res) => {
        ZoomMtg.join(
            {
                meetingNumber: meetConfig.meetingNumber,
                userName: meetConfig.userName,
                signature: signature,
                apiKey: meetConfig.apiKey,
                userEmail: 'email@gmail.com',
                passWord: meetConfig.passWord,
                success: (res) => {
                  console.log('join meeting success');
                },
                error: (res) => {
                  console.log(res);
                }
            }
        );
    }
    
    ,
    error: (res) => {
      console.log(res);
    }
});

  }

}
