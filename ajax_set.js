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
    var tmp = this.in_url_params(settings.url, data);
    var ep_url = tmp[0];
    var send_data = tmp[1];

    settings.url = url_base + ep_url;
    settings.data = send_data;

    return $.ajax(settings);
  };

  // return [url, data]
  AjaxSet.Endpoint.prototype.in_url_params = function (url, data) {
    var _data = $.extend(true, {}, data);
    var new_url = url.replace(/:([^\/]+)/g, function (str, p1, offset, s) {
      if (_data[p1]) {
        var res = _data[p1];
        delete _data[p1];
        return res;
      } else {
        return str;
      }
    });
    return [new_url, _data];
  };



  // Rails
  // TODO: :id の文字列を変えられるようにする
  AjaxSet.Resource = function (name) {
    AjaxSet.Base.call(this, name, eps);
  };
  AjaxSet.Resource.prototype = Object.create(AjaxSet.Base);
  AjaxSet.Resource.prototype.constructor = AjaxSet.Resource;


  AjaxSet.Resources = function (name) {
    var eps = [
      new AjaxSet.Endpoint('index',   {url: '/',         type: 'GET'}),
      new AjaxSet.Endpoint('show',    {url: '/:id',      type: 'GET'}),
      new AjaxSet.Endpoint('new',     {                  type: 'GET'}),
      new AjaxSet.Endpoint('create',  {url: '/',         type: 'GET'}),
      new AjaxSet.Endpoint('edit',    {url: '/:id/edit', type: 'GET'}),
      new AjaxSet.Endpoint('update',  {url: '/:id',      type: 'PUT'}),
      new AjaxSet.Endpoint('destroy', {url: '/:id',      type: 'DELETE'}),
    ];

    AjaxSet.Base.call(this, name, eps);
  };
  AjaxSet.Resources.prototype = Object.create(AjaxSet.Base);
  AjaxSet.Resources.prototype.constructor = AjaxSet.Resources;

  return AjaxSet;
})();
