define(['underscore', 'core', 'models/transaction', 'datepicker'], function(_, App, Transaction){
  'use strict';

  return App.View.extend({

    template: 'app/scripts/templates/dashboard/pay.hbs',

    events:{
      'click button[type=submit]': '$submit',
      'click .action_cancel':      '$cancel'
    },

    initialize: function(){
      App.View.prototype.initialize.apply(this, arguments);

      this.listenTo(App, 'payee:selected', this.payeeSelected);
      this.listenTo(App, 'payee:saved', this.payeeSelected);
    },

    render: function(){
      App.View.prototype.render.apply(this, arguments);

      this.$('#date').datepicker({
        autoclose: true,
        todayHighlight: true,
        format: App.dateformat.DATAPICKER
      });
      this.$('#date').datepicker('update', new Date(App.today().year(), App.today().month(), App.today().date()));
    },

    payeeSelected: function(model){
      this.$('.name').text(model.get('name'));
      this.$('.userId').val(model.get('id'));
    },

    $submit: function(e){
      e.preventDefault();

      var request = this.serialize().params;
      var userId = parseInt(request.userId, 10);

      if(userId){

        var peyee = App.Payees.get(userId);
        request.userId = userId;
        request.userName = peyee.get('name');
        request.bank = peyee.get('bank');
        request.iban = peyee.get('iban');
      }

      this.model.set(request, {validate:true});

      if(this.model.valid()){
        App.Transactions.add(this.model);

        App.trigger('transaction:changed', this.model);

        // change balance amount
        App.BalanceModel.set('amount', App.BalanceModel.get('amount') - this.model.get('amount'));

        this.$cancel();
      }
    },

    $cancel: function(){
      this.model = new Transaction();
      this.render();
    }

  });

});
