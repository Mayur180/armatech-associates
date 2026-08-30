import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'
import { SiteNav } from '@/components/site-nav'
export const metadata: Metadata = { title: { default: 'ArmaTech Associates | Precision Measurement', template: '%s | ArmaTech Associates' }, description: 'Precision measurement and quality control solutions for modern manufacturing.', metadataBase: new URL('https://armatechassociates.com'), openGraph: { title: 'ArmaTech Associates', description: 'Precision measurement and quality control solutions for modern manufacturing.', type: 'website' } }
export const viewport: Viewport = { colorScheme: 'light', themeColor: '#f6f4ed' }
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en" className="bg-background"><body><SiteNav />{children}{process.env.NODE_ENV==='production'&&<Analytics/>}</body></html>}
