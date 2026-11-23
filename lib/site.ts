export const SITE_URL = "https://armatechassociates.com"

export const COMPANY = {
  name: "Armatech Associates",
  brand: "CRYSTAL",
  tagline: "Precision Measurement Solutions",
}

export const ADDRESS = {
  lines: [
    "W-174 A, 'S' Block, M.I.D.C.,",
    "Bhosari Industrial Estate,",
    "Pune - 411 026 (India)",
  ],
  locality: "Pune",
  region: "Maharashtra",
  postalCode: "411026",
  country: "IN",
}

export const CONTACT = {
  landlines: ["+91 20 2712 2385", "+91 20 2712 0241"],
  mobile: "+91 70209 91684",
  email: "armatechsales@gmail.com",
  hours: [
    "Mon - Sun: 9:00 AM - 6:00 PM",
    "Thursday: Closed",
  ],
  whatsapp: "917020991684",
}

export function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`
}

export function mailtoHref(email = CONTACT.email) {
  return `mailto:${email}`
}

export function whatsappHref(message: string) {
  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`
}
