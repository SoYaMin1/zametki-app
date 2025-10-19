import { useState } from 'react'

function NoteForm({ onAddNote }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (title.trim() && content.trim()) {
      onAddNote({
        title: title.trim(),
        content: content.trim(),
        dueDate: dueDate || null
      })
      setTitle('')
      setContent('')
      setDueDate('')
    }
  }

  return (
    <div className="note-form-container">
      <button 
        className="toggle-form-btn"
        onClick={() => setIsEditing(!isEditing)}
      >
        {isEditing ? '✕' : '+ Новая заметка'}
      </button>

      {isEditing && (
        <form onSubmit={handleSubmit} className="note-form">
          <input
            type="text"
            placeholder="Заголовок"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-input"
            required
          />
          <textarea
            placeholder="Содержание заметки"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="form-textarea"
            required
          />
          <div className="form-row">
            <input
              type="datetime-local"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="form-input"
            />
            <button type="submit" className="submit-btn">
              Сохранить
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default NoteForm