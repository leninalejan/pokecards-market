import { useState, useEffect } from 'react'
import { POKEMON_IDS, getPrice } from '../constants'

export function usePokemon() {
  const [pokemon, setPokemon] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchAll() {
      try {
        const results = await Promise.all(
          POKEMON_IDS.map(id =>
            fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
              .then(r => {
                if (!r.ok) throw new Error(`HTTP ${r.status}`)
                return r.json()
              })
              .then(d => ({
                id: d.id,
                name: d.name,
                image:
                  d.sprites.other?.['official-artwork']?.front_default ||
                  d.sprites.front_default,
                types: d.types.map(t => t.type.name),
                price: getPrice(d.types.map(t => t.type.name)),
                stats: {
                  hp:      d.stats[0].base_stat,
                  attack:  d.stats[1].base_stat,
                  defense: d.stats[2].base_stat,
                  spatk:   d.stats[3].base_stat,
                  spdef:   d.stats[4].base_stat,
                  speed:   d.stats[5].base_stat,
                },
                height: d.height,
                weight: d.weight,
              }))
              .catch(() => null)
          )
        )
        setPokemon(results.filter(Boolean))
      } catch (e) {
        setError('No se pudo conectar con la PokéAPI.')
      } finally {
        setLoading(false)
      }
    }

    fetchAll()
  }, [])

  return { pokemon, loading, error }
}
