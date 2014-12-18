/*global define*/

define([
  'core',
  './payee_list',
  './add_payee',
  'models/payee'
  ], function (App, PayeeListView, AddPayeeView, Peyee) {
    'use strict';

    var QuickPayView = App.View.extend({
      template: 'app/scripts/templates/dashboard/quick_pay.hbs',

      events: {
        'click .action_new': 'newPayee'
      },

      initialize: function(){
        App.View.prototype.initialize.apply(this, arguments);

        this.payeeListView = new PayeeListView({
          name: 'dashboard/payee_list',
          collection: App.Payees
        });
      },

      newPayee: function(){
        this.addPayeeView = new AddPayeeView({
          model: new Peyee(),
        });

        $('body').prepend(this.addPayeeView.render().$el);

        $('.editable-box').scrollToSelf();
      }

    });

    App.Views.QuickPayView = QuickPayView;

    return QuickPayView;
  });
