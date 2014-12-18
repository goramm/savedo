/*global define*/

define([
  'underscore',
  'core'
], function (_, App) {
    'use strict';

    var PayeeItemView = App.View.extend({
      template: 'app/scripts/templates/transactions/transaction_item.hbs',

      tagName: 'tr',

      initialize: function(){
        App.View.prototype.initialize.apply(this, arguments);
      }

    });

    App.Views.PayeeListView = PayeeItemView;

    return PayeeItemView;
});
