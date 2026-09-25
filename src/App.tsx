import { useCallback, useState } from 'react'
import heroCluster from './assets/hero-cluster.png'
import footerFood from './assets/footer-food.png'
import headerBranding from './assets/header-branding.png'
import organizerCards from './assets/organizer-cards.png'
import footerPanel from './assets/footer-panel.png'
import { ApplicationModal } from './components/ApplicationModal'
import { Countdown } from './components/Countdown'
import { Faq } from './components/Faq'
import { nominations, nominationDescription, prizes, stageRows } from './data/content'
import { useCanvasScale } from './hooks/useCanvasScale'

const DESIGN_HEIGHT = 6312

export function App() {
  const scale = useCanvasScale()
  const [modalOpen, setModalOpen] = useState(false)

  const showApplicationConfirmation = useCallback(() => setModalOpen(true), [])
  const closeApplicationConfirmation = useCallback(() => setModalOpen(false), [])

  return (
    <>
      <div
        className="scale-shell"
        style={{ width: `${1920 * scale}px`, height: `${DESIGN_HEIGHT * scale}px` }}
      >
        <div className="design-canvas" style={{ transform: `scale(${scale})` }}>
          <Header onApply={showApplicationConfirmation} />

          <main>
            <section className="hero" id="hero" aria-labelledby="hero-title">
              <h1 id="hero-title">
                КОНКУРС ЛУЧШИХ БРЕНДОВ<br />
                ГАСТРОИНДУСТРИИ САНКТ-ПЕТЕРБУРГА
              </h1>
              <div className="hero-year">2025</div>

              <img className="hero-cluster" src={heroCluster} alt="" aria-hidden="true" />

              <div className="deadline-card">
                <h2>Сроки проведения<br />конкурса</h2>
                <p className="deadline-dates">14 сентября 2025 –<br />21 октября 2025</p>
                <Countdown />
              </div>

              <button className="apply-button hero-apply" type="button" onClick={showApplicationConfirmation}>
                Подать заявку
              </button>
            </section>

            <NominationRibbons />
            <Stages />
            <About />
            <Nominations onApply={showApplicationConfirmation} />
            <Prizes />
            <Questions />
            <Organizers />
            <Footer />
          </main>
        </div>
      </div>

      <ApplicationModal open={modalOpen} onClose={closeApplicationConfirmation} />
    </>
  )
}

type ApplyProps = { onApply: () => void }

function Header({ onApply }: ApplyProps) {
  return (
    <header className="site-header">
      <a href="#hero" className="header-branding-link" aria-label="На главную">
        <img src={headerBranding} alt="Конкурс лучших брендов гастроиндустрии Санкт-Петербурга. При поддержке организаций Санкт-Петербурга" />
      </a>

      <nav className="top-nav" aria-label="Основная навигация">
        <a href="#about">О конкурсе</a>
        <a href="#nominations">Номинации</a>
        <a href="#conditions">Условия участия</a>
        <a href="#contacts">Контакты</a>
      </nav>

      <button className="header-apply" type="button" onClick={onApply}>Подать заявку</button>
    </header>
  )
}

function NominationRibbons() {
  return (
    <section className="nomination-ribbons" aria-label="Номинации конкурса">
      <div className="ribbon ribbon-confectionery"><span>ЛУЧШИЙ КОНДИТЕРСКИЙ БРЕНД</span></div>
      <div className="ribbon ribbon-coffee"><span>ЛУЧШАЯ КОФЕЙНЯ</span></div>
      <div className="ribbon ribbon-street"><span>ЛУЧШИЙ СТРИТ-ФУД</span></div>
      <div className="ribbon ribbon-opening"><span>ОТКРЫТИЕ ГОДА</span></div>
      <div className="ribbon ribbon-restaurateur"><span>МОЛОДОЙ РЕСТОРАТОР</span></div>
    </section>
  )
}

