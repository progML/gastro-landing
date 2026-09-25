import { useState } from 'react'
import { faq } from '../data/content'

export function Faq() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div className="faq-list">
      {faq.map((item, index) => {
        const open = index === openIndex
        const panelId = `faq-panel-${index}`
        const buttonId = `faq-button-${index}`

        return (
          <article className={`faq-item ${open ? 'is-open' : ''}`} key={item.question}>
            <button
              id={buttonId}
              className="faq-question"
              type="button"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpenIndex(index)}
            >
              <span>{item.question}</span>
              <span className="faq-chevron" aria-hidden="true">⌄</span>
            </button>
            <div
              id={panelId}
              className="faq-answer-wrap"
              role="region"
              aria-labelledby={buttonId}
              aria-hidden={!open}
            >
              <p className="faq-answer">{item.answer}</p>
            </div>
          </article>
        )
      })}
    </div>
  )
}
