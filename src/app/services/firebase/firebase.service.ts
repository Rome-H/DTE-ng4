import { Injectable } from '@angular/core';

import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import {reject} from 'q';
@Injectable()
export class FirebaseService {

  firebaseToken: string;
  firebaseDatabase: any;

  rootRef: any;
  offsetObj: any;
  connectedObj: any;
  lockObj: any;
  lastActionObj: any;

  constructor(
    private afAuth: AngularFireAuth,
    private afDB: AngularFireDatabase
  ) { }

  auth() {

    return this.afAuth.auth.signInWithCustomToken(this.firebaseToken)
      .then(() => {
        return new Promise((resolve, reject) => {
          this.connectedObj = this.afDB.object(`${this.firebaseDatabase}/.info/connected`).$ref;
          this.offsetObj = this.afDB.object(`${this.firebaseDatabase}/.info/serverTimeOffset`).$ref;
          console.log('offSet:' , this.offsetObj);
          console.log('qqqq')
          setTimeout(() => {
            console.log('first then');
            resolve();
          }, 1000
          );
        });

        // console.log('first then');
      })
      .catch((err) => {
        reject(err);
      });
  }

  unauth() {
    try {
      this.afAuth.auth.signOut();
    } catch (err) {
      console.log('Error unauth from firebase:', err);
    }
  }

  setRefs(dsPath) {
    console.log(`${dsPath}/lock`)
    this.lockObj = this.afDB.object(`${dsPath}/lock`).$ref;
    this.lastActionObj = this.afDB.object(`${dsPath}/lastAction`).$ref;
  }

  listenLock() {
    this.lockObj.off();
    this.lockObj.on('value', snapshot => {
      const lockVal = snapshot.val();
      console.log(88, lockVal);
    });
  }
  setDSLock() {
    console.log(this.lastActionObj);
    const lockAndTime = [
      this.lastActionObj.once('value'),
      this.offsetObj.once('value')
    ];
    console.log(77, lockAndTime);
  }
}
