import { useState } from 'react'

function Calendar({ notes }) {
  const [currentDate, setCurrentDate] = useState(new Date())

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const formatDate = (date) => {
    return date.toISOString().split('T')[0]
  }

  const getNotesForDate = (date) => {
    const dateStr = formatDate(date)
    return notes.filter(note => {
      if (!note.dueDate) return false
      const noteDate = new Date(note.dueDate).toISOString().split('T')[0]
      return noteDate === dateStr
    })
  }

  const navigateMonth = (direction) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1))
  }

  const today = new Date()
  const daysInMonth = getDaysInMonth(currentDate)
  const firstDayOfMonth = getFirstDayOfMonth(currentDate)
  const monthNames = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ]

  const weekDays = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']

  const days = []
  const prevMonthDays = getDaysInMonth(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  
  for (let i = prevMonthDays - firstDayOfMonth + 1; i <= prevMonthDays; i++) {
    days.push({
      date: new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, i),
      isCurrentMonth: false
    })
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), i),
      isCurrentMonth: true
    })
  }

  const totalCells = 42 
  const nextMonthDays = totalCells - days.length
  for (let i = 1; i <= nextMonthDays; i++) {
    days.push({
      date: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, i),
      isCurrentMonth: false
    })
  }

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={() => navigateMonth(-1)} className="nav-btn">‹</button>
        <h2>
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <button onClick={() => navigateMonth(1)} className="nav-btn">›</button>
      </div>

      <div className="calendar-grid">
        {weekDays.map(day => (
          <div key={day} className="calendar-weekday">{day}</div>
        ))}
        
        {days.map((day, index) => {
          const dayNotes = getNotesForDate(day.date)
          const isToday = formatDate(day.date) === formatDate(today)
          
          return (
            <div
              key={index}
              className={`calendar-day ${day.isCurrentMonth ? 'current-month' : 'other-month'} ${isToday ? 'today' : ''}`}
            >
              <div className="day-number">{day.date.getDate()}</div>
              <div className="day-events">
                {dayNotes.map(note => (
                  <div
                    key={note.id}
                    className={`calendar-event ${note.completed ? 'completed' : ''}`}
                    title={note.title}
                  >
                    {note.title}
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Calendar