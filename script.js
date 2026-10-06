const form = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const categorySelect = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");
const errorMessage = document.querySelector("#error-message");
const noteCount = document.querySelector("#note-count");
const searchInput = document.querySelector("#search-input");
const searchForm = document.querySelector("#search-form");

const STORAGE_KEY = "quicknotes";

//Load saved notes 
function loadNotes(){
  try{
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  }catch (e){
    return [];
  }
}

function saveNotes(){
  try{
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }catch (e){

  }
}
let notes = loadNotes();

//Count text
function countText(){
  if(notes.length === 0) return "You have no notes yet.";
  if (notes.length === 1) return "You have  1  note.";
  return `You have ${notes.length} notes.`;
}

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
  const query = searchInput.value.trim().toLowerCase();
  const visible = notes.filter(function (note) {
    return note.text.toLowerCase().includes(query) ||
      note.category.toLowerCase().includes(query);
  });

  notesList.replaceChildren();
  noteCount.textContent = countText();

  if (notes.length > 0 && visible.length === 0) {
    const li = document.createElement("li");
    li.className = "empty-message";
    li.textContent = "No notes match your search.";
    notesList.append(li);
  } else {
    visible.forEach(function (note) {
      notesList.append(createNoteCard(note));
    });
  }
}

//  Add a note 
form.addEventListener("submit", function (event) {
  event.preventDefault();
  const text = noteInput.value.trim();

  if(text === ""){
    errorMessage.textContent = "Please Enter a note first.";
    return;
  }
  if(text.length > 200){
    errorMessage.textContent = "Notes must be 200 characters or less.";
    return;
  }

  notes.push({
    id: Date.now(),
    text: text,
    category: categorySelect.value,
    createdAt: new Date().toLocaleString()
  });

  errorMessage.textContent = "";
  noteInput.value = "";
  render();
});

//Delete note
notesList.addEventListener("click", function(event){
  const btn = event.target.closest(".delete-btn");
  if(!btn) return;

  const id = Number(btn.dataset.id);
  notes = notes.filter(function(note) {
    return note.id !== id;
  });
  saveNotes();
  render();
});

searchInput.addEventListener("input", render);
searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  render();
});

render();