var AjaxSet = (function () {
  var AjaxSet = {};


  /*  -------------------------------------------------------------------
   * URLのベースの情報と、エンドポイントの一覧を持つ。
   */
  AjaxSet.Base = function (name, endpoints) {
    this.__name = name;

    endpoints.forEach(function (ep) {
      this[ep.name] = function (data) {
        return ep.call(this.__name, data);
      };
    }, this);
  };


  /* -------------------------------------------------------------------
   * urlのbaseの情報は持たない。
   */
  AjaxSet.Endpoint = function (name, settings) {
    this.name = name;
    this.settings = settings;
  };

  // /url_base/this.name に対してajaxを発行する。
  AjaxSet.Endpoint.prototype.call = function (url_base, data) {
    var settings = $.extend(true, {}, this.settings);
    settings.url = url_base + '/' + settings.url;
    $.extend(settings.data, data);

    return $.ajax(settings);
  };



  // Rails
  AjaxSet.Resource = function (name) {
    
  };
  AjaxSet.Resource.prototype = Object.create(AjaxSet.Base);
  AjaxSet.Resource.prototype.constructor = AjaxSet.Resource;


  AjaxSet.Resources = function (name) {
    
  };
  AjaxSet.Resources.prototype = Object.create(AjaxSet.Base);
  AjaxSet.Resources.prototype.constructor = AjaxSet.Resources;

  return AjaxSet;
})();
