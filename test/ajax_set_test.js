mocha.setup('bdd');
var assert = chai.assert;
var expect = chai.expect;



describe('AjaxSet', function () {
  describe('Base', function () {
    describe('new', function () {
      it('should assign __name', function () {
        var name = 'foo';
        var base = new AjaxSet.Base(name, []);

        expect(base.__name).to.equal(name);
      });

      it('should set endpoint from arg', function () {
        var ep_name = 'bar';
        var ep = new AjaxSet.Endpoint(ep_name);
        var base = new AjaxSet.Base('foo', [ep]);

        expect(base[ep_name]).to.a('function');
      });
    });
  });


  describe('Endpoint', function () {
    describe('new', function () {
      it('should assign name', function () {
        var name = 'hoge';
        var ep = new AjaxSet.Endpoint(name);

        expect(ep.name).to.eq(name);
      });

      context('when not receive settings', function () {
        it('should assign url haved object to settings', function () {
          var name = 'foo';
          var ep = new AjaxSet.Endpoint(name);
          expect(ep.settings).to.deep.eq({url: '/' + name});
        });
      });

      context('when receive settings', function () {
        it('should assign settings', function () {
          var settings = {url: '/foo'};
          var ep = new AjaxSet.Endpoint(name, settings);
          expect(ep.settings).to.deep.eq(settings);
        });
      });
    });

    describe('.call', function () {
      it('should call $.ajax', function () {
        var base = '/hoge';
        var eq = new AjaxSet.Endpoint('foo');
        var set = $.extend({}, eq.settings);
        var data = {};
        set.data = data;
        set.url = base + set.url;

        var mock = sinon.mock(jQuery).expects('ajax');
        mock.once().withArgs(sinon.match(set));


        eq.call(base, {});
        expect(mock.verify());
      });
    });

    describe('.in_url_params', function () {
      context('"/users/:id/edit"', function () {
        var eq = new AjaxSet.Endpoint('edit', {url: ':id/edit'});
        var url = eq.settings.url;
        var base = '/users';
        var data = {id: 42, hoge: 'foo'};

        it('should return "42/edit"', function () {
          var new_url = eq.in_url_params(url, data)[0];
          expect(new_url).to.equal('42/edit');
        });

        it('should return data removed id', function () {
          var new_data = eq.in_url_params(url, data)[1];
          expect(new_data).to.deep.eq({hoge: 'foo'});
        });
      });
    });
  });
});




(function () {
  if (window.mochaPhantomJS) {
    mochaPhantomJS.run();
  } else {
    mocha.run();
  }
})();
