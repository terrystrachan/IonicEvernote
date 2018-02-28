import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage/dist/storage';

import { EVERNOTE_KEY } from './../../app/evernote.credentials';
import * as Evernote from 'evernote'
import { EdamErrorCode } from './edam-error-code';
import { iAccessTokenResponse } from './i-access-token-response';

declare var window: any;

@Injectable()
export class EvernoteAuthProvider {
  callbackUrl = "http://localhost/callback";

  constructor(private storage: Storage) { }

  public authoriseEvernote() {
    var that = this;

    return new Promise(function (resolve, reject) {
      that.evernoteAuthorisation()
        .then((success: iAccessTokenResponse) => {

          //user has been authorised - get an access token
          that.getEvernoteAccessToken(success)
            .then((evernoteAccessToken: iAccessTokenResponse) => {

              //we have a token - store it for future use
              that.storage.set('evernoteToken', evernoteAccessToken);
              resolve(evernoteAccessToken);
            });
        })
        .catch(error => {
          reject(error);
        });

    });

  }

  private evernoteAuthorisation() {

    var that = this;
    return new Promise(function (resolve, reject) {
      var parsedResponse = {};
      let client = new Evernote.Client({
        consumerKey: EVERNOTE_KEY.consumerKey,
        consumerSecret: EVERNOTE_KEY.consumerSecret,
        sandbox: EVERNOTE_KEY.sandbox,
        china: EVERNOTE_KEY.china,
      });

      client.getRequestToken(that.callbackUrl, function (error, oauthToken, oauthTokenSecret) {
        if (error) {
          reject(error);
        }

        parsedResponse["oauthToken"] = oauthToken;
        parsedResponse["oauthTokenSecret"] = oauthTokenSecret;
        var browserRef = window.cordova.InAppBrowser.open(client.getAuthorizeUrl(oauthToken),
          "_blank", "location=no,clearsessioncache=yes,clearcache=yes");
        browserRef.addEventListener("loadstart", (event) => {
          if ((event.url).indexOf(that.callbackUrl) === 0) {
            browserRef.removeEventListener("exit", (event) => { });
            browserRef.close();

            var responseParameters = ((event.url).split("?")[1]).split("&");

            for (var i = 0; i < responseParameters.length; i++) {
              parsedResponse[responseParameters[i].split("=")[0]] = responseParameters[i].split("=")[1];
            }
            if (parsedResponse["oauth_token"] !== undefined && parsedResponse["oauth_token"] !== null) {
              resolve(parsedResponse);
            } else {
              // need some error handling to determine the appropriate EDAM Error
              reject("Problem authenticating with Evernote");
            }
          }
        });

        browserRef.addEventListener("exit", function (event) {
          alert('The Evernote authorisation flow was canceled');
          reject({
            errorCode: EdamErrorCode.PERMISSION_DENIED
          });
        });

      });

    });

  }

  private getEvernoteAccessToken(success: iAccessTokenResponse) {

    return new Promise(function (resolve, reject) {
      let client = new Evernote.Client({
        consumerKey: EVERNOTE_KEY.consumerKey,
        consumerSecret: EVERNOTE_KEY.consumerSecret,
        sandbox: EVERNOTE_KEY.sandbox,
        china: EVERNOTE_KEY.china,
      });


      client.getAccessToken(success.oauthToken,
        success.oauthTokenSecret,
        success.oauth_verifier,
        function (error, oauthToken, oauthTokenSecret, results) {
          if (error) {
            // need some error handling to determine the appropriate EDAM Error
            alert("Error? = " + error.errorCode);
            reject(error);
          } else {
            success.oauthAccessToken = oauthToken;
            success.oauthAccessTokenSecret = oauthTokenSecret;
            success.edamShard = results.edam_shard;
            success.edamUserId = results.edam_userId;
            success.edamExpires = results.edam_expires;
            success.edamNoteStoreUrl = results.edam_noteStoreUrl;
            success.edamWebApiUrlPrefix = results.edam_webApiUrlPrefix;

            resolve(success);
          }
        });
    });
  }

}
