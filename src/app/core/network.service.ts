import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network/ngx'
// import { BehaviorSubject, Observable } from 'rxjs';
import { ToastController, Platform } from '@ionic/angular';
// import { Observable } from 'rxjs/dist/types/internal/Observable';
// import { BehaviorSubject } from 'rxjs/dist/types/internal/BehaviorSubject'

export enum ConnectionStatus {
  Online,
  Offline
}

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  // private status: BehaviorSubject<ConnectionStatus>;

  constructor(private network: Network, private toastController: ToastController, private plt: Platform) {
    document.addEventListener('deviceready', () => {
      this.plt.ready().then(() => {
        this.initializeNetworkEvents();
        let status =  this.network.type !== 'none' ? ConnectionStatus.Online : ConnectionStatus.Offline;
        // this.status.next(status);
      });
    });
    
  }

  public initializeNetworkEvents() {

    this.network.onDisconnect().subscribe(() => {
      // if (this.status.getValue() === ConnectionStatus.Online) {
      //   this.updateNetworkStatus(ConnectionStatus.Offline);
      // }
    });

    this.network.onConnect().subscribe(() => {
      // if (this.status.getValue() === ConnectionStatus.Offline) {
      //   this.updateNetworkStatus(ConnectionStatus.Online);
      // }
    });
  }

  private async updateNetworkStatus(status: ConnectionStatus) {
    // this.status.next(status);

    let connection = status == ConnectionStatus.Offline ? 'Offline' : 'Online';

    if(connection === 'Online'){
      let toast = this.toastController.create({
        message: `You are now ${connection}`,
        duration: 3000,
        position: 'top',
        color: 'success'
      });
      toast.then(toast => toast.present());
    } else {
      let toast = this.toastController.create({
        message: `You are now ${connection}, check your internet connection and try again`,
        duration: 3000,
        position: 'top',
        color: 'danger'
      });
      toast.then(toast => toast.present());
    }
  }

  // public onNetworkChange(): Observable<ConnectionStatus> {
  //   return this.status.asObservable();
  // }

  // public getCurrentNetworkStatus(): ConnectionStatus {
  //   return this.status.getValue();
  // }
}
