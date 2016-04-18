'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  DOMAIN: 'http://localhost:9000',
  SESSION_SECRET: 'sU19pEdIdOs97',

  FACEBOOK_ID: '613358152156063',
  FACEBOOK_SECRET: '2f90c060cad5f256e3ab975dedf06e5e',
  
  // Control debug level for modules using visionmedia/debug
  DEBUG: ''
};
