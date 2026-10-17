// ============================================================
// PRODUCT TYPES
// ============================================================

export type Specification = {
  label: string
  values: string[]
}

export type ProductVariant = {
  model: string
  travel: string
}

export type Product = {
  slug: string
  name: string
  family: string

  category:
    | "Manual"
    | "Semi-auto"
    | "CNC auto"
    | "Cabinet integrated"

  badge: string
  summary: string
  travel: string

  image: string
  brochure: string

  imageAlt: string
  seoTitle: string
  seoDescription: string

  applications: string[]
  highlights: string[]

  variants: ProductVariant[]
  specifications: Specification[]
}

// ============================================================
// PRODUCT IMAGES
// ============================================================

export const catalogImages = {
  manual:
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Maunal-L8yjCFjZiWt6iCDQZhujqswIkFjqPo.png",

  semi:
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/semi-nIQvd99xxNXr13VTuwnMkOI3ip3YPp.png",

  automatic: "/Image/automatic.png",

  cabinet:
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/automatic%20with%20cabinet-nMON6kS70ryrBN3q5uxzUV77A0oTbr.png",

  vms:
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/vms-UyN1lpNPu7hfXst0XeCpOdBG3w6paP.png",
}

// ============================================================
// PRODUCT BROCHURES
// ============================================================

export const catalogBrochures = {
  manual: "/pdf/Manual_VMM.pdf",

  semiAutomatic: "/pdf/Semi_Automatic_VMM.pdf",

  fullyAutomatic: "/pdf/Fully_Automatic_VMM.pdf",

  cabinet: "/pdf/Automatic_VMM_With_Cabinet.pdf",

  vms: "/pdf/VMS_VMM.pdf",
}

// ============================================================
// PRODUCTS
// ============================================================

