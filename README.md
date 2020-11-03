# This project is deprecated. Use the [original pandoc-filter][pandoc-filter-node] >=v2 instead

## About

Node.js port of the Python [pandocfilters][] for filtering with [Pandoc][]

## Install

```bash
npm install -g pandoc-filter-promisified
```

## Example

```javascript
#!/usr/bin/env node

// Pandoc filter to convert all text to uppercase

var pandoc = require('pandoc-filter-promisified');
var Str = pandoc.Str;

async function action(elt,format,meta) {
	if (elt.t === 'Str') return Str(elt.c.toUpperCase());
}

pandoc.stdio(action);
```

## Compatibility Note

`v0.1.6` is required for pandoc versions after `1.17.2` to support the new JSON
format. See [this issue](https://github.com/mvhenderson/pandoc-filter-node/issues/5) for details.

## Credits

Thanks to [John MacFarlane](https://github.com/jgm) for Pandoc.

Thanks to [Mike Henderson](https://github.com/mvhenderson) for the [original
version of pandoc-filter for Node][pandoc-filter-node].

## License

MIT


[Pandoc]: http://johnmacfarlane.net/pandoc
[pandocfilters]: https://github.com/jgm/pandocfilters
[pandoc-filter-node]: https://github.com/mvhenderson/pandoc-filter-node
