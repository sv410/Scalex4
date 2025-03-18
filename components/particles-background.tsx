"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  color: string
  pulse: boolean
  pulseSpeed: number
  maxSize: number
  minSize: number
}

export function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { resolvedTheme } = useTheme()
  const particlesRef = useRef<Particle[]>([])
  const animationFrameRef = useRef<number>()
  const mouseRef = useRef({ x: 0, y: 0, radius: 100 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    const initParticles = () => {
      particlesRef.current = []
      const particleCount = Math.floor((canvas.width * canvas.height) / 10000)

      for (let i = 0; i < particleCount; i++) {
        const size = Math.random() * 2 + 0.5
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: size,
          minSize: size,
          maxSize: size * 3,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          opacity: Math.random() * 0.5 + 0.2,
          color: getRandomColor(),
          pulse: Math.random() > 0.7, // 30% of particles will pulse
          pulseSpeed: Math.random() * 0.02 + 0.01,
        })
      }
    }

    const getRandomColor = () => {
      const colors =
        resolvedTheme === "dark"
          ? ["#ffffff", "#e0e0ff", "#c0c0ff"] // Lighter colors for dark mode
          : ["#ffffff", "#f0f0ff", "#e0e0ff"] // White/light blue for light mode
      return colors[Math.floor(Math.random() * colors.length)]
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((particle) => {
        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Calculate distance to mouse for interactive effect
        const dx = mouseRef.current.x - particle.x
        const dy = mouseRef.current.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        // Pulse effect
        if (particle.pulse) {
          particle.size += Math.sin(Date.now() * particle.pulseSpeed) * 0.1
          particle.size = Math.max(particle.minSize, Math.min(particle.size, particle.maxSize))
        }

        // Interactive effect with mouse
        if (distance < mouseRef.current.radius) {
          const force = (mouseRef.current.radius - distance) / mouseRef.current.radius
          particle.size = particle.minSize + (particle.maxSize - particle.minSize) * force

          // Move particles away from mouse
          if (distance > 0) {
            const angle = Math.atan2(dy, dx)
            const pushX = Math.cos(angle) * force * 0.5
            const pushY = Math.sin(angle) * force * 0.5

            particle.x -= pushX
            particle.y -= pushY
          }
        }

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)

        // Use the particle's color with its opacity
        const [r, g, b] = hexToRgb(particle.color)
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${particle.opacity})`
        ctx.fill()

        // Add glow effect
        if (particle.size > particle.minSize * 1.5) {
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${particle.opacity * 0.1})`
          ctx.fill()
        }
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    // Helper function to convert hex to rgb
    const hexToRgb = (hex: string): [number, number, number] => {
      // Default to white if invalid hex
      if (!hex.startsWith("#")) return [255, 255, 255]

      const r = Number.parseInt(hex.slice(1, 3), 16) || 255
      const g = Number.parseInt(hex.slice(3, 5), 16) || 255
      const b = Number.parseInt(hex.slice(5, 7), 16) || 255

      return [r, g, b]
    }

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
    }

    // Handle touch for mobile
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current.x = e.touches[0].clientX
        mouseRef.current.y = e.touches[0].clientY
      }
    }

    window.addEventListener("resize", resizeCanvas)
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("touchmove", handleTouchMove)

    resizeCanvas()
    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("touchmove", handleTouchMove)

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [resolvedTheme])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0" />
}

