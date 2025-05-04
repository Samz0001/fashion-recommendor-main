// 'use client'; // for Next.js app dir
import { useEffect } from 'react'
import HeroSection from './components/HeroSection'
import FeaturesSection from './components/FeaturesSection'
import HowItWorksSection from './components/HowItWorksSection'
import AboutSection from './components/AboutSection'
import Footer from './components/Footer'
import Navbar from './components/Navbar'

const StartPage = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return

    // theme logic… (same as before)

    // smooth scroll anchors
    const anchors = Array.from(
      document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')
    )
    const handleClick = (e: MouseEvent) => {
      e.preventDefault()
      const anchor = e.currentTarget as HTMLAnchorElement
      const href = anchor.getAttribute('href')
      if (href && href !== '#') {
        document.querySelector(href)?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
    }
    anchors.forEach(a => a.addEventListener('click', handleClick))

    return () => {
      anchors.forEach(a => a.removeEventListener('click', handleClick))
    }
  }, [])

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
      </main>
    </div>
  )
}

export default StartPage
