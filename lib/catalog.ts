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
    | 'Manual'
    | 'Semi-auto'
    | 'CNC auto'
    | 'Cabinet integrated'

  badge: string
  summary: string
  travel: string

  image: string
  brochure: string

  highlights: string[]

  variants: ProductVariant[]

  specifications: Specification[]
}


// ============================================================
// PRODUCT IMAGES
// ============================================================

export const catalogImages = {
  manual:
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Maunal-L8yjCFjZiWt6iCDQZhujqswIkFjqPo.png',

  semi:
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/semi-nIQvd99xxNXr13VTuwnMkOI3ip3YPp.png',

  automatic:
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/automatic-bPz5STarFfXkj1fNgBOz2KFbBnrSIY.png',

  cabinet:
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/automatic%20with%20cabinet-nMON6kS70ryrBN3q5uxzUV77A0oTbr.png',

  vms:
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/vms-UyN1lpNPu7hfXst0XeCpOdBG3w6paP.png',
}


// ============================================================
// PRODUCT PDF FILES
// ============================================================

export const catalogBrochures = {
  manual: '/pdf/Manual_VMM.pdf',

  semiAutomatic: '/pdf/Semi_Automatic_VMM.pdf',

  fullyAutomatic: '/pdf/Fully_Automatic_VMM.pdf',

  cabinet: '/pdf/Automatic_VMM_With_Cabinet.pdf',

  vms: '/pdf/VMS_VMM.pdf',
}


// ============================================================
// PRODUCTS
// ============================================================

