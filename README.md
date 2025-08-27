# WhatsApp Link Utility

> **TypeScript utility for generating WhatsApp chat/share links with phone number normalization and message support.**

[![npm version](https://badge.fury.io/js/@dxkit-org/whatsapp-link.svg)](https://www.npmjs.com/package/@dxkit-org/whatsapp-link)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

Generate WhatsApp chat or share links with proper phone number formatting and optional pre-filled messages. Supports both `wa.me` and `api.whatsapp.com` links, as well as deep links for mobile apps.

## Features

- � **WhatsApp Link Generation** - Create links to start chats or share messages
- 🌍 **Phone Number Normalization** - Uses `libphonenumber-js` for robust parsing
- ✉️ **Message Support** - Pre-fill messages in the chat
- � **wa.me / api.whatsapp.com / Deep Link** - Choose your preferred link type
- 🌐 **TypeScript** - Full type safety and IDE support

## Installation

```bash
npm install @dxkit-org/whatsapp-link libphonenumber-js
```

## Usage

```typescript
import { buildWhatsAppLink } from "@dxkit-org/whatsapp-link"

// Basic chat link
const url = buildWhatsAppLink({ number: "+919999999999" })
// https://wa.me/919999999999

// With message
const url2 = buildWhatsAppLink({ number: "+919999999999", message: "Hello!" })
// https://wa.me/919999999999?text=Hello%21

// Share-only (no number)
const url3 = buildWhatsAppLink({ message: "Check this out!" })
// https://api.whatsapp.com/send?text=Check%20this%20out%21

// Deep link (for mobile apps)
const url4 = buildWhatsAppLink({ number: "+919999999999", deepLink: true })
// whatsapp://send?phone=919999999999

// Use api.whatsapp.com instead of wa.me
const url5 = buildWhatsAppLink({ number: "+919999999999", preferWaMe: false })
// https://api.whatsapp.com/send?phone=919999999999
```

## API

### `buildWhatsAppLink(options)`

#### Options

| Name             | Type        | Description                                                          |
| ---------------- | ----------- | -------------------------------------------------------------------- |
| `number`         | string      | Phone number (international or local, optional for share-only links) |
| `message`        | string      | Message to pre-fill (optional)                                       |
| `preferWaMe`     | boolean     | Use `wa.me` (default: true). If false, uses `api.whatsapp.com`       |
| `deepLink`       | boolean     | Use `whatsapp://` deep link (default: false)                         |
| `defaultCountry` | CountryCode | Country code for parsing local numbers (default: "IN")               |

#### Returns

- `string` - The WhatsApp link URL

#### Throws

- Error if the phone number is invalid (when provided)

## Development

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Watch mode for development
npm run dev

# Type checking
npm run type-check
```

## License

MIT
