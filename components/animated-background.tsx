"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

export function AnimatedBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { resolvedTheme } = useTheme()

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
      const count = Math.floor(window.innerWidth / 100)

      for (let i = 0; i < count; i++) {
        const element = document.createElement("div")

        // Random size between 50px and 150px
        const size = Math.random() * 100 + 50

        // Random position
        const posX = Math.random() * 100
        const posY = Math.random() * 100

        // Random opacity between 0.03 and 0.08
        const opacity = Math.random() * 0.05 + 0.03

        // Random animation duration between 15s and 40s
        const duration = Math.random() * 25 + 15

        // Random delay
        const delay = Math.random() * 5

        // Set styles
        element.style.position = "absolute"
        element.style.width = `${size}px`
        element.style.height = `${size}px`
        element.style.borderRadius = "50%"
        element.style.background =
          resolvedTheme === "dark"
            ? `radial-gradient(circle at center, rgba(75, 0, 130, ${opacity}) 0%, rgba(75, 0, 130, 0) 70%)`
            : `radial-gradient(circle at center, rgba(0, 51, 102, ${opacity}) 0%, rgba(0, 51, 102, 0) 70%)`
        element.style.left = `${posX}%`
        element.style.top = `${posY}%`
        element.style.animation = `float ${duration}s ease-in-out ${delay}s infinite alternate`

        container.appendChild(element)
      }

      // Create gradient overlay
      const gradientOverlay = document.createElement("div")
      gradientOverlay.style.position = "absolute"
      gradientOverlay.style.top = "0"
      gradientOverlay.style.left = "0"
      gradientOverlay.style.right = "0"
      gradientOverlay.style.bottom = "0"
      gradientOverlay.style.background = "linear-gradient(135deg, #003366 0%, #0D1F45 25%, #1A1155 50%, #301934 100%)"
      gradientOverlay.style.opacity = "1"
      gradientOverlay.style.zIndex = "-1"
      gradientOverlay.style.animation = "gradientShift 15s ease infinite alternate"

      container.appendChild(gradientOverlay)
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
      
      @keyframes gradientShift {
        0% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0% 50%;
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
  }, [resolvedTheme])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]"
      style={{ backgroundSize: "400% 400%" }}
    />
  )
}

