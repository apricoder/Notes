const notes = require('./notes');
const yargs = require('yargs');

const titleDescription = {describe: 'Title of note', demand: true, alias: 't'};
const bodyDescription = {describe: 'Body of note', demand: true, alias: 'b'};
const argv = yargs
  .command('add', 'Adds a new note', {title: titleDescription, body: bodyDescription})
  .command('list', 'Lists all notes')
  .command('read', 'Gets a note by title', {title: titleDescription})
  .command('remove', 'Removes a note with given title', {title: titleDescription})
  .help()
  .argv;

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