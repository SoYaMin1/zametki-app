import { useState, useEffect } from 'react'
import './App.css'
import NoteForm from './components/NoteForm'
import NoteList from './components/NoteList'
import Calendar from './components/Calendar'

function App() {
  const [notes, setNotes] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [currentView, setCurrentView] = useState('notes')
  useEffect(() => {
    const savedNotes = localStorage.getItem('notes')
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes))
  }, [notes])

  const addNote = (note) => {
    const newNote = {
      id: Date.now().toString(),
      title: note.title,
      content: note.content,
      completed: false,
      createdAt: new Date().toISOString(),
      dueDate: note.dueDate || null
    }
    setNotes([...notes, newNote])
  }

  const editNote = (id, updatedNote) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, ...updatedNote } : note
    ))
  }

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id))
  }

  const toggleComplete = (id) => {
    setNotes(notes.map(note =>
      note.id === id ? { ...note, completed: !note.completed } : note
    ))
  }

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="app">
      <header className="app-header">
        <h1>Мои Заметки</h1>
        <div className="view-toggle">
          <button 
            className={currentView === 'notes' ? 'active' : ''}
            onClick={() => setCurrentView('notes')}
          >
            Заметки
          </button>
          <button 
            className={currentView === 'calendar' ? 'active' : ''}
            onClick={() => setCurrentView('calendar')}
          >
            Календарь
          </button>
        </div>
      </header>

      {currentView === 'notes' ? (
        <div className="notes-view">
          <div className="search-container">
            <input
              type="text"
              placeholder="Поиск заметок..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <NoteForm onAddNote={addNote} />

          <NoteList
            notes={filteredNotes}
            onEditNote={editNote}
            onDeleteNote={deleteNote}
            onToggleComplete={toggleComplete}
          />
        </div>
      ) : (
        <Calendar notes={notes} />
      )}
    </div>
  )
}

export default App