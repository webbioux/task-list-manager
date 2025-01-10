import { useState } from "react"

const StatusBadge = ({ status, onChange, isListExpanded }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleSelect = (newStatus) => {
    onChange(newStatus)
    setIsOpen(false)
  }

  return (
    <div className="status-badge" role="region">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={`Task status: ${status}`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        tabIndex={isListExpanded ? "0" : "-1"}
      >
        {status}
      </button>

      {isOpen && (
        <div
          role="listbox"
          aria-label="Select task status"
        >
          {["todo", "doing", "done"].map(option => (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              role="option"
              aria-selected={status === option}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default StatusBadge
