const { ExpressOIDC } = require('@okta/oidc-middleware');

const oidc = new ExpressOIDC({
  issuer: `${process.env.ORG_URL}/oauth2/default`,
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
  redirect_uri: `${process.env.HOST_URL}/authorization-code/callback`,
  scope: 'openid profile',
  appBaseUrl: process.env.HOST_URL
});

module.exports = oidc;
