/*global define*/

define([
    'core'
], function (App) {
    'use strict';

    var Payee = App.Model.extend({
      url: '',

      validations: function(){
        this.check('required', 'name');
        this.check('required', 'iban');
        this.check('required', 'bank');

        if(this.validationError){
          this.globalErrorMessage = 'All fields are mandatory.';
        }

      }
    });

    App.Models.Payee = Payee;

    return App.Models.Payee;
});
