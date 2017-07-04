#!/usr/bin/env node

var hello = require('../app.js').hello,
    arg = process.argv[2] || '';
    
hello(arg);