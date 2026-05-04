import { useEffect, useRef, useState } from 'react'
import TypeBadge from './TypeBadge'
import { PAYPAL_CLIENT_ID } from '../constants'
import styles from './BuyModal.module.css'

const PAYPAL_SDK_ID = 'paypal-sdk-script'

export default function BuyModal({ pokemon, onClose, onSuccess, onError }) {
  const containerRef = useRef(null)
  const [sdkReady, setSdkReady] = useState(false)
  const [processing, setProcessing] = useState(false)

  // Cargar el SDK de PayPal
  useEffect(() => {
    if (document.getElementById(PAYPAL_SDK_ID)) {
      setSdkReady(true)
      return
    }

    const script = document.createElement('script')
    script.id = PAYPAL_SDK_ID
    script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=USD`
    script.onload = () => setSdkReady(true)
    script.onerror = () => setSdkReady(true) // igual intentamos render (fallback)
    document.body.appendChild(script)
  }, [])

  // Renderizar el botón cuando el SDK esté listo
  useEffect(() => {
    if (!sdkReady || !containerRef.current) return
    renderPayPal()
  }, [sdkReady])

  function renderPayPal() {
    if (!containerRef.current) return
    containerRef.current.innerHTML = ''

    if (window.paypal) {
      window.paypal.Buttons({
        style: {
          shape: 'rect',
          color: 'gold',
          layout: 'vertical',
          label: 'pay',
          height: 44,
        },
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [{
              description: `PokéCard — ${pokemon.name}`,
              amount: {
                currency_code: 'USD',
                value: pokemon.price,
              },
            }],
          })
        },
        onApprove: async (data, actions) => {
          setProcessing(true)
          try {
            const details = await actions.order.capture()
            if (details.status === 'COMPLETED') {
              onSuccess(pokemon, details.id || 'TXN_' + Date.now())
            } else {
              onError('El pago no fue completado correctamente.')
            }
          } catch {
            onError('Error al capturar el pago. Intenta de nuevo.')
          } finally {
            setProcessing(false)
          }
        },
        onError: () => {
          onError('Ocurrió un error con PayPal. Verifica tu conexión.')
        },
        onCancel: () => {
          // El usuario canceló, no hacemos nada
        },
      }).render(containerRef.current)
    } else {
      renderFallbackBtn()
    }
  }

  // Botón simulado si PayPal no carga (entorno sin HTTPS / sandbox bloqueado)
  function renderFallbackBtn() {
    if (!containerRef.current) return

    const btn = document.createElement('button')
    btn.textContent = '🅿  Pagar con PayPal (Sandbox)'
    btn.style.cssText = `
      width: 100%;
      padding: 13px;
      border-radius: 8px;
      border: none;
      background: #FFC439;
      color: #003087;
      font-weight: 700;
      font-size: 0.92rem;
      cursor: pointer;
      font-family: 'Syne', sans-serif;
      letter-spacing: 0.2px;
      transition: opacity 0.2s;
    `

    btn.onmouseenter = () => { btn.style.opacity = '0.85' }
    btn.onmouseleave = () => { btn.style.opacity = '1' }

    btn.onclick = () => {
      btn.textContent = 'Procesando pago...'
      btn.disabled = true
      btn.style.opacity = '0.7'
      btn.style.cursor = 'not-allowed'

      setTimeout(() => {
        // 85% probabilidad de éxito
        const ok = Math.random() > 0.15
        if (ok) {
          onSuccess(pokemon, 'SANDBOX_' + Date.now().toString(36).toUpperCase())
        } else {
          onError('Pago rechazado por el banco. Verifica tus datos.')
          btn.textContent = '🅿  Reintentar pago'
          btn.disabled = false
          btn.style.opacity = '1'
          btn.style.cursor = 'pointer'
        }
      }, 2000)
    }

    containerRef.current.appendChild(btn)
  }

  // Cerrar con ESC
  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  return (
    <div
      className={styles.backdrop}
      onClick={e => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label={`Comprar carta de ${pokemon.name}`}
    >
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Cerrar">✕</button>

        {/* Info del pokemon */}
        <div className={styles.head}>
          <img
            src={pokemon.image}
            alt={pokemon.name}
            className={styles.img}
          />
          <div className={styles.info}>
            <span className={styles.cardId}>#{String(pokemon.id).padStart(4, '0')}</span>
            <h2 className={styles.name}>{pokemon.name}</h2>
            <div className={styles.types}>
              {pokemon.types.map(t => <TypeBadge key={t} type={t} />)}
            </div>
            <p className={styles.price}>${pokemon.price} USD</p>
          </div>
        </div>

        {/* Stats */}
        <div className={styles.stats}>
          {[
            { label: 'HP',       val: pokemon.stats.hp },
            { label: 'Ataque',   val: pokemon.stats.attack },
            { label: 'Defensa',  val: pokemon.stats.defense },
            { label: 'Sp. Atk', val: pokemon.stats.spatk },
            { label: 'Sp. Def', val: pokemon.stats.spdef },
            { label: 'Velocidad',val: pokemon.stats.speed },
          ].map(({ label, val }) => (
            <div key={label} className={styles.stat}>
              <span className={styles.statLabel}>{label}</span>
              <span className={styles.statVal}>{val}</span>
              <div className={styles.statBar}>
                <div
                  className={styles.statFill}
                  style={{ width: `${Math.min(100, (val / 255) * 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Pago */}
        <div className={styles.paySection}>
          <p className={styles.payHint}>
            Pago seguro a través de PayPal Sandbox.
          </p>
          {processing && (
            <p className={styles.processingTxt}>Verificando transacción...</p>
          )}
          <div ref={containerRef} className={styles.paypalWrap} />
        </div>
      </div>
    </div>
  )
}
