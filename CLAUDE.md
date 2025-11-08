# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16 frontend application called "Learning & Earning AI" - a comprehensive marketplace platform where users can hire talents (clients) or offer services (freelancers). The application features dual-role authentication, role-specific dashboards, a complete courses system with proctored testing, real-time messaging, and glass morphism UI design.

## Tech Stack

- **Framework**: Next.js 16.0.1 with App Router
- **Language**: TypeScript 5
- **React**: 19.2.0
- **Styling**: Tailwind CSS 4 with @tailwindcss/postcss
- **Linting**: ESLint 9
- **Fonts**: Geist and Geist Mono from Next.js Font

## Project Structure

```
```
app/
├── layout.tsx                      # Root layout with metadata, AuthProvider, global styles
├── page.tsx                        # Home page with Navbar and HeroSection
├── globals.css                     # Global Tailwind styles
├── HeroSection.tsx                 # Hero section component for home page
├── context/
│   └── AuthContext.tsx             # Authentication state management with React Context
├── login/
│   └── page.tsx                    # Login form page with email/password and Google OAuth
├── registration/
│   └── page.tsx                    # Registration form with buyer/seller role selection
├── client-dashboard/
│   └── page.tsx                    # Client dashboard with stats, job management, messages
├── my-posted-jobs/
│   └── page.tsx                    # Client posted jobs with filtering and management
├── client-job-details/
│   └── [id]/
│       └── page.tsx                # Client job details with applicant management
├── freelancer-dashboard/
│   └── page.tsx                    # Freelancer dashboard with stats, jobs, courses, messages
├── my-jobs/
│   └── page.tsx                    # Freelancer jobs dashboard with filtering and statistics
├── job-details/
│   └── [id]/
│       └── page.tsx                # Freelancer job detail page with full information
├── courses/
│   ├── page.tsx                    # Courses listing with category filtering (7 mock courses)
│   └── [id]/
│       ├── page.tsx                # Course detail page with video player
│       └── test/
├── my-jobs/
│   └── page.tsx                    # My Jobs dashboard with filtering and statistics
├── job-details/
│   └── [id]/
│       └── page.tsx                # Job detail page with full information
├── courses/
│   ├── page.tsx                    # Courses listing with category filtering (7 mock courses)
│   └── [id]/
│       ├── page.tsx                # Course detail page with video player
│       └── test/
│           └── page.tsx            # Proctored test page with camera recording (6 questions)
├── messages/
│   └── page.tsx                    # Inbox page with two-panel conversation/chat layout
└── post-jobs/
    └── page.tsx                    # Client job posting page with creation modal

components/
├── Navbar.tsx                      # Responsive navigation with mobile hamburger menu
├── dashboard/
│   ├── DashboardSidebar.tsx        # Role-adaptive sidebar navigation
│   ├── ClientStats.tsx             # Client statistics cards
│   ├── FreelancerStats.tsx         # Freelancer statistics cards
│   ├── ActiveJobs.tsx              # Active jobs list (adaptive for both roles)
│   ├── Messages.tsx                # Messages preview component
│   ├── Courses.tsx                 # Enrolled courses progress tracker
│   └── PostJobSection.tsx          # Post job CTA section (client only)
├── messages/
│   ├── ConversationList.tsx        # Conversation list panel with search
│   └── ChatView.tsx                # Chat message thread view with auto-replies
└── jobs/
    ├── JobCard.tsx                 # Freelancer job card with real-time countdown timer
    ├── JobModal.tsx                # Freelancer application modal with MCQ & project submission
    ├── JobPostCard.tsx             # Client job posting card with shortlisted count
    ├── PostJobModal.tsx            # Client job creation modal with form
    └── ShortlistedUsersModal.tsx    # Modal showing shortlisted candidates for a job

