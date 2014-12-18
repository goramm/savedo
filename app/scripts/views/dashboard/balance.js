/*global define*/

define([
    'core'
], function (App) {
    'use strict';

    var BalanceView = App.View.extend({
      template: 'app/scripts/templates/dashboard/balance.hbs',

      initialize: function(){
        App.View.prototype.initialize.apply(this, arguments);

        this.listenTo(this.model, 'change', this.render);
      }

    });

    App.Views.BalanceView = BalanceView;

    return BalanceView;
});
