#!/usr/bin/env node

// https://github.com/jgm/pandocfilters/blob/master/examples/caps.py
//
// Pandoc filter to convert all text to uppercase
'use strict';

var pandoc = require('../../../index');
var Str = pandoc.Str;

function action(elt,format,meta) {
	if (elt.t === 'Str') return Str(elt.c.toUpperCase());
}

pandoc.stdio(action);
