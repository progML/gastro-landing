import { useLayoutEffect, useState } from 'react'

const DESIGN_WIDTH = 1920

export function useCanvasScale() {
  const [scale, setScale] = useState(1)

  useLayoutEffect(() => {
    const update = () => {
      const viewportWidth = document.documentElement.clientWidth
      setScale(Math.min(viewportWidth / DESIGN_WIDTH, 1))
    }

    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return scale
}
