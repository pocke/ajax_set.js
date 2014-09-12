AjaxSet.js
============

AjaxSet.js is jQuery.ajax() wrapper.


Usage
--------

### AjaxSet.Resources

```javascript
var ajax_blog = new AjaxSet.Resources('blogs');

ajax_blog.index();                        // => $.ajax({url: '/blogs', type: 'GET'})
ajax_blog.show({id: 38});                 // => $.ajax({url: '/blogs/38', type: 'GET'})
ajax_blog.new();                          // => $.ajax({url: '/blogs/new', type: 'GET'})
ajax_blog.create();                       // => $.ajax({url: '/blogs', type: 'POST'})
ajax_blog.edit({id: 38});                 // => $.ajax({url: '/blogs/38/edit', type: 'GET'})
ajax_blog.update({id: 38, foo: 'bar'});   // => $.ajax({url: '/blogs/38', type: 'PUT', data: {foo: 'bar'}})
ajax_blog.destroy({id: 38});              // => $.ajax({url: '/blogs/38', type: 'DELETE'})

ajax_blog.add_member('hoge', 'GET');
ajax_blog.hoge({id: 38})                  // => $.ajax({url: '/blogs/38/hoge', type: 'GET'})

ajax_blog.add_collection('destroy_all', 'DELETE')
ajax_blog.destroy_all();                  // => $.ajax({url: '/blogs/destroy_all', type: 'DELETE'})
```

### AjaxSet.Resource

```javascript
var ajax_blog = new AjaxSet.Resource('blog');

ajax_blog.show();                 // => $.ajax({url: '/blogs', type: 'GET'})
ajax_blog.new();                  // => $.ajax({url: '/blog/new', type: 'GET'})
ajax_blog.create();               // => $.ajax({url: '/blog', type: 'POST'})
ajax_blog.edit();                 // => $.ajax({url: '/blog/edit', type: 'GET'})
ajax_blog.update({ foo: 'bar'});  // => $.ajax({url: '/blog', type: 'PUT', data: {foo: 'bar'}})
ajax_blog.destroy();              // => $.ajax({url: '/blog', type: 'DELETE'})
```



Test
-----------


[![Build Status](https://travis-ci.org/pocke/ajax_set.js.svg?branch=master)](https://travis-ci.org/pocke/ajax_set.js)
[![Coverage Status](https://coveralls.io/repos/pocke/ajax_set.js/badge.png?branch=master)](https://coveralls.io/r/pocke/ajax_set.js?branch=master)


```sh
$ npm install
$ phantomjs node_modules/mocha-phantomjs/lib/mocha-phantomjs.coffee test/index.html
```

or you access test/index.html from browser.
