export interface iAccessTokenResponse {
    oauth_token: string;
    oauthToken: string;
    oauthTokenSecret: string;
    oauth_verifier: string;

    // Mapping the Evernote Access Token Response
    oauthAccessToken: string;
    oauthAccessTokenSecret: string;
    edamShard: string;
    edamUserId: string;
    edamExpires: string;
    edamNoteStoreUrl: string;
    edamWebApiUrlPrefix: string;
}
