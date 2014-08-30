mocha.setup('bdd');
var assert = chai.assert;
var expect = chai.expect;

describe('AjaxSet', function () {
  describe('Base', function () {
    it('should assign __name', function () {
      var name = 'foo';
      var base = new AjaxSet.Base(name, []);
      expect(base.__name).to.equal(name);
    });
  });
});

(function () {
  mocha.run();
})();
