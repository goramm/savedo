/*global define*/

define([
    'core'
], function (App) {
    'use strict';

    var LatestTransationView = App.View.extend({
      template: 'app/scripts/templates/dashboard/latest_transaction.hbs',

      initialize: function(){
        App.View.prototype.initialize.apply(this, arguments);

        this.listenTo(this.model, 'change', this.render);
        this.listenTo(App, 'payee:saved', this.payeeSaved);
      },

      payeeSaved: function(model){
        var userId = parseInt(this.model.get('userId'), 10);
        if(userId === model.id){
          this.$('h3').text(model.get('name'));
          this.$('.bank .txt').text(model.get('bank'));
          this.$('.iban .txt').text(model.get('iban'));
        }
      }
    });

    App.Views.LatestTransationView = LatestTransationView;

    return LatestTransationView;
});
