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
    this.settings = settings || {};
    if (typeof this.settings.url === 'undefined') {
      this.settings.url = '/' + this.name;
    }
  };

  // /url_base/this.name に対してajaxを発行する。
  AjaxSet.Endpoint.prototype.call = function (url_base, data) {
    var settings = $.extend(true, {}, this.settings);
    settings.url = url_base + settings.url;
    settings.data = data;

    return $.ajax(settings);
  };

  // return [url, data]
  AjaxSet.Endpoint.prototype.in_url_params = function (url, data) {
    var new_url = url.replace(/:(.+)\//g, function (str, p1, offset, s) {
      if (data[p1]) {
        var res = data[p1] + '/';
        delete data[p1];
        return res;
      } else {
        return str;
      }
    });
    return [new_url, data];
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
