const argv = require('yargs').argv;
const notes = require('./notes');

const action = argv._[0];
const title = argv.title;
const body = argv.body;

switch (action) {
  case 'add': notes.add(title, body); break;
  case 'list': notes.list(); break;
  case 'read': notes.read(title); break;
  case 'remove': notes.remove(title); break;
  default: console.log('Command not recognized');
}