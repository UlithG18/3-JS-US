// DOM element references
const textInput = document.getElementById("note-content");
const notesForm = document.getElementById("notes-form");
const notesList = document.getElementById("notes-list");

// Confirm DOM elements are loaded
console.log(textInput, notesForm, notesList);

// Load notes from localStorage
let notes = getNotes();

// Render stored notes on page load
renderNotes(notes);
console.log(notes.length);

// Adds a new note to the list
function addNote() {
    // Remove leading/trailing spaces
    const noteContent = textInput.value.trim();

    // Prevent empty notes
    if (noteContent === "") {
        alert("You need to type something");
        return;
    }

    // Store note in memory and persistence
    notes.push(noteContent);
    saveNotes(notes);

    // Update UI
    renderNotes(notes);

    // Reset input state
    textInput.value = "";
    textInput.focus();

    console.log("A note was added");
}

// Renders all notes in the DOM
function renderNotes(notes) {
    // Clear previous content
    notesList.innerHTML = "";

    notes.forEach((note, index) => {
        // Create note container
        const li = document.createElement("li");
        li.className = "bg-indigo-300 border border-2 p-3 mx-10 flex flex-col text-center";
        li.textContent = note;

        // Create delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className =
            "inline-flex text-white bg-red-500 border-0 py-2 px-6 hover:bg-red-600 rounded text-lg mx-auto";

        // Handle note deletion
        deleteBtn.addEventListener("click", () => {
            notesList.removeChild(li);
            notes.splice(index, 1);
            saveNotes(notes);

            console.log("A note was removed");
        });

        // Append button to note
        li.appendChild(deleteBtn);

        // Append note to list
        notesList.appendChild(li);
    });
}

// Retrieves notes from localStorage
function getNotes() {
    const notes = localStorage.getItem("notes");
    return notes ? JSON.parse(notes) : [];
}

// Saves notes on localStorage
function saveNotes(notes) {
    localStorage.setItem("notes", JSON.stringify(notes));
}

// Handle form submission
notesForm.addEventListener("submit", (e) => {
    // Prevent page reload
    e.preventDefault();
    addNote();
});
