# Comprehensive NextJS Frontend Prompt for LectaVera (FastAPI Backend)

```
Create a modern, fully functional NextJS 14+ frontend application for "LectaVera" - an AI-powered study platform with RAG (Retrieval-Augmented Generation) capabilities. This application connects to a FastAPI backend.

## CRITICAL CONTEXT

### Brand Identity
- **Name**: LectaVera
- **Tagline**: "Where Knowledge Meets Truth"
- **Brand Colors**:
  - Primary: Deep Blue (#1E3A8A) - Trust, intelligence
  - Secondary: Gold (#F59E0B) - Excellence, achievement
  - Accent: Emerald (#10B981) - Growth, success
  - Neutrals: Slate grays (#64748B, #F8FAFC)
- **Typography**:
  - Headings: Playfair Display or Cormorant (sophisticated serif)
  - Body: Inter (clean, readable sans-serif)
  - Accent: Cinzel (for special headers/Latin phrases)
- **Design Style**: Premium, academic, intelligent, supportive
- **Voice**: Professional yet encouraging, like a mentor

## TECH STACK REQUIREMENTS

### Core Technologies
- **NextJS 14.2+** (App Router, NOT Pages Router)
- **TypeScript** (strict mode enabled)
- **Tailwind CSS** for styling
- **Shadcn/ui** for component library
- **Lucide React** for icons
- **React Hook Form** + **Zod** for form validation
- **TanStack Query (React Query)** for API state management
- **Zustand** for global UI state (theme, sidebar, etc.)
- **Axios** for HTTP requests
- **date-fns** for date formatting
- **recharts** or **chart.js** for analytics visualizations
- **react-hot-toast** for notifications
- **next-themes** for dark/light mode
- **WebSocket** support for real-time chat

### Additional Libraries
- **@tanstack/react-table** for data tables (document list, quiz history)
- **react-markdown** for rendering AI responses with formatting
- **react-dropzone** for file uploads
- **framer-motion** for smooth animations
- **react-syntax-highlighter** for code blocks in chat
- **jspdf** or **html2pdf.js** for exporting sessions

## BACKEND API INTEGRATION

### Base URL Configuration
```typescript
// All API calls go to FastAPI backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'
const WS_BASE_URL = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8000'
```

### Authentication Flow
- JWT-based authentication (access token + refresh token)
- Access token: 15-minute expiry
- Refresh token: 7-day expiry, stored in httpOnly cookie or localStorage
- Automatic token refresh on 401 responses
- Redirect to /login on refresh failure

### API Endpoints to Integrate

#### Authentication (`/api/v1/auth`)
```
POST   /auth/signup          → { email, username, password, full_name }
POST   /auth/login           → { email, password }
POST   /auth/refresh         → { refresh_token }
POST   /auth/logout          → (clears tokens)
GET    /auth/me              → Current user info
POST   /auth/forgot-password → { email }
POST   /auth/reset-password  → { token, new_password }
```

#### Documents (`/api/v1/documents`)
```
GET    /documents                    → List with filters (?category=MATH&page=1)
POST   /documents/upload             → multipart/form-data { file, category, tags }
GET    /documents/{id}               → Single document details
GET    /documents/{id}/status        → Processing status
PATCH  /documents/{id}               → Update { category?, tags?, is_archived? }
DELETE /documents/{id}               → Delete document
POST   /documents/bulk-delete        → { document_ids: [UUID] }
```

#### Study Sessions (`/api/v1/study`)
```
POST   /study/sessions                       → { selected_document_ids, mode }
GET    /study/sessions                       → List all sessions
GET    /study/sessions/{id}                  → Get session with messages
POST   /study/sessions/{id}/messages         → { content, mode }
DELETE /study/sessions/{id}                  → Delete session
GET    /study/sessions/{id}/export           → Export as PDF/JSON
WebSocket: /ws/{session_id}?token={jwt}      → Real-time chat
```

#### Quiz (`/api/v1/quiz`)
```
POST   /quiz/generate    → { document_ids, question_count, difficulty, topic_focus? }
GET    /quiz/{id}        → Get quiz (no answers until submitted)
POST   /quiz/{id}/submit → { answers: [{ question_id, answer_index }] }
GET    /quiz/history     → List past quizzes with scores
```

#### Analytics (`/api/v1/analytics`)
```
GET    /analytics/dashboard      → { total_documents, questions_this_week, avg_quiz_score, study_streak }
GET    /analytics/activity       → { questions_over_time, questions_by_category, time_per_document }
GET    /analytics/weak-areas     → Categories with low quiz scores
GET    /analytics/study-calendar → GitHub-style heatmap data
```

#### User Settings (`/api/v1/users`)
```
GET    /users/preferences  → { theme, ai_personality, citation_style, ... }
PATCH  /users/preferences  → Update preferences
PATCH  /users/profile      → { full_name?, avatar_url? }
POST   /users/avatar       → Upload avatar (multipart/form-data)
```

#### Search (`/api/v1/search`)
```
GET    /search?q=query&doc_ids=uuid1,uuid2  → Search across documents
```

## APPLICATION STRUCTURE

### File & Folder Structure
```
lectavera-frontend/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── signup/
│   │   │   └── page.tsx
│   │   ├── forgot-password/
│   │   │   └── page.tsx
│   │   └── layout.tsx           # Auth layout (centered, no sidebar)
│   ├── (dashboard)/
│   │   ├── dashboard/
│   │   │   └── page.tsx         # Main dashboard
│   │   ├── bookshelf/
│   │   │   └── page.tsx         # Document management
│   │   ├── study/
│   │   │   ├── page.tsx         # Study session list
│   │   │   └── [sessionId]/
│   │   │       └── page.tsx     # Active study session
│   │   ├── quiz/
│   │   │   ├── page.tsx         # Quiz setup
│   │   │   ├── [quizId]/
│   │   │   │   └── page.tsx     # Take quiz
│   │   │   └── [quizId]/
│   │   │       └── results/
│   │   │           └── page.tsx # Quiz results
│   │   ├── analytics/
│   │   │   └── page.tsx         # Analytics dashboard
│   │   ├── settings/
│   │   │   └── page.tsx         # User settings (tabbed)
│   │   └── layout.tsx           # Dashboard layout (sidebar + topbar)
│   ├── globals.css
│   ├── layout.tsx               # Root layout (providers)
│   └── not-found.tsx            # 404 page
├── components/
│   ├── ui/                      # Shadcn components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── select.tsx
│   │   ├── tabs.tsx
│   │   ├── toast.tsx
│   │   └── ... (all shadcn components)
│   ├── auth/
│   │   ├── login-form.tsx
│   │   ├── signup-form.tsx
│   │   └── password-reset-form.tsx
│   ├── dashboard/
│   │   ├── dashboard-stats.tsx  # 4 stat cards
│   │   ├── recent-sessions.tsx
│   │   └── quick-actions.tsx
│   ├── layout/
│   │   ├── sidebar.tsx          # Main navigation sidebar
│   │   ├── topbar.tsx           # Search, notifications, user menu
│   │   ├── mobile-nav.tsx       # Mobile hamburger menu
│   │   └── user-dropdown.tsx
│   ├── bookshelf/
│   │   ├── document-card.tsx
│   │   ├── document-grid.tsx
│   │   ├── upload-modal.tsx
│   │   ├── document-filters.tsx
│   │   └── bulk-actions.tsx
│   ├── study/
│   │   ├── session-list.tsx
│   │   ├── chat-interface.tsx   # Main chat UI
│   │   ├── message-bubble.tsx   # User/AI message bubbles
│   │   ├── citation-badge.tsx   # Clickable citation indicators
│   │   ├── document-selector.tsx # Multi-select document picker
│   │   ├── mode-switcher.tsx    # Answer/Summarize/Deep Dive buttons
│   │   └── typing-indicator.tsx
│   ├── quiz/
│   │   ├── quiz-setup-form.tsx
│   │   ├── quiz-question-card.tsx
│   │   ├── quiz-results-card.tsx
│   │   ├── progress-bar.tsx
│   │   └── score-display.tsx
│   ├── analytics/
│   │   ├── stats-cards.tsx
│   │   ├── activity-chart.tsx   # Line chart (questions over time)
│   │   ├── category-chart.tsx   # Bar chart (by category)
│   │   ├── study-heatmap.tsx    # GitHub-style calendar
│   │   └── weak-areas-list.tsx
│   └── shared/
│       ├── loading-skeleton.tsx
│       ├── empty-state.tsx
│       ├── error-boundary.tsx
│       └── confirm-dialog.tsx
├── lib/
│   ├── api/
│   │   ├── client.ts            # Axios instance with interceptors
│   │   ├── auth.ts              # Auth API calls
│   │   ├── documents.ts         # Document API calls
│   │   ├── study.ts             # Study session API calls
│   │   ├── quiz.ts              # Quiz API calls
│   │   ├── analytics.ts         # Analytics API calls
│   │   └── users.ts             # User/settings API calls
│   ├── websocket.ts             # WebSocket manager class
│   ├── validations.ts           # Zod schemas
│   └── utils.ts                 # Helper functions
├── hooks/
│   ├── use-auth.ts              # Authentication hook
│   ├── use-documents.ts         # Document queries & mutations
│   ├── use-study.ts             # Study session hooks
│   ├── use-quiz.ts              # Quiz hooks
│   ├── use-analytics.ts         # Analytics hooks
│   ├── use-websocket.ts         # WebSocket connection hook
│   └── use-debounce.ts          # Debounce helper
├── store/
│   ├── auth-store.ts            # Zustand store for auth state
│   ├── ui-store.ts              # Sidebar collapsed, theme, etc.
│   └── chat-store.ts            # Active session, messages (optional)
├── types/
│   └── index.ts                 # TypeScript interfaces
├── providers/
│   ├── query-provider.tsx       # TanStack Query provider
│   ├── theme-provider.tsx       # next-themes provider
│   └── toast-provider.tsx       # Toast notifications provider
├── middleware.ts                # Auth middleware (protect routes)
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── .env.local.example
```

## DETAILED PAGE SPECIFICATIONS

### 1. LOGIN PAGE (`/login`)

**Design Requirements:**
- Full-screen with subtle gradient background (deep blue to lighter blue)
- Centered card (max-width: 400px) with glass-morphism effect
- LectaVera logo at top (either text logo or icon + wordmark)
- Latin subtitle below logo: "Veritas in Studio" (small, elegant)

**Form Fields:**
- Email input (with validation icon)
- Password input (with toggle show/hide)
- "Remember me" checkbox
- "Forgot password?" link (right-aligned, small)

**Buttons:**
- Primary button: "Sign In" (full width, gradient or solid blue)
- Divider: "Or continue with"
- OAuth buttons: Google, GitHub (icon + text, outlined style) - UI ONLY, non-functional

**Footer:**
- "Don't have an account? Sign up" (centered link)

**Validation:**
- Real-time validation with Zod
- Error messages below each field (red text, small)
- Disable submit button during loading
- Show spinner in button during API call

**API Integration:**
- POST to `/api/v1/auth/login`
- On success: Store tokens, redirect to `/dashboard`
- On error: Show toast notification with error message

---

### 2. SIGNUP PAGE (`/signup`)

**Similar design to login, but with additional fields:**
- Full name input
- Username input (check availability with debounce)
- Email input
- Password input (with strength indicator below)
- Confirm password input
- Terms & conditions checkbox (required)

**Password Strength Indicator:**
- Bar below password field (red → yellow → green)
- Text labels: "Weak", "Medium", "Strong"
- Requirements list (small text):
  - ✓ At least 8 characters
  - ✓ One uppercase letter
  - ✓ One number

**Button:**
- "Create Account" (full width)

**Footer:**
- "Already have an account? Sign in"

---

### 3. DASHBOARD HOME PAGE (`/dashboard`)

**Layout:**
- Sidebar (left, collapsible on mobile)
- Topbar (search, notifications, user dropdown)
- Main content area

**Welcome Section:**
- Large heading: "Welcome back, [User's First Name]!" (use Playfair Display)
- Subheading: Current date and time

**Quick Stats (4 Cards in Grid - 2x2 on desktop, 1x4 on mobile):**

**Card 1: Total Documents**
- Icon: 📚 (book icon from Lucide)
- Number: Large, bold
- Label: "Documents in Library"
- Trend: "+3 this week" (small, green text if positive)

**Card 2: Questions Asked**
- Icon: 💬 (message-circle icon)
- Number: Count for current week
- Label: "Questions This Week"
- Trend: "↑ 12% from last week"

**Card 3: Quiz Performance**
- Icon: 📊 (bar-chart icon)
- Number: Average percentage
- Label: "Average Quiz Score"
- Trend: Color-coded (green if >70%, yellow if 50-70%, red if <50%)

**Card 4: Study Streak**
- Icon: 🔥 (flame icon)
- Number: Days
- Label: "Day Study Streak"
- Message: "Keep it up!" (small, encouraging)

**Recent Study Sessions Section:**
- Table/List showing last 5 sessions
- Columns: Session Title, Date, Questions Asked, Duration
- Click to open session
- "View All Sessions" link

**Quick Actions Section (3 large buttons):**
- "Upload Document" (blue, with upload icon)
- "Start Study Session" (gradient, with brain icon)
- "Take Quiz" (gold, with clipboard icon)

---

### 4. BOOKSHELF PAGE (`/dashboard/bookshelf`)

**Top Bar:**
- "My Bookshelf" heading
- View toggle: Grid / List (icon buttons)
- Search input (debounced, searches filename)
- Filter dropdown: Category (All, Math, Science, History, etc.)
- Sort dropdown: Date (Newest/Oldest), Name (A-Z/Z-A)
- Upload button (primary, floating action button OR prominent in header)

**Document Display (Grid View):**

**Each Card Contains:**
- PDF thumbnail (placeholder icon if no preview)
- Filename (truncated with ellipsis)
- Category badge (colored pill: Math=blue, Science=green, History=purple)
- Upload date (small, gray text)
- Page count (e.g., "24 pages")
- Status indicator:
  - "Processing..." (yellow spinner) - polls `/documents/{id}/status`
  - "Ready" (green checkmark)
  - "Failed" (red X with retry button)
- Actions dropdown (3-dot menu):
  - View Details
  - Edit (category, tags)
  - Archive
  - Delete (with confirmation)

**Hover Effects:**
- Card lifts slightly (transform scale)
- Actions button appears

**Bulk Selection Mode:**
- Checkbox on each card (shows on hover or when bulk mode active)
- "Select All" / "Deselect All" buttons appear at top
- Bulk actions bar at bottom: "Delete Selected (5)" button

**Empty State (when no documents):**
- Illustration (empty bookshelf or upload icon)
- Heading: "Your bookshelf is empty"
- Subtext: "Upload your first PDF to get started"
- Large "Upload Document" button

**Upload Modal:**
- Opens as dialog/modal overlay
- Drag-and-drop zone (dashed border, large area)
- "Or click to browse" text
- File restrictions: "PDF only, max 50MB"
- After file selected:
  - Show filename and size
  - Category dropdown (required)
  - Tags input (optional, comma-separated or chip input)
  - "Upload" button (starts upload, shows progress bar)
  - On success: Close modal, show toast, document appears in grid with "Processing" status
  - Poll status endpoint every 2 seconds until "Ready" or "Failed"

---

### 5. STUDY SESSION LIST PAGE (`/dashboard/study`)

**Top Section:**
- Heading: "Study Sessions"
- "New Session" button (primary, large)

**Session Cards (List View):**
- Each card shows:
  - Session title (auto-generated or custom)
  - Date & time
  - Number of messages
  - Selected documents (badges or count)
  - Mode badge (Answer, Summarize, Deep Dive)
- Click card to open session
- Delete icon (trash, red on hover, with confirmation)

**New Session Flow:**
- Click "New Session" → Opens modal
- **Step 1: Select Documents**
  - Multi-select list with checkboxes
  - Search filter
  - "Select All" option
  - Show count: "3 documents selected"
- **Step 2: Choose Mode**
  - 3 radio buttons or large cards:
    - **Answer Mode**: "Get precise answers with citations"
    - **Summarize Mode**: "Create cheat sheets and summaries"
    - **Deep Dive**: "Combine notes + web research"
- "Start Session" button
- Creates session via API, redirects to `/dashboard/study/[sessionId]`

---

### 6. ACTIVE STUDY SESSION PAGE (`/dashboard/study/[sessionId]`)

**Layout: Split Screen (Desktop) / Stacked (Mobile)**

**LEFT PANEL (or Top on Mobile): Document Selector**
- Collapsible panel
- List of selected documents with checkboxes
- Can add/remove documents during session (updates API)
- Count indicator: "Searching in 3 documents"

**RIGHT PANEL (Main): Chat Interface**

**Top Bar:**
- Session title (editable on click)
- Timer (shows session duration, e.g., "00:23:45")
- Mode indicator badge (current mode)
- Actions:
  - "New Session" button
  - "Export Chat" button (downloads as PDF or markdown)
  - Settings icon (opens session settings)

**Chat Messages Area:**
- Scrollable container (auto-scroll to bottom on new message)
- Messages displayed as bubbles

**User Message Bubble (Right-aligned):**
- Blue background (#3B82F6)
- White text
- Timestamp (small, below bubble)
- Border radius: 16px (speech bubble style)

**AI Message Bubble (Left-aligned):**
- Light gray background (#F3F4F6)
- Dark text
- LectaVera avatar icon on left
- Rendered markdown content:
  - Bold text support (**text**)
  - Bullet points
  - Code blocks (syntax highlighted)
  - Inline code (`code`)
- **Citations** (inline):
  - Displayed as small badges: [Source 1] [Page 23]
  - On hover: Tooltip shows snippet from source
  - On click: Opens modal with full source details
  - Color-coded: PDF sources = blue, Web sources = green
- **Follow-up Question** (if AI includes one):
  - Rendered in italics at end of message
  - Different color (purple/accent)
- **Verdict Indicator** (optional, small badge):
  - "✓ Found in your notes" (green) - CORRECT
  - "⚠ Partial info found" (yellow) - AMBIGUOUS
  - "🌐 Searched the web" (blue) - INCORRECT
- Timestamp below bubble

**Typing Indicator (when AI is responding):**
- Animated "..." dots
- Text: "LectaVera is thinking..."

**Input Area (Bottom, Sticky):**
- Large text input (auto-resize up to 5 lines)
- Placeholder: "Ask a question about your documents..."
- **Mode Switcher** (3 toggle buttons above input):
  - [Answer] [Summarize] [Deep Dive]
  - Selected mode is highlighted
  - Changes for next message only (doesn't affect ongoing response)
- Send button (paper plane icon, blue, disabled if input empty)
- Additional icons (left of input):
  - Microphone icon (voice input - UI only, non-functional for now)
  - Attach document icon (quick upload to add doc to session)

**WebSocket Implementation:**
- Connect to `/ws/{sessionId}?token={jwt}` on page load
- Stream AI responses chunk by chunk (show typing indicator until first chunk)
- Append chunks to message bubble in real-time
- On message complete, save to chat history and show citations

**Error Handling:**
- If WebSocket disconnects, show warning banner at top
- "Reconnect" button attempts to reconnect
- Fall back to HTTP POST if WebSocket unavailable (no streaming)

---

### 7. QUIZ SETUP PAGE (`/dashboard/quiz`)

**Heading:** "Create a Quiz"

**Form (Center-aligned Card):**

**Step 1: Select Documents**
- Multi-select dropdown or checklist
- Shows document names with category badges
- Required field

**Step 2: Quiz Settings**
- Number of questions (slider: 3-20, default 10)
- Show selected number: "10 questions"
- Difficulty level (3 radio cards):
  - Easy: "Basic recall and understanding"
  - Medium: "Application and analysis"
  - Hard: "Synthesis and evaluation"
- Topic focus (optional text input)
  - Placeholder: "e.g., cellular respiration, derivatives, World War II"
  - Help text: "Leave blank for general quiz"

**Generate Button:**
- Large, primary button: "Generate Quiz"
- On click:
  - POST to `/api/v1/quiz/generate`
  - Show loading state: "Generating questions..."
  - Redirect to `/dashboard/quiz/[quizId]` when ready

**Past Quizzes Section (Below Form):**
- Table showing recent quizzes:
  - Title, Date, Score (if completed), Status
- Click to view results or retake

---

### 8. QUIZ TAKING PAGE (`/dashboard/quiz/[quizId]`)

**Top Bar:**
- Progress indicator: "Question 3 of 10" (text + progress bar)
- Timer (optional, countdown or elapsed time)
- "Exit Quiz" button (with "Save progress?" confirmation)

**Question Card (Center, Large):**
- Question number badge (top-left): "Q3"
- Question text (large, readable font, 20-24px)
- 4 option cards (A, B, C, D):
  - Radio button or clickable cards
  - Each card has:
    - Option letter (large, left)
    - Option text (wrapped)
  - On select: Highlight selected card (blue border)
  - Hover effect: Slight scale transform

**Navigation Buttons (Bottom):**
- "Previous" button (secondary, left) - disabled on Q1
- "Next" button (primary, right) - enabled when option selected
- On last question: "Submit Quiz" button (gold/accent color)

**Submit Confirmation:**
- Modal overlay: "Submit Quiz?"
- Summary: "You've answered 10 of 10 questions"
- Unanswered warning (if any): "2 questions unanswered"
- Buttons: "Review Quiz" (goes back), "Submit" (confirms)

---

### 9. QUIZ RESULTS PAGE (`/dashboard/quiz/[quizId]/results`)

**Header Section:**
- Large heading: "Quiz Results"
- Date taken

**Score Display (Top, Prominent):**
- Circular progress indicator (large, animated)
  - Shows percentage: "80%"
  - Color: Green if >70%, yellow if 50-70%, red if <50%
- Score text below: "8 out of 10 correct"

**Summary Stats (3 Cards):**
- Correct: 8 (green)
- Incorrect: 2 (red)
- Time taken: 12 minutes

**Question Breakdown:**
- Accordion or list of all questions
- Each question shows:
  - Question text
  - Your answer (highlighted green if correct, red if incorrect)
  - Correct answer (if you got it wrong)
  - Explanation (from backend)
  - Source reference: "From [Document Name], Page X"

**Action Buttons:**
- "Retake Quiz" (primary)
- "Back to Dashboard" (secondary)
- "Share Score" (social media - UI only) (optional)

---

### 10. ANALYTICS PAGE (`/dashboard/analytics`)

**Time Range Selector (Top Right):**
- Dropdown: Last 7 days | 30 days | 3 months | All time
- Changes all charts dynamically

**Dashboard Stats (4 Cards - Same as main dashboard):**
- Quick overview stats

**Charts Section (Grid Layout):**

**Chart 1: Questions Over Time (Line Chart)**
- X-axis: Dates
- Y-axis: Number of questions
- Shows trend over selected time range
- Tooltip on hover shows exact count

**Chart 2: Questions by Category (Bar Chart)**
- X-axis: Categories (Math, Science, etc.)
- Y-axis: Question count
- Color-coded bars matching category colors

**Chart 3: Study Time by Document (Horizontal Bar Chart)**
- Shows which documents user studies most
- X-axis: Minutes spent
- Y-axis: Document names

**Chart 4: Study Activity Heatmap (GitHub-style Calendar)**
- Grid of squares representing each day
- Color intensity shows activity level (light to dark green)
- Hover shows date and activity count
- Covers last 365 days or selected range

**Weak Areas Section:**
- Heading: "Areas to Improve"
- Cards showing categories with <70% quiz accuracy:
  - Category name
  - Current accuracy percentage
  - Recommendation: "Review [topic] in [document name]"
  - "Practice Quiz" button

**Tables Section:**
- **Recent Quiz Scores**: Date, Quiz Title, Score, Action (View)
- **Most Accessed Documents**: Document name, Times opened, Last accessed

---

### 11. SETTINGS PAGE (`/dashboard/settings`)

**Tabbed Interface (Horizontal Tabs at Top):**

**Tab 1: Profile**
- Avatar upload section:
  - Large circular avatar (120px)
  - "Edit" button overlay on hover
  - Opens file picker (images only)
  - POST to `/api/v1/users/avatar`
  - Shows loading spinner during upload
- Form fields:
  - Full name (text input)
  - Username (text input, checks availability)
  - Email (text input, disabled or with verification flow)
- "Save Changes" button (bottom)

**Tab 2: Password**
- Current password input
- New password input (with strength indicator)
- Confirm new password input
- "Update Password" button
- POST to backend (not shown, but implement in auth flow)

**Tab 3: Preferences**
- **AI Personality** (slider or select):
  - Formal ↔ Balanced ↔ Casual
  - Preview text below shows sample response in each style
- **Citation Style** (dropdown):
  - APA, MLA, Chicago
- **Default Study Mode** (radio buttons):
  - Answer, Summarize, Deep Dive
- **Theme** (toggle or dropdown):
  - Light, Dark, System
  - Use next-themes provider
- "Save Preferences" button

**Tab 4: Notifications**
- Toggle switches for:
  - Email notifications (on/off)
  - Study reminders (on/off)
  - Quiz deadline reminders (on/off)
  - Weekly summary email (on/off)
- If reminder is on, show time picker
- "Save Settings" button

**Tab 5: Account**
- Subscription info (if applicable):
  - Current plan: "Free" or "Premium"
  - "Upgrade" button (if free)
- Usage statistics:
  - Documents uploaded: X/Y (limit)
  - Questions this month: X/Y
  - Storage used: X MB / Y MB
- Danger zone:
  - "Delete Account" button (red, outlined)
  - On click: Opens confirmation modal
    - "Are you sure? This action cannot be undone."
    - Text input: "Type DELETE to confirm"
    - "Cancel" and "Delete Account" buttons
  - POST to backend to delete

---

## LAYOUT COMPONENTS

### Sidebar (Desktop & Tablet)

**Design:**
- Width: 256px (expanded), 64px (collapsed)
- Background: Dark blue (#1E3A8A) or white (based on theme)
- Text: White (dark mode) or dark (light mode)

**Logo Section (Top):**
- LectaVera logo + wordmark (when expanded)
- Icon only (when collapsed)
- Collapse toggle button (chevron icon)

**Navigation Items:**
- Dashboard (home icon)
- My Bookshelf (book icon)
- Study Session (brain/message icon)
- Quiz Mode (clipboard icon)
- Analytics (bar-chart icon)
- Settings (settings/gear icon)

**Each Nav Item:**
- Icon (left)
- Text label (when expanded)
- Active state: Background highlight + border-left accent
- Hover state: Slight background color change
- Badge (optional, for notifications, e.g., "3 new")

**Bottom Section:**
- User info (collapsed: avatar only, expanded: avatar + name)
- Logout button (door icon, red on hover)

### Topbar

**Left Side:**
- Hamburger menu icon (mobile only, opens sidebar overlay)
- Search bar (large input with icon)
  - Placeholder: "Search documents, sessions, quizzes..."
  - On type: Debounce and call `/api/v1/search`
  - Dropdown shows results grouped by type
  - Click result to navigate

**Right Side:**
- Notification bell icon
  - Badge showing unread count
  - Dropdown on click with notification list (mocked for now)
- Theme toggle (sun/moon icon)
- User dropdown:
  - Avatar + username
  - Dropdown menu:
    - View Profile → /dashboard/settings
    - Settings → /dashboard/settings
    - Logout

### Mobile Navigation

**Hamburger Menu:**
- Opens full-screen overlay or slide-in drawer
- Same navigation items as desktop sidebar
- Close button (X icon, top-right)

---

## SHARED UI COMPONENTS

### Loading Skeletons
- Use for: Document cards, message bubbles, tables
- Shimmer animation (gradient moving left to right)
- Match shape/size of actual content

### Empty States
- Show when: No documents, no sessions, no quizzes
- Illustration (minimalist, branded)
- Heading: Clear message ("No documents yet")
- Subtext: Call to action ("Upload your first PDF")
- Primary action button

### Error Boundary
- Catches React errors
- Shows friendly error page:
  - Heading: "Oops! Something went wrong"
  - Subtext: "We're working on fixing this"
  - "Reload Page" button
  - "Go Home" button
- Log error to console (or Sentry if implemented)

### Confirmation Dialogs
- Used for: Delete actions, logout, quiz submit
- Modal overlay with centered card
- Heading: "Are you sure?"
- Subtext: Consequences of action
- Buttons: "Cancel" (secondary), "Confirm" (primary, red if destructive)

### Toast Notifications
- Position: Bottom-right
- Types: Success (green), Error (red), Warning (yellow), Info (blue)
- Auto-dismiss after 5 seconds (except errors)
- Close button (X icon)
- Stack multiple toasts vertically

---

## DATA FETCHING & STATE MANAGEMENT

### TanStack Query Setup

**Query Keys Convention:**
```typescript
// Use arrays for hierarchical keys
['documents'] // All documents
['documents', { category: 'MATH' }] // Filtered
['documents', documentId] // Single document
['study', 'sessions'] // All sessions
['study', 'sessions', sessionId] // Single session
['quiz', quizId] // Single quiz
['analytics', 'dashboard', timeRange] // Dashboard stats
```

**Mutations:**
- Use `useMutation` for all POST, PATCH, DELETE
- On success: Invalidate relevant queries
- Show toast notification
- Optimistic updates where appropriate (e.g., document upload adds to list immediately)

**Example: Documents Hook**
```typescript
// hooks/use-documents.ts

