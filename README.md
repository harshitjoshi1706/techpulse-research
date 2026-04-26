# TechPulse Research
A comparative web performance research project analyzing **Client-Side Rendering (CSR)**, **Server-Side Rendering (SSR)**, and **Static Site Generation (SSG)** using a real-world news application.

## Project Overview
This project was built to experimentally compare modern rendering strategies used in web development.

The same application (TechPulse News App) was implemented in 3 rendering architectures:

1. **CSR (Client-Side Rendering)** using React
2. **SSR (Server-Side Rendering)** using Next.js
3. **SSG (Static Site Generation)** using Next.js
4. **Backend API** built with Node.js + Express

Each implementation consumes the same API and renders identical content, allowing fair performance comparison.

---

## Research Objective
To analyze:

- Time To First Byte (TTFB)
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Total Blocking Time (TBT)
- Speed Index
- Hydration Cost
- JavaScript Execution Time
- User-perceived Performance

under different network conditions:

- Fast 4G
- Slow 4G
- 3G throttling
- No-cache refresh
- JavaScript disabled tests

---

## Tech Stack

### Frontend
- React
- Next.js
- JavaScript
- CSS

### Backend
- Node.js
- Express.js
- Axios
- CORS
- dotenv

### Testing Tools
- Chrome DevTools Lighthouse
- Network Throttling
- Performance Profiler
- WebPageTest (optional)

---

## Project Structure

```bash
techpulse-research/
│
├── techpulse-api/        # Express backend API
├── techpulse-csr/        # React CSR implementation
├── techpulse-ssr/        # Next.js SSR implementation
├── techpulse-ssg/        # Next.js SSG implementation
│
└── README.md
```

---

## Features
Common features implemented across all versions:

✅ News listing  
✅ Search functionality  
✅ Category filtering  
✅ Responsive UI  
✅ API integration  
✅ Loading states  
✅ Error handling  

---

## Rendering Architectures

## 1) CSR
Rendering happens in browser after JavaScript loads.

### Pros
- Rich interactivity
- Good SPA experience
- Lower server load

### Cons
- Slow initial load
- Blank screen before JS executes
- Higher JS cost

---

## 2) SSR
HTML generated on server for every request.

### Pros
- Fast initial content display
- Better SEO
- Better perceived performance

### Cons
- Hydration delay
- Server computation cost

---

## 3) SSG
HTML generated at build time.

### Pros
- Fastest loading
- CDN friendly
- Best caching
- Excellent SEO

### Cons
- Requires rebuild for fresh content

---

## Installation

Clone repository:

```bash
git clone https://github.com/harshitjoshi1706/techpulse-research.git
cd techpulse-research
```

Install dependencies:

```bash
cd techpulse-api && npm install
cd ../techpulse-csr && npm install
cd ../techpulse-ssr && npm install
cd ../techpulse-ssg && npm install
```

---

## Run Locally

### Start API

```bash
cd techpulse-api
npm run dev
```

### Start CSR

```bash
cd techpulse-csr
npm run dev
```

### Start SSR

```bash
cd techpulse-ssr
npm run dev
```

### Start SSG

```bash
cd techpulse-ssg
npm run dev
```

---

## Deployment
Suggested deployment:

Backend → Render  
CSR → Vercel  
SSR → Vercel  
SSG → Vercel  

---

## Experimental Findings (Expected)
Typical trend:

| Metric | CSR | SSR | SSG |
|-------|-----|-----|-----|
| TTFB | Fast | Medium | Fastest |
| FCP | Slow | Fast | Fastest |
| LCP | Slow | Fast | Fastest |
| SEO | Weak | Strong | Strongest |
| Interactivity | Good | Good after hydration | Excellent |
| JS Dependency | High | Medium | Low |

---

## Author
Harshit Joshi

MCA Student  
Research Project – Web Rendering Performance Analysis

---
