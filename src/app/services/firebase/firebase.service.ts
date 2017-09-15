import { Injectable } from '@angular/core';

import { AngularFireDatabase} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import 'rxjs/add/observable/combineLatest';
import { Observable } from 'rxjs/Observable';

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

  constructor(
    private afAuth: AngularFireAuth,
    private afDB: AngularFireDatabase
  ) { }



  auth(db, token) {

    return this.afAuth.auth.signInWithCustomToken(token)
      .then(() => {
        return new Promise((resolve, reject) => {
          this.connectedObj = this.afDB.object(`${db}/.info/connected`, {preserveSnapshot: true});
            console.log('conn', this.connectedObj);
          this.offsetObj = this.afDB.object(`${db}/.info/serverTimeOffset`, {preserveSnapshot: true})
              console.log('off', this.offsetObj);
          console.log('auth');
          resolve();
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  unauth() {
    try {
      this.afAuth.auth.signOut();
    } catch (err) {
      console.log('Error unauth from firebase:', err);
    }
  }

  setRefs(dsPath) { // TODO - use compbineLatest here
    return new Promise((resolve, reject) => {
    console.log('setRefs');
      return new Promise((resolve1, reject1) => {
        this.lockObj = this.afDB.object(`${dsPath}/lock`, {preserveSnapshot: true});
        resolve1();
      })
        .then(() => {
          this.lastActionObj = this.afDB.object(`${dsPath}/lastAction`, {preserveSnapshot: true})
          console.log('last', this.lastActionObj);
          resolve();
        });
      });
  }

  setDSLock() {
    const lockAndTime = [
      this.lockObj,
      this.lastActionObj,
      this.offsetObj
    ];

    Observable.combineLatest(lockAndTime)  // wait till all subsribers are done
      .map(([lockValue, lastActivity, timeOffset]) => {
        this.lockValue = lockValue.val();
        this.lastActivity = lastActivity.val();
        this.timeOffset = timeOffset.val();
      })
      .subscribe(() => this.proceed());
  }

  proceed() {
    console.log(this.lockValue, this.timeOffset, this.lastActivity)

    const inactivity = Date.now() + this.timeOffset - this.lastActivity;

    if (!this.lockValue || inactivity > 6000000 && !this.offline) {
      console.log('snap1', this.lockObj);
      // this.lockObj.onDisconnect().remove(); TODO: this remove
      // this.lockObj.userId = user.id;  // TODO: ??
      // this.lockObj.username = `${user.firstName} ${user.lastName}`;

      // return this.lockObj.$save().then(() => this.setLastAction()); TODO: ??
    } else {
      throw {
        status: 'ds_locked',
        error: 'Data Structure Locked by another user',
        ds_data: this.lockValue
      };
    }
  }

  listenLock() {
    console.log('listenLock');
    // this.lockObj.off(); TODO
    // this.lockObj.on('value', snapshot => {
    //   const lockVal = snapshot.val();
    //   console.log('lockval', lockVal);
      // if (!lockVal || lockVal && lockVal.userId !== Session.getUser().id) {
      //  'fb:lock:lost';
      // }
    // });
  }

  checkConnected() {
    console.log('checkConnected');
    // this.lockObj.off(); TODO
    // this.lockObj.on('value', snapshot => {
    //   console.log('snaps', snapshot);
    //   this.offline = !snapshot.val;
    //   if (!snapshot.val()) {
    //     // this.router.navigate(['/']); TODO: redirect
    //     console.log('fb:connection:off');
    //   }
    // });
  }

  removeDSLock(sessionUser, cb) {
  if (this.lockObj) {
    this.lockObj.once('value', data => {
      const user = data.val();
      if (!user) { return cb(); }
      if (user.userId === sessionUser.id) { this.lockObj.set(null); }
      this.lockObj.onDisconnect().cancel();
      cb();
    });
  } else {
    console.log('No lock available');
    cb();
  }
}

  setLastAction() {
  // this.lastActionObj.$value = firebase.database.ServerValue.TIMESTAMP;  // TODO: ??
  return this.lastActionObj.$save();
}

  listenLastUpdate() {
  this.lastActionObj.off();
  this.lastActionObj.on('value', snapshot => {
    // $rootScope.$broadcast('fb:lastaction:updated', snapshot.val()); // TODO: ??
   // this.router.navigate(['/']); TODO: redirect
    console.log('reditrect');
  });
}
}
