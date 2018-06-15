#!/usr/bin/env node

// same as caps test, but using updated JSON format
'use strict';

var pandoc = require('../../../index');
var Str = pandoc.Str;

function action(elt,format,meta) {
	if (elt.t === 'Str') return Str(elt.c.toUpperCase());
}

pandoc.stdio(action);
