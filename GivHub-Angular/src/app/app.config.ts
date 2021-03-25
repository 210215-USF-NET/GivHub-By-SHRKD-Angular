const { CLIENT_ID, ISSUER, OKTA_TESTING_DISABLEHTTPSCHECK } = process.env;
import { environment } from '../environments/environment';
var url = "";
if(environment.production === true){
  url = "http://192.168.1.5:8080/callback";
}else{
  url = "http://192.168.1.5:8080/callback";
}

export default {
  oidc: {
    clientId: environment.CLIENT_ID,
    issuer: environment.ISSUER,
    redirectUri: url,
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    testing: {
      disableHttpsCheck: `${OKTA_TESTING_DISABLEHTTPSCHECK}`
    }
  },
  resourceServer: {
    messagesUrl: 'http://localhost:8000/api/messages',
  },
};
