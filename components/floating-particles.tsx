"use client"

import { useEffect, useRef } from "react"

export function FloatingParticles() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Create floating elements
    const createFloatingElements = () => {
      // Clear existing elements
      while (container.firstChild) {
        container.removeChild(container.firstChild)
      }

      // Create new elements
      const count = Math.floor(window.innerWidth / 200) // Adjust density

      for (let i = 0; i < count; i++) {
        const element = document.createElement("div")

        // Random size between 50px and 150px
        const size = Math.random() * 100 + 50

        // Random position
        const posX = Math.random() * 100
        const posY = Math.random() * 100

        // Random opacity between 0.02 and 0.05
        const opacity = Math.random() * 0.03 + 0.02

        // Random animation duration between 15s and 40s
        const duration = Math.random() * 25 + 15

        // Random delay
        const delay = Math.random() * 5

        // Set styles
        element.style.position = "absolute"
        element.style.width = `${size}px`
        element.style.height = `${size}px`
        element.style.borderRadius = "50%"
        element.style.background = `radial-gradient(circle at center, rgba(255, 255, 255, ${opacity}) 0%, rgba(255, 255, 255, 0) 70%)`
        element.style.left = `${posX}%`
        element.style.top = `${posY}%`
        element.style.animation = `float ${duration}s ease-in-out ${delay}s infinite alternate`

        container.appendChild(element)
      }
    }

    // Create initial elements
    createFloatingElements()

    // Recreate on resize
    window.addEventListener("resize", createFloatingElements)

    // Add keyframes for animations
    const style = document.createElement("style")
    style.textContent = `
      @keyframes float {
        0% {
          transform: translateY(0) translateX(0) rotate(0);
        }
        50% {
          transform: translateY(-20px) translateX(10px) rotate(5deg);
        }
        100% {
          transform: translateY(20px) translateX(-10px) rotate(-5deg);
        }
      }
    `
    document.head.appendChild(style)

    return () => {
      window.removeEventListener("resize", createFloatingElements)
      if (document.head.contains(style)) {
        document.head.removeChild(style)
      }
    }
  }, [])

  return <div ref={containerRef} className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]" />
}

