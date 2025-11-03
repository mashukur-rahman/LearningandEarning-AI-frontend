# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16 frontend application called "Learning&Earning AI" - a marketplace platform where users can hire talents (buyers) or get hired (sellers). The application features authentication pages, a responsive navigation system, and uses Tailwind CSS for styling.

## Tech Stack

- **Framework**: Next.js 16.0.1 with App Router
- **Language**: TypeScript 5
- **React**: 19.2.0
- **Styling**: Tailwind CSS 4 with @tailwindcss/postcss
- **Linting**: ESLint 9
- **Fonts**: Geist and Geist Mono from Next.js Font

## Project Structure

```
app/
├── layout.tsx           # Root layout with metadata and global styles
├── page.tsx             # Home page with Navbar and HeroSection
├── globals.css          # Global styles imported in layout
├── HeroSection.tsx      # Hero section component for home page
├── login/
│   └── page.tsx         # Login form page with email/password and Google OAuth
└── registration/
    └── page.tsx         # Registration form with buyer/seller role selection

components/
└── Navbar.tsx           # Responsive navigation with mobile hamburger menu
```

## Development Commands

```bash
# Start development server (runs on http://localhost:3000)
npm run dev

# Build the project for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## Design & Styling Architecture

The project uses a dark-themed design with glass morphism effects:

- **Dark Background**: Black background (`bg-black`) for the main layout
- **Glass Effect Components**: Modal cards and containers use `bg-white/5`, `border-white/10`, and `backdrop-blur-md` for a frosted glass aesthetic
- **Mesh Gradients**: Subtle animated gradients using positioned divs with `blur-3xl` for visual depth
- **Responsive Design**: Tailwind's responsive prefixes (sm, md, lg) for mobile-first design
- **Color Scheme**: White text, blue accents (`blue-600`, `blue-700`), and grayscale UI elements

### Common Styling Patterns

- Form inputs: `border-white/20 bg-white/5` with focus states upgrading to `border-white/40 bg-white/10`
- Buttons: Blue background (`bg-blue-600`) with hover state (`hover:bg-blue-700`)
- Links: Blue text (`text-blue-400`) with hover effects (`hover:text-blue-300`)
- Containers: Use `rounded-2xl` for cards, `rounded-lg` for form elements

## Key Features & Implementation Details

### Authentication Pages

Both `/login` and `/registration` pages are client components (`"use client"`), managing local form state with `useState`. Forms include:

- Email/password inputs with validation
- Google OAuth integration (UI only, backend not connected)
- Form state management via `handleChange` and `handleSubmit`
- Links to navigate between login and registration

The registration page adds a **role selection feature**: users can choose to register as either a "Buyer" (hire talents) or "Seller" (get hired) with visual radio button toggles.

### Navigation Component

The `Navbar` component (`components/Navbar.tsx`) provides:

- **Desktop Navigation**: Horizontal menu with links (Hire Talents, Get Hired, About Us, Contact) and action buttons (Login, Registration)
- **Mobile Navigation**: Hamburger menu that expands/collapses with animated icon transformation
- **Responsive Design**: Uses `hidden md:flex` and `md:hidden` to switch layouts
- **Props**: Accepts optional `className` prop for customization

## Type Definitions & Path Aliases

- **Path Alias**: `@/*` points to the root directory for clean imports
- **TypeScript**: Strict mode enabled
- **Component Props**: Use TypeScript interfaces for type safety (see `NavbarProps`, `NavLink` in Navbar)

## Styling Configuration

- **PostCSS**: Configured to use `@tailwindcss/postcss` plugin
- **Tailwind**: Latest version (v4) with @tailwindcss/postcss integration
- **HTML Dark Mode**: Root `<html>` element has `className="dark"` for dark mode theming

## Development Notes

### Common Development Tasks

1. **Adding New Pages**: Create a new folder in `app/` with a `page.tsx` file. Use the App Router conventions.
2. **Creating Components**: Use TypeScript interfaces for props in the `components/` directory.
3. **Styling**: Apply Tailwind classes directly; leverage the glass morphism patterns (backdrop-blur, white/opacity combinations) for visual consistency.
4. **Form Handling**: Use `useState` with `handleChange` and `handleSubmit` for client-side forms in pages marked with `"use client"`.

### Known Areas Requiring Backend Integration

- Login form submission (currently logs to console)
- Registration form submission (currently logs to console)
- Google OAuth integration (UI placeholder only)

### Code Quality

- ESLint is configured but no custom rules defined yet
- TypeScript strict mode is enforced
- No unit tests configured

## Metadata & Branding

The layout currently uses placeholder metadata:
- Title: "Create Next App"
- Description: "Generated by create next app"

Update these in `app/layout.tsx` to reflect the actual product name and description.
