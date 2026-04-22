"use client"

import { useState } from "react"
import { ArrowLeft, Check } from "lucide-react"
import Link from "next/link"

export default function VerifyIdentityPage() {
  const [faydaId, setFaydaId] = useState("")
  const [isConsented, setIsConsented] = useState(true)
  const [isScanning, setIsScanning] = useState(false)

  const formatFaydaId = (value: string) => {
    const numbers = value.replace(/\D/g, "").slice(0, 12)
    const parts = []
    for (let i = 0; i < numbers.length; i += 4) {
      parts.push(numbers.slice(i, i + 4))
    }
    return parts.join(" ")
  }

  const handleFaydaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatFaydaId(e.target.value)
    setFaydaId(formatted)
  }

  const rawFaydaId = faydaId.replace(/\s/g, "")
  const isValid = rawFaydaId.length === 12 && isConsented

  const handleStartScan = () => {
    setIsScanning(true)
    setTimeout(() => setIsScanning(false), 3000)
  }

  return (
    <div className="min-h-screen bg-white flex justify-center">
      <div className="w-full max-w-[400px] min-h-screen flex flex-col relative animate-slide-up">
        {/* Header */}
        <div className="px-6 pt-14 pb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <Link 
            href="/"
            className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-mereq-gray-light hover:bg-gray-200 transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5 text-mereq-charcoal" />
          </Link>
          
          <h1 className="text-[28px] font-bold text-mereq-charcoal leading-tight mb-3">
            Verify your Identity
          </h1>
          <p className="text-base text-gray-500 leading-relaxed">
            Under Ethiopian Proclamation 1321/2024, we need to verify your Fayda ID to secure your account.
          </p>
        </div>

        {/* Content */}
        <div className="flex-1 px-6 pb-48">
          {/* Camera Viewfinder */}
          <div 
            className="animate-fade-in" 
            style={{ animationDelay: "0.2s" }}
          >
            <div 
              className={`relative w-full aspect-[4/3] rounded-3xl bg-mereq-charcoal overflow-hidden ${
                isScanning ? "animate-pulse-border" : ""
              }`}
              style={{
                boxShadow: isScanning 
                  ? "0 0 0 3px rgba(0, 208, 132, 0.6), 0 0 20px rgba(0, 208, 132, 0.3)" 
                  : "0 0 0 3px rgba(0, 208, 132, 0.3)"
              }}
              onClick={handleStartScan}
            >
              {/* Scanning overlay effect */}
              {isScanning && (
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-mereq-primary to-transparent animate-scan-line" />
                </div>
              )}
              
              {/* Face silhouette */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg 
                  width="140" 
                  height="180" 
                  viewBox="0 0 140 180" 
                  fill="none"
                  className="opacity-40"
                >
                  {/* Face outline - dashed */}
                  <ellipse 
                    cx="70" 
                    cy="75" 
                    rx="50" 
                    ry="60" 
                    stroke="#00D084" 
                    strokeWidth="2" 
                    strokeDasharray="8 6"
                    fill="none"
                  />
                  {/* Neck */}
                  <path 
                    d="M50 130 Q50 150 40 170 L100 170 Q90 150 90 130" 
                    stroke="#00D084" 
                    strokeWidth="2" 
                    strokeDasharray="8 6"
                    fill="none"
                  />
                  {/* Eyes */}
                  <ellipse cx="50" cy="65" rx="8" ry="5" stroke="#00D084" strokeWidth="1.5" strokeDasharray="4 3" fill="none" />
                  <ellipse cx="90" cy="65" rx="8" ry="5" stroke="#00D084" strokeWidth="1.5" strokeDasharray="4 3" fill="none" />
                  {/* Nose */}
                  <path d="M70 70 L70 90 L65 95" stroke="#00D084" strokeWidth="1.5" strokeDasharray="4 3" fill="none" />
                  {/* Mouth */}
                  <path d="M55 108 Q70 118 85 108" stroke="#00D084" strokeWidth="1.5" strokeDasharray="4 3" fill="none" />
                </svg>
              </div>

              {/* Corner brackets */}
              <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-mereq-primary rounded-tl-lg" />
              <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-mereq-primary rounded-tr-lg" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-mereq-primary rounded-bl-lg" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-mereq-primary rounded-br-lg" />
            </div>

            {/* Instruction text */}
            <p className="text-center text-mereq-charcoal font-medium mt-4 mb-6">
              Position your face and blink
            </p>

            {/* Status indicator */}
            {isScanning && (
              <div className="flex items-center justify-center gap-2 mb-6 animate-fade-in">
                <div className="w-2 h-2 rounded-full bg-mereq-primary animate-pulse" />
                <span className="text-sm text-mereq-primary font-medium">Scanning...</span>
              </div>
            )}
          </div>

          {/* Fayda ID Input */}
          <div 
            className="animate-fade-in" 
            style={{ animationDelay: "0.3s" }}
          >
            <label className="block text-sm font-medium text-gray-500 mb-2">
              12-Digit Fayda ID
            </label>
            <input
              type="text"
              value={faydaId}
              onChange={handleFaydaChange}
              placeholder="0000 0000 0000"
              className="w-full h-14 px-5 text-lg font-medium text-mereq-charcoal bg-mereq-gray-light rounded-2xl border-0 outline-none focus:ring-2 focus:ring-mereq-primary/30 transition-all tracking-wider placeholder:text-gray-400 placeholder:tracking-wider"
            />
            <p className="text-xs text-gray-400 mt-2">
              Enter your 12-digit Fayda National ID number
            </p>
          </div>
        </div>

        {/* Sticky Bottom Action Bar */}
        <div className="fixed bottom-0 left-0 right-0 flex justify-center pointer-events-none">
          <div 
            className="w-full max-w-[400px] bg-white border-t border-gray-100 px-6 pt-4 pb-8 pointer-events-auto animate-fade-in"
            style={{ 
              animationDelay: "0.4s",
              paddingBottom: "max(2rem, env(safe-area-inset-bottom))" 
            }}
          >
            {/* Consent Checkbox */}
            <div 
              className="flex items-start gap-3 mb-5 cursor-pointer"
              onClick={() => setIsConsented(!isConsented)}
            >
              <div 
                className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 transition-all ${
                  isConsented 
                    ? "bg-mereq-primary" 
                    : "bg-mereq-gray-light border-2 border-gray-300"
                }`}
              >
                {isConsented && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                I consent to Telebirr data processing for credit scoring.
              </p>
            </div>

            {/* Verify Button */}
            <button
              disabled={!isValid}
              className={`w-full h-14 rounded-full text-lg font-semibold transition-all duration-300 ${
                isValid
                  ? "bg-mereq-primary text-white hover:bg-mereq-primary-dark active:scale-[0.98]"
                  : "bg-mereq-primary/40 text-white/70 cursor-not-allowed"
              }`}
            >
              Verify Identity
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
