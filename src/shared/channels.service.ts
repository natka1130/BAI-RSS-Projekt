import { Injectable }     from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Platform } from "ionic-angular";

@Injectable()
export class ChannelsService {
  public apiHost: string = '../assets/channels.json';

  constructor(private http: Http, private platform: Platform) {
  }

  public getChannels(): Observable<any> {
    if (this.platform.is('cordova') && this.platform.is('android')) {
      this.apiHost = "/android_asset/www/assets/channels.json";
    }
    return this.http.get(this.apiHost)
      .map((res:any) => res.json());
  }

}