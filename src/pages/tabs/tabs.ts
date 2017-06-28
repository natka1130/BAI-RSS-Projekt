import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import {UserSettings} from "../user-settings/user-settings";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = UserSettings;

  constructor() {

  }
}
