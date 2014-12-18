/*global define*/

define([
    'core'
], function (App) {
    'use strict';

    var Transaction = App.Model.extend({
        url: '',

        validations: function(){
          this.check('required', 'amount');
          this.check('number', 'amount');
          this.check({gt: 0}, 'amount');
          this.check('required', 'date');
          this.check('number', 'userId');

          if(this.validationError){
            this.globalErrorMessage = 'Please choose a payee, date & insert a positive amount.';
          }
        }
    });

    App.Models.Transaction = Transaction;

    return App.Models.Transaction;
});
