import {User} from "./user"
import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import 'rxjs/Rx';
import { Platform } from "ionic-angular";
import { Observable } from "rxjs/Observable";

declare var firebase: any;

@Injectable()
export class AuthService {
    public userSettingsUrl: string = '../assets/userdata-register.json';
    private userRegisterDefaultData: any;

    constructor(private http: Http, private platform: Platform) {
        this.getUserDefaultSettings()
          .subscribe((data) => this.userRegisterDefaultData = data);
    }
    signupUser(user: User) {
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .catch(function (error) {
                console.log(error);
            });
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
        var user = firebase.auth().currentUser;

        if (user) {
            return true;
        } else {
            return false;
        }
    }

    getUserInfo() {
        if(this.isAuthenticated()) {
            return firebase.auth().currentUser;
        } else  {
            return false;
        }
    }

    getUserId() {
        return firebase.auth().currentUser.uid;
    }

    getUserChannelsSettings(): Observable<any> {
        return this.http.get('https://auth-9d20d.firebaseio.com/userdata/' + this.getUserId() + '.json')
          .map((res:any) => res.json());
    }

    getUserDefaultSettings() : Observable<any> {
        if (this.platform.is('cordova') && this.platform.is('android')) {
            this.userSettingsUrl = "/android_asset/www/assets/channels.json";
        }
        return this.http.get(this.userSettingsUrl)
          .map((res:any) => res.json());
    }

    createDefaultSettingsForRegisteredUser() {
        let body = JSON.stringify(this.userRegisterDefaultData);
        const headers = new Headers({
            'Content-Type' : 'application/json'
        });
        //TODO call with authenthication
        return this.http.put('https://auth-9d20d.firebaseio.com/userdata/' + this.getUserId() + '.json', body, {headers: headers});
    }
}