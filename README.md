# QuickNotes

A simple note-taking web app built with HTML, CSS and JavaScript. Add short notes, sort them into categories, search them and delete them. Your notes are saved in your browser, so they are still there when you come back.

## Features

- Add a note with a category: Personal, Work or Study
- Validation: empty notes and notes over 200 characters are rejected with a clear message
- Each note shows its text, category, date and time, and a Delete button
- Live note count ("You have no notes yet.", "You have 1 note.", "You have N notes.")
- Search that ignores upper and lower case
- Notes saved with localStorage
- Bonus: "Clear all" button with a confirmation

## Files

- `index.html` - page structure
- `style.css` - layout, colours and responsive styles
- `script.js` - adding, deleting, searching and saving notes
- `README.md` - this file

## How to run

Open `index.html` in any modern browser. No install or build step is needed.

## What I learned

- Structuring a page with semantic HTML
- Styling with Flexbox and a media query
- Handling form events and updating the page with the DOM
- Saving data with localStorage