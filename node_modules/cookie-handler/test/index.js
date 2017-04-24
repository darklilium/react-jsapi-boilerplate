var test = require('tape');
var cookies = require('../src/cookie');

function setup(key, val){
  cookies.set(key, val);
}

function teardown(){
  var cookieNames = [
    'greeting', 'number', 'string',
    'boolean', 'array', 'object'
  ];

  cookieNames.forEach(function(cookieName){
    cookies.remove(cookieName);
  });
}

function message(expected, actual){
  return 'it should return ' + expected + ' but it returns ' + actual;
}

test('it should create a cookie with key name greeting', function(assert){
  setup('greeting', 'hello');

  var actual = document.cookie.indexOf('greeting');
  var expected = -1;

  assert.notEqual(actual, expected, 'greeting actual code marked position : ' + actual);
  assert.end();

  teardown();
});

test('it should get a greeting value', function(assert){
  setup('greeting', 'bonjour');

  var actual = cookies.get('greeting');
  var expected = 'bonjour';

  assert.equal(actual, expected, message(expected, actual));
  assert.end();

  teardown();
});

test('it should get a greeting value, then get null', function(assert){
  setup('greeting', 'hola');

  var actual = cookies.get('greeting', true);
  var expected = 'hola';

  assert.equal(actual, expected, message(expected, actual));

  actual = cookies.get('greeting');
  expected = null;

  assert.equal(actual, expected, message(expected, actual));
  assert.end();

  teardown();
});

test('it should get null when a inexistent key is given', function(assert){
  var actual = cookies.get('playlist');
  var expected = null;

  assert.equal(actual, expected, message(expected, actual));
  assert.end();
});

test('it should remove a value when key is given', function(assert){
  setup('greeting', 'ciao');

  cookies.remove('greeting');

  var actual = cookies.get('greeting');
  var expected = null;

  assert.equal(actual, expected, message(expected, actual));
  assert.end();

  teardown();
});

test('it should add a number and return a number', function(assert){
  setup('number', 765);

  var actual = cookies.get('number');
  var expected = 765;

  assert.equal(actual, expected, message(expected, actual));
  assert.end();

  teardown();
});

test('it should add a string and return a string', function(assert){
  setup('string', 'javascript');

  var actual = cookies.get('string');
  var expected = 'javascript';

  assert.equal(actual, expected, message(expected, actual));
  assert.end();

  teardown();
});

test('it should add a boolean and return a boolean', function(assert){
  setup('boolean', true);

  var actual = cookies.get('boolean');
  var expected = true;

  assert.equal(actual, expected, message(expected, actual));
  assert.end();

  teardown();
});

test('it should add an array and return an array', function(assert){
  setup('array', [1, 2, 3, 4, 5]);

  var actual = cookies.get('array');
  var expected = [1, 2, 3, 4 ,5];

  assert.deepEqual(actual, expected, message(expected, actual));
  assert.end();

  teardown();
});

test('it should add an object and return an object', function(assert){
  setup('object', {
    name: 'john',
    gender: 'male',
    favouriteColors: ['green', 'blue', 'white']
  });

  var actual = cookies.get('object');
  var expected = {
    name: 'john',
    gender: 'male',
    favouriteColors: ['green', 'blue', 'white']
  };

  assert.deepEqual(actual, expected, message(expected, actual));
  assert.end();

  teardown();
});

//just to make sure that browser-run closes correctly
window.close();
