/*global define*/

define([
  'core',
  'views/header',
  'views/dashboard',
  'views/transactions'
  ], function (App) {
    'use strict';

    var Router = Backbone.Router.extend({
      routes: {
        '': 'index',
        'transactions': 'transactions'
      },

      index: function(){
        App.setHeader('dashboard');
        App.setView(new App.Views.DashboardView({}));
      },

      transactions: function(){
        App.setHeader('transactions');
        App.setView(new App.Views.TransactionsView({
          collection: App.Transactions
        }));
      }

    });

    App.Router = Router;

    return App.Router;
  });
