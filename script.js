// add and display notes
const form = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const categorySelect = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");

let notes = [];

//  Build one note card 
function createNoteCard(note) {
  const li = document.createElement("li");
  li.className = "note category-" + note.category;

  const info = document.createElement("div");

  const text = document.createElement("p");
  text.className = "note-text";
  text.textContent = note.text; // textContent keeps user text safe

  const meta = document.createElement("p");
  meta.className = "note-meta";
  const label = document.createElement("span");
  label.className = "note-label";
  label.textContent = note.category.charAt(0).toUpperCase() + note.category.slice(1);
  meta.append(label, " - " + note.createdAt);

  info.append(text, meta);

  const del = document.createElement("button");
  del.type = "button";
  del.className = "delete-btn";
  del.textContent = "Delete";
  del.dataset.id = note.id;

  li.append(info, del);
  return li;
}

//  Draw all notes on the page 
function render() {
  notesList.replaceChildren();
  notes.forEach(function (note) {
    notesList.append(createNoteCard(note));
  });
}

//  Add a note 
form.addEventListener("submit", function (event) {
  event.preventDefault();
  const text = noteInput.value.trim();

  notes.push({
    id: Date.now(),
    text: text,
    category: categorySelect.value,
    createdAt: new Date().toLocaleString()
  });

  noteInput.value = "";
  render();
});

render();