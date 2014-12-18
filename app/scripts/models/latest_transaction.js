/*global define*/

define([
    'core'
], function (App) {
    'use strict';

    var LatestTransaction = App.Model.extend({
        url: ''
    });

    App.Models.LatestTransaction = LatestTransaction;

    return App.Models.LatestTransaction;
});
