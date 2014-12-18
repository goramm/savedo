/*global define*/

define([
  'core',
  'models/payee'
], function (App, Payee) {
    'use strict';

    var Payees = Backbone.Collection.extend({
      model: Payee
    });

    App.Collections.Payees = Payees;

    return App.Collections.Payees;
});
