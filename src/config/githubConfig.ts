import {GITHUB_CLIENTID, GITHUB_SECRET, RIDIRECT_URL, ROUTE} from '@env';

export const githubConfig = {
  clientId: GITHUB_CLIENTID,
  clientSecret: GITHUB_SECRET,
  redirectUrl: RIDIRECT_URL,
  scopes: ['identity'],
  serviceConfiguration: {
    authorizationEndpoint: `${ROUTE}/authorize`,
    tokenEndpoint: `${ROUTE}/access_token`,
  },
};
