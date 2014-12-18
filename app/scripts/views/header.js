/*global define*/

define([
  'core'
  ], function (App) {
    'use strict';

    var HeaderView = App.View.extend({
      template: 'app/scripts/templates/header.hbs',

      el: '.header',

      initialize: function () {
        App.View.prototype.initialize.apply(this, arguments);

        this.render();
      }

    });

    App.Views.HeaderView = HeaderView;

    return App.Views.HeaderView;
  });
