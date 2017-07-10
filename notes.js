const fs = require('fs');
const _ = require('lodash');
const sanitize = require('sanitize-filename');

const add = (title, body) => {
  const note = {title, body};
  return getNotes()
    .then(notes => notes.concat(note))
    .then(notes => rewriteNotes(notes))
    .then(notes => console.log(`Added your ${notes.length} note:` + `\n\n` + formatNote(note)))
    .catch(err => {
      throw new Error(`Can't add message`, err);
    });
};

const getNotes = () => new Promise((resolve, reject) =>
  fs.readFile('notes.json', 'utf-8', (err, notesJson) => {
    if (err) resolve(emptyNotesListBecause(`Can't read notes from file:`, err.message));
    else resolve(parseNotes(notesJson));
  })
);

const parseNotes = (notesJson) => {
  try {
    return JSON.parse(notesJson);
  } catch (err) {
    return emptyNotesListBecause(`Can't parse notes:`, err.message);
  }
};

const rewriteNotes = (notes) => new Promise((resolve, reject) => {
  fs.writeFile('notes.json', JSON.stringify(notes), (err) => {
    if (err) reject(`Can't rewrite notes`, err);
    else getNotes()
      .then(notes => resolve(notes))
      .catch(err => reject(err));
  });
});

const emptyNotesListBecause = (...causes) => {
  console.warn(`Returning empty notes list:`, ...causes);
  return [];
};

const formatNote = (note) => note.title + '\n' + note.body;

const read = (title) => getNotes()
  .then(notes => notes.find(n => n.title === title))
  .then(note => note ? formatNote(note) : `Can't find note with title: ${title}`)
  .then(result => console.log(result))
  .catch(err => {
    throw new Error(`Can't read message`, err);
  });

const list = () => getNotes()
  .then(notes => notes.reduce((acc, next, index) => acc + `${index + 1}: ${next.title}` + `\n`, ''))
  .then(result => console.log(result));

const remove = (title) => {
  return getNotes()
    .then(notes => notes.filter(n => n.title !== title))
    .then(filtered => rewriteNotes(filtered))
    .catch(err => {
      throw new Error(`Can't remove message`, err);
    });
};

module.exports = {
  add, read, list, remove
};


