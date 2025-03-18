"use client"

import { useEffect, useRef } from "react"

export function SmoothBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    // Create particles
    const particlesArray: Particle[] = []
    const particleCount = 50

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      opacity: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 5 + 1
        this.speedX = Math.random() * 0.5 - 0.25
        this.speedY = Math.random() * 0.5 - 0.25
        this.opacity = Math.random() * 0.2 + 0.05
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        // Wrap around edges
        if (this.x < 0) this.x = canvas.width
        if (this.x > canvas.width) this.x = 0
        if (this.y < 0) this.y = canvas.height
        if (this.y > canvas.height) this.y = 0
      }

      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`
        ctx.fill()
      }
    }

    // Initialize particles
    const initParticles = () => {
      for (let i = 0; i < particleCount; i++) {
        particlesArray.push(new Particle())
      }
    }

    // Draw wave effect
    const drawWaves = (time: number) => {
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, "#000000")
      gradient.addColorStop(1, "#19396f")

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw subtle waves
      for (let i = 0; i < 3; i++) {
        ctx.beginPath()
        ctx.moveTo(0, canvas.height * 0.3 + Math.sin(time / 1000 + i) * 20)

        for (let x = 0; x < canvas.width; x += 10) {
          const y =
            canvas.height * 0.3 +
            Math.sin(time / 1000 + i + x * 0.003) * 20 +
            Math.sin(time / 2000 + i + x * 0.001) * 15

          ctx.lineTo(x, y)
        }

        ctx.lineTo(canvas.width, canvas.height)
        ctx.lineTo(0, canvas.height)
        ctx.closePath()

        const waveGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
        waveGradient.addColorStop(0, `rgba(25, 57, 111, ${0.05 + i * 0.02})`)
        waveGradient.addColorStop(1, `rgba(0, 0, 0, ${0.05 + i * 0.02})`)

        ctx.fillStyle = waveGradient
        ctx.fill()
      }

      // Draw particles
      particlesArray.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      // Draw subtle light rays
      const rayCount = 3
      for (let i = 0; i < rayCount; i++) {
        const x = canvas.width * (0.2 + i * 0.3)
        const rayWidth = canvas.width * 0.1

        const rayGradient = ctx.createRadialGradient(x, 0, 0, x, 0, canvas.height)

        rayGradient.addColorStop(0, `rgba(255, 255, 255, ${0.03 + Math.sin(time / 2000 + i) * 0.01})`)
        rayGradient.addColorStop(1, "rgba(255, 255, 255, 0)")

        ctx.fillStyle = rayGradient
        ctx.fillRect(x - rayWidth / 2, 0, rayWidth, canvas.height)
      }
    }

    // Animation loop
    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      drawWaves(time)
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()
    initParticles()
    animate(0)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[-1]"
      style={{ opacity: 0.9 }}
    />
  )
}

