import { useState } from 'react'

export function useToast() {
  const [toasts, setToasts] = useState([])

  function addToast(msg, type = 'success', duration = 4000) {
    const id = Date.now()
    setToasts(p => [...p, { id, msg, type }])
    setTimeout(() => {
      setToasts(p => p.filter(t => t.id !== id))
    }, duration)
  }

  return { toasts, addToast }
}
