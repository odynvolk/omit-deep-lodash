# omit-deep-lodash
> Omit object key/values recursively

Sometimes we need to omit things from an object recursively. [omit-deep](https://github.com/jonschlinkert/omit-deep) did this
in a great manner but hadn't been updated for quite some time and didn't really work with Arrays. omit-deep-lodash solves
this and uses only lodash as external dependency.

## Install

Install with [npm](https://www.npmjs.com/)

```sh
$ npm i omit-deep-lodash --save
```

## Usage

```js
const omitDeep = require("omit-deep-lodash");

omitDeep({a: "a", b: "b", c: {b: "b", d: {b: "b", f: "f"}}}, "b");
//=> {a: "a", c: {d: {f: "f"}}}
```

## Related projects

* [omit-deep](https://github.com/jonschlinkert/omit-deep): The original project for this. [more](https://github.com/jonschlinkert/omit-deep)
* [lodash](https://github.com/lodash/lodash): The only external dependency. [more](https://github.com/lodash/lodash)

## Running tests

Install dev dependencies:

```sh
$ npm i -d && npm test
```

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/odynvolk/omit-deep-lodash/issues/new)

## Author

+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [github/odynvolk](https://github.com/odynvolk)
+ [github.com/mickeek](https://github.com/mickeek)

## License

Released under the MIT license.

