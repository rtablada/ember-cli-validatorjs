/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-validatorjs',

  included: function (app) {
    this._super.included(app);

    app.import(app.bowerDirectory + '/validatorjs/dist/validator.min.js');
  }
};
