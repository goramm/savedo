define(['underscore', 'backbone', 'core/view', 'core/model', 'core/app'],   function(_, Backbone, View, Model, App){
  'use strict';

  _.extend(App, Backbone.Events);

  return App;

});
