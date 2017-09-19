import { Injectable } from '@angular/core';

import { AngularFireDatabase} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/take';
import { Observable } from 'rxjs/Observable';

import { UserService } from '../user-service/user.service';
import { REMOTE_UNLOCK_TTL } from '../../../environments/environment';

@Injectable()
export class FirebaseService {

  lockValue: any;
  lastActivity: any;
  timeOffset: any;
  offsetObj: any;
  connectedObj: any;
  lockObj: any;
  lastActionObj: any;
  offline: any;
  lockObjSub: any;
  lastActionObjSub: any;
  connectedObjSub: any;

  constructor(
    private afAuth: AngularFireAuth,
    private afDB: AngularFireDatabase,
    private userService: UserService
  ) { }



  auth(db, token) {

    return this.afAuth.auth.signInWithCustomToken(token)
      .then(() => {
        return new Promise((resolve, reject) => {
          this.connectedObj = this.afDB.object(`${db}/.info/connected`, {preserveSnapshot: true});
          this.offsetObj = this.afDB.object(`${db}/.info/serverTimeOffset`, {preserveSnapshot: true});

          // subscription on connected object
          this.connectedObjSub = this.connectedObj.subscribe();

          resolve();
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  unauth() { // TODO check how this is used
    try {
      this.afAuth.auth.signOut();
    } catch (err) {
      console.log('Error unauth from firebase:', err);
    }
  }

  setRefs(dsPath) {
     return new Promise((resolve, reject) => {
       this.lockObj = this.afDB.object(`${dsPath}/lock`, {preserveSnapshot: true});
       this.lastActionObj = this.afDB.object(`${dsPath}/lastAction`, {preserveSnapshot: true});

       // subscription on lock object
       this.lockObjSub = this.lockObj.subscribe();

       // subscription on lastAction object
       this.lastActionObjSub = this.lastActionObj.subscribe();

       resolve();
     });
  }

  removeSubsriptions() {
    this.lockObjSub.unsubscribe();
  }

  listenLock() {
    this.lockObjSub.unsubscribe();
    this.lockObjSub = this.lockObj.subscribe(snapshot => {
        const lockVal = snapshot.val();
        if (!lockVal || lockVal && lockVal.userId !== this.userService.user._id) {
         console.log('fb:lock:lost'); // TODO - redirect to view mode here
         }
    });
  }

  checkConnected() {
    this.connectedObjSub.unsubscribe();
    this.connectedObj.subscribe(snapshot => {
      this.offline = !snapshot.val();
        if (this.offline) {
          // this.router.navigate(['/']); // TODO: redirect on view
          console.log('fb:connection:off');
        }
    });
  }

  setDSLock() {
    return new Promise((resolve, reject) => {
    const lockAndTime = [
      this.lockObj.take(1),
      this.lastActionObj.take(1),
      this.offsetObj.take(1)
    ];
    Observable.combineLatest(lockAndTime)  // wait till all subsribers are done
      .map(([lockValue, lastActivity, timeOffset]) => {
        this.lockValue = lockValue.val();
        this.lastActivity = lastActivity.val();
        this.timeOffset = timeOffset.val();

      }).subscribe(() => {
            this.proceed();
            resolve();
          });
    });
  }

  proceed() {
    const inactivity = Date.now() + this.timeOffset - this.lastActivity;

    if (!this.lockValue || inactivity > REMOTE_UNLOCK_TTL && !this.offline) {
      this.lockObj.$ref.onDisconnect().remove();
      const userId = this.userService.user._id;
      const userName = `${this.userService.user.firstName} ${this.userService.user.lastName}`;
      return this.lockObj.set({userId: userId, username: userName}).then(() => this.setLastAction());
    } else {
      throw {
        status: 'ds_locked',
        error: 'Data Structure Locked by another user',
        ds_data: this.lockValue
      };
    }
  }

  removeDSLock(user) {
      if (this.lockObj) {
        this.lockObj.take(1).subscribe( data => {
          const user = data.val();
          if (!user) { return; }
          if (user.userId === this.userService.user._id) { this.lockObj.set(null); }
          this.lockObj.$ref.onDisconnect().cancel();
        });
      } else {
        console.log('No lock available');
      }
}
// TODO - discover all places from which last action should be updated
  setLastAction() {
   const value = firebase.database.ServerValue.TIMESTAMP;
   return this.lastActionObj.set(value);
  }
}
