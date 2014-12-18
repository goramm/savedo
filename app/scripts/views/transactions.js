/*global define*/

define([
  'underscore',
  'core',
  'views/transactions/transaction_item'
  ], function (_, App, TransactionItemView) {
    'use strict';

    var TransactionsView = App.View.extend({
      template: 'app/scripts/templates/transactions.hbs',
      tagName: 'div',
      className: 'transactions',

      initialize: function(){
        App.View.prototype.initialize.apply(this, arguments);

        //this.listenTo(this.collection, 'add', this.render);
      },

      render: function(){
        App.View.prototype.render.apply(this, arguments);
        var transactionItem, payee;
        _.each(this.collection.models, function(item){
          payee = App.Payees.get(item.get('userId'));
          transactionItem = new TransactionItemView({
            model: item,
            context: {
              payee: payee
            }
          });

          this.$('.yield').append(transactionItem.render().$el);
        }, this);

        return this;
      }
    });

    App.Views.TransactionsView = TransactionsView;

    return App.Views.TransactionsView;
  });
