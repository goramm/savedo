/*global define*/

define([
  'core',
  'views/dashboard/balance',
  'models/balance',
  'views/dashboard/latest_transaction',
  'models/latest_transaction',
  'views/dashboard/quick_pay',
  'views/dashboard/pay',
  'models/transaction',
  ], function (App, BalanceView, Balance, LatestTransactionView, LatestTransaction, QuickPayView, PayView, Transaction) {
    'use strict';

    var DashboardView = App.View.extend({
      template: 'app/scripts/templates/dashboard.hbs',

      initialize: function(){
        App.View.prototype.initialize.apply(this, arguments);

        this.listenTo(App, 'transaction:changed', this.transactionChanged);

        this.balanceView = new BalanceView({
          name: 'dashboard/balance',
          model: App.BalanceModel
        });

        this.latestTransactionView = new LatestTransactionView({
          name: 'dashboard/latest_transaction',
          model: App.Transactions.last()
        });

        this.quickPayView = new QuickPayView({
          name: 'dashboard/quick_pay'
        });

        this.payView = new PayView({
          name: 'dashboard/pay',
          model: new Transaction()
        });
      },

      transactionChanged: function(model){
        this.latestTransactionView.model = model;
        this.latestTransactionView.render();
      }

    });

    App.Views.DashboardView = DashboardView;

    return App.Views.DashboardView;
  });
