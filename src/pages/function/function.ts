import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { ParticleProvider } from '../../providers/particle/particle';

@IonicPage()
@Component({
  selector: 'page-function',
  templateUrl: 'function.html',
})
export class FunctionPage {

  public functionExists: boolean = false;
  public functionName: string = 'led';
  public functionParameter: string = 'on';
  public isAuto: boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, public particle: ParticleProvider) {
  }

  ionViewDidLoad() {
    if (!this.particle.token) {
    	this.login()
    } else {
    this.functionExists = this.particle.device && this.particle.device.functions && this.particle.device.functions.indexOf(this.functionName) >= 0;
    }
  }

  callFunction() {
    this.particle.callFunction(this.functionName, this.functionParameter);
    this.isAuto = false;
    if ( this.functionParameter === 'on') {
    this.functionParameter = 'off';
    }
      else {
        this.functionParameter = 'on';
      }
  }

  auto() {
    this.particle.callFunction(this.functionName, "auto");
    this.isAuto = true;
  }
  login() {
    this.navCtrl.push( LoginPage );
  }

}
