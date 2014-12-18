/*global define*/

define([
    'underscore',
    'core/app',
    'backbone'
], function (_, App, Backbone) {
    'use strict';

    var Model = Backbone.Model.extend({

      constructor: function(){
        this.errorProperties = [];
        this.showErrorProperties = false;

        return Backbone.Model.prototype.constructor.apply(this, arguments);
      },

      valid: function() {
        return this.validationError === null;
      },

      invalid: function() {
        return !this.valid();
      },

      resolveValueForAttr: function(attribute){
        var value = this.validationAttributes,
            attributes = attribute.split('.');

        if(attributes.length === 1){return value[attribute];}

        _.each(attributes, function(attr){
          value = value[attr];
        });

        return value;
      },

      validate: function(attributes){
        this.validationError = null;
        if(!this.validations || !attributes){return;}
        this.errorProperties = [];
        this.validationAttributes = attributes;
        this.validations.apply(this, arguments);
        if(!this.validationError){this.trigger('valid', this);}
        return this.validationError;
      },

      check: function(validator, attr, value, msg){
        if(this.hasError(attr)){return;} // Stop on first attribute error

        var pair;
        if(arguments.length === 2){
          value = this.resolveValueForAttr(attr);
        }
        if(_.isObject(validator)){
          pair = _.pairs(validator)[0];
          if(!this.validators[pair[0]](value, pair[1])){
            this.addError(attr, msg || pair[0]);
          }
        }else{
          if(!this.validators[validator](value)){
            this.addError(attr, msg || validator);
          }
        }
      },

      addError: function(attr, msg){
        if(!this.validationError){
          this.validationError = {};
        }
        this.validationError[attr] = msg || 'Invalid';
        if(this.showErrorProperties){
          this.errorProperties.push({
            property: attr,
            message: msg
          });
        }
      },

      hasError: function(attr){
        return this.validationError && this.validationError[attr];
      },


      validators: {

        required: function(value){
          return !(
            typeof value === 'undefined' ||
            value === null ||
            (_.isString(value) && /^\s*$/.test(value)) ||
            _.isArray(value) && _.isEmpty(value)
           );
        },

        number: function(value){
          return !isNaN(parseFloat(value, 10));
        },

        not: function(value, eq){
          return value !== eq;
        },

        min: function(value, min){
          return value >= min;
        },

        gt: function(value, compareValue){
          return value > compareValue;
        }
      } // END OF validators (object)

    });

    App.Model = Model;

    return App.Model;
});