export const products: Product[] = [
  // ==========================================================
  // 01. MANUAL VMM
  // ==========================================================

  {
    slug: "manual-vmm",

    name: "Manual VMM",

    family: "Video Measuring Machine",

    category: "Manual",

    badge: "Operator controlled",

    summary:
      "A dependable optical measurement platform for precise dimensional inspection with manual X/Y/Z axis control.",

    travel:
      "200 × 100 × 150 mm → 400 × 300 × 200 mm",

    image: catalogImages.manual,

    brochure: catalogBrochures.manual,

    imageAlt:
      "CRYSTAL Manual Video Measuring Machine for precision dimensional inspection",

    seoTitle:
      "Manual VMM | Manual Video Measuring Machine | CRYSTAL",

    seoDescription:
      "Explore CRYSTAL Manual VMM systems for precision dimensional measurement and industrial inspection with manual X/Y/Z axis control.",

    applications: [
      "Precision component inspection",
      "Dimensional measurement",
      "Automotive component inspection",
      "Tool and die inspection",
      "Electronics component inspection",
      "Industrial quality control",
    ],

    highlights: [
      "Industrial-grade color CCD camera",
      "Manual zoom objective 0.7–4.5X",
      "18–195X magnification",
      "0.5 μm linear scale resolution",
      "Programmable LED 8-section ring surface light",
      "LED bottom parallel light",
      "X/Y/Z axis manual control",
    ],

    variants: [
      {
        model: "AA-9011M",
        travel: "200 × 100 × 150",
      },
      {
        model: "AA-9012M",
        travel: "300 × 200 × 200",
      },
      {
        model: "AA-9013M",
        travel: "400 × 300 × 200",
      },
    ],

    specifications: [
      {
        label: "Dimension (mm) (L × W × H)",
        values: [
          "540 × 540 × 860",
          "665 × 670 × 915",
          "724 × 855 × 915",
        ],
      },

      {
        label: "Measuring Range (mm) (X × Y × Z)",
        values: [
          "200 × 100 × 150",
          "300 × 200 × 200",
          "400 × 300 × 200",
        ],
      },

      {
        label: "Measuring Accuracy (μm)",
        values: [
          "2.5 + L/100",
          "2.5 + L/100",
          "2.5 + L/100",
        ],
      },

      {
        label: "Repeatability (μm)",
        values: [
          "2.5",
          "2.5",
          "2.5",
        ],
      },

      {
        label: "Weight (kg)",
        values: [
          "150",
          "200",
          "255",
        ],
      },

      {
        label: "CCD",
        values: [
          "Industrial-grade color CCD camera",
          "Industrial-grade color CCD camera",
          "Industrial-grade color CCD camera",
        ],
      },

      {
        label: "Lens",
        values: [
          "Manual zoom objective 0.7–4.5X",
          "Manual zoom objective 0.7–4.5X",
          "Manual zoom objective 0.7–4.5X",
        ],
      },

      {
        label: "Magnification",
        values: [
          "18–195X",
          "18–195X",
          "18–195X",
        ],
      },

      {
        label: "Field of View (mm)",
        values: [
          "8.1–1.3",
          "8.1–1.3",
          "8.1–1.3",
        ],
      },

      {
        label: "Working Distance (mm)",
        values: [
          "80",
          "80",
          "80",
        ],
      },

      {
        label: "Linear Scale Resolution (μm)",
        values: [
          "0.5 (0.1 optional)",
          "0.5 (0.1 optional)",
          "0.5 (0.1 optional)",
        ],
      },

      {
        label: "Driving System",
        values: [
          "X/Y/Z axis manual control",
          "X/Y/Z axis manual control",
          "X/Y/Z axis manual control",
        ],
      },

      {
        label: "Illumination",
        values: [
          "Programmable LED 8-section ring surface light; LED bottom parallel light",
          "Programmable LED 8-section ring surface light; LED bottom parallel light",
          "Programmable LED 8-section ring surface light; LED bottom parallel light",
        ],
      },
    ],
  },

  // ==========================================================
  // 02. SEMI AUTOMATIC VMM
  // ==========================================================

  {
    slug: "semi-automatic-vmm",

    name: "Semi Automatic VMM",

    family: "Video Measuring Machine",

    category: "Semi-auto",

    badge: "Signal feedback",

    summary:
      "A semi-automatic optical measurement system combining manual X/Y operation with CNC-controlled Z-axis movement.",

    travel:
      "200 × 100 × 150 mm → 400 × 300 × 200 mm",

    image: catalogImages.semi,

    brochure: catalogBrochures.semiAutomatic,

    imageAlt:
      "CRYSTAL Semi Automatic Video Measuring Machine for precision inspection",

    seoTitle:
      "Semi Automatic VMM | Video Measuring Machine | CRYSTAL",

    seoDescription:
      "Explore CRYSTAL Semi Automatic VMM systems with manual X/Y operation and CNC Z-axis control for precision dimensional inspection.",

    applications: [
      "Precision dimensional inspection",
      "Automotive component measurement",
      "Industrial component inspection",
      "Tool and die measurement",
      "Electronics inspection",
      "Quality control",
    ],

    highlights: [
      "Industrial-grade color CCD camera",
      "0.7–4.5X manual zoom lens",
      "CNC-controlled Z axis",
      "0.5 μm linear scale resolution",
      "LED surface illumination",
      "LED parallel contour illumination",
      "2-axis measurement software",
    ],

    variants: [
      {
        model: "AA-9021SA",
        travel: "200 × 100 × 150",
      },
      {
        model: "AA-9022SA",
        travel: "300 × 200 × 200",
      },
      {
        model: "AA-9023SA",
        travel: "400 × 300 × 200",
      },
    ],

    specifications: [
      {
        label: "Dimension (mm) (L × W × H)",
        values: [
          "550 × 540 × 930",
          "600 × 740 × 980",
          "700 × 840 × 980",
        ],
      },

      {
        label: "Measuring Range (mm) (X × Y × Z)",
        values: [
          "200 × 100 × 150",
          "300 × 200 × 200",
          "400 × 300 × 200",
        ],
      },

      {
        label: "Measuring Accuracy (μm)",
        values: [
          "2.5 + L/100",
          "2.5 + L/100",
          "2.6 + L/100",
        ],
      },

      {
        label: "Repeatability (μm)",
        values: [
          "±2.5",
          "±2.5",
          "±3",
        ],
      },

      {
        label: "Weight (kg)",
        values: [
          "130",
          "180",
          "230",
        ],
      },

      {
        label: "CCD",
        values: [
          "Industrial-grade color CCD camera",
          "Industrial-grade color CCD camera",
          "Industrial-grade color CCD camera",
        ],
      },

      {
        label: "Lens",
        values: [
          "Manual lens with 0.7–4.5X magnification",
          "Manual lens with 0.7–4.5X magnification",
          "Manual lens with 0.7–4.5X magnification",
        ],
      },

      {
        label: "Linear Scale Resolution (μm)",
        values: [
          "0.5 (0.1 optional)",
          "0.5 (0.1 optional)",
          "0.5 (0.1 optional)",
        ],
      },

      {
        label: "Driving System",
        values: [
          "Manual X/Y + CNC Z",
          "Manual X/Y + CNC Z",
          "Manual X/Y + CNC Z",
        ],
      },

      {
        label: "Illumination",
        values: [
          "LED surface light and parallel contour illumination",
          "LED surface light and parallel contour illumination",
          "LED surface light and parallel contour illumination",
        ],
      },
    ],
  },

  // ==========================================================
  // 03. FULLY AUTOMATIC VMM
  // ==========================================================

  {
    slug: "cnc-auto-vmm",

    name: "Fully Automatic VMM",

    family: "Video Measuring Machine",

    category: "CNC auto",

    badge: "Programmable inspection",

    summary:
      "A CNC-controlled video measuring system designed for automated and repeatable dimensional inspection.",

    travel:
      "200 × 200 × 200 mm → 400 × 300 × 200 mm",

    image: catalogImages.automatic,

    brochure: catalogBrochures.fullyAutomatic,

    imageAlt:
      "CRYSTAL Fully Automatic CNC Video Measuring Machine for automated inspection",

    seoTitle:
      "Fully Automatic VMM | CNC Video Measuring Machine | CRYSTAL",

    seoDescription:
      "Explore CRYSTAL Fully Automatic CNC VMM systems for automated, repeatable and precise dimensional measurement and inspection.",

    applications: [
      "Automated dimensional inspection",
      "High-volume component inspection",
      "Automotive quality control",
      "Precision engineering",
      "Production line inspection",
      "Repeatable measurement",
    ],

    highlights: [
      "CNC automatic measurement",
      "Automatic zoom system",
      "High-resolution CCD camera",
      "AC servo motor drive",
      "Programmable LED illumination",
      "3-axis measurement capability",
      "2D and 3D measurement software",
    ],

    variants: [
      {
        model: "AA-9031A",
        travel: "200 × 200 × 200",
      },
      {
        model: "AA-9032A",
        travel: "300 × 200 × 200",
      },
      {
        model: "AA-9033A",
        travel: "400 × 300 × 200",
      },
    ],

    specifications: [
      {
        label: "Measuring Range (mm) (X × Y × Z)",
        values: [
          "200 × 200 × 200",
          "300 × 200 × 200",
          "400 × 300 × 200",
        ],
      },

      {
        label: "Measuring Accuracy (μm)",
        values: [
          "2.5 + L/100",
          "2.5 + L/100",
          "2.5 + L/100",
        ],
      },

      {
        label: "Repeatability (μm)",
        values: [
          "2.5",
          "2.5",
          "2.5",
        ],
      },

      {
        label: "CCD",
        values: [
          "High-resolution CCD camera",
          "High-resolution CCD camera",
          "High-resolution CCD camera",
        ],
      },

      {
        label: "Lens",
        values: [
          "Automatic zoom system",
          "Automatic zoom system",
          "Automatic zoom system",
        ],
      },

      {
        label: "Driving System",
        values: [
          "CNC control with servo motor drive",
          "CNC control with servo motor drive",
          "CNC control with servo motor drive",
        ],
      },

      {
        label: "Illumination",
        values: [
          "Programmable LED surface and bottom illumination",
          "Programmable LED surface and bottom illumination",
          "Programmable LED surface and bottom illumination",
        ],
      },
    ],
  },

  // ==========================================================
  // 04. AUTOMATIC VMM WITH CABINET
  // ==========================================================

  {
    slug: "automatic-vmm-cabinet",

    name: "Automatic VMM with Cabinet",

    family: "Video Measuring Machine",

    category: "Cabinet integrated",

    badge: "Enclosed CNC system",

    summary:
      "A fully enclosed CNC video measuring system with servo-driven axes, automatic zoom and integrated machine cabinet.",

    travel:
      "300 × 200 × 200 mm → 600 × 500 × 200 mm",

    image: catalogImages.cabinet,

    brochure: catalogBrochures.cabinet,

    imageAlt:
      "CRYSTAL Automatic Video Measuring Machine with Cabinet for CNC inspection",

    seoTitle:
      "Automatic VMM with Cabinet | CNC Video Measuring Machine | CRYSTAL",

    seoDescription:
      "Explore CRYSTAL Automatic VMM systems with integrated cabinet, CNC servo drive and automatic zoom for precision dimensional inspection.",

    applications: [
      "Automated dimensional inspection",
      "Production quality control",
      "Automotive component measurement",
      "Precision manufacturing",
      "High-volume inspection",
      "CNC measurement applications",
    ],

    highlights: [
      "CNC controlled measurement",
      "High-precision servo motor drive",
      "1–10X automatic zoom lens",
      "1.3MP digital camera",
      "Programmable LED 8-zone ring surface light",
      "LED bottom parallel light",
      "Integrated machine cabinet",
    ],

    variants: [
      {
        model: "AA-9041AC",
        travel: "300 × 200 × 200",
      },
      {
        model: "AA-9042AC",
        travel: "400 × 300 × 200",
      },
      {
        model: "AA-9043AC",
        travel: "500 × 400 × 200",
      },
      {
        model: "AA-9044AC",
        travel: "600 × 500 × 200",
      },
    ],

    specifications: [
      {
        label: "Dimension (mm) (X/Y/Z)",
        values: [
          "650 / 950 / 1740",
          "730 / 1040 / 1740",
          "790 / 1130 / 1760",
          "890 / 1370 / 1780",
        ],
      },

      {
        label: "Measuring Range (mm) (X/Y/Z)",
        values: [
          "300 / 200 / 200",
          "400 / 300 / 200",
          "500 / 400 / 200",
          "600 / 500 / 200",
        ],
      },

      {
        label: "Measuring Accuracy (μm)",
        values: [
          "2 + L/100",
          "2 + L/100",
          "2.5 + L/100",
          "2.5 + L/100",
        ],
      },

      {
        label: "Repeatability (μm)",
        values: [
          "2",
          "2",
          "2.5",
          "2.5",
        ],
      },

      {
        label: "Weight (kg)",
        values: [
          "380",
          "530",
          "640",
          "715",
        ],
      },

      {
        label: "CCD",
        values: [
          "1.3MP digital camera",
          "1.3MP digital camera",
          "1.3MP digital camera",
          "1.3MP digital camera",
        ],
      },

      {
        label: "Lens",
        values: [
          "1–10X automatic zoom lens",
          "1–10X automatic zoom lens",
          "1–10X automatic zoom lens",
          "1–10X automatic zoom lens",
        ],
      },

      {
        label: "Magnification",
        values: [
          "18–195X",
          "18–195X",
          "18–195X",
          "18–195X",
        ],
      },

      {
        label: "FOV (mm)",
        values: [
          "8.1–1.3",
          "8.1–1.3",
          "8.1–1.3",
          "8.1–1.3",
        ],
      },

      {
        label: "Working Distance (mm)",
        values: [
          "80",
          "80",
          "80",
          "80",
        ],
      },

      {
        label: "Linear Scale Resolution (μm)",
        values: [
          "0.5 (0.1 optional)",
          "0.5 (0.1 optional)",
          "0.5 (0.1 optional)",
          "0.5 (0.1 optional)",
        ],
      },

      {
        label: "Driving System",
        values: [
          "CNC control; high-precision servo motor drive",
          "CNC control; high-precision servo motor drive",
          "CNC control; high-precision servo motor drive",
          "CNC control; high-precision servo motor drive",
        ],
      },

      {
        label: "Illumination",
        values: [
          "Programmable LED 8-zone ring surface light; LED bottom parallel light",
          "Programmable LED 8-zone ring surface light; LED bottom parallel light",
          "Programmable LED 8-zone ring surface light; LED bottom parallel light",
          "Programmable LED 8-zone ring surface light; LED bottom parallel light",
        ],
      },
    ],
  },

  // ==========================================================
  // 05. VMS VMM
  // ==========================================================

  {
    slug: "vms-manual",

    name: "VMS VMM",

    family: "Video Measuring Machine",

    category: "Manual",

    badge: "Manual adjustment",

    summary:
      "A manual video measuring system designed for accurate dimensional inspection with manual zoom and optical measurement.",

    travel:
      "200 × 100 × 150 mm → 400 × 300 × 200 mm",

    image: catalogImages.vms,

    brochure: catalogBrochures.vms,

    imageAlt:
      "CRYSTAL VMS Video Measuring Machine for manual dimensional inspection",

    seoTitle:
      "VMS VMM | Video Measuring Machine | CRYSTAL",

    seoDescription:
      "Explore CRYSTAL VMS VMM systems with manual adjustment, manual zoom optics and precision dimensional measurement capabilities.",

    applications: [
      "Dimensional inspection",
      "Precision component measurement",
      "Tool inspection",
      "Automotive component inspection",
      "Electronics measurement",
      "Industrial quality control",
    ],

    highlights: [
      "Industrial-grade CCD camera",
      "Manual zoom lens 0.7–4.5X",
      "18–188X magnification",
      "0.001 mm linear scale resolution",
      "LED surface illumination",
      "Parallel LED bottom light",
      "Manual adjustment system",
    ],

    variants: [
      {
        model: "AA-9051V",
        travel: "200 × 100 × 150",
      },
      {
        model: "AA-9052V",
        travel: "300 × 200 × 200",
      },
      {
        model: "AA-9053V",
        travel: "400 × 300 × 200",
      },
    ],

    specifications: [
      {
        label: "Dimension (mm) (L × W × H)",
        values: [
          "550 × 540 × 880",
          "600 × 740 × 930",
          "700 × 840 × 930",
        ],
      },

      {
        label: "Measuring Range (mm) (X × Y × Z)",
        values: [
          "200 × 100 × 150",
          "300 × 200 × 200",
          "400 × 300 × 200",
        ],
      },

      {
        label: "Measuring Accuracy (μm)",
        values: [
          "2.5 + L/100",
          "2.5 + L/100",
          "2.5 + L/100",
        ],
      },

      {
        label: "Repeatability (μm)",
        values: [
          "2.5",
          "2.5",
          "2.5",
        ],
      },

      {
        label: "Weight (kg)",
        values: [
          "140",
          "190",
          "240",
        ],
      },

      {
        label: "Image Measurement CCD",
        values: [
          "Industrial-grade CCD camera",
          "Industrial-grade CCD camera",
          "Industrial-grade CCD camera",
        ],
      },

      {
        label: "Lens",
        values: [
          "Manual dented zoom lens 0.7–4.5X",
          "Manual dented zoom lens 0.7–4.5X",
          "Manual dented zoom lens 0.7–4.5X",
        ],
      },

      {
        label: "Magnification",
        values: [
          "18–188X",
          "18–188X",
          "18–188X",
        ],
      },

      {
        label: "FOV",
        values: [
          "8.1–1.3 mm",
          "8.1–1.3 mm",
          "8.1–1.3 mm",
        ],
      },

      {
        label: "Working Distance",
        values: [
          "108 mm",
          "108 mm",
          "108 mm",
        ],
      },

      {
        label: "Linear Scale Resolution",
        values: [
          "0.001 mm",
          "0.001 mm",
          "0.001 mm",
        ],
      },

      {
        label: "Illumination",
        values: [
          "LED surface light, parallel LED bottom light, manual adjustment",
          "LED surface light, parallel LED bottom light, manual adjustment",
          "LED surface light, parallel LED bottom light, manual adjustment",
        ],
      },
    ],
  },
]

// ============================================================
// PRODUCT CATEGORIES
// ============================================================

export const categories = [
  "All systems",
  "Manual",
  "Semi-auto",
  "CNC auto",
  "Cabinet integrated",
] as const

// ============================================================
// GET PRODUCT BY SLUG
// ============================================================

export function getProduct(slug: string) {
  return products.find(
    (product) => product.slug === slug
  )
}
