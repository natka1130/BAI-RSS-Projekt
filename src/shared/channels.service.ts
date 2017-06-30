import { Injectable }     from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Platform } from "ionic-angular";
import { AuthService } from "./auth.service";
import * as xml2js from 'xml2js';

@Injectable()
export class ChannelsService {
  private apiHost: string = '../assets/channels.json';
  private channels;
  private userSettings;

  constructor(private http: Http, private platform: Platform, private authService: AuthService) {
  }

  init() {
    this.fetchChannels()
      .subscribe((data) => this.channels = data);

    if(this.authService.isAuthenticated()) {
      this.userSettings = this.authService.getUserSettings()
    };
  }

  getCountryWp() {
    return this.http.get('http://www.polsatnews.pl/rss/kraj.xml')
      .map(res => {
        let news;
        xml2js.parseString( res.text(), function (err, result) {
          news = result.rss.channel[0].item;
        });
        return news;
      });
  }

  getChannelLink(cateogry, channel) {
    this.channels.map((cat) => {
      console.log(cat);
    })
  }

  public fetchChannels(): Observable<any> {
    if (this.platform.is('cordova') && this.platform.is('android')) {
      this.apiHost = "/android_asset/www/assets/channels.json";
    }
    return this.http.get(this.apiHost)
      .map((res:any) => res.json());
  }

}