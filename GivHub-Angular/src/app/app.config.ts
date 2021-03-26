const { CLIENT_ID, ISSUER, OKTA_TESTING_DISABLEHTTPSCHECK } = process.env;
import { environment } from '../environments/environment';
var url = "";
//azure doesnt see this environment variable for some reason
if(environment.production == false){
  url = "http://localhost:8080/callback";
}else{
  url = "https://givhub.azurewebsites.net/callback";
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