data/
├── messages/
│   ├── mockConversationsFreelancer.ts  # Mock conversations for freelancers (210 lines)
│   ├── mockConversationsClient.ts      # Mock conversations for clients (178 lines)
│   └── autoReplies.ts                  # Array of 40 auto-reply messages (44 lines)
└── jobs/
    ├── mockJobs.ts                     # 12 mock freelancer job listings with timers
    ├── mockFreelancerJobs.ts           # Complete job data for freelancers (11 jobs with details)
    ├── mockClientJobs.ts               # Complete job data for clients (9 jobs with applicants)
    ├── mcqQuestions.ts                 # 10 web development MCQ questions
    ├── sotaProjects.ts                 # 12 SOTA project examples
    ├── mockCandidates.ts               # 30 mock candidate profiles with ratings and expertise
    └── mockJobPostings.ts              # 8 mock client job postings with shortlisted candidates
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

### Browse Jobs System

The `/browse-jobs` page provides a comprehensive job listing and application system for freelancers:

**Page Structure** (`app/browse-jobs/page.tsx`):
- Protected route accessible only to freelancers
- Access via "Browse Jobs" link in DashboardSidebar
- Displays statistics: total jobs, applied count, available jobs
- Responsive grid layout (1 col mobile, 2 cols tablet, 3 cols desktop)
- **Navigation**:
  - Sidebar: Full DashboardSidebar for role-adaptive navigation (always visible on desktop, toggleable on mobile)
  - Header: Shows "Browse Jobs" title with hamburger menu button (mobile only)
  - Back to Dashboard button: Direct link to freelancer dashboard (top right)
  - Mobile responsive: Hamburger menu toggles sidebar visibility

**Job Listing Components**:
- **JobCard** (`components/jobs/JobCard.tsx`):
  - Individual job display cards with glass morphism styling
  - Real-time countdown timer (decrements every second)
  - Shows job title, company, budget, description snippet, required skills
  - Timer turns red when expired and disables apply button
  - Applied status badge with grayed-out state to prevent duplicates
  - "Apply Now" button triggers modal

**Job Application Modal** (`components/jobs/JobModal.tsx`):
- Large modal with two-section layout
- **Left Section - Technical Assessment** (80% width):
  - 10 web development MCQ questions
  - Progress indicator with visual progress bar
  - Previous/Next navigation between questions
  - Validates that all questions are answered before allowing submission

- **Right Section - Project Requirements** (20% width, sticky):
  - **Instructions**:
    - Clear guidance: "Complete the project according to these requirements and submit the link to your completed work"
  - **Project Description** (Read-only):
    - Displays the full job description from the job posting
    - Shows exact requirements the freelancer must implement
    - Read-only format (users cannot edit)
  - **Project Link Input**:
    - URL input field for freelancer to paste their completed project link
    - Accepts: GitHub repos, live demos, or portfolio links
    - Real-time URL validation with visual feedback
    - Shows ✅ checkmark when valid URL entered
    - Shows ❌ error message if invalid URL
    - Helper text: "Share your GitHub repo, live demo, or portfolio link"
  - **Form Validation**:
    - Checklist showing required items with checkmarks when completed
    - ✓ All 10 questions answered
    - ✓ Valid project link submitted
    - Submit button enabled only when all requirements met

**Submission Flow**:
- Submit button shows loading spinner and "Submitting..." text
- After 1 second (simulated processing):
  - Success state displays checkmark icon
  - Shows "Success! Your profile got shortlisted" message
  - Auto-closes after 2 seconds
  - Job card updates to show "Applied" status (grayed out, disabled)

**Mock Data** (`data/jobs/mockJobs.ts`):
- 12 mock job listings with varying durations (30 mins to 3 hours)
- Each job includes: title, company, description, budget range, required skills
- Real-time timer simulation with `getTimeString` utility

**MCQ Questions** (`data/jobs/mcqQuestions.ts`):
- 10 web development technical questions covering:
  - React (Virtual DOM, useEffect hook, key prop)
  - CSS (Flexbox justify-content)
  - JavaScript (async/await, closures, spread operator, == vs ===)
  - TypeScript purpose
  - HTTP status codes

**SOTA Projects Data** (`data/jobs/sotaProjects.ts`):
- 12 state-of-the-art project examples for future reference
- Each includes: name, category, description, tech stack, practical example
- Can be used for educational purposes or future feature enhancements
- Covers: AI/ML, Web3, PWA, Video Streaming, IoT, 3D Graphics, Real-time Systems, etc.

### Post Jobs System (Client-Side)

The `/post-jobs` page allows clients to create job postings and view shortlisted candidates:

