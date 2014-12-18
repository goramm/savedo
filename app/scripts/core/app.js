define(['moment', 'handlebars'], function(moment, Handlebars){
    'use strict';

    // define namespace for app
    var App = window.App = {
      now: function(){
        return moment();
      },

      today: function(){
        return this.now().clone().startOf('day');
      }
    };

    App.Views = {};
    App.Models = {};
    App.Collections = {};

    App._views = {};

    // define data format
    App.dateformat = {};
    App.dateformat.SHORT = 'DD.MM.YYYY.';
    App.dateformat.DATAPICKER = 'dd.mm.yyyy.';

    // numbers
    App.number = {};
    App.number.DECIMAL_SYMBOL = ',';
    App.number.DIGIT_SYMBOL = '.';
    App.number.CURRENCY = '&euro;';

    // add header view
    App.setHeader = function(pageName){
      var options = {};
      options[pageName] = true;

      new App.Views.HeaderView({
        context: options
      });
    };

    // remove and render view to app
    App.setView = function(view){
      var singleView;
      var allViews = $('#app [data-layout]');
      allViews.each(function(){
          singleView = $(this).data('_view');
          if(singleView){
            singleView.remove();
          }
      });

      view.renderTo('#app');
    };


    // Modal
    App.notBlockedElements = [];
    App.blockUI = function(){

      App.unblockUI();

      $('<div class="modal-backdrop ui_blocker">').appendTo(document.body);

      _.each(arguments, function(selector){
        App.notBlockedElements.push($(selector).addClass('not_blocked'));
      });

    };

    App.unblockUI = function(){
      if(!$('.modal-backdrop').length){return;}
      _.invoke(App.notBlockedElements, 'removeClass', 'not_blocked');
      App.notBlockedElements = [];
      $('.modal-backdrop').remove();
    };

    $(document.body).on('click', '.ui_blocker', function(){
      $(document).trigger('ui_blocker:clicked');
    });

    $(document).on('click', 'a[class*=action_], a[data-disable]', function(e){
      e.preventDefault();
    });

    //Handlebars helpers
    Handlebars.registerHelper('date', function(value, format){
      format = _.isString(format) ? format : App.dateformat.SHORT;
      return value ? moment(value).format(format) : '';
    });

    Handlebars.registerHelper('currency', function(number){
      if(!number){ return; }
      number = parseFloat(number).toFixed(2) + '';
      var num = App.number.CURRENCY + ' ' + number.replace('.', '<small class="decimal">' + App.number.DECIMAL_SYMBOL) + '</small>';
      return new Handlebars.SafeString(num);
    });

    Handlebars.registerHelper('eq', function(val1, val2, options){
      if(val1 === val2) {
        return options.fn(this);
      } else {
        return options.inverse(this);
      }
    });

    Handlebars.registerHelper('gt', function(val1, obj2, options){
      if(val1 > obj2) {
        return options.fn(this);
      } else {
        return options.inverse(this);
      }
    });

    Handlebars.registerHelper('log', function(item){
      console.log(item);
    });

    // parse form field
    App.paramsParser = function(params){
      var parsedParams = {}, k, lastParams, m;

      for(k in params){
        lastParams = parsedParams;
        m = k.match(/(\w+)(\[(\w+)]\])*/g);
        do{
          if(m.length > 1){
            lastParams = lastParams[m[0]] = lastParams[m[0]] || {};
          }else{
            lastParams[m[0]] = params[k];
          }
          m.shift();
        }while(m.length);
      }

      return parsedParams;
    };

    // extend jQuery with JSON method
    $.fn.toJSON = function() {
      var hash = {};
      $.each(this.serializeArray(), function() {
        if (this.name.indexOf('[]') !== -1) {
          var key = this.name.replace('[]', '');
          hash[key] = hash[key] || [];
          hash[key].push(this.value);
        } else {
          hash[this.name] = this.value;
        }
      });
      return hash;
    };

    // scroll to element
    $.fn.scrollToSelf = function(opts){
      if(!$(this).offset()){ return; }
      if(!opts){
        opts = {duration: 400, offset: 0, delay: 50};
      }

      $('html, body').delay(opts.delay).animate({
        scrollTop: $(this).offset().top + opts.offset
      }, opts.duration);
    };

    return App;
});
