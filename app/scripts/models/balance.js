/*global define*/

define([
    'core'
], function (App) {
    'use strict';

    var Balance = App.Model.extend({
        url: ''
    });

    App.Models.Balance = Balance;

    return App.Models.Balance;
});
