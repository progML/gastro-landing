import { useEffect, useRef, useState } from 'react'

type Props = {
  open: boolean
  onClose: () => void
}

export function ApplicationModal({ open, onClose }: Props) {
  const cancelRef = useRef<HTMLButtonElement>(null)
  const [confirmed, setConfirmed] = useState(false)

  useEffect(() => {
    if (!open) {
      setConfirmed(false)
      return
    }

    const previous = document.activeElement as HTMLElement | null
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', onKeyDown)
    document.body.classList.add('modal-open')
    window.setTimeout(() => cancelRef.current?.focus(), 0)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.classList.remove('modal-open')
      previous?.focus()
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="application-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="application-modal-title"
        aria-describedby="application-modal-description"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <p className="modal-kicker">Заявка на конкурс</p>
        <h2 id="application-modal-title">{confirmed ? 'Подтверждено' : 'Подать заявку?'}</h2>
        <p id="application-modal-description">
          {confirmed
            ? 'Действие подтверждено. В production здесь подключается переход к реальной форме или отправка данных в API организатора.'
            : 'Подтвердите переход к подаче заявки на конкурс.'}
        </p>

        {confirmed ? (
          <div className="modal-actions">
            <button ref={cancelRef} className="modal-primary" type="button" onClick={onClose}>Закрыть</button>
          </div>
        ) : (
          <div className="modal-actions">
            <button ref={cancelRef} className="modal-secondary" type="button" onClick={onClose}>Отмена</button>
            <button className="modal-primary" type="button" onClick={() => setConfirmed(true)}>Подтвердить</button>
          </div>
        )}
      </section>
    </div>
  )
}
