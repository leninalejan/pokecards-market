import { useState } from 'react'

const KEY = 'pokecards_owned'

function load() {
  try {
    return new Set(JSON.parse(localStorage.getItem(KEY) || '[]'))
  } catch {
    return new Set()
  }
}

function save(set) {
  localStorage.setItem(KEY, JSON.stringify([...set]))
}

export function useOwned() {
  const [owned, setOwned] = useState(load)

  function addOwned(id) {
    setOwned(prev => {
      const next = new Set(prev)
      next.add(id)
      save(next)
      return next
    })
  }

  return { owned, addOwned }
}
