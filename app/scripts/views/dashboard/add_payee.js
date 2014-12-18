define(['underscore', 'core', 'models/payee'], function(_, App){
  'use strict';

  return App.View.extend({

    template: 'app/scripts/templates/dashboard/add_payee.hbs',

    className: 'editable-parent',

    events:{
      'click button[type=submit]': '$submit',
      'click .action_cancel':      '$cancel'
    },

    initialize: function(){
      App.View.prototype.initialize.apply(this, arguments);

      App.blockUI(this.$el.find('.editable-box'));

      $(document).on('ui_blocker:clicked', _.bind(this.$cancel, this));

    },

    $submit: function(e){
      e.preventDefault();

      var request = this.serialize().params;
      this.model.set(request, {validate:true});

      if(this.model.valid()){
        // in real app we should call save method on model
        App.Payees.add(this.model);
        App.trigger('payee:changed', this.model);
        if(this.model.id){
          App.trigger('payee:saved', this.model);
        }

        this.$cancel();
      }
    },

    $cancel: function(){
      App.unblockUI();
      this.remove();
    }

  });

});
