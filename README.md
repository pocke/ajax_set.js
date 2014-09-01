AjaxSet.js
============

AjaxSet.js is jQuery.ajax() wrapper.


Usage
--------

```javascript
var ajax_blog = new AjaxSet.Resources('blogs');

ajax_blog.index();                        // => $.ajax({url: '/blogs', type: 'GET'})
ajax_blog.show({id: 38});                 // => $.ajax({url: '/blogs/38', type: 'GET'})
ajax_blog.new();                          // => $.ajax({url: '/blogs/new', type: 'GET'})
ajax_blog.create();                       // => $.ajax({url: '/blog', type: 'POST'})
ajax_blog.edit({id: 38});                 // => $.ajax({url: '/blogs/38/edit', type: 'GET'})
ajax_blog.update({id: 38, foo: 'bar'});   // => $.ajax({url: '/blog/38', type: 'PUT', data: {foo: 'bar'}})
ajax_blog.destroy({id: 38});              // => $.ajax({url: '/blog/38', type: 'DELETE'})
```

and more...(Read source code!)


For Ruby on Rails
---------------

TODO


Test
-----------


[![Build Status](https://travis-ci.org/pocke/ajax_set.svg)](https://travis-ci.org/pocke/ajax_set)
[![Coverage Status](https://coveralls.io/repos/pocke/ajax_set/badge.png?branch=master)](https://coveralls.io/r/pocke/ajax_set?branch=master)



```sh
$ npm install
$ phantomjs node_modules/mocha-phantomjs/lib/mocha-phantomjs.coffee test/index.html
```

or you access test/index.html from browser.
