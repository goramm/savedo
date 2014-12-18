/*global define*/

define([
  'underscore',
  'core',
  './payee_item'
], function (_, App, PayeeItemView) {
    'use strict';

    var PayeeListView = App.View.extend({
      template: 'app/scripts/templates/dashboard/payee_list.hbs',

      events:{
        'click .item': 'selectPayee'
      },

      initialize: function(){
        App.View.prototype.initialize.apply(this, arguments);

        this.listenTo(this.collection, 'add change', this.render);

        this.listenTo(App, 'transaction:changed', this.render);
      },

      render: function(){
        App.View.prototype.render.apply(this, arguments);
        var payeeItemView, trxNumber = 0;
        _.each(this.collection.models, function(item, index){
          if(item.id){
            trxNumber = App.Transactions.where({userId: item.id}).length;
          }
          payeeItemView = new PayeeItemView({
            model: item,
            className: (index % 2 ? 'even ' : 'odd ') + 'item-' + (index + 1),
            context: {
              trxNumber: trxNumber
            }
          });
          this.$el.append(payeeItemView.render().$el);
        }, this);

      }

    });

    App.Views.PayeeListView = PayeeListView;

    return PayeeListView;
});
