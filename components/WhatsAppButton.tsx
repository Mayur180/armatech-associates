"use client"

import { useState } from "react"

export default function WhatsAppButton() {
  const [showText, setShowText] = useState(false)

  // ============================================================
  // CHANGE THIS NUMBER
  // ============================================================
  // Format:
  // Country code + number
  // India example: 919876543210
  //
  // DO NOT use +, spaces, or -
  // ============================================================

  const whatsappNumber = "917020991684"

  const message =
    "Hello ArmaTech Associates, I would like to enquire about your precision measurement machines."

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    message
  )}`

  return (
    <div className="fixed bottom-6 right-6 z-[9990]">

      {/* ========================================================
          TOOLTIP
      ======================================================== */}

      <div
        className={`
          absolute
          bottom-full
          right-0
          mb-3
          whitespace-nowrap
          border
          border-zinc-200
          bg-white
          px-4
          py-2.5
          text-xs
          font-semibold
          text-zinc-800
          shadow-lg
          transition-all
          duration-200
          ${
            showText
              ? "translate-y-0 opacity-100"
              : "pointer-events-none translate-y-2 opacity-0"
          }
        `}
      >
        Chat with us on WhatsApp

        {/* little arrow */}

        <div
          className="
            absolute
            -bottom-1.5
            right-5
            h-3
            w-3
            rotate-45
            border-b
            border-r
            border-zinc-200
            bg-white
          "
        />

      </div>

      {/* ========================================================
          WHATSAPP BUTTON
      ======================================================== */}

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        onMouseEnter={() => setShowText(true)}
        onMouseLeave={() => setShowText(false)}
        className="
          group
          relative
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-full
          bg-[#25D366]
          text-white
          shadow-xl
          transition-all
          duration-300
          hover:scale-110
          hover:shadow-2xl
          sm:h-16
          sm:w-16
        "
      >

        {/* ======================================================
            PULSE RING
        ====================================================== */}

        <span
          className="
            absolute
            inset-0
            rounded-full
            border-2
            border-[#25D366]
            opacity-50
            animate-ping
          "
        />

        {/* ======================================================
            WHATSAPP SVG
        ====================================================== */}

        <svg
          viewBox="0 0 32 32"
          className="relative z-10 h-7 w-7 fill-current sm:h-8 sm:w-8"
          aria-hidden="true"
        >
          <path
            d="
              M19.11 17.2c-.27-.14-1.6-.79-1.85-.88
              -.25-.09-.43-.14-.61.14
              -.18.27-.7.88-.86 1.06
              -.16.18-.32.2-.59.07
              -.27-.14-1.13-.42-2.15-1.34
              -.79-.7-1.33-1.57-1.49-1.84
              -.16-.27-.02-.42.12-.56
              .12-.12.27-.32.41-.48
              .14-.16.18-.27.27-.45
              .09-.18.05-.34-.02-.48
              -.07-.14-.61-1.47-.84-2.01
              -.22-.53-.45-.46-.61-.47
              -.16-.01-.34-.01-.52-.01
              -.18 0-.48.07-.73.34
              -.25.27-.95.93-.95 2.26
              0 1.34.97 2.63 1.11 2.81
              .14.18 1.91 2.92 4.63 4.09
              .65.28 1.15.44 1.54.56
              .65.21 1.24.18 1.7.11
              .52-.08 1.6-.65 1.82-1.28
              .23-.63.23-1.17.16-1.28
              -.07-.11-.25-.18-.52-.32z
            "
          />

          <path
            d="
              M16.03 3.2c-7.08 0-12.83 5.75-12.83 12.83
              0 2.26.59 4.47 1.72 6.42L3.1 28.8l6.5-1.7
              a12.82 12.82 0 0 0 6.43 1.73h.01
              c7.08 0 12.83-5.75 12.83-12.83
              S23.11 3.2 16.03 3.2zm0 23.47h-.01
              c-2 0-3.97-.54-5.68-1.55l-.41-.24-3.86 1.01
              1.03-3.76-.27-.43a10.62 10.62 0 0 1-1.63-5.67
              c0-5.87 4.78-10.65 10.65-10.65
              2.84 0 5.51 1.11 7.52 3.12
              2.01 2.01 3.12 4.68 3.12 7.52
              0 5.87-4.78 10.65-10.65 10.65z
            "
          />
        </svg>

      </a>

    </div>
  )
}