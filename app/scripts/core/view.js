/*global define*/

define([
  'underscore',
  'core/app',
  'backbone'
  ], function (_, App, Backbone) {
    'use strict';

    App.View = Backbone.View.extend({

      constructor: function (options) {
        this.configure(options || {});
        Backbone.View.prototype.constructor.apply(this, arguments);
      },

      configure: function (options) {
        if (this.options) {
          options = _.extend({}, _.result(this, 'options'), options);
        }
        this.options = options;
      },

      initialize: function(){
        if(this.options.name){ App._views[this.options.name] = this; }

        this.options.context = this.options.context || {};
        this.options.context.view = this;
        this.context = this.options.context;

        this.hasValidations = this.model && this.model.validations;

        var self = this;

        if(this.hasValidations){
          this.hideGlobalError();

          // If valid
          this.listenTo(this.model, 'valid', function(){
            this.hideGlobalError();
            $('[data-errors-for]', self.scope()).removeClass('error');
          });


          this.listenTo(this.model, 'invalid', function(){
            self.renderErrors();
          });

        }
      },

      setContext: function(){
        var context = {};
        if(this.collection){
          context.collection = this.collection;
        }
        if(this.model){
          context.model = this.model;
        }
        _.extend(this.options.context, context);
        return this;
      },

      render: function () {
        this.setContext();

        this.$el.html(this.renderTemplate());

        this.$el.attr('data-layout', '');
        this.$el.data('_view', this);
        this.$el.addClass(this.className);

        this.renderInner();
        this.renderErrors();

        return this;
      },

      renderTo: function(to, lazy){
        if(!$(to).length){return this;}
        this.setElement(to);
        if(!lazy){
          this.render();
        }
        return this;
      },

      renderInner: function(){
        $('[data-inner-view]', this.$el).each(function(){
          var viewName = $(this).data('inner-view');
          var view = App._views[viewName];

          if(!view){throw new Error('Could not find '+ viewName);}
          view.renderTo(this, $(this).data('lazy'));
        });
      },

      getTemplateFunction: function(){
        var template = JST[this.template || this.options.template];
        if(!template){throw new Error('Template missing: ' + this.template );}
        return template;
      },

      renderTemplate: function(){
        return this.getTemplateFunction()(this.options.context);
      },

      serialize: function(scope){
        var formElements = 'input, select, textarea',
            elements, json;
        if(scope){
          elements = this.$el.find(scope).find(formElements);
        }else{
          elements = this.$(formElements, scope);
        }
        json = elements.toJSON();
        if(this.$elements){
          _.extend(json, this.$elements.find(formElements, scope).toJSON());
        }
        var parsedParams = App.paramsParser(json);
        this.params = parsedParams;
        return this;
      },

      hideGlobalError: function(){
        this.$('.global_error').hide().find('.msg').html('');
      },

      showGlobalError: function(msg){
        $('.global_error', this.scope()).show().find('.msg').html(msg);
      },

      showPropertyError: function(property, msg){
        this.$('.global_error[data-error-property="'+ property +'"]').show().find('.msg').html(msg);
      },

      renderErrors: function(){
        if(!this.hasValidations){return;}

        $('[data-errors-for]', this.scope()).removeClass('error');
        this.hideGlobalError();

        _.each(this.model.validationError, function(value, key){
          $('[data-errors-for="'+ key +'"]', this.scope()).addClass('error');
        }, this);

        if(this.model.invalid() && this.model.showErrorProperties){
          if(this.model.errorProperties.length > 0){
            for(var i=0; i<this.model.errorProperties.length; i++){
              this.showPropertyError(this.model.errorProperties[i].property, this.model.errorProperties[i].message);
            }
          }else{
            this.showGlobalError(this.model.globalErrorMessage);
          }
        }else if(this.model.invalid() && this.model.globalErrorMessage){

          this.showGlobalError(this.model.globalErrorMessage);
        }
      },

      scope: function(){
        return this.$elements || this.$el;
      }

    });

  });
