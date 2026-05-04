import { useState } from 'react'
import Header from './components/Header'
import MarketPage from './components/MarketPage'
import MyCardsPage from './components/MyCardsPage'
import BuyModal from './components/BuyModal'
import Toast from './components/Toast'
import Loader from './components/Loader'
import { usePokemon } from './hooks/usePokemon'
import { useOwned } from './hooks/useOwned'
import { useToast } from './hooks/useToast'

export default function App() {
  const { pokemon, loading, error } = usePokemon()
  const { owned, addOwned } = useOwned()
  const { toasts, addToast } = useToast()

  const [tab, setTab] = useState('market')
  const [buying, setBuying] = useState(null)  // pokemon seleccionado para comprar

  function handleSuccess(poke, txnId) {
    addOwned(poke.id)
    setBuying(null)
    addToast(
      `"${poke.name}" desbloqueada correctamente. TXN: ${txnId.slice(0, 14)}...`,
      'success'
    )
  }

  function handleError(msg) {
    setBuying(null)
    addToast(msg, 'error')
  }

  return (
    <>
      <Header
        tab={tab}
        setTab={setTab}
        ownedCount={owned.size}
      />

      {error && (
        <div style={{
          textAlign: 'center',
          padding: '4rem 2rem',
          color: 'var(--error)',
          fontFamily: "'Space Mono', monospace",
          fontSize: '0.85rem',
        }}>
          ⚠ {error}
        </div>
      )}

      {!error && (
        <>
          {tab === 'market' ? (
            <>
              {loading
                ? <Loader />
                : (
                  <MarketPage
                    pokemon={pokemon}
                    owned={owned}
                    onBuy={setBuying}
                  />
                )
              }
            </>
          ) : (
            <MyCardsPage owned={owned} pokemon={pokemon} />
          )}
        </>
      )}

      {buying && (
        <BuyModal
          pokemon={buying}
          onClose={() => setBuying(null)}
          onSuccess={handleSuccess}
          onError={handleError}
        />
      )}

      <Toast toasts={toasts} />
    </>
  )
}
