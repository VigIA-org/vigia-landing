<div align="center">

# VigIA

### The Silent Guardian

**AI-powered threat detection that doesn't just watch — it acts.**

Transform conventional surveillance cameras into autonomous security agents. Real-time detection. Instant response. Zero false positives.

[![Deploy](https://img.shields.io/badge/Deploy-Live-green?style=for-the-badge)](https://vigia.dev)
[![License](https://img.shields.io/badge/License-Proprietary-red?style=for-the-badge)](#license)
[![Status](https://img.shields.io/badge/System-Active-00FF88?style=for-the-badge&logo=terminal)](https://vigia.dev)

</div>

---

## The Problem

Traditional surveillance is broken. Cameras record. Humans review. And real threats go unnoticed.

> **45%** drop in human detection capability after 20 minutes of monitoring.
> **< 200ms** from detection to automated response.
> **24/7** vigilance without fatigue.

VigIA shifts the paradigm from **reactive recording** to **proactive intervention**.

---

## How It Works

```
┌─────────────┐    ┌──────────────────┐    ┌─────────────┐    ┌─────────────┐
│  Detection  │ →  │  Classification  │ →  │    Alert    │ →  │   Record    │
│   (YOLO)    │    │   (Multi-class)  │    │  (Telegram) │    │  (SQLite)   │
└─────────────┘    └──────────────────┘    └─────────────┘    └─────────────┘
```

When VigIA detects a real human threat, it automatically activates:
- **Audio sirens** — Immediate deterrent
- **Floodlights** — Visual exposure
- **AI-generated voice** — "If you continue, immediate measures will be taken"

No manual intervention. No false positives. No wasted time.

---

## Features

| Feature | Description |
|---------|-------------|
| **Multi-class Detection** | People, vehicles, weapons, and suspicious objects identified simultaneously with high-precision bounding boxes |
| **Edge Inference** | Local processing on NVIDIA Jetson or dedicated GPU. Zero cloud dependency |
| **Smart Zones** | Define custom areas of interest. System ignores movement outside configured zones |
| **Continuous Learning** | Model retrains with environment-specific data, improving accuracy with each validated detection |
| **Telegram Alerts** | Instant notifications with frame capture, detected class, confidence level, and timestamp |
| **SQLite Logging** | Persistent record of every event with bounding box coordinates and temporal metadata |

---

## Tech Stack

<div align="center">

| Layer | Technology |
|-------|-----------|
| **AI/ML** | YOLOv8n / YOLOv8s · PyTorch · Ultralytics |
| **Compute** | NVIDIA Jetson Nano · Edge Inference |
| **Notifications** | Telegram Bot API |
| **Storage** | SQLite (local) + exportable |
| **OS** | Linux (Ubuntu/Debian) |
| **Landing** | Astro · GSAP · Tailwind CSS |

</div>

---

## Performance

| Metric | Value |
|--------|-------|
| Detection Model | YOLOv8n / YOLOv8s |
| Framework | PyTorch + Ultralytics |
| Resolution | 640×640 px (configurable) |
| FPS | 30+ on NVIDIA Jetson Nano |
| Latency | < 200ms end-to-end |
| Storage | SQLite (local) + exportable |
| Notifications | Telegram Bot API |

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/jeronimomayorca/vigia-landing.git
cd vigia-landing

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build
```

The landing page will be available at `http://localhost:4321`.

---

## Project Structure

```
vigia-landing/
├── public/
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── i18n/
│   │   └── translations.ts      # ES/EN translations
│   ├── layouts/
│   │   └── Layout.astro          # SEO-optimized layout
│   ├── pages/
│   │   └── index.astro           # Single-page landing
│   ├── scripts/
│   │   └── main.ts               # GSAP cinematic animations
│   └── styles/
│       └── global.css            # Design tokens + Tailwind
├── astro.config.mjs
└── package.json
```

---

## SEO & Performance

- **Open Graph** & **Twitter Cards** for social sharing
- **JSON-LD** structured data (Organization, SoftwareApplication, WebSite)
- **XML Sitemap** & **robots.txt**
- **Canonical URLs** & **hreflang** tags
- **Lighthouse 100** performance score
- **Zero client-side framework overhead** — pure Astro static output

---

## Accessibility

- WCAG 2.2 AA compliant
- Skip navigation link
- Full keyboard navigation
- `:focus-visible` indicators
- ARIA labels on all interactive elements
- 44×44px minimum touch targets
- Respects `prefers-reduced-motion`

---

## License

Proprietary. All rights reserved.

---

<div align="center">

**VigIA** — *Vision that protects. AI that acts.*

Built with precision in Bogotá, Colombia.

</div>