function Stages() {
  return (
    <section className="stages-section" aria-labelledby="stages-title">
      <h2 id="stages-title" className="section-title stages-title">Этапы</h2>
      <div className="stages-table">
        {stageRows.map((row, index) => (
          <div className={`stage-row stage-row-${index + 1}`} key={`${row.date}-${row.title}`}>
            <span className="stage-mode">{row.mode}</span>
            <span className="stage-date">{row.date}</span>
            <strong className="stage-name">{row.title.split('\n').map((line) => <span key={line}>{line}</span>)}</strong>
          </div>
        ))}
      </div>
    </section>
  )
}

function About() {
  return (
    <section className="about-section" id="about" aria-labelledby="about-title">
      <h2 id="about-title" className="section-title about-title">О конкурсе</h2>
      <div className="about-copy">
        <p>Конкурс лучших брендов гастроиндустрии Санкт-Петербурга — это масштабная инициатива, направленная на поддержку и продвижение малого и среднего бизнеса в сфере ресторанов, кафе, баров и производителей продуктов питания. Организованный Фондом развития субъектов малого и среднего предпринимательства Санкт-Петербурга и оператором ООО «Центр развития промышленности и инноваций», конкурс предоставляет участникам уникальную возможность заявить о себе, укрепить позиции на рынке и получить мощные инструменты для продвижения.</p>
        <p>Участие в конкурсе бесплатное и добровольное, что делает его доступным для всех субъектов малого и среднего предпринимательства, соответствующих требованиям. Чёткие критерии оценки и открытая система голосования (онлайн-голосование и решение жюри) обеспечивают прозрачность и доверие к результатам.</p>
        <p>Победители получают не только престижную награду, но и значительную медийную поддержку: продвижение в городском пространстве, публикации в СМИ, трансляции в эфире на телевидении и радио.</p>
        <p>В состав жюри входят представители органов власти, институтов развития и признанные эксперты ресторанного бизнеса и гастрономической культуры, что гарантирует высокий уровень оценки и объективность.</p>
        <a className="conditions-button" id="conditions" href="#prizes">Подробные условия участия</a>
      </div>
    </section>
  )
}

function Nominations({ onApply }: ApplyProps) {
  return (
    <section className="nominations-section" id="nominations" aria-labelledby="nominations-title">
      <h2 id="nominations-title" className="section-title nominations-title">Номинации</h2>
      <div className="nomination-list">
        {nominations.map((title) => (
          <article className="nomination-row" key={title}>
            <h3>{title.split('\n').map((line) => <span key={line}>{line}</span>)}</h3>
            <p>{nominationDescription}</p>
            <button type="button" className="apply-button nomination-apply" onClick={onApply}>Подать заявку</button>
          </article>
        ))}
      </div>
    </section>
  )
}

function Prizes() {
  return (
    <section className="prizes-section" id="prizes" aria-labelledby="prizes-title">
      <h2 id="prizes-title" className="section-title prizes-title">Призы</h2>
      <div className="prize-card">
        <h3>1 место</h3>
        <div className="prize-list">
          {prizes.map((prize) => <div className="prize-item" key={prize}>{prize}</div>)}
        </div>
      </div>
    </section>
  )
}

function Questions() {
  return (
    <section className="questions-section" aria-labelledby="questions-title">
      <h2 id="questions-title" className="section-title questions-title">Вопросы</h2>
      <Faq />
    </section>
  )
}

function Organizers() {
  return (
    <section className="organizers-section" aria-labelledby="organizers-title">
      <h2 id="organizers-title" className="organizers-title">Организаторы</h2>
      <img
        className="organizer-cards"
        src={organizerCards}
        alt="Фонд развития субъектов малого и среднего предпринимательства в Санкт-Петербурге и Комитет по промышленной политике, инновациям и торговле Санкт-Петербурга"
      />
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer" id="contacts">
      <img className="footer-food" src={footerFood} alt="" aria-hidden="true" />
      <img
        className="footer-panel"
        src={footerPanel}
        alt="Контакты организаторов конкурса: наименование организации, ИНН, КПП, ОГРН, сведения об операторе и ссылки на социальные сети фонда"
      />
    </footer>
  )
}
