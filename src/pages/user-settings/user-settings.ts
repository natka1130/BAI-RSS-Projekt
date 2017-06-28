import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from "../../shared/auth.service";

@Component( {
  selector: 'page-user-settings',
  templateUrl: 'user-settings.html',
} )
export class UserSettings implements OnInit{
  private channels: any;

  constructor(public navCtrl: NavController, public authService: AuthService) {
  }

  ngOnInit() : any {
    this.authService.getUserDefaultSettings()
      .subscribe((data) => this.channels = data.channels);
  }
  consoleChannels(a,b,c) {
    console.log(a,b,c);
  }
}
