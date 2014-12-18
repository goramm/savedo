/*global define*/

define([
  'underscore',
  'core',
  './add_payee'
], function (_, App, AddPayeeView) {
    'use strict';

    var PayeeItemView = App.View.extend({
      template: 'app/scripts/templates/dashboard/payee_item.hbs',

      events:{
        'click .action_edit': 'editPayee',
        'click .item': 'selectPayee'
      },

      editPayee: function(e){
        $('.panel-body .item').removeClass('active');
        $(e.currentTarget).closest('.item').addClass('active');

        this.addPayeeView = new AddPayeeView({
          model: this.model,
        });

        $('body').prepend(this.addPayeeView.render().$el);

        $('.editable-box').scrollToSelf();
      },

      selectPayee: function(e){
        $('.panel-body .item').removeClass('active');
        $(e.currentTarget).addClass('active');

        App.trigger('payee:selected', this.model);
      }

    });

    App.Views.PayeeListView = PayeeItemView;

    return PayeeItemView;
});
