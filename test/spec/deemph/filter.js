#!/usr/bin/env node

// https://github.com/jgm/pandocfilters/blob/master/examples/deemph.py
//
// Pandoc filter that causes emphasized text to be displayed
// in ALL CAPS.
'use strict';

var pandoc = require('../../../index');

function caps(elt,format,meta) {
	if (elt.t === 'Str') return pandoc.Str(elt.c.toUpperCase());
}

function action(elt,format,meta) {
	if (elt.t === 'Emph') {
		return pandoc.walk(elt.c,caps,format,meta);
	}
}

pandoc.stdio(action);
