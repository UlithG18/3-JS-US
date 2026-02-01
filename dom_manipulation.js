const textInput = document.getElementById("note-content");
const notesForm = document.getElementById("notes-form");
const notesList = document.getElementById("notes-list");

console.log(textInput, notesForm, notesList);

let notes = getNotes();
renderNotes(notes);
console.log(`Loaded ${notes.length} notes`);

function addNote() {
    const noteContent = textInput.value.trim();

    if (noteContent === "") {
        alert("You need to type something");
        return;
    }

    notes.push(noteContent);
    saveNotes(notes);
    renderNotes(notes);

    textInput.value = "";
    textInput.focus();

    console.log("A note was added");
}

function renderNotes(notes) {
    notesList.innerHTML = "";

    notes.forEach((note, index) => {
        const li = document.createElement("li");
        li.className = "bg-indigo-300 border border-2 p-3 mx-10 flex flex-col text-center";
        li.textContent = note;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className =
            "inline-flex text-white bg-red-500 border-0 py-2 px-6 hover:bg-red-600 rounded text-lg mx-auto";

        deleteBtn.addEventListener("click", () => {
            notesList.removeChild(li);
            notes.splice(index, 1);
            saveNotes(notes);

            console.log("A note was removed");
        });

        li.appendChild(deleteBtn);
        notesList.appendChild(li);
    });
}

function getNotes() {
    const notes = localStorage.getItem("notes");
    return notes ? JSON.parse(notes) : [];
}

function saveNotes(notes) {
    localStorage.setItem("notes", JSON.stringify(notes));
}

notesForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addNote();
});
