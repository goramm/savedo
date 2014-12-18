/*global require*/
'use strict';

require.config({
  packages: [
    'core'
  ],
  shim: {
    bootstrap: {
      deps: ['jquery'],
      exports: 'jquery'
    },
    backbone: {
      deps: [
        'jquery',
        'underscore',
        'templates'
      ],
      exports: 'Backbone'
    },
    handlebars: {
      exports: 'Handlebars'
    }
  },
  paths: {
    jquery:       '../bower_components/jquery/dist/jquery',
    underscore:   '../bower_components/underscore/underscore',
    backbone:     '../bower_components/backbone/backbone',
    bootstrap:    '../bower_components/sass-bootstrap/dist/js/bootstrap',
    handlebars:   '../bower_components/handlebars/handlebars',
    moment:       '../bower_components/moment/moment',
    datepicker:   '../bower_components/bootstrap-datepicker/js/bootstrap-datepicker'
  }
});

require([
  'core',
  'backbone',
  'models/payee',
  'collections/payees',
  'models/balance',
  'collections/transactions',
  'models/transaction',
  'templates',
  'router'
  ], function (App, Backbone, Payee, Payees, Balance, Transactions, Transaction) {

    new App.Router();

    // dummy data

    var balance = new Balance({ bank: 'Unicredit Bank', iban: 'HR12 1001 0051 8630 0016', updated: App.today(), amount: 15345.77 });
    App.BalanceModel = balance;

    var payee1 = new Payee({ id: 1, name: 'Jovanka Black 1', bank: 'Unicredit Bank 1', iban: 'HR12 1001 0051 8630 0011', image: 'img-1' });
    var payee2 = new Payee({ id: 2, name: 'Jovanka Black 2', bank: 'Unicredit Bank 2', iban: 'HR12 1001 0051 8630 0012', image: 'img-2' });
    var payee3 = new Payee({ id: 3, name: 'Jovanka Black 3', bank: 'Unicredit Bank 3', iban: 'HR12 1001 0051 8630 0013', image: 'img-3' });
    var payee4 = new Payee({ id: 4, name: 'Jovanka Black 4', bank: 'Unicredit Bank 4', iban: 'HR12 1001 0051 8630 0014', image: 'img-4' });
    var payee5 = new Payee({ id: 5, name: 'Jovanka Black 5', bank: 'Unicredit Bank 5', iban: 'HR12 1001 0051 8630 0015', image: 'img-5' });
    var payee6 = new Payee({ id: 6, name: 'Jovanka Black 6', bank: 'Unicredit Bank 6', iban: 'HR12 1001 0051 8630 0016', image: 'img-6' });

    App.Payees = new Payees([payee1, payee2, payee3, payee4, payee5, payee6]);

    var trx1 = new Transaction({ id: 1, userId: 1, userName: 'Jovanka Black 1', amount: 100.10, date: '11.12.2014', bank: 'Unicredit Bank 1', iban: 'HR12 1001 0051 8630 0011'});
    var trx2 = new Transaction({ id: 2, userId: 1, userName: 'Jovanka Black 1', amount: 200.20, date: '12.12.2014', bank: 'Unicredit Bank 2', iban: 'HR12 1001 0051 8630 0012'});
    var trx3 = new Transaction({ id: 3, userId: 1, userName: 'Jovanka Black 1', amount: 300.30, date: '13.12.2014', bank: 'Unicredit Bank 3', iban: 'HR12 1001 0051 8630 0013'});
    var trx4 = new Transaction({ id: 4, userId: 4, userName: 'Jovanka Black 4', amount: 400.40, date: '14.12.2014', bank: 'Unicredit Bank 4', iban: 'HR12 1001 0051 8630 0014'});
    var trx5 = new Transaction({ id: 5, userId: 5, userName: 'Jovanka Black 5', amount: 500.50, date: '15.12.2014', bank: 'Unicredit Bank 5', iban: 'HR12 1001 0051 8630 0015'});
    var trx6 = new Transaction({ id: 6, userId: 6, userName: 'Jovanka Black 6', amount: 600.60, date: '16.12.2014', bank: 'Unicredit Bank 6', iban: 'HR12 1001 0051 8630 0016'});

    App.Transactions = new Transactions([trx1, trx2, trx3, trx4, trx5, trx6]);

    Backbone.history.start();
  });
