import { useEffect } from "react";
import { useNavigate } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname } = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