export const products: Product[] = [

  // ==========================================================
  // MANUAL VMM
  // ==========================================================

  {
    slug: 'manual-vmm',

    name: 'Manual VMM',

    family: 'Video Measuring Machine',

    category: 'Manual',

    badge: 'Operator controlled',

    summary:
      'A dependable optical measurement platform for precise inspection at the operator’s pace.',

    travel:
      '200 × 100 × 150 mm → 400 × 300 × 200 mm',

    image: catalogImages.manual,

    brochure: catalogBrochures.manual,

    highlights: [
      'Industrial-grade color CCD camera',
      'Manual zoom objective 0.7–4.5X',
      '18–195X magnification',
      '0.5 micrometers linear scale resolution',
      'Programmable LED 8-section ring surface light',
      'LED bottom parallel light',
      'X/Y/Z axis manual control',
    ],

    variants: [
      {
        model: 'AA-9011M',
        travel: '200 × 100 × 150',
      },
      {
        model: 'AA-9012M',
        travel: '300 × 200 × 200',
      },
      {
        model: 'AA-9013M',
        travel: '400 × 300 × 200',
      },
    ],

    specifications: [
      {
        label: 'Dimension (mm) (L × W × H)',
        values: [
          '540 × 540 × 860',
          '665 × 670 × 915',
          '724 × 855 × 915',
        ],
      },
      {
        label: 'Measuring Range (mm) (X × Y × Z)',
        values: [
          '200 × 100 × 150',
          '300 × 200 × 200',
          '400 × 300 × 200',
        ],
      },
      {
        label: 'Measuring Accuracy (μm)',
        values: [
          '2.5 + L/100',
          '2.5 + L/100',
          '2.5 + L/100',
        ],
      },
      {
        label: 'Repeatability (μm)',
        values: [
          '2.5',
          '2.5',
          '2.5',
        ],
      },
      {
        label: 'Weight (kg)',
        values: [
          '150',
          '200',
          '255',
        ],
      },
      {
        label: 'CCD',
        values: [
          'Industrial-grade color CCD camera',
          'Industrial-grade color CCD camera',
          'Industrial-grade color CCD camera',
        ],
      },
      {
        label: 'Lens',
        values: [
          'Manual zoom objective 0.7–4.5X (electronic magnification feedback lens available as an option)',
          'Manual zoom objective 0.7–4.5X (electronic magnification feedback lens available as an option)',
          'Manual zoom objective 0.7–4.5X (electronic magnification feedback lens available as an option)',
        ],
      },
      {
        label: 'Magnification',
        values: [
          '18–195X',
          '18–195X',
          '18–195X',
        ],
      },
      {
        label: 'Field of View (mm)',
        values: [
          '8.1–1.3',
          '8.1–1.3',
          '8.1–1.3',
        ],
      },
      {
        label: 'Working Distance (mm)',
        values: [
          '80',
          '80',
          '80',
        ],
      },
      {
        label: 'Linear Scale Resolution (μm)',
        values: [
          '0.5 micrometers (0.1 micrometers as an option)',
          '0.5 micrometers (0.1 micrometers as an option)',
          '0.5 micrometers (0.1 micrometers as an option)',
        ],
      },
      {
        label: 'Driving System',
        values: [
          'X/Y/Z axis manual control',
          'X/Y/Z axis manual control',
          'X/Y/Z axis manual control',
        ],
      },
      {
        label: 'Illumination',
        values: [
          'Programmable LED 8 section ring surface light, LED bottom parallel light',
          'Programmable LED 8 section ring surface light, LED bottom parallel light',
          'Programmable LED 8 section ring surface light, LED bottom parallel light',
        ],
      },
    ],
  },


  // ==========================================================
  // SEMI AUTOMATIC VMM
  // ==========================================================

  {
    slug: 'semi-automatic-vmm',

    name: 'Semi-Auto VMM',

    family: 'Video Measuring Machine',

    category: 'Semi-auto',

    badge: 'Signal feedback',

    summary:
      'Manual optics paired with servo-assisted movement for faster, repeatable measurement cycles.',

    travel:
      '200 × 100 × 150 mm → 400 × 300 × 200 mm',

    image: catalogImages.semi,

    brochure: catalogBrochures.semiAutomatic,

    highlights: [
      'Industrial-grade color CCD camera',
      'Manual lens with 0.7 to 4.5X magnification',
      'Optional electronic magnification signal feedback lens',
      'Manual X/Y control with CNC Z-axis control',
      'Automatic focusing function',
      'Programmable LED 8-zone ring surface light',
      'LED bottom parallel light',
    ],

    variants: [
      {
        model: 'AA-9021SA',
        travel: '200 × 100 × 150',
      },
      {
        model: 'AA-9022SA',
        travel: '300 × 200 × 200',
      },
      {
        model: 'AA-9023SA',
        travel: '400 × 300 × 200',
      },
    ],

    specifications: [
      {
        label: 'Dimension (mm) (L × W × H)',
        values: [
          '550 × 540 × 930',
          '600 × 740 × 980',
          '700 × 840 × 980',
        ],
      },
      {
        label: 'Measuring Range (mm) (X × Y × Z)',
        values: [
          '200 × 100 × 150',
          '300 × 200 × 200',
          '400 × 300 × 200',
        ],
      },
      {
        label: 'Measuring Accuracy (μm)',
        values: [
          '2.5 + L/100',
          '2.5 + L/100',
          '2.6 + L/100',
        ],
      },
      {
        label: 'Repeatability (μm)',
        values: [
          '±2.5',
          '±2.5',
          '±3',
        ],
      },
      {
        label: 'Weight (kg)',
        values: [
          '130',
          '180',
          '230',
        ],
      },
      {
        label: 'CCD',
        values: [
          'Industrial-grade color CCD camera',
          'Industrial-grade color CCD camera',
          'Industrial-grade color CCD camera',
        ],
      },
      {
        label: 'Lens',
        values: [
          'Manual lens with 0.7 to 4.5X magnification',
          'Manual lens with 0.7 to 4.5X magnification',
          'Manual lens with 0.7 to 4.5X magnification',
        ],
      },
      {
        label: 'Magnification',
        values: [
          '18–195X',
          '18–195X',
          '18–195X',
        ],
      },
      {
        label: 'Field of View (mm)',
        values: [
          '8.1–1.5',
          '8.1–1.5',
          '8.1–1.5',
        ],
      },
      {
        label: 'Working Distance (mm)',
        values: [
          '80',
          '80',
          '80',
        ],
      },
      {
        label: 'Linear Scale Resolution (μm)',
        values: [
          '0.5 μm (0.1 μm optional)',
          '0.5 μm (0.1 μm optional)',
          '0.5 μm (0.1 μm optional)',
        ],
      },
      {
        label: 'Driving System',
        values: [
          'Manual control for X/Y axes, CNC full closed-loop motion control for Z axis including automatic focusing function',
          'Manual control for X/Y axes, CNC full closed-loop motion control for Z axis including automatic focusing function',
          'Manual control for X/Y axes, CNC full closed-loop motion control for Z axis including automatic focusing function',
        ],
      },
      {
        label: 'Illumination',
        values: [
          'Programmable LED 8-zone ring surface light, LED bottom parallel light (optional: 8-zone ring light, coaxial light)',
          'Programmable LED 8-zone ring surface light, LED bottom parallel light (optional: 8-zone ring light, coaxial light)',
          'Programmable LED 8-zone ring surface light, LED bottom parallel light (optional: 8-zone ring light, coaxial light)',
        ],
      },
    ],
  },


  // ==========================================================
  // FULLY AUTOMATIC VMM
  // ==========================================================

  {
    slug: 'cnc-auto-vmm',

    name: 'Fully Automatic VMM',

    family: 'Video Measuring Machine',

    category: 'CNC auto',

    badge: 'Programmable inspection',

    summary:
      'A programmable vision system for repeatable inspection sequences and production-ready accuracy.',

    travel:
      '200 × 200 × 200 mm → 400 × 300 × 200 mm',

    image: catalogImages.automatic,

    brochure: catalogBrochures.fullyAutomatic,

    highlights: [
      '1,300,000 pixel industrial-grade color CCD camera',
      'Automatic zoom lens',
      '24.7–160X magnification',
      '8.5–1.3 mm field of view',
      'CNC control with high-precision servo motors',
      'Joystick, mouse and keyboard control',
      'Programmable LED 8-zone ring surface light',
      'LED bottom parallel light',
    ],

    variants: [
      {
        model: 'AA-9031A',
        travel: '200 × 200 × 200',
      },
      {
        model: 'AA-9032A',
        travel: '300 × 200 × 200',
      },
      {
        model: 'AA-9033A',
        travel: '400 × 300 × 200',
      },
    ],

    specifications: [
      {
        label: 'Dimension (mm) (L / W / H)',
        values: [
          '540 / 830 / 1080',
          '640 / 830 / 1080',
          '740 / 980 / 1080',
        ],
      },
      {
        label: 'Measuring Range (mm) (X / Y / Z)',
        values: [
          '200 / 200 / 200',
          '300 / 200 / 200',
          '400 / 300 / 200',
        ],
      },
      {
        label: 'Measuring Accuracy (μm)',
        values: [
          '2.5 + L/100',
          '2.5 + L/100',
          '2.5 + L/100',
        ],
      },
      {
        label: 'Repeatability (μm)',
        values: [
          '2.5',
          '2.5',
          '2.5',
        ],
      },
      {
        label: 'Weight (kg)',
        values: [
          '140',
          '180',
          '230',
        ],
      },
      {
        label: 'CCD',
        values: [
          '1,300,000 pixels industrial-grade color CCD camera',
          '1,300,000 pixels industrial-grade color CCD camera',
          '1,300,000 pixels industrial-grade color CCD camera',
        ],
      },
      {
        label: 'Lens',
        values: [
          'Automatic zoom lens',
          'Automatic zoom lens',
          'Automatic zoom lens',
        ],
      },
      {
        label: 'Magnification',
        values: [
          '24.7–160X',
          '24.7–160X',
          '24.7–160X',
        ],
      },
      {
        label: 'Field of View',
        values: [
          '8.5–1.3 mm',
          '8.5–1.3 mm',
          '8.5–1.3 mm',
        ],
      },
      {
        label: 'Working Distance (mm)',
        values: [
          '80',
          '80',
          '80',
        ],
      },
      {
        label: 'Linear Scale Resolution (μm)',
        values: [
          '0.5 μm (0.1 μm optional)',
          '0.5 μm (0.1 μm optional)',
          '0.5 μm (0.1 μm optional)',
        ],
      },
      {
        label: 'Driving System',
        values: [
          'CNC control, driven by high-precision servo motors; handle control, mouse/keyboard control',
          'CNC control, driven by high-precision servo motors; handle control, mouse/keyboard control',
          'CNC control, driven by high-precision servo motors; handle control, mouse/keyboard control',
        ],
      },
      {
        label: 'Illumination',
        values: [
          'Programmable LED 8-zone ring surface light, LED bottom parallel light (Optional: 8-zone surround light, coaxial light)',
          'Programmable LED 8-zone ring surface light, LED bottom parallel light (Optional: 8-zone surround light, coaxial light)',
          'Programmable LED 8-zone ring surface light, LED bottom parallel light (Optional: 8-zone surround light, coaxial light)',
        ],
      },
    ],
  },


  // ==========================================================
  // AUTOMATIC VMM WITH CABINET
  // ==========================================================

  {
    slug: 'automatic-vmm-cabinet',

    name: 'Automatic VMM with Cabinet',

    family: 'Video Measuring Machine',

    category: 'Cabinet integrated',

    badge: 'Cabinet integrated',

    summary:
      'A fully enclosed automatic platform that combines CNC control, servo drive and a heavy-duty cabinet.',

    travel:
      '300 × 200 × 200 mm → 600 × 500 × 200 mm',

    image: catalogImages.cabinet,

    brochure: catalogBrochures.cabinet,

    highlights: [
      '1.3MP digital camera',
      '1–10X automatic zoom lens',
      '18–195X magnification',
      '8.1–1.3 mm field of view',
      'CNC control with high-precision servo motor drive',
      'Joystick and mouse/keyboard control',
      'Programmable LED 8-zone ring surface light',
      'LED bottom parallel light',
      'Optional coaxial light',
    ],

    variants: [
      {
        model: 'AA-9041AC',
        travel: '300 × 200 × 200',
      },
      {
        model: 'AA-9042AC',
        travel: '400 × 300 × 200',
      },
      {
        model: 'AA-9043AC',
        travel: '500 × 400 × 200',
      },
      {
        model: 'AA-9044AC',
        travel: '600 × 500 × 200',
      },
    ],

    specifications: [
      {
        label: 'Dimension (mm) (X / Y / Z)',
        values: [
          '650 / 950 / 1740',
          '730 / 1040 / 1740',
          '790 / 1130 / 1760',
          '890 / 1370 / 1780',
        ],
      },
      {
        label: 'Measuring Range (mm) (X / Y / Z)',
        values: [
          '300 / 200 / 200',
          '400 / 300 / 200',
          '500 / 400 / 200',
          '600 / 500 / 200',
        ],
      },
      {
        label: 'Measuring Accuracy (μm)',
        values: [
          '2 + L/100',
          '2 + L/100',
          '2.5 + L/100',
          '2.5 + L/100',
        ],
      },
      {
        label: 'Repeatability (μm)',
        values: [
          '2',
          '2',
          '2.5',
          '2.5',
        ],
      },
      {
        label: 'Weight (kg)',
        values: [
          '380',
          '530',
          '640',
          '715',
        ],
      },
      {
        label: 'CCD',
        values: [
          '1.3MP digital camera',
          '1.3MP digital camera',
          '1.3MP digital camera',
          '1.3MP digital camera',
        ],
      },
      {
        label: 'Lens',
        values: [
          '1–10X automatic zoom lens',
          '1–10X automatic zoom lens',
          '1–10X automatic zoom lens',
          '1–10X automatic zoom lens',
        ],
      },
      {
        label: 'Magnification',
        values: [
          '18–195X',
          '18–195X',
          '18–195X',
          '18–195X',
        ],
      },
      {
        label: 'FOV (mm)',
        values: [
          '8.1–1.3',
          '8.1–1.3',
          '8.1–1.3',
          '8.1–1.3',
        ],
      },
      {
        label: 'Working Distance (mm)',
        values: [
          '80',
          '80',
          '80',
          '80',
        ],
      },
      {
        label: 'Linear Scale Resolution (μm)',
        values: [
          '0.5 (optional 0.1)',
          '0.5 (optional 0.1)',
          '0.5 (optional 0.1)',
          '0.5 (optional 0.1)',
        ],
      },
      {
        label: 'Driving System',
        values: [
          'CNC control, high-precision servo motor drive, joystick, mouse/keyboard control',
          'CNC control, high-precision servo motor drive, joystick, mouse/keyboard control',
          'CNC control, high-precision servo motor drive, joystick, mouse/keyboard control',
          'CNC control, high-precision servo motor drive, joystick, mouse/keyboard control',
        ],
      },
      {
        label: 'Illumination',
        values: [
          'Programmable LED 8-zone ring surface light, LED bottom parallel light (optional coaxial light)',
          'Programmable LED 8-zone ring surface light, LED bottom parallel light (optional coaxial light)',
          'Programmable LED 8-zone ring surface light, LED bottom parallel light (optional coaxial light)',
          'Programmable LED 8-zone ring surface light, LED bottom parallel light (optional coaxial light)',
        ],
      },
    ],
  },


  // ==========================================================
  // VMS
  // ==========================================================

  {
    slug: 'vms-manual',

    name: 'VMS Manual',

    family: 'Vision Measuring Machine',

    category: 'Manual',

    badge: 'Compact industrial',

    summary:
      'A compact vision measuring machine for practical shop-floor dimensional inspection.',

    travel:
      '200 × 100 × 150 mm → 400 × 300 × 200 mm',

    image: catalogImages.vms,

    brochure: catalogBrochures.vms,

    highlights: [
      'Industrial-grade CCD camera',
      'Manual dented zoom lens 0.7–4.5X',
      '18–188X magnification',
      '0.001 mm linear scale resolution',
      '108 mm working distance',
      'LED surface light',
      'Parallel LED bottom light',
      'Manual adjustment',
    ],

    variants: [
      {
        model: 'AA-9051V',
        travel: '200 × 100 × 150',
      },
      {
        model: 'AA-9052V',
        travel: '300 × 200 × 200',
      },
      {
        model: 'AA-9053V',
        travel: '400 × 300 × 200',
      },
    ],

    specifications: [
      {
        label: 'Dimension (mm) (L / W / H)',
        values: [
          '550 × 540 × 880',
          '600 × 740 × 930',
          '700 × 840 × 930',
        ],
      },
      {
        label: 'Measuring Range (mm) (X / Y / Z)',
        values: [
          '200 × 100 × 150',
          '300 × 200 × 200',
          '400 × 300 × 200',
        ],
      },
      {
        label: 'Measuring Accuracy (μm)',
        values: [
          '2.5 + L/100',
          '2.5 + L/100',
          '2.5 + L/100',
        ],
      },
      {
        label: 'Repeatability (μm)',
        values: [
          '2.5',
          '2.5',
          '2.5',
        ],
      },
      {
        label: 'Weight (kg)',
        values: [
          '140',
          '190',
          '240',
        ],
      },
      {
        label: 'Image Measurement CCD',
        values: [
          'Industrial grade CCD camera',
          'Industrial grade CCD camera',
          'Industrial grade CCD camera',
        ],
      },
      {
        label: 'Lens',
        values: [
          'Manual dented zoom lens 0.7–4.5X',
          'Manual dented zoom lens 0.7–4.5X',
          'Manual dented zoom lens 0.7–4.5X',
        ],
      },
      {
        label: 'Magnification',
        values: [
          '18–188X',
          '18–188X',
          '18–188X',
        ],
      },
      {
        label: 'FOV',
        values: [
          '8.1–1.3 mm',
          '8.1–1.3 mm',
          '8.1–1.3 mm',
        ],
      },
      {
        label: 'Working Distance',
        values: [
          '108 mm',
          '108 mm',
          '108 mm',
        ],
      },
      {
        label: 'Linear Scale Resolution',
        values: [
          '0.001 mm',
          '0.001 mm',
          '0.001 mm',
        ],
      },
      {
        label: 'Illumination',
        values: [
          'LED surface light, parallel LED bottom light, manual adjustment',
          'LED surface light, parallel LED bottom light, manual adjustment',
          'LED surface light, parallel LED bottom light, manual adjustment',
        ],
      },
    ],
  },
]


// ============================================================
// GET PRODUCT
// ============================================================

export function getProduct(slug: string) {
  return products.find(
    (product) => product.slug === slug
  )
}


// ============================================================
// CATEGORIES
// ============================================================

export const categories = [
  'All systems',
  'Manual',
  'Semi-auto',
  'CNC auto',
  'Cabinet integrated',
]