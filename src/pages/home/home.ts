import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular/platform/platform';

import { EvernoteAuthProvider } from '../../providers/evernote-auth/evernote-auth';
import { EvernoteNoteStoreProvider } from './../../providers/evernote-note-store/evernote-note-store';
import { iNotebooks } from '../../providers/evernote-note-store/i-notebooks';
import { iAccessTokenResponse } from '../../providers/evernote-auth/i-access-token-response';
import { EdamErrorCode, EdamErrorHandler } from './../../providers/evernote-auth/edam-error-code';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  evernoteNotebooks = [];

  constructor(
    public navCtrl: NavController,
    private platform: Platform,
    private evernoteAuthService: EvernoteAuthProvider,
    private evernoteNoteStore: EvernoteNoteStoreProvider) { }

  public authoriseEvernote() {
    this.platform.ready().then(() => {
      this.evernoteAuthService.authoriseEvernote()
        .then((token: iAccessTokenResponse) => {
          alert("Your Evernote Access Token is - " + token.oauthAccessToken);
        }).catch(error => {
          alert("EDAM Error code (" 
          + error.errorCode + ') - '
          +EdamErrorHandler.getEdamErrorMessage(error.errorCode));
        });
    });
  }

  public getNotebooks() {
    var that = this;
    this.evernoteNoteStore.getNotebooks()
      .then((notebooks: [iNotebooks]) => {
        that.evernoteNotebooks = notebooks;
      })
      .catch(error => {
        alert("EDAM Error code (" 
          + error.errorCode + ') - '
          +EdamErrorHandler.getEdamErrorMessage(error.errorCode));
      });
  }



}


//https://dev.evernote.com/doc/reference/Errors.html#Struct_EDAMUserException