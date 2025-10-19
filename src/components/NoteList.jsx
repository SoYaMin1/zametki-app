import NoteItem from './NoteItem'

function NoteList({ notes, onEditNote, onDeleteNote, onToggleComplete }) {
  if (notes.length === 0) {
    return (
      <div className="empty-state">
        <p>Заметок пока нет</p>
      </div>
    )
  }

  return (
    <div className="note-list">
      {notes.map(note => (
        <NoteItem
          key={note.id}
          note={note}
          onEdit={onEditNote}
          onDelete={onDeleteNote}
          onToggleComplete={onToggleComplete}
        />
      ))}
    </div>
  )
}

export default NoteList