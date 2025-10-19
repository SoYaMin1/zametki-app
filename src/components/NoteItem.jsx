import { useState } from 'react'

function NoteItem({ note, onEdit, onDelete, onToggleComplete }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(note.title)
  const [editContent, setEditContent] = useState(note.content)
  const [editDueDate, setEditDueDate] = useState(note.dueDate || '')

  const handleSave = () => {
    onEdit(note.id, {
      title: editTitle,
      content: editContent,
      dueDate: editDueDate || null
    })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditTitle(note.title)
    setEditContent(note.content)
    setEditDueDate(note.dueDate || '')
    setIsEditing(false)
  }

  const formatDate = (dateString) => {
    if (!dateString) return null
    return new Date(dateString).toLocaleString('ru-RU')
  }

  return (
    <div className={`note-item ${note.completed ? 'completed' : ''}`}>
      {isEditing ? (
        <div className="note-edit">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="form-input"
          />
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="form-textarea"
          />
          <input
            type="datetime-local"
            value={editDueDate}
            onChange={(e) => setEditDueDate(e.target.value)}
            className="form-input"
          />
          <div className="edit-actions">
            <button onClick={handleSave} className="save-btn">Сохранить</button>
            <button onClick={handleCancel} className="cancel-btn">Отмена</button>
          </div>
        </div>
      ) : (
        <>
          <div className="note-header">
            <h3>{note.title}</h3>
            <div className="note-actions">
              <button 
                onClick={() => onToggleComplete(note.id)}
                className={`complete-btn ${note.completed ? 'completed' : ''}`}
              >
                {note.completed ? '✓' : '○'}
              </button>
              <button 
                onClick={() => setIsEditing(true)}
                className="edit-btn"
              >
                ✎
              </button>
              <button 
                onClick={() => onDelete(note.id)}
                className="delete-btn"
              >
                ×
              </button>
            </div>
          </div>
          <p className="note-content">{note.content}</p>
          <div className="note-footer">
            {note.dueDate && (
              <span className="due-date">
                📅 {formatDate(note.dueDate)}
              </span>
            )}
            <span className="created-date">
              Создано: {formatDate(note.createdAt)}
            </span>
          </div>
        </>
      )}
    </div>
  )
}

export default NoteItem