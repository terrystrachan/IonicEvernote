import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage/dist/storage';

import * as Evernote from 'evernote'
import { EVERNOTE_KEY } from './../../app/evernote.credentials';
import { iNotebooks } from './i-notebooks';
import { EdamErrorCode } from './../evernote-auth/edam-error-code';

@Injectable()
export class EvernoteNoteStoreProvider {

  constructor(private storage: Storage) { }

  public getNotebooks() {
    var that = this;

    return new Promise(function (resolve, reject) {
      that.storage.get('evernoteToken').then((storedToken) => {

        var authenticatedClient = new Evernote.Client({
          token: storedToken.oauthAccessToken,
          sandbox: EVERNOTE_KEY.sandbox,
          china: EVERNOTE_KEY.china
        });

        var noteStore = authenticatedClient.getNoteStore();
        noteStore.listNotebooks()
          .then(notebooks => {

            let notebookarray = [];
            notebooks.forEach(notebook => {
              notebookarray.push({
                guid: notebook["guid"],
                name: notebook["name"],
                defaultNotebook: notebook["defaultNotebook"],
                stack: notebook["stack"]
              });
            });

            resolve(notebookarray);

          })
          .catch(error => {
            reject(error);
          });
      }).catch(error => {
        reject({
          errorCode: EdamErrorCode.PERMISSION_DENIED
        });
      });
    });
  }
}