**Page Structure** (`app/post-jobs/page.tsx`):
- Protected route accessible only to clients
- Access via "Post a Job" link in DashboardSidebar
- Two-section layout: "My Job Postings" + "Browse Shortlisted Candidates"
- Full sidebar navigation (always visible on desktop, toggleable on mobile)
- "Create Job" button in header with back to dashboard option

**Job Posting Creation** (`PostJobModal.tsx`):
- Modal form with fields:
  - **Job Title**: Text input (required)
  - **Job Description**: Textarea with 500 character limit (required)
  - **Requirements & Skills**: Textarea with 500 character limit (required)
  - **Expertise Level**: Radio button selector with three options:
    - **Beginner**: ৳25000 - ৳70000 (Low Complexity)
    - **Intermediate**: ৳70000 - ৳180000 (Medium Complexity)
    - **Expert**: ৳180000 - ৳450000+ (High Complexity)
  - **Budget Display**: Auto-calculated based on expertise level in BDT
- Form validation: All fields required
- Submission states: idle, loading (with spinner), success (checkmark)
- Auto-closes 1.5 seconds after successful submission

**Job Post Cards** (`JobPostCard.tsx`):
- Displays job posting with:
  - Job title and creation date
  - Brief description (line-clamped)
  - Expertise level badge (color-coded: green/yellow/purple)
  - Budget range
  - **Shortlisted Count**: Prominent display of number of candidates
  - "View Shortlisted Candidates" or "No Candidates Yet" button
  - Glass morphism styling with hover effects

**Shortlisted Candidates Modal** (`ShortlistedUsersModal.tsx`):
- Shows all candidates shortlisted for a job
- Header: Job title and total candidate count
- Candidate list with:
  - Avatar with initial (gradient background)
  - Name and completed projects count
  - Rating (stars)
  - Expertise level badge (color-coded: green/yellow/purple)
  - Hourly rate in BDT
  - Bio/description
  - "View Profile & Send Offer" button with acceptance workflow
- **Acceptance Workflow**:
  - Clicking "View Profile & Send Offer" triggers acceptance process
  - Button shows "Accepting..." with loading spinner during 800ms processing
  - After acceptance, modal displays success message: "This job is accepted! [CandidateName] has been selected for this position"
  - Accepted candidate is immediately removed from the candidate list
  - No longer visible in modal after acceptance (uses Set tracking of acceptedCandidateIds)
- Scrollable list with proper spacing

**Mock Data** (`data/jobs/mockCandidates.ts`):
- 30 diverse candidate profiles
- Each includes: name, expertise level (beginner/intermediate/expert), avatar (initials)
- Rating: 4.0 - 4.9 stars
- Hourly rates in BDT:
  - **Beginner**: ৳1000 - ৳2000/hour
  - **Intermediate**: ৳3200 - ৳5900/hour
  - **Expert**: ৳6000 - ৳12000/hour
- Completed projects: 4 - 74 projects
- Detailed bio describing their skills and experience
- `getRandomCandidates()` utility to select candidates for jobs

**Mock Job Postings** (`data/jobs/mockJobPostings.ts`):
- 8 sample job postings with various expertise levels
- Each includes: title, description, requirements, expertise level, budget
- Shortlisted candidates: 4 - 12 candidates per job
- Real-world examples like e-commerce, dashboards, APIs, PWA, etc.
- Demonstrates realistic job posting scenarios

**User Flow**:
1. Client visits `/post-jobs` page
2. Initially sees empty "My Job Postings" section with CTA
3. Sees "Browse Shortlisted Candidates" with 8 dummy jobs
4. Click "Create Job" → Form modal opens
5. Fill out form and select expertise level
6. Budget updates automatically
7. Click "Post Job" → Loading spinner shows
8. After 1 second → Success message
9. Modal closes → New job appears in "My Job Postings" with 0 candidates
10. Click any job card → View shortlisted candidates modal

