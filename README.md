# portfolio

Source code for [xbl.is-a.dev](https://xbl.is-a.dev). Built with Next.js 15 (App Router), React 19, Tailwind CSS v4, and Bun.

## Overview

- **Main site**: Project showcases, skills breakdown, and a live Spotify player card with dynamic color palette extraction.
- **Project pages**: Product showcases for Sink (Tauri/Rust Spotify client), SpoTuya (Tuya IoT + Spotify sync), and HyperBot.
- **Academic Timetable (`/cti/orar`)**: Interactive schedule viewer for UPB CTI Year 1 with automatic odd/even week parity calculation, group/semigroup filtering, and cookie persistence.
- **API routes**:
  - `/api/spotify`: Spotify Web API integration for current playback and recently played tracks.
  - `/api/subscribe`: Newsletter and waitlist registration via Kit (ConvertKit) with rate limiting and bot honeypot detection.

## Tech Stack

- Next.js 15 with Turbopack
- React 19
- Tailwind CSS v4
- Motion (Framer Motion)
- Radix UI primitives & Lucide icons
- Bun

## Development

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 20+

### Setup

```bash
git clone https://github.com/xbl4z3r/portfolio.git
cd portfolio
bun install
```

### Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

| Variable                    | Description                                                 |
| --------------------------- | ----------------------------------------------------------- |
| `WEB_SPOTIFY_CLIENT_ID`     | Spotify developer application client ID                     |
| `WEB_SPOTIFY_CLIENT_SECRET` | Spotify developer application client secret                 |
| `WEB_SPOTIFY_REFRESH_TOKEN` | Spotify OAuth refresh token (`user-read-currently-playing`) |
| `KIT_API_KEY`               | Kit v4 API key for email subscriptions                      |

_Note: The site runs locally without these variables; the Spotify widget and newsletter form will fail gracefully._

### Running Locally

```bash
bun dev
```

The app will be available at `http://localhost:3000`.

## Scripts

- `bun dev` – Start development server with Turbopack
- `bun run build` – Create production build
- `bun run start` – Run production server
- `bun run lint` – Run ESLint
- `bun run format:check` – Check code formatting with Prettier
- `bun run format:write` – Format files with Prettier

## License

[MIT](LICENSE)
