import { parsePhoneNumberFromString, CountryCode } from "libphonenumber-js"

type BuildWaLinkOptions = {
  number?: string // optional -> share-only link if omitted
  message?: string
  preferWaMe?: boolean // uses https://wa.me when true, else api.whatsapp.com
  deepLink?: boolean // use whatsapp:// scheme (mobile apps)
  defaultCountry?: CountryCode // used when number has no country code
}

export function buildWhatsAppLink({
  number,
  message,
  preferWaMe = true,
  deepLink = false,
  defaultCountry = "IN",
}: BuildWaLinkOptions) {
  const text = message ? encodeURIComponent(message) : ""

  // If no number -> share-only link (opens WhatsApp with text prefilled)
  if (!number) {
    const base = deepLink ? "whatsapp://send" : "https://api.whatsapp.com/send"
    return text ? `${base}?text=${text}` : base
  }

  // Normalize phone
  const parsed = parsePhoneNumberFromString(number, defaultCountry)
  if (!parsed || !parsed.isValid()) {
    throw new Error(
      "Invalid phone number. Provide an international-format number or a valid local number with defaultCountry."
    )
  }

  // wa.me wants digits only (no leading +)
  const digitsOnly = parsed.number.replace("+", "")

  if (deepLink) {
    return `whatsapp://send?phone=${digitsOnly}${text ? `&text=${text}` : ""}`
  }

  if (preferWaMe) {
    return `https://wa.me/${digitsOnly}${text ? `?text=${text}` : ""}`
  }

  return `https://api.whatsapp.com/send?phone=${digitsOnly}${
    text ? `&text=${text}` : ""
  }`
}
