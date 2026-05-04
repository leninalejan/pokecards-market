// IDs de los 30 pokemon a cargar
export const POKEMON_IDS = [
  1, 4, 7, 25, 39, 52, 63, 66, 74, 79,
  92, 94, 104, 113, 116, 131, 132, 133, 143, 147,
  152, 155, 158, 175, 196, 197, 212, 229, 248, 249
]

// Precio base por tipo
export const TYPE_PRICES = {
  dragon:   9.99,
  psychic:  8.49,
  ghost:    7.99,
  dark:     7.49,
  fire:     6.99,
  fairy:    6.99,
  water:    5.99,
  steel:    5.99,
  ice:      6.49,
  electric: 5.49,
  flying:   4.99,
  fighting: 4.99,
  grass:    4.49,
  poison:   4.49,
  rock:     3.99,
  ground:   3.49,
  bug:      2.99,
  normal:   2.49,
}

export function getPrice(types) {
  let max = 2.49
  types.forEach(t => {
    if (TYPE_PRICES[t] > max) max = TYPE_PRICES[t]
  })
  return max.toFixed(2)
}

// Tu PayPal Sandbox Client ID 
export const PAYPAL_CLIENT_ID = 'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4fYMSG7JXTJ9N3WXID1jHkP-3MNYI4Pl17BKkCVoGqEb1M'
