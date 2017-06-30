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
    this.channels = this.authService.getUserSettings();
    console.log(this.channels);
  }

  getPosts() {
    this.channelsService.getCountryWp().subscribe(response => {
      console.log(response);
    });
  }

}