**Expertise Level Colors**:
- **Beginner**: Green badge (#22c55e background, #86efac text)
- **Intermediate**: Yellow badge (#eab308 background, #fcd34d text)
- **Expert**: Purple badge (#a855f7 background, #d8b4fe text)

**State Management**:
- `createdJobs`: Array of jobs created by current user
- `showCreateModal`: Modal visibility toggle
- `selectedJob`: Currently selected job for viewing candidates
- `showCandidatesModal`: Candidates modal visibility
- Jobs start with 0 shortlisted candidates
- Dummy jobs show realistic candidate counts (4-12)

### Messages/Inbox System

The `/messages` page provides a full-featured inbox for communication between clients and freelancers:

**Page Structure** (`app/messages/page.tsx`):
- Protected route requiring authentication
- Two-panel layout: conversation list (left) + chat view (right)
- Responsive: Stacks on mobile with back/forward navigation
- **Role-based conversations**: 
  - Freelancers see conversations with clients (from `mockConversationsFreelancer.ts`)
  - Clients see conversations with freelancers (from `mockConversationsClient.ts`)
- Uses separate mock data files based on user role

**Components**:
- **ConversationList** (`components/messages/ConversationList.tsx`):
  - Shows all conversations with avatars and preview text
  - Search functionality to filter conversations
  - Unread message indicators and count badges
  - Color-coded avatars (purple for clients, blue for freelancers)
  - "New Message" button at bottom
  
- **ChatView** (`components/messages/ChatView.tsx`):
  - Full chat interface with message bubbles
  - Sender/receiver distinction (blue bubbles for own messages)
  - Message timestamps
  - Text input with send button
  - Attachment button (UI only)
  - Video call button (UI only)
  - Auto-scrolls to latest message
  - Press Enter to send
  - **Auto-reply simulation**: When you send a message, the other person automatically replies after 1.5 seconds with a message from a predefined array
  - **Typing indicator**: Shows animated dots while the other person is "typing"
  - Sequential replies: Each message you send gets the next reply from the array (loops back to start after 40 replies)

### Courses System

The `/courses` route provides a complete learning management system with proctored testing:

**Courses Listing Page** (`app/courses/page.tsx`):
- Protected route (authentication required)
- Features:
  - 7 mock courses with metadata (OOP, React, TypeScript, Next.js, Node.js, UI/UX, GraphQL)
  - Category filtering (All, Programming, React, TypeScript, Next.js, Node.js, Design, GraphQL)
  - Course cards displaying: title, instructor name, description, duration, lesson count, rating, difficulty level, student count
  - "Start Course" buttons linking to course detail pages
  - Glass morphism styling with responsive grid (1 col mobile, 2 cols tablet, 3 cols desktop)
  - Smooth navigation between categories

**Course Detail Page** (`app/courses/[id]/page.tsx`):
- Protected route (authentication required)
- Features:
  - **Video Player** with custom controls:
    - Play/pause functionality
    - Seek bar for timeline scrubbing
    - Volume control and mute button
    - Fullscreen mode support
    - Current time / total duration display
    - Progress tracking with visual indicator
  - Course description and overview
  - Sidebar with course metadata (total duration, lesson count, difficulty level, average rating, student count)
  - "Take Test" button linking to proctored test
  - Responsive layout (video + sidebar on desktop, stacked on mobile)

**Proctored Test Page** (`app/courses/[id]/test/page.tsx`):
- Protected route (authentication required)
- Features:
  - **Camera Permission Flow**:
    - Request for camera access
    - Video preview once granted
    - "Camera Active" indicator badge
    - Graceful fallback if permission denied
  - **Test Recording**: Uses MediaRecorder API to record video/audio during test
  - **Test Questions** (6 total):
    - 3 multiple-choice questions (MCQ) with options
    - 3 short-answer text questions (textarea inputs)
  - **Recording Controls**:
    - Start/stop recording buttons
    - Live timer displaying recording time
    - Real-time recording status indicator
  - **Test Submission**:
    - Downloads recorded video as WebM file
    - Submits answers (logged to console)
    - Confirmation message on submission
  - **UX Features**:
    - Auto-scrolling between questions
    - Question numbering and progress indicator
    - Responsive design for all screen sizes
    - Accessible form controls and labels

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

### Authentication Test Credentials

The application includes mock user accounts for testing different roles:

```
Freelancer Account:
  Email: freelancer@gmail.com
  Password: 123456
  Role: Freelancer (seller)

Client Account:
  Email: client@gmail.com
  Password: 123456
  Role: Client (buyer)
```

These credentials are defined in `AuthContext.tsx` and persist across sessions via localStorage.

### Known Areas Requiring Backend Integration

- Login form submission (currently uses mock user database)
- Registration form submission (currently logs form data to console)
- Google OAuth integration (UI placeholder only)
- Messages/inbox system (uses static mock conversations and auto-reply simulation)
- Sending messages (currently adds to local state, not persisted to database)
- Courses system (mock data with 7 hardcoded courses)
- Course progress tracking (not persisted between sessions)
- Course enrollment and completion (not tracked)
- Proctored test submission (downloads video locally, needs backend API for storage)
- Test scoring and result storage (currently logs answers to console)
- Video recording (stores in browser memory, needs backend for persistence)

### Code Quality

- ESLint is configured but no custom rules defined yet
- TypeScript strict mode is enforced
- No unit tests configured

## Metadata & Branding

The layout currently uses placeholder metadata that should be updated:
- Title: "Create Next App" → Should be "Learning & Earning AI"
- Description: "Generated by create next app" → Should reflect the platform's purpose

Update these in `app/layout.tsx` to reflect the actual product name and description.

## Features Summary

### Completed Features
✅ Dual-role authentication system (Client & Freelancer)
✅ Role-specific dashboards with statistics
✅ **Freelancer Side**:
  - Browse Jobs system with real-time countdown timers
  - Job application with technical MCQ assessment
  - Project submission with job requirements
  - **My Jobs Management**: View, filter, and manage all assigned jobs
  - Job details page with complete information and progress tracking
  - 11 mock freelancer jobs (3 active, 6 completed, 2 pending)
✅ **Client Side**:
  - Post Jobs system with expertise-based budgeting
  - Job creation modal with form validation
  - View shortlisted candidates for each job
  - 30 diverse candidate profiles with ratings and expertise
✅ Real-time messaging with auto-reply simulation
✅ Courses listing with category filtering
✅ Course video player with custom controls
✅ Proctored testing with camera recording
✅ Responsive design (mobile, tablet, desktop)
✅ Glass morphism UI theme
✅ Navigation with role-adaptive sidebar
✅ Enhanced freelancer statistics (active jobs, earnings, ratings)

### Currently Mock/Placeholder
- Backend API integration (all data is mock/local)
- User persistence (localStorage only)
- Payment processing
- Real-time messaging (WebSocket)
- Video/file storage
- Test grading system
- Profile management

## Freelancer Jobs Management System

### Overview
The freelancer jobs management system allows freelancers to view and track all their assigned jobs, including active, pending, and completed projects with comprehensive details, progress tracking, and client feedback.

### Routes & Pages

**1. `/my-jobs` - My Jobs Dashboard**
- **Purpose**: Central hub for viewing all freelancer jobs
- **Access**: Freelancer role only
- **Features**:
  - Filter jobs by status: All, Active, Pending, Completed
  - Statistics cards showing total jobs, active count, completed count, pending count
  - Job cards displaying:
    - Job title, client name, status badge (color-coded)
    - Budget (৳), deadline, days left
    - Progress bar (for active jobs)
    - Required skills tags
    - Description preview (line-clamped)
    - Client feedback with rating (for completed jobs)
  - Responsive grid layout (1 col mobile, 2 cols tablet, 3 cols desktop)
  - "Details" button links to individual job page
- **Theme**: Maintains glass morphism design with dark background

**2. `/job-details/[id]` - Job Details Page**
- **Purpose**: Detailed view of a specific job with full information
- **Access**: Freelancer role only
- **Features**:
  - Full job title and client information
  - Current status badge
  - Key metrics: Budget, Deadline, Days Left, Hourly Rate
  - Complete job description
  - Required skills with visual badges
  - Progress bar showing completion percentage (active jobs only)
  - Client feedback and rating display (completed jobs)
  - Action buttons (Back to Jobs, Update Progress)
  - Loading state and 404 handling
- **Theme**: Large card layout with gradient accents and smooth transitions

### Data Structure

**File**: `data/jobs/mockFreelancerJobs.ts`

**FreelancerJob Interface**:
```typescript
{
  id: string;                              // Unique job identifier
  title: string;                           // Job title
  client: string;                          // Client company name
  clientAvatar: string;                    // Client initials for avatar
  deadline: string;                        // YYYY-MM-DD format
  status: "in_progress" | "completed" | "pending";
  progress: number;                        // 0-100 percentage
  budget: number;                          // Amount in BDT
  currencyCode: string;                    // "BDT"
  description: string;                     // Full job description
  skills: string[];                        // Required skills array
  hourlyRate?: number;                     // Optional hourly rate in BDT
  daysLeft?: number;                       // Days remaining
  rating?: number;                         // Client rating (0-5)
  completedDate?: string;                  // Completion date (YYYY-MM-DD)
  feedback?: string;                       // Client feedback text
}
```

**Mock Data Categories**:

1. **Active Jobs** (`mockActiveFreelancerJobs`) - 3 jobs
   - React Dashboard Development (65% progress)
   - Mobile App UI Design Implementation (40% progress)
   - Next.js E-commerce API Integration (50% progress)

2. **Completed Jobs** (`mockCompletedFreelancerJobs`) - 6 jobs
   - E-commerce Website Development
   - REST API Development
   - Database Optimization & Migration
   - TypeScript Migration Project
   - Mobile App Development
   - UI Component Library Development

3. **Pending Jobs** (`mockPendingFreelancerJobs`) - 2 jobs
   - GraphQL API Implementation
   - Machine Learning Model Integration

**Helper Functions**:
- `getActiveFreelancerJobs()` - Returns all active jobs
- `getCompletedFreelancerJobs()` - Returns completed jobs
- `getPendingFreelancerJobs()` - Returns pending jobs
- `getAllFreelancerJobs()` - Returns all jobs combined
- `getFreelancerJobById(jobId)` - Returns specific job or undefined
- `getFreelancerJobStats()` - Returns statistics object with:
  - `activeJobs` - count
  - `completedJobs` - count
  - `pendingJobs` - count
  - `totalEarnings` - sum of all job budgets
  - `averageRating` - average rating of completed jobs

### Integration with Dashboard

**Freelancer Dashboard** (`/freelancer-dashboard`):
- Now uses real mock data instead of hardcoded values
- Displays top 3 active jobs in "Active Jobs" section
- Shows up to 6 completed jobs in expandable "Past Jobs" section
- Stats section enhanced with:
  - Level badge
  - Jobs Completed count
  - Active Jobs count (new)
  - Total Earnings in lakhs (new)
  - Average Rating (new)
- "View All" link directs to `/my-jobs` page
- Stats grid responsive: 2 cols on mobile → 3 cols tablet → 5 cols desktop

### Styling & Theme Consistency

All components maintain the glass morphism aesthetic:
- **Dark background**: `bg-black` or `bg-white/5`
- **Borders**: `border-white/10` with hover state `border-white/20`
- **Cards**: `rounded-xl` with `backdrop-blur-md`
- **Status badges**: Color-coded:
  - In Progress: Blue (`bg-blue-500/20 text-blue-300`)
  - Completed: Green (`bg-green-500/20 text-green-300`)
  - Pending: Yellow (`bg-yellow-500/20 text-yellow-300`)
- **Skill tags**: Blue themed with slight opacity
- **Progress bars**: Gradient from blue-500 to blue-600
- **Hover effects**: Subtle background color increase and border brightening

### User Flow

**Freelancer Job Management Journey**:
1. Freelancer logs in and views `/freelancer-dashboard`
2. Sees active jobs and career statistics
3. Clicks "View All" or "My Jobs" in sidebar to visit `/my-jobs`
4. Filters jobs by status (All, Active, Pending, Completed)
5. Clicks "Details" on any job to view full details at `/job-details/[id]`
6. Views job requirements, progress, and client feedback
7. Returns to jobs list to manage other projects

### Future Enhancements

- Real-time job status updates from backend
- Progress update submission interface
- Client communication integration
- Time tracking for hourly-rate jobs
- Invoice and payment history
- Job analytics and earnings reports
- Job completion workflows
- Contract management

## Client Jobs Management System

### Overview
The client jobs management system allows clients to post jobs, track applicants, manage ongoing projects, and view completed jobs with comprehensive applicant information and project tracking.

### Routes & Pages

**1. `/my-posted-jobs` - My Posted Jobs Dashboard**
- **Purpose**: Central hub for viewing and managing all client job postings
- **Access**: Client role only
- **Features**:
  - Filter jobs by status: All, Ongoing, Open, Completed
  - Statistics cards showing total posted, ongoing, open, and completed counts
  - Job cards displaying:
    - Job title, status badge (color-coded), expertise level
    - Budget (৳) and applicant count
    - Deadline information
    - Selected freelancer info (for ongoing/completed jobs)
    - Progress bar (for ongoing jobs)
    - Client feedback with rating (for completed jobs)
  - Responsive grid layout (1 col mobile, 2 cols tablet, 3 cols desktop)
  - "Manage" button links to individual job management page
- **Theme**: Maintains glass morphism design with dark background

**2. `/client-job-details/[id]` - Job Management & Applicants**
- **Purpose**: Detailed view and management of a specific job posting
- **Access**: Client role only
- **Features**:
  - Full job title, status, and creation date
  - Key metrics: Budget, Budget Range, Total Applicants, Deadline, Expertise Level
  - Complete job description and requirements side-by-side
  - Progress bar showing project completion (ongoing jobs)
  - Client feedback and rating display (completed jobs)
  - **Applicants Management Section**:
    - Filter applicants by status: All, Shortlisted, Hired
    - Applicant cards with:
      - Avatar with initials
      - Name and status badge (color-coded: hired/shortlisted/applied/rejected)
      - Expertise level badge
      - Bio/description
      - Rating, completed projects count, hourly rate
      - "Review" or "View Profile" button
    - Dynamic count indicators on filter tabs
  - Action buttons: Back to Jobs, Close Job (if open), Mark as Completed (if in progress)
  - Loading state and 404 handling
- **Theme**: Large card layout with gradient accents and smooth transitions

### Data Structure

**File**: `data/jobs/mockClientJobs.ts`

**JobApplicant Interface**:
```typescript
{
  id: string;                                          // Unique applicant identifier
  name: string;                                        // Applicant name
  avatar: string;                                      // Initials for avatar
  expertise: "beginner" | "intermediate" | "expert";  // Expertise level
  rating: number;                                      // Star rating (0-5)
  completedProjects: number;                          // Total projects completed
  hourlyRate: number;                                 // Rate in BDT
  bio: string;                                        // Professional bio
  status: "applied" | "shortlisted" | "rejected" | "hired" | "in_progress";
}
```

**ClientJobPosting Interface**:
```typescript
{
  id: string;                                          // Unique job identifier
  title: string;                                       // Job title
  description: string;                                // Full job description
  requirements: string;                               // Job requirements
  expertiseLevel: "beginner" | "intermediate" | "expert";
  budget: number;                                      // Posted budget in BDT
  budgetRange: { min: number; max: number };          // Budget range
  currencyCode: string;                               // "BDT"
  createdDate: string;                                // YYYY-MM-DD format
  deadline?: string;                                  // Project deadline
  status: "open" | "in_progress" | "completed" | "closed";
  totalApplicants: number;                            // Number of applicants
  applicants: JobApplicant[];                         // Full applicant list
  selectedFreelancer?: JobApplicant;                  // Hired freelancer info
  progress?: number;                                  // 0-100 for ongoing jobs
  completionDate?: string;                            // YYYY-MM-DD when completed
  feedback?: string;                                  // Client feedback text
  rating?: number;                                    // Client rating (0-5)
}
```

**Mock Data Categories**:

1. **Ongoing Jobs** (`mockOngoingClientJobs`) - 3 jobs
   - React Dashboard Development (65% progress, 8 applicants)
   - E-commerce Mobile App Development (45% progress, 12 applicants)
   - GraphQL API Backend Development (75% progress, 6 applicants)

2. **Completed Jobs** (`mockCompletedClientJobs`) - 4 jobs
   - Landing Page Design & Development (5⭐ rating)
   - Database Schema Design & Optimization (4.9⭐ rating)
   - API Documentation & Postman Collection (4.8⭐ rating)
   - UI/UX Design System Implementation (5⭐ rating)

3. **Open Jobs** (`mockOpenClientJobs`) - 2 jobs
   - PWA Development with Offline Support (4 applicants)
   - Cloud Infrastructure Setup & DevOps (5 applicants)

**Helper Functions**:
- `getOngoingClientJobs()` - Returns all ongoing jobs
- `getCompletedClientJobs()` - Returns completed jobs
- `getOpenClientJobs()` - Returns open/available jobs
- `getAllClientJobs()` - Returns all jobs combined
- `getClientJobById(jobId)` - Returns specific job or undefined
- `getJobApplicants(jobId)` - Returns all applicants for a job
- `getClientJobStats()` - Returns statistics object with:
  - `ongoingJobs` - count
  - `completedJobs` - count
  - `openJobs` - count
  - `totalJobs` - total count
  - `totalSpent` - sum of all job budgets
  - `averageRating` - average rating of completed jobs
  - `totalApplicants` - total applicants across all jobs
- `getJobApplicantCount(jobId)` - Returns applicant count for a job
- `getApplicantsByStatus(jobId, status)` - Returns filtered applicants

### Integration with Client Dashboard

**Client Dashboard** (`/client-dashboard`):
- Now uses real mock data instead of hardcoded values
- Displays top 3 ongoing jobs in "Active Jobs" section
- Shows up to 4 completed jobs in expandable "Past Jobs" section (if data expanded)
- Stats section enhanced with:
  - Total Jobs Posted count
  - Active Jobs count
  - Total Spent (in lakhs)
  - Completed Jobs count (new)
  - Total Applicants count (new)
  - Average Rating (new)
- "View All" link directs to `/my-posted-jobs` page
- Stats grid responsive: 2 cols on mobile → 2 cols tablet → 3 cols desktop → 6 cols XL

### Applicant Status Management

**Status Types**:
- **Applied**: Initial status when freelancer applies
- **Shortlisted**: Client has marked as potential candidate
- **Hired**: Selected freelancer for the job
- **In Progress**: Freelancer is actively working (for hired freelancers)
- **Rejected**: Client declined applicant

**Status Badge Colors**:
- Hired: Green (`bg-green-500/20 text-green-300`)
- Shortlisted: Blue (`bg-blue-500/20 text-blue-300`)
- Applied: Gray (`bg-gray-500/20 text-gray-300`)
- Rejected: Red (`bg-red-500/20 text-red-300`)

### Styling & Theme Consistency

All components maintain the glass morphism aesthetic:
- **Dark background**: `bg-black` or `bg-white/5`
- **Borders**: `border-white/10` with hover state `border-white/20`
- **Cards**: `rounded-xl` with `backdrop-blur-md`
- **Status badges**: Color-coded:
  - Ongoing: Blue (`bg-blue-500/20 text-blue-300`)
  - Open: Yellow (`bg-yellow-500/20 text-yellow-300`)
  - Completed: Green (`bg-green-500/20 text-green-300`)
- **Expertise badges**: 
  - Beginner: Green
  - Intermediate: Yellow
  - Expert: Purple
- **Progress bars**: Gradient from blue-500 to blue-600
- **Hover effects**: Subtle background color increase and border brightening

### User Flow

**Client Job Management Journey**:
1. Client logs in and views `/client-dashboard`
2. Sees ongoing jobs and business statistics
3. Clicks "View All" or "My Posted Jobs" in sidebar to visit `/my-posted-jobs`
4. Filters jobs by status (All, Ongoing, Open, Completed)
5. Clicks "Manage" on any job to view details and applicants at `/client-job-details/[id]`
6. Reviews applicants, checks their ratings and projects
7. Filters applicants by status (All, Shortlisted, Hired)
8. Views project progress and client feedback for completed jobs
9. Returns to jobs list to manage other postings

### Future Enhancements

- Real-time applicant notifications
- Applicant search and filtering by expertise
- Bulk action operations on applicants
- Messaging with applicants integrated
- Job closing workflows
- Project completion/approval interface
- Invoice and payment tracking
- Review and rating system for freelancers
- Job reposting after completion
- Analytics dashboard with job performance metrics
```
```