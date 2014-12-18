/*global define*/

define([
  'core',
  'models/transaction'
], function (App, Transaction) {
    'use strict';

    var Transactions = Backbone.Collection.extend({
      model: Transaction
    });

    App.Collections.Transactions = Transactions;

    return App.Collections.Transactions;
});