export function useDocuments(filters?: { category?: string; page?: number }) {
  return useQuery({
    queryKey: ['documents', filters],
    queryFn: () => documentsApi.list(filters),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useUploadDocument() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: UploadData) => documentsApi.upload(data),
    onSuccess: (newDoc) => {
      // Optimistically add to list
      queryClient.setQueryData(['documents'], (old: any) => ({
        ...old,
        documents: [newDoc, ...old.documents],
      }));
      
      toast.success('Document uploaded! Processing...');
      
      // Start polling for status
      pollDocumentStatus(newDoc.id);
    },
    onError: () => {
      toast.error('Upload failed. Please try again.');
    },
  });
}

function pollDocumentStatus(docId: string) {
  const interval = setInterval(async () => {
    const status = await documentsApi.getStatus(docId);
    
    if (status.status === 'READY') {
      clearInterval(interval);
      queryClient.invalidateQueries(['documents']);
      toast.success('Document is ready!');
    } else if (status.status === 'FAILED') {
      clearInterval(interval);
      toast.error('Document processing failed.');
    }
  }, 2000); // Poll every 2 seconds
}
```

### WebSocket Hook

```typescript
// hooks/use-websocket.ts

export function useStudyWebSocket(sessionId: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  
  useEffect(() => {
    const token = getAccessToken();
    const ws = new WebSocket(`${WS_BASE_URL}/ws/${sessionId}?token=${token}`);
    
    ws.onopen = () => setIsConnected(true);
    ws.onclose = () => setIsConnected(false);
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      if (data.type === 'chunk') {
        setIsTyping(true);
        // Append chunk to current AI message
        setMessages(prev => {
          const lastMsg = prev[prev.length - 1];
          if (lastMsg?.role === 'assistant' && lastMsg.isStreaming) {
            return [
              ...prev.slice(0, -1),
              { ...lastMsg, content: lastMsg.content + data.content }
            ];
          } else {
            return [...prev, { role: 'assistant', content: data.content, isStreaming: true }];
          }
        });
      } else if (data.type === 'complete') {
        setIsTyping(false);
        // Mark message as complete and add citations
        setMessages(prev => {
          const lastMsg = prev[prev.length - 1];
          return [
            ...prev.slice(0, -1),
            { ...lastMsg, isStreaming: false, citations: data.citations, verdict: data.verdict }
          ];
        });
      }
    };
    
    wsRef.current = ws;
    
    return () => ws.close();
  }, [sessionId]);
  
  const sendMessage = (content: string, mode: string) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      // Add user message immediately
      setMessages(prev => [...prev, { role: 'user', content }]);
      
      // Send to backend
      wsRef.current.send(JSON.stringify({ content, mode }));
    }
  };
  
  return { messages, isConnected, isTyping, sendMessage };
}
```

### Zustand Stores

**Auth Store:**
```typescript
// store/auth-store.ts

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  setAuth: (user: User, tokens: Tokens) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  setAuth: (user, tokens) => set({ user, ...tokens }),
  clearAuth: () => set({ user: null, accessToken: null, refreshToken: null }),
}));
```

**UI Store:**
```typescript
// store/ui-store.ts

