import {User} from "./user"
import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import 'rxjs/Rx';
import { Platform } from "ionic-angular";
import { Observable } from "rxjs/Observable";
import { ToastController } from 'ionic-angular';

declare var firebase: any;

@Injectable()
export class AuthService {
    private userSettingsUrl: string = '../assets/userdata-register.json';
    private userRegisterDefaultData: any;
    private userSettings;

    constructor(private http: Http, private platform: Platform, private toastCtrl: ToastController) {
        this.fetchUserDefaultSettings()
          .subscribe((data) => this.userRegisterDefaultData = data);
    }

    showToast(message: string) {
      const toast = this.toastCtrl.create({
        message: message,
        position: 'bottom',
        duration: 3000
      });
      toast.present();
    }

    signupUser(user: User) {
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then(res => {
              this.createDefaultSettingsForRegisteredUser(res.uid).subscribe();
              this.showToast('User was added successfully, now you can log in');
            })
            .catch(error => this.showToast(error.message));
    }

    signinUser(user: User) {
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .catch(function (error) {
                console.log(error);
            });
    }

    logout() {
        firebase.auth().signOut();
    }

    isAuthenticated() {
        const user = firebase.auth().currentUser;
        if (user) {
          this.fetchUserChannelsSettings().subscribe();
          return true;
        } else {
          return false;
        }
    }

    getUserId() {
        return firebase.auth().currentUser.uid;
    }

    setUserSettings(data) {
      this.userSettings = data
    }

    getUserSettings() {
        return this.userSettings.channels;
    }

    fetchUserChannelsSettings(): Observable<any> {
        return this.http.get(`https://auth-9d20d.firebaseio.com/userdata/${this.getUserId()}.json`)
          .map((res:any) => this.userSettings = res.json());
    }

    fetchUserDefaultSettings() : Observable<any> {
        if (this.platform.is('cordova') && this.platform.is('android')) {
            this.userSettingsUrl = "/android_asset/www/assets/userdata-register.json";
        }
        return this.http.get(this.userSettingsUrl)
          .map((res:any) => res.json());
    }

    createDefaultSettingsForRegisteredUser(userID) {
        const body = JSON.stringify(this.userRegisterDefaultData);
        const headers = new Headers({
            'Content-Type' : 'application/json'
        });
        //TODO call with authenthication
        return this.http.put('https://auth-9d20d.firebaseio.com/userdata/' + userID + '.json', body, {headers: headers});
    }

    updateUserSetting(categoryIndex, channelIndex, selection) {
        // Update application state
        this.userSettings.channels[categoryIndex].channels[channelIndex].selected = selection;

        // Update api state
        const url =  `https://auth-9d20d.firebaseio.com/userdata/${this.getUserId()}/channels/${categoryIndex}/channels/${channelIndex}/selected.json`;
        const headers = new Headers({
            'Content-Type' : 'application/json'
        });
        return this.http.put(url, selection, {headers: headers});
    }
}
