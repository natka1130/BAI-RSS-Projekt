import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ChannelsService } from "../../shared/channels.service";
import { AuthService } from "../../shared/auth.service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{
  private channels: any;
  constructor(public navCtrl: NavController, private authService: AuthService, private channelsService: ChannelsService) {

  }

  ngOnInit() : any {
    this.getUserSettings();

    // this.channelsService.getChannelLink(1,2);
  }

  getUserSettings() {
    this.authService.fetchUserChannelsSettings()
      .subscribe((data) => {
        this.filterUserSettings(data.channels);
      });
  }

  getPosts() {
    this.channelsService.getCountryWp().subscribe(response => {
      console.log(response);
    });
  }

  filterUserSettings(categories) {
    let userSelectedChannels = [];

    categories.map((cat) => {
      let selected = cat.channels.filter( (channel) => channel.selected === true );
      if(selected.length !== 0) {
        userSelectedChannels.push({
          "code" : cat.code,
          "channels": selected
        })
      }
    });

    return userSelectedChannels;
  }

}
