window.onload = function () {
    const saveBtn = document.getElementById('save_button');
    const noteInput = document.getElementById('note_writing');
    const noteList = document.getElementById('note_list');

    let editingIndex = null; // Keep track of the note being edited

    loadNotes();

    saveBtn.addEventListener('click', () => {
        const text = noteInput.value.trim();
        if (!text) return;

        const notes = getNotes();

        if (editingIndex === null) {
            // Not editing, just add new
            notes.push(text);
        } else {
            // Editing: update the note
            notes[editingIndex] = text;
            editingIndex = null; // Reset
        }

        saveNotes(notes);
        noteInput.value = '';
        renderNotes(notes);
    });

    function getNotes() {
        return JSON.parse(localStorage.getItem('notes')) || [];
    }

    function saveNotes(notes) {
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    function loadNotes() {
        renderNotes(getNotes());
    }

    function renderNotes(notes) {
        noteList.innerHTML = '';
        notes.forEach((note, index) => {
            const li = document.createElement('li');
            li.textContent = note;

            const delBtn = document.createElement('button');
            delBtn.textContent = 'Delete';
            delBtn.style.marginLeft = '10px';
            delBtn.addEventListener('click', () => {
                notes.splice(index, 1);
                saveNotes(notes);
                renderNotes(notes);
            });

            const editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            editBtn.style.marginLeft = '5px';
            editBtn.addEventListener('click', () => {
                noteInput.value = note;
                editingIndex = index;
            });

            li.appendChild(editBtn);
            li.appendChild(delBtn);
            noteList.appendChild(li);
        });
    }


    // DARK MODE TOGGLE
    const darkToggle = document.getElementById('dark_toggle');

    // Check system preference
    const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Load saved theme or fall back to system preference
    const savedPref = localStorage.getItem('darkMode');
    const useDark = savedPref !== null ? savedPref === 'true' : systemPrefersDark;

    if (useDark) {
        document.body.classList.add('dark');
        darkToggle.checked = true;
    }

    darkToggle.addEventListener('change', () => {
        document.body.classList.toggle('dark');
        localStorage.setItem('darkMode', darkToggle.checked);
    });


};