interface UIState {
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarCollapsed: false,
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
}));
```

---

## AUTHENTICATION MIDDLEWARE

**File: `middleware.ts`**

```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value;
  const { pathname } = request.nextUrl;
  
  // Public routes
  const publicRoutes = ['/login', '/signup', '/forgot-password', '/reset-password'];
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
  
  // If no token and trying to access protected route
  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // If has token and trying to access auth pages
  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
```

---

## STYLING GUIDELINES

### Tailwind Configuration
```javascript
// tailwind.config.ts

module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EFF6FF',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1E3A8A',
        },
        secondary: {
          500: '#F59E0B',
        },
        accent: {
          500: '#10B981',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        accent: ['Cinzel', 'serif'],
      },
    },
  },
};
```

### Design Tokens
- Border radius: 8px (default), 12px (cards), 16px (message bubbles)
- Shadows: Use Tailwind's shadow-sm, shadow-md, shadow-lg
- Spacing: Follow 4px grid (use Tailwind spacing scale)
- Transitions: 200-300ms duration, ease-in-out

### Responsive Design
- Mobile: < 640px (stack everything, full-width cards)
- Tablet: 640px - 1024px (collapsible sidebar, 2-column grids become 1-column)
- Desktop: > 1024px (full layout, 2-4 column grids)

### Dark Mode
- Use `next-themes` provider
- All components should support both light and dark
- Toggle in topbar and settings
- Persist user preference

---

## PERFORMANCE OPTIMIZATIONS

### Image Optimization
- Use Next.js `<Image>` component for all images
- Lazy load images in document grid
- Placeholder blur for smoother loading

### Code Splitting
- Dynamic imports for heavy components (charts, PDF viewer)
- Lazy load modals and dialogs

### Debouncing
- Search inputs (300ms)
- Username availability check (500ms)

### Memoization
- Use `React.memo` for expensive components
- `useMemo` for heavy computations
- `useCallback` for functions passed as props

---

## ACCESSIBILITY

### ARIA Labels
- All icon buttons must have aria-label
- Form inputs must have associated labels (visible or aria-label)
- Dialog/modal must have aria-labelledby and aria-describedby

### Keyboard Navigation
- All interactive elements must be keyboard accessible
- Tab order should be logical
- Escape key closes modals
- Enter key submits forms

### Focus Indicators
- Visible focus rings (Tailwind's focus:ring classes)
- Skip-to-content link for screen readers

### Color Contrast
- WCAG AA compliance (4.5:1 for normal text, 3:1 for large text)
- Use Tailwind's default color scales (already compliant)

---

## ERROR HANDLING

### Form Validation Errors
- Show below field in red text
- Icon indicator (X icon in red)
- Disable submit until all errors resolved

### API Errors
- Show toast notification
- Log to console for debugging
- Specific error messages (not generic "Something went wrong")
- Retry button for network errors

### 404 Page
- Custom design matching brand
- Heading: "Page Not Found"
- Subtext: "The page you're looking for doesn't exist"
- "Go to Dashboard" button
- Illustration (optional)

### 500 Error Page
- Heading: "Oops! Something went wrong"
- Subtext: "Our team has been notified"
- "Reload Page" button
- "Contact Support" link (if applicable)

---

## TESTING REQUIREMENTS

### Unit Tests
- Test all utility functions
- Test form validation schemas (Zod)

### Component Tests
- Test critical components (forms, chat interface, quiz cards)
- Use React Testing Library
- Mock API calls

### E2E Tests (Optional but Recommended)
- Use Playwright or Cypress
- Test critical user flows:
  - Login → Upload document → Start session → Ask question
  - Login → Create quiz → Take quiz → View results

---

## DEPLOYMENT

### Environment Variables
```bash
# .env.local.example

NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_WS_URL=ws://localhost:8000

# For production:
# NEXT_PUBLIC_API_URL=https://api.lectavera.com/api/v1
# NEXT_PUBLIC_WS_URL=wss://api.lectavera.com
```

### Build Command
```bash
npm run build
```

### Deployment Platforms
- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**

### Pre-deployment Checklist
- [ ] All environment variables configured
- [ ] API base URL points to production backend
- [ ] Dark mode tested
- [ ] Mobile responsive tested
- [ ] All forms validated
- [ ] Error boundaries in place
- [ ] Loading states for all async operations
- [ ] Toast notifications working
- [ ] WebSocket connection tested

---

## DELIVERABLES

Please provide:

1. **Complete, production-ready Next.js application**
   - All pages implemented as specified
   - All components fully functional
   - Proper TypeScript types throughout

2. **API Integration**
   - Axios client with interceptors
   - All API endpoints integrated
   - WebSocket connection for chat
   - Proper error handling

3. **State Management**
   - TanStack Query for server state
   - Zustand for UI state
   - Proper cache invalidation

4. **Styling**
   - Tailwind CSS with custom theme
   - Shadcn/ui components
   - Responsive design (mobile, tablet, desktop)
   - Dark mode support

5. **Authentication Flow**
   - Login/Signup/Logout
   - JWT token management
   - Automatic token refresh
   - Protected routes

6. **Documentation**
   - README with setup instructions
   - Environment variables template
   - Component documentation (if complex)
   - API integration guide

7. **Code Quality**
   - ESLint configured
   - Prettier for formatting
   - TypeScript strict mode
   - No console errors

---

## ADDITIONAL NOTES

### Mock Data
- For demo purposes, you may use mock data for:
  - Notifications (bell icon)
  - OAuth buttons (non-functional)
  - Voice input (non-functional)
  - Some charts if backend endpoints not ready

### Feature Flags
- Wrap incomplete features in feature flags
- Easy to enable/disable for demo

### Performance Budget
- First Contentful Paint: < 2s
- Time to Interactive: < 3s
- Lighthouse score: > 90

### Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## FINAL CHECKLIST

Before considering the project complete, ensure:

- [x] All pages render correctly
- [x] All forms validate properly
- [x] All API calls work (or are properly mocked)
- [x] WebSocket connection established for chat
- [x] Loading states shown during async operations
- [x] Error states handled gracefully
- [x] Empty states displayed when no data
- [x] Responsive on mobile, tablet, desktop
- [x] Dark mode works correctly
- [x] Accessibility standards met (ARIA, keyboard nav)
- [x] No TypeScript errors
- [x] No console errors or warnings
- [x] README includes setup instructions
- [x] Environment variables documented

---

Build this as a **portfolio-worthy, investor-ready** application that showcases modern web development best practices and beautiful UI/UX design. 

The application should feel professional, polished, and production-ready, with attention to detail in animations, transitions, loading states, and error handling. Every interaction should be smooth and delightful.
