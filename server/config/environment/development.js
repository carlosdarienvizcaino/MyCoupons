'use strict';
/*eslint no-process-env:0*/

// Development specific configuration
module.exports = {

  // MongoDB connection options
  mongo: {
    uri: 'mongodb://Admin:Admin1@ds133249.mlab.com:33249/mycoupons'
  },

  // Seed database on startup
  seedDB: true

};
