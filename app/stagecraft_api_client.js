define([
  'extensions/models/model',
  'controller_map'
],
function (Model, ControllerMap) {
  var StagecraftApiClient = Model.extend({

    controllers: ControllerMap,

    setPath: function (path) {
      this.path = path;
      this.fetch();
    },

    url: function () {
      return this.urlRoot + this.path;
    },

    fetch: function (options) {
      options = _.extend({}, options, {
        validate: true,
        error: _.bind(function(model, xhr, options) {
          this.set('view', this.views['error' + xhr.status] || this.views.error500);
          this.set('errorText', xhr.responseText);
        }, this)
      });
      Model.prototype.fetch.call(this, options);
    },

    parse: function (data) {

      var controller;
      if (data['page-type'] === 'module') {
        controller = this.controllers.modules[data['module-type']];
      } else {
        controller = this.controllers[data['page-type']];
        _.each(data.modules, function (module) {
          module.controller = this.controllers.modules[module['module-type']];
        }, this);
      }

      if (!controller) {
        data.controller = this.controllers.error500;
        this.trigger('unknown', this);
      } else {
        data.controller = controller;
      }
      return data;
    }

  });

  return StagecraftApiClient;
});
