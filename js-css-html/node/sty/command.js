#!/usr/bin/env node

var command = [];
command.push('ls');
command.push('top');
var filterstring = process.argv[2] || '';
var filteredcommand = command;
filteredcommand = command.filter(
    function( tmp ){
        return( tmp === filterstring );
    }
);
if(filteredcommand.length > 0) {
    console.log('i got command ' + filteredcommand);
}