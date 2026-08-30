export type Product = {
  slug: string
  name: string
  family: string
  category: 'Manual' | 'Semi-auto' | 'CNC auto' | 'Cabinet integrated'
  badge: string
  summary: string
  travel: string
  price?: string
  image: string
  brochure: string
  highlights: string[]
  variants: { model: string; travel: string; price?: string }[]
}

export const catalogImages = {
  manual: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Maunal-klp4aAPNzXbjrr7ziejd9rX05TcxCv.png',
  semi: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-mV2NZtmGAsbVhrL9C3AgC3d33O6u18.png',
  automatic: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Semi%20automatic-rbMWZ1JdWU46BpMwjfMkonmT90oXRL.png',
  cabinet: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/automatic%20with%20cabinet-HTGIrTPnrFtM7wZghaeC4nfuyU9Z3F.png',
}

export const catalogBrochures = {
  manual: 'https://blobs.vusercontent.net/blob/VMM-catalog%201-AVSXq7UUFKs3md35QB7w7o1sEEr216.pdf',
  automatic: 'https://blobs.vusercontent.net/blob/VMM-catalog%202-xQfPHobuJWHvbUw9cAVuZFjw9RCFNZ.pdf',
}

export const products: Product[] = [
  {
    slug: 'manual-vmm', name: 'Manual VMM', family: 'Video Measuring Machine', category: 'Manual', badge: 'Operator controlled',
    summary: 'A dependable optical measurement platform for precise inspection at the operator’s pace.', travel: '200 × 100 × 150 mm → 400 × 300 × 200 mm', image: catalogImages.manual, brochure: catalogBrochures.manual,
    highlights: ['High-accuracy marble worktable and column', '0.7–4.5X manual dented zoom lens', 'Industrial-grade high-resolution CCD camera', '0.5μm glass linear scale; 0.1μm optional', 'LED parallel contour + 3-ring surface illumination'],
    variants: [{ model: 'AA-9011M', travel: '200 × 100 × 150', price: '2,700' }, { model: 'AA-9012M', travel: '300 × 200 × 200', price: '3,000' }, { model: 'AA-9013M', travel: '400 × 300 × 200', price: '3,600' }],
  },
  {
    slug: 'semi-automatic-vmm', name: 'Semi-Auto VMM', family: 'Video Measuring Machine', category: 'Semi-auto', badge: 'Signal feedback',
    summary: 'Manual optics paired with servo-assisted movement for faster, repeatable measurement cycles.', travel: '200 × 100 × 150 mm → 400 × 300 × 200 mm', image: catalogImages.semi, brochure: catalogBrochures.manual,
    highlights: ['High-accuracy marble worktable and column', '0.7–4.5X manual zoom lens with signal feedback', 'AC servo motor for assisted positioning', '0.5μm glass linear scale; 0.1μm optional', '0–255 stepless 3-ring, 8-division surface LED'],
    variants: [{ model: 'AA-9021SA', travel: '200 × 100 × 150', price: '3,100' }, { model: 'AA-9022SA', travel: '300 × 200 × 200', price: '3,450' }, { model: 'AA-9023SA', travel: '400 × 300 × 200', price: '4,200' }],
  },
  {
    slug: 'cnc-auto-vmm', name: 'CNC Auto VMM', family: 'Video Measuring Machine', category: 'CNC auto', badge: 'Programmable inspection',
    summary: 'A programmable vision system for repeatable inspection sequences and production-ready accuracy.', travel: '200 × 200 × 200 mm → 400 × 300 × 200 mm', image: catalogImages.automatic, brochure: catalogBrochures.automatic,
    highlights: ['1.3MP industrial-grade colour CCD camera', 'Automatic zoom lens', '2.5 + L/100 μm accuracy; ±2.5μm repeatability', 'Programmable LED 8-zone ring surface light', 'LED bottom parallel light'],
    variants: [{ model: 'AA-9031A', travel: '200 × 200 × 200' }, { model: 'AA-9032A', travel: '300 × 200 × 200', price: '7,200' }, { model: 'AA-9033A', travel: '400 × 300 × 200', price: '7,900' }],
  },
  {
    slug: 'automatic-vmm-cabinet', name: 'Automatic VMM with Cabinet', family: 'Video Measuring Machine', category: 'Cabinet integrated', badge: 'Cabinet integrated',
    summary: 'A fully enclosed automatic platform that combines CNC control, servo drive and a heavy-duty cabinet.', travel: '300 × 200 × 200 mm → 600 × 500 × 200 mm', image: catalogImages.cabinet, brochure: catalogBrochures.automatic,
    highlights: ['CNC control with servo motor drive', 'Joystick plus mouse/keyboard control', '1.3MP digital camera + 1–10X automatic zoom', '18–185X magnification; 8.1–1.3mm FOV', '0.5μm scale resolution; 0.1μm optional'],
    variants: [{ model: 'AA-9041AC', travel: '300 × 200 × 200' }, { model: 'AA-9042AC', travel: '400 × 300 × 200' }, { model: 'AA-9043AC', travel: '500 × 400 × 200' }, { model: 'AA-9044AC', travel: '600 × 500 × 200' }],
  },
  {
    slug: 'vms-manual', name: 'VMS Manual', family: 'Vision Measuring System', category: 'Manual', badge: 'Compact industrial',
    summary: 'A compact cast-iron vision system for practical shop-floor dimensional inspection.', travel: '200 × 100 × 150 mm → 400 × 300 × 200 mm', image: catalogImages.manual, brochure: catalogBrochures.manual,
    highlights: ['Cast-iron worktable and compact industrial design', '0.7–4.5X manual zoom lens; 18–188X magnification', '1μm XY linear scale (0.001mm)', '2.5 + L/100 μm accuracy; 2.5μm repeatability', 'Single-zone surface + parallel bottom LED light'],
    variants: [{ model: 'AA-9051V', travel: '200 × 100 × 150', price: '2,350' }, { model: 'AA-9052V', travel: '300 × 200 × 200', price: '2,450' }, { model: 'AA-9053V', travel: '400 × 300 × 200' }],
  },
]

export function getProduct(slug: string) { return products.find((product) => product.slug === slug) }
export const categories = ['All systems', 'Manual', 'Semi-auto', 'CNC auto', 'Cabinet integrated']
