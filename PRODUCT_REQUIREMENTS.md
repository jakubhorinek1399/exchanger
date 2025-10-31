# Exchanger - Product Requirements Document (PRD)

**Version:** 1.0
**Last Updated:** 2025-10-31
**Project Status:** Planning Phase

---

## Table of Contents
1. [Executive Summary](#executive-summary)
2. [Product Vision](#product-vision)
3. [Target Audience](#target-audience)
4. [Core Value Proposition](#core-value-proposition)
5. [Feature Requirements](#feature-requirements)
6. [User Stories](#user-stories)
7. [Technical Architecture](#technical-architecture)
8. [Database Schema](#database-schema)
9. [API Endpoints](#api-endpoints)
10. [UI/UX Guidelines](#uiux-guidelines)
11. [Security & Privacy](#security--privacy)
12. [Internationalization (i18n)](#internationalization-i18n)
13. [SEO Strategy](#seo-strategy)
14. [Monetization](#monetization)
15. [Development Phases](#development-phases)
16. [Success Metrics](#success-metrics)

---

## Executive Summary

**Exchanger** is a web-based file and text sharing platform designed for quick, temporary, and secure sharing across multiple devices and platforms. The service emphasizes ease of use, privacy, and cross-platform compatibility through QR codes and simple URL sharing.

**Key Features:**
- Instant file and text sharing with unique URLs
- QR code generation for easy cross-device sharing
- Time-limited shares (15 minutes default, up to 1 day for premium)
- Password protection
- Multi-language support (English, Czech, German, Spanish, Polish)
- Freemium business model with ad-supported free tier

---

## Product Vision

### Mission Statement
"Enable anyone to share files and text instantly, securely, and anonymously across any device or platform, without friction."

### Problem Statement
Users frequently need to share files or text between devices (Android to iOS, phone to laptop, etc.) but face challenges:
- Platform-specific limitations (AirDrop only works on Apple devices)
- Need for accounts or app installations
- Complex sharing processes
- Security concerns with permanent storage
- File size limitations on messaging apps

### Solution
Exchanger provides a universal, web-based sharing solution that:
- Works on any device with a browser
- Requires no account for basic use
- Automatically deletes content after a set time
- Uses QR codes for instant cross-device sharing
- Supports multiple files and rich text simultaneously

---

## Target Audience

### Primary Users
1. **Professionals/Office Workers**
   - Need to quickly share documents across devices
   - Cross-platform teams (mixed OS environments)
   - Quick collaboration without email

2. **Students**
   - Share notes and assignments between devices
   - Group project collaboration
   - Budget-conscious (free tier)

3. **General Consumers**
   - Share photos/videos between personal devices
   - Temporary file sharing with friends/family
   - Privacy-conscious users

### User Personas

**Persona 1: Sarah - Marketing Manager**
- Age: 32
- Devices: iPhone, Windows laptop, iPad
- Use Case: Needs to share presentations and images with mixed-device team during meetings
- Pain Point: AirDrop doesn't work with Windows colleagues

**Persona 2: Tomáš - University Student**
- Age: 21
- Devices: Android phone, university computer lab PCs
- Use Case: Transfer assignments and notes between devices
- Pain Point: Email is slow, USB drives are forgotten

**Persona 3: Michael - Freelance Designer**
- Age: 28
- Devices: MacBook, Android phone, client devices
- Use Case: Share large design files with clients quickly
- Pain Point: File size limits on messaging apps, wants professional solution

---

## Core Value Proposition

### For Free Users
- **Fast**: Upload and share in seconds
- **Universal**: Works on any device with a browser
- **Simple**: No account required
- **Secure**: Auto-deletion after 15 minutes
- **Free**: Up to 250MB per share

### For Premium Users ($4.99/month)
- **Ad-Free**: Clean, uninterrupted experience
- **Larger Files**: Up to 5GB per share
- **Custom URLs**: Memorable share links
- **Extended Time**: Up to 1 day expiration
- **Unlimited Shares**: No rate limits
- **Analytics**: Track views and downloads
- **Management**: Dashboard for all shares

---

## Feature Requirements

### 5.1 Core Features (MVP - Phase 1)

#### 5.1.1 File Upload
- **Multiple file upload** within size limit
- **Drag-and-drop** support
- **File browser** selection
- **Upload progress bar** with percentage
- **Size limits:**
  - Free users: 250MB total per share
  - Premium users: 5GB total per share
- **Supported file types:** All (no restrictions initially)
- **File preview toggle:** Option to disable preview before upload

#### 5.1.2 Text Sharing
- **Rich text editor** (bold, italic, links, formatting)
- **Plain text fallback**
- **Character limit:** 1,000,000 characters (~1MB)
- **Markdown support** (optional)
- **Syntax highlighting** for code (nice-to-have)

#### 5.1.3 Combined Shares
- Users can upload **both files AND text** in a single share
- Clear UI separation between files and text sections

#### 5.1.4 Share Generation
- **Unique 5-character ID** (alphanumeric: A-Z, a-z, 0-9)
  - Example: `exchanger.app/aB3xY`
  - Collision detection and regeneration
- **QR Code generation** immediately after upload
  - High-resolution, scannable
  - Download QR code as PNG
- **Native share button** using Web Share API
  - Fallback to copy link button
- **Direct link display** with copy-to-clipboard button

#### 5.1.5 Share Access
- **View page** at unique URL
- **File list** with names, sizes, icons
- **File preview** for supported types:
  - Images: JPG, PNG, GIF, WebP, SVG
  - PDFs: Embedded viewer
  - Text files: Syntax-highlighted display
  - Videos: HTML5 video player (if reasonable size)
- **Download individual files** or all as ZIP
- **Text display** with rich formatting preserved
- **Copy text button** for easy clipboard copy
- **Download counter** (visible to all)

#### 5.1.6 Expiration & Cleanup
- **Default expiration:** 15 minutes after creation
- **Countdown timer** on share page
- **Automatic deletion** from server when expired
- **Server-side cron job** to clean up expired shares every 5 minutes

### 5.2 Security Features (Phase 1 & 2)

#### 5.2.1 Password Protection
- **Optional password** set during upload
- **Password prompt** on share access
- **3 failed attempts** → show CAPTCHA
- **5 failed attempts** → temporary IP ban (15 minutes)
- **Encryption:** Password hashed with bcrypt

#### 5.2.2 Data Encryption
- **At-rest encryption:** Files encrypted on storage (AES-256)
- **In-transit encryption:** HTTPS/TLS for all connections
- **Database encryption:** Sensitive fields encrypted

#### 5.2.3 Abuse Prevention
- **Rate limiting:**
  - Anonymous: 5 uploads per hour
  - Free users (logged in): 10 uploads per hour
  - Premium: 100 uploads per hour
- **IP-based tracking** for anonymous users
- **CAPTCHA** on upload for anonymous after 3 uploads
- **File scanning:** VirusTotal API integration (Phase 3)

### 5.3 User Management (Phase 2)

#### 5.3.1 Authentication
- **OAuth providers:**
  - Google
  - Apple
  - GitHub (optional)
  - Email/Password (optional)
- **No account required** for basic use
- **Automatic account creation** on first OAuth login

#### 5.3.2 User Dashboard
- **View all active shares** created while logged in
- **Share details:**
  - Creation date/time
  - Expiration countdown
  - File names and sizes
  - View count
  - Download count (premium)
  - Direct link and QR code
- **Actions:**
  - Extend expiration (premium only)
  - Delete manually
  - Copy link
  - Download QR code
- **Share history** (last 50 shares, even if expired)

#### 5.3.3 Settings
- **Account information**
- **Subscription management**
- **Default preferences:**
  - Default expiration time (premium)
  - Default password protection (on/off)
  - File preview default (on/off)
- **Language selection**
- **Delete account**

### 5.4 Premium Features (Phase 2 & 3)

#### 5.4.1 Custom URLs
- **User-defined share IDs** (5-30 characters)
  - Example: `exchanger.app/my-presentation`
- **Availability check** before creation
- **Reserved words blacklist** (admin, api, login, etc.)

#### 5.4.2 Extended Expiration
- **Default:** 1 day (24 hours)
- **Options:** 1 hour, 6 hours, 12 hours, 1 day
- **Extend button** on share page (for creator only)
- **Maximum:** 1 day total

#### 5.4.3 Analytics
- **View tracking:**
  - Total views
  - Unique visitors (IP-based)
  - View timestamps
  - Referrer information (if available)
- **Download tracking:**
  - Per-file download counts
  - Total downloads
  - Download timestamps
- **Geographic data** (country-level, privacy-respecting)

#### 5.4.4 Burn After Reading
- **Optional setting** during upload
- **Delete immediately** after first file download or text view
- **Warning message** for recipients before accessing
- **Premium feature** (free users get 1 BAR share per day)

#### 5.4.5 Expiration Notifications
- **Email notification** 1 hour before expiration
- **In-dashboard notification**
- **Option to extend** from notification (premium only)

### 5.5 Advertising & Monetization Features (Phase 1 & 2)

#### 5.5.1 Advertisement Display
- **Responsive ad units** that adapt to screen size
- **Non-intrusive placement** that doesn't block content
- **Lazy loading** ads to optimize page performance
- **Ad placeholder** while ad loads (prevent layout shift)
- **Premium badge** visible on all ads for free users ("Remove ads - Upgrade to Premium")

#### 5.5.2 AdBlock Detection
- **Client-side detection** on page load
- **Modal popup** with friendly messaging:
  ```
  Title: "Support Exchanger 💙"
  Message: "We noticed you're using an ad blocker.

  Exchanger is completely free and relies on ads to cover server costs and keep the service running.

  You can help us by:
  • Disabling your ad blocker for exchanger.app
  • Upgrading to Premium for just $4.99/month (ad-free forever)

  Thank you for understanding!"

  [How to Disable AdBlock] [Upgrade to Premium ⭐] [Dismiss]
  ```
- **Session-based**: Only show once per browser session
- **Cookie/LocalStorage**: Remember user's choice ("don't show again for 7 days")
- **Non-blocking**: Users can still use service with AdBlock enabled
- **Conversion tracking**: Track how many AdBlock users upgrade to premium

#### 5.5.3 Ad Performance Tracking
- **Ad impressions**: Count of ads displayed
- **Click-through rate (CTR)**: Percentage of ad clicks
- **Revenue per user**: Average ad revenue per free user
- **AdBlock rate**: Percentage of users with ad blockers
- **Conversion from AdBlock modal**: Track "Upgrade to Premium" clicks from modal

### 5.6 Additional Features (Phase 3 & Beyond)

#### 5.6.1 Collaborative Features
- **Comments** on shares (optional, premium)
- **Allow recipients to add files** (optional, premium)
- **View-only vs. download permissions**

#### 5.6.2 Branding
- **Custom domains** (enterprise)
- **Remove "Powered by Exchanger" footer** (premium)

#### 5.6.3 API Access
- **RESTful API** for programmatic uploads
- **API keys** for premium users
- **Webhooks** for share events (enterprise)

#### 5.6.4 Mobile Apps
- **React Native apps** for iOS and Android
- **Share extension** integration
- **Push notifications** for expirations

---

## User Stories

### Anonymous User Stories
1. **As an anonymous user**, I want to upload a file and get a shareable link immediately, so I can quickly share it without creating an account.
2. **As an anonymous user**, I want to see a QR code for my share, so I can easily share it with nearby devices.
3. **As an anonymous user**, I want to password-protect my share, so only intended recipients can access it.
4. **As an anonymous user**, I want my files to automatically delete after 15 minutes, so I don't worry about privacy.

### Free Registered User Stories
5. **As a free user**, I want to see all my active shares in one place, so I can manage them easily.
6. **As a free user**, I want to manually delete a share before it expires, so I can remove sensitive content immediately.
7. **As a free user**, I want to see how many times my share was viewed, so I know it was accessed.
8. **As a free user**, I want to upload multiple files at once, so I can share related documents together.

### Premium User Stories
9. **As a premium user**, I want to create custom URLs, so my shares are more memorable and professional.
10. **As a premium user**, I want to extend expiration up to 1 day, so recipients have more time to access.
11. **As a premium user**, I want detailed analytics on views and downloads, so I understand how my shares are used.
12. **As a premium user**, I want to upload up to 5GB, so I can share large video files or project archives.
13. **As a premium user**, I want unlimited active shares, so I'm not constrained by rate limits.
14. **As a premium user**, I want burn-after-reading shares, so I can share highly sensitive content.
15. **As a premium user**, I want email notifications before shares expire, so I can extend them if needed.

### Recipient User Stories
16. **As a recipient**, I want to preview images and PDFs without downloading, so I can verify content first.
17. **As a recipient**, I want to download all files as a ZIP, so I can get everything in one click.
18. **As a recipient**, I want to copy shared text with one click, so I can paste it easily.
19. **As a recipient**, I want to see how long until the share expires, so I know urgency.
20. **As a recipient**, I want to scan a QR code from my phone, so I can access shares without typing URLs.

---

## Technical Architecture

### 7.1 Technology Stack

#### Frontend
- **Framework:** Next.js 15.5 (App Router)
- **Language:** TypeScript 5.3+
- **React Version:** React 19.2 (with Server Components)
- **Styling:** Tailwind CSS v4.0
- **UI Components:** shadcn/ui or Headless UI
- **Rich Text Editor:** Tiptap v2.11+ or Lexical
- **QR Code Generation:** qrcode.react v4.1+
- **File Upload:** react-dropzone v14.3+
- **State Management:** React Context + Zustand (for complex client state)
- **Forms:** React Hook Form v7.53+ + Zod v3.24+ validation

#### Backend
- **Runtime:** Node.js 20+ LTS (via Next.js)
- **API:** Next.js 15 API Routes (App Router route handlers) + Server Actions
- **Authentication:** NextAuth.js v5 (Auth.js) or Supabase Auth
- **Validation:** Zod v3.24+
- **Server Components:** React 19 Server Components for optimal performance

#### Database
- **Primary DB:** PostgreSQL 15+ (via Supabase)
- **Caching:** Redis 7+ (for rate limiting and session management)
- **ORM:** Prisma v5+ (optional, or use Supabase client v2.50+ directly)
- **Real-time:** Supabase Realtime (optional for future features)

#### File Storage
- **Storage:** Supabase Storage (S3-compatible, integrated with Postgres) or Cloudflare R2 (zero egress fees)
- **Recommendation:** Start with Supabase Storage for simplicity, migrate to R2 if egress costs become significant
- **Encryption:** AES-256 server-side encryption enabled
- **CDN:** Cloudflare for file delivery
- **Features:** Supabase Storage supports S3 protocol (multipart uploads, AWS CLI compatibility)

#### Authentication
- **Service:** Supabase Auth (@supabase/ssr v0.7+) or NextAuth.js v5
- **Providers:** Google, Apple, GitHub
- **Session:** JWT tokens with PKCE flow (automatic with @supabase/ssr)
- **Security:** Row Level Security (RLS) for authorization, bcrypt for password hashing
- **Features:** Anonymous sign-ins supported (2025 Supabase feature)

#### Payments
- **Provider:** Stripe (latest SDK v17.3+)
- **Integration:** Stripe Checkout + Customer Portal
- **Implementation:** Next.js 15 Server Actions (modern approach, simpler than API routes)
- **Webhooks:** For subscription management with signature verification
- **Libraries:** @stripe/stripe-js v4.10+ (client), stripe v17.3+ (server)

#### Email
- **Service:** Resend or SendGrid
- **Use Cases:**
  - Expiration notifications
  - Welcome emails
  - Subscription confirmations

#### Hosting & Deployment
- **Frontend/Backend:** Vercel
- **Database:** Supabase
- **Storage:** Supabase Storage or Cloudflare R2
- **Domain:** exchanger.app (example)

#### Monitoring & Analytics
- **Error Tracking:** Sentry v8.40+ (Next.js 15 integration)
- **Analytics:** Vercel Analytics v1.4+ or Plausible (privacy-friendly)
- **Uptime Monitoring:** Better Uptime or UptimeRobot
- **Performance:** Vercel Speed Insights, Core Web Vitals tracking

#### Internationalization
- **Library:** next-intl v3.25+ (931K weekly downloads, de facto standard for Next.js 15)
- **Languages:** English, Czech, German, Spanish, Polish
- **Translation Management:** Manual JSON files initially
- **Features:** ICU message syntax, Server Components support, automatic locale detection
- **Performance:** Server-side translation loading (no client-side waterfall)

### 7.2 React 19 Features & Optimizations

Exchanger leverages cutting-edge React 19 features for optimal performance and developer experience:

#### Server Components (Production-Ready)
- **Share View Pages** (`/[id]`): Render share metadata on server, eliminate client-side data fetching waterfall
- **Landing Pages**: Static pages (pricing, features, how-it-works) rendered as pure Server Components
- **Dashboard**: Server Component renders share list, Client Components for interactive elements
- **Benefits**: Faster initial loads, better SEO, smaller JavaScript bundles

#### New React 19 Hooks

**`useOptimistic()` - Optimistic UI Updates**
```typescript
// Upload form shows files immediately, updates when upload completes
const [optimisticFiles, addOptimisticFile] = useOptimistic(
  files,
  (state, newFile) => [...state, { ...newFile, status: 'uploading' }]
);
```

**`useFormStatus()` - Form Submission State**
```typescript
// Submit button automatically shows loading state
function SubmitButton() {
  const { pending } = useFormStatus();
  return <button disabled={pending}>
    {pending ? 'Uploading...' : 'Share Now'}
  </button>;
}
```

**`useActionState()` - Form State Management**
```typescript
// Simplified form state with automatic error handling
const [state, formAction] = useActionState(uploadAction, initialState);
```

**`use()` - Read Promises in Render**
```typescript
// Can be used in conditionals, loops, early returns
function ShareData({ sharePromise }) {
  const share = use(sharePromise); // Suspends until resolved
  return <div>{share.title}</div>;
}
```

#### React Compiler (Experimental)
- **Auto-optimization**: Reduces need for manual `useMemo`, `useCallback`, `React.memo`
- **Cleaner Code**: Focus on logic, let compiler handle performance
- **Enable in Phase 2**: After stable foundation, enable for automatic optimizations

#### Server Actions
- **Form Handling**: Direct server mutations without API routes
- **Stripe Integration**: Process payments with Server Actions
- **File Upload**: Simplified upload flow with automatic error handling

### 7.3 Next.js 15 Specific Considerations

#### Caching Strategy (Breaking Change from v14)
**Important:** Next.js 15 changed caching defaults - now **uncached by default**

**Recommended Caching Configuration:**
```typescript
// For static share pages (if share exists)
export const dynamic = 'force-static';
export const revalidate = 3600; // 1 hour

// For API routes that should be cached
export const dynamic = 'force-static';

// For real-time data (default in v15)
export const dynamic = 'force-dynamic';
```

**Impact on Exchanger:**
- ✅ Share pages: Dynamic by default (correct, as shares expire)
- ✅ Landing pages: Can be static for performance
- ✅ API routes: Most should be dynamic (user-specific data)

#### App Router Architecture
- **File-based routing**: Automatic route generation
- **Route Handlers**: Replace old API routes
- **Server Actions**: Direct server mutations
- **Streaming SSR**: Progressive page rendering with Suspense

### 7.4 Tailwind CSS v4.0 Setup

#### CSS-First Configuration
```css
/* app/globals.css */
@import "tailwindcss";

@theme {
  /* Custom colors */
  --color-primary: #3B82F6;
  --color-primary-dark: #1E40AF;

  /* Custom spacing */
  --spacing-section: 5rem;

  /* Custom fonts */
  --font-sans: 'Inter', system-ui, sans-serif;
}
```

#### Performance Benefits
- ⚡ **5x faster full builds** (Oxide engine with Rust)
- ⚡ **100x faster incremental builds**
- 🔧 **Zero configuration**: Automatic content detection
- 📦 **Smaller output**: Only generates used utilities

#### Modern CSS Features
- **`color-mix()`**: Dynamic color mixing
- **`@property`**: Registered custom properties
- **Cascade layers**: Better specificity control
- **Container queries**: Component-based responsive design

### 7.5 System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         USERS                                │
│  (Web Browsers: Desktop, Mobile, Tablet)                    │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        │ HTTPS
                        │
┌───────────────────────▼─────────────────────────────────────┐
│                   CLOUDFLARE CDN                             │
│              (DDoS Protection, Caching)                      │
└───────────────────────┬─────────────────────────────────────┘
                        │
┌───────────────────────▼─────────────────────────────────────┐
│                  VERCEL (Hosting)                            │
│  ┌──────────────────────────────────────────────────────┐   │
│  │         NEXT.JS APPLICATION                          │   │
│  │  ┌────────────────┐  ┌──────────────────┐           │   │
│  │  │  Frontend      │  │  API Routes      │           │   │
│  │  │  (React/Next)  │  │  (Backend Logic) │           │   │
│  │  └────────────────┘  └──────────────────┘           │   │
│  └──────────────────────────────────────────────────────┘   │
└──────────┬──────────────────────┬────────────────┬──────────┘
           │                      │                │
           │                      │                │
┌──────────▼──────────┐  ┌────────▼────────┐  ┌───▼──────────┐
│   SUPABASE          │  │  CLOUDFLARE R2  │  │   STRIPE     │
│                     │  │  (File Storage) │  │  (Payments)  │
│ ┌─────────────────┐ │  │                 │  │              │
│ │  PostgreSQL DB  │ │  │  Encrypted      │  │  Checkout    │
│ └─────────────────┘ │  │  Files          │  │  Portal      │
│ ┌─────────────────┐ │  │                 │  │  Webhooks    │
│ │  Auth Service   │ │  └─────────────────┘  └──────────────┘
│ └─────────────────┘ │
│ ┌─────────────────┐ │
│ │  Storage        │ │
│ └─────────────────┘ │
└─────────────────────┘

           │
┌──────────▼──────────┐
│   REDIS CLOUD       │
│  (Rate Limiting,    │
│   Caching)          │
└─────────────────────┘

CRON JOBS (Vercel Cron)
├─ Cleanup expired shares (every 5 min)
├─ Send expiration notifications (every 15 min)
└─ Generate usage reports (daily)
```

### 7.6 Data Flow

#### Upload Flow (with React 19 Optimizations)
1. User visits homepage → Next.js 15 SSR renders Server Component
2. User selects files + enters text + options (password, BAR, etc.)
3. Frontend validates file sizes and types (client-side)
4. `useOptimistic()` immediately shows files in UI (optimistic update)
5. Files uploaded to Supabase Storage with progress tracking
6. **Server Action** creates database entry with metadata (no API route needed)
7. Unique ID generated (check for collisions)
8. Files encrypted at rest automatically (AES-256)
9. QR code generated client-side with qrcode.react
10. Share URL returned to user, optimistic UI confirmed

#### Access Flow (with Server Components)
1. Recipient visits `exchanger.app/{id}`
2. **Server Component** fetches share metadata from database (server-side)
3. If password-protected → show password prompt (Client Component)
4. If valid → fetch file URLs from storage (signed URLs with 15-min expiry)
5. Display preview/download options (Client Component for interactivity)
6. Track view (Server Action increments counter)
7. On download → generate temporary signed URL → track download (Server Action)

#### Expiration Flow (Automated Cleanup)
1. Vercel Cron function runs every 5 minutes (`/api/cron/cleanup`)
2. Query database for shares where `expires_at < NOW()`
3. For each expired share:
   - Delete files from Supabase Storage (batch delete)
   - Delete database entry (CASCADE deletes related records)
   - Log deletion (for audit and analytics)
4. Send expiration notifications (if user opted in, premium feature)

---

## Database Schema

### 8.1 Tables

#### users
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  avatar_url TEXT,
  provider VARCHAR(50) NOT NULL, -- 'google', 'apple', 'github'
  provider_id VARCHAR(255) NOT NULL,
  subscription_tier VARCHAR(20) DEFAULT 'free', -- 'free', 'premium', 'enterprise'
  subscription_status VARCHAR(20), -- 'active', 'canceled', 'past_due'
  stripe_customer_id VARCHAR(255) UNIQUE,
  stripe_subscription_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  last_login TIMESTAMP,
  preferences JSONB DEFAULT '{}',
  UNIQUE(provider, provider_id)
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_stripe_customer ON users(stripe_customer_id);
```

#### shares
```sql
CREATE TABLE shares (
  id VARCHAR(30) PRIMARY KEY, -- custom or generated ID
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  title VARCHAR(255), -- optional title
  description TEXT, -- optional description

  -- Text content
  text_content TEXT,
  text_format VARCHAR(20) DEFAULT 'richtext', -- 'richtext', 'plain', 'markdown'

  -- Metadata
  password_hash VARCHAR(255), -- bcrypt hash if password-protected
  is_password_protected BOOLEAN DEFAULT FALSE,
  burn_after_reading BOOLEAN DEFAULT FALSE,
  is_burned BOOLEAN DEFAULT FALSE, -- true if already accessed (for BAR)
  preview_enabled BOOLEAN DEFAULT TRUE,

  -- Expiration
  created_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP NOT NULL,
  expiration_minutes INTEGER DEFAULT 15,

  -- Analytics
  view_count INTEGER DEFAULT 0,
  download_count INTEGER DEFAULT 0,
  unique_viewers INTEGER DEFAULT 0,

  -- Flags
  is_active BOOLEAN DEFAULT TRUE,
  is_deleted BOOLEAN DEFAULT FALSE,
  deleted_at TIMESTAMP,

  -- Storage
  total_size_bytes BIGINT DEFAULT 0,
  file_count INTEGER DEFAULT 0,

  -- Settings
  allow_comments BOOLEAN DEFAULT FALSE, -- future feature

  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_shares_user_id ON shares(user_id);
CREATE INDEX idx_shares_expires_at ON shares(expires_at);
CREATE INDEX idx_shares_created_at ON shares(created_at);
CREATE INDEX idx_shares_active ON shares(is_active, is_deleted);
```

#### files
```sql
CREATE TABLE files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  share_id VARCHAR(30) REFERENCES shares(id) ON DELETE CASCADE,

  -- File info
  filename VARCHAR(255) NOT NULL,
  original_filename VARCHAR(255) NOT NULL,
  mime_type VARCHAR(100) NOT NULL,
  size_bytes BIGINT NOT NULL,

  -- Storage
  storage_path TEXT NOT NULL, -- path in R2/Supabase Storage
  storage_provider VARCHAR(50) DEFAULT 'cloudflare-r2', -- 'cloudflare-r2', 'supabase'
  encryption_key_id VARCHAR(255), -- for client-side encryption (future)

  -- Metadata
  file_hash VARCHAR(64), -- SHA-256 hash for deduplication (future)
  is_preview_generated BOOLEAN DEFAULT FALSE,
  preview_path TEXT, -- thumbnail/preview file path

  -- Analytics
  download_count INTEGER DEFAULT 0,

  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  deleted_at TIMESTAMP
);

CREATE INDEX idx_files_share_id ON files(share_id);
CREATE INDEX idx_files_storage_path ON files(storage_path);
```

#### share_analytics
```sql
CREATE TABLE share_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  share_id VARCHAR(30) REFERENCES shares(id) ON DELETE CASCADE,

  -- Event type
  event_type VARCHAR(20) NOT NULL, -- 'view', 'download', 'password_attempt'

  -- Request info
  ip_address VARCHAR(45), -- hashed for privacy
  user_agent TEXT,
  referer TEXT,
  country_code VARCHAR(2), -- from IP geolocation

  -- Download-specific
  file_id UUID REFERENCES files(id) ON DELETE SET NULL,

  -- Timestamp
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_analytics_share_id ON share_analytics(share_id);
CREATE INDEX idx_analytics_event_type ON share_analytics(event_type);
CREATE INDEX idx_analytics_created_at ON share_analytics(created_at);
```

#### abuse_reports
```sql
CREATE TABLE abuse_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  share_id VARCHAR(30) REFERENCES shares(id) ON DELETE CASCADE,

  -- Report details
  reason VARCHAR(50) NOT NULL, -- 'copyright', 'illegal', 'malware', 'doxxing', 'spam', 'other'
  description TEXT,
  reporter_email VARCHAR(255), -- optional
  reporter_ip VARCHAR(45), -- hashed

  -- Review status
  status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'reviewing', 'resolved', 'dismissed'
  reviewed_by UUID REFERENCES users(id) ON DELETE SET NULL, -- admin user
  reviewed_at TIMESTAMP,
  resolution_notes TEXT,

  -- Actions taken
  action_taken VARCHAR(50), -- 'removed', 'warned_user', 'banned_user', 'no_action'

  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_abuse_reports_share_id ON abuse_reports(share_id);
CREATE INDEX idx_abuse_reports_status ON abuse_reports(status);
CREATE INDEX idx_abuse_reports_created_at ON abuse_reports(created_at);
```

#### ad_analytics
```sql
CREATE TABLE ad_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- User info
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  session_id VARCHAR(255), -- anonymous session tracking

  -- Ad details
  ad_unit VARCHAR(50), -- 'homepage_banner', 'share_page_banner', etc.
  ad_network VARCHAR(50), -- 'adsense', 'brave', 'carbon'

  -- Events
  event_type VARCHAR(20) NOT NULL, -- 'impression', 'click', 'blocked'
  is_adblock_enabled BOOLEAN DEFAULT FALSE,

  -- Context
  page_url TEXT,
  ip_address VARCHAR(45), -- hashed
  country_code VARCHAR(2),

  -- Timestamp
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_ad_analytics_event_type ON ad_analytics(event_type);
CREATE INDEX idx_ad_analytics_created_at ON ad_analytics(created_at);
CREATE INDEX idx_ad_analytics_ad_unit ON ad_analytics(ad_unit);
```

#### rate_limits
```sql
CREATE TABLE rate_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  identifier VARCHAR(255) NOT NULL, -- IP address or user_id
  identifier_type VARCHAR(20) NOT NULL, -- 'ip', 'user'
  action VARCHAR(50) NOT NULL, -- 'upload', 'download', 'password_attempt'
  count INTEGER DEFAULT 1,
  window_start TIMESTAMP DEFAULT NOW(),
  window_end TIMESTAMP NOT NULL,
  is_banned BOOLEAN DEFAULT FALSE,
  banned_until TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(identifier, action, window_start)
);

CREATE INDEX idx_rate_limits_identifier ON rate_limits(identifier, action);
CREATE INDEX idx_rate_limits_window ON rate_limits(window_end);
```

#### subscriptions_log
```sql
CREATE TABLE subscriptions_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  event_type VARCHAR(50) NOT NULL, -- 'created', 'updated', 'canceled', 'payment_failed'
  stripe_event_id VARCHAR(255),
  tier VARCHAR(20),
  status VARCHAR(20),
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_subscriptions_log_user_id ON subscriptions_log(user_id);
```

### 8.2 Database Migrations

Use Prisma Migrate or Supabase Migrations for version-controlled schema changes.

---

## API Endpoints

### 9.1 Public Endpoints (No Auth Required)

#### POST /api/shares
Create a new share (anonymous or authenticated)

**Request Body:**
```json
{
  "files": [
    {
      "filename": "document.pdf",
      "size": 1024000,
      "type": "application/pdf"
    }
  ],
  "text": {
    "content": "<p>Rich text content</p>",
    "format": "richtext"
  },
  "options": {
    "password": "optional-password",
    "burnAfterReading": false,
    "previewEnabled": true,
    "customId": "my-share" // premium only
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "shareId": "aB3xY",
    "url": "https://exchanger.app/aB3xY",
    "qrCode": "data:image/png;base64,...",
    "expiresAt": "2025-10-31T12:15:00Z",
    "uploadUrls": [
      {
        "fileId": "uuid",
        "uploadUrl": "https://storage.../presigned-url"
      }
    ]
  }
}
```

#### GET /api/shares/[id]
Retrieve share information

**Query Params:**
- `password` (optional): Password for protected shares

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "aB3xY",
    "title": "My Share",
    "textContent": "<p>Rich text</p>",
    "textFormat": "richtext",
    "files": [
      {
        "id": "uuid",
        "filename": "document.pdf",
        "size": 1024000,
        "mimeType": "application/pdf",
        "downloadUrl": "https://storage.../signed-url",
        "previewUrl": "https://storage.../preview-url"
      }
    ],
    "expiresAt": "2025-10-31T12:15:00Z",
    "viewCount": 42,
    "downloadCount": 10,
    "burnAfterReading": false,
    "previewEnabled": true,
    "isPasswordProtected": false
  }
}
```

#### POST /api/shares/[id]/verify-password
Verify password for protected share

**Request Body:**
```json
{
  "password": "user-entered-password"
}
```

**Response:**
```json
{
  "success": true,
  "token": "jwt-token-for-access"
}
```

#### POST /api/shares/[id]/track
Track analytics event (view, download)

**Request Body:**
```json
{
  "eventType": "view",
  "fileId": "uuid" // optional, for downloads
}
```

**Response:**
```json
{
  "success": true
}
```

#### POST /api/shares/[id]/report
Report abusive content

**Request Body:**
```json
{
  "reason": "copyright", // 'copyright', 'illegal', 'malware', 'doxxing', 'spam', 'other'
  "description": "This share contains pirated movies",
  "reporterEmail": "optional@example.com" // optional
}
```

**Response:**
```json
{
  "success": true,
  "message": "Report submitted. We will review within 24 hours.",
  "reportId": "uuid"
}
```

#### GET /api/shares/[id]/download
Download all files as ZIP

**Response:** ZIP file stream

### 9.2 Authenticated Endpoints (Auth Required)

#### GET /api/user/shares
Get user's active shares

**Query Params:**
- `page` (default: 1)
- `limit` (default: 20)
- `status` (optional: 'active', 'expired', 'all')

**Response:**
```json
{
  "success": true,
  "data": {
    "shares": [
      {
        "id": "aB3xY",
        "title": "My Share",
        "createdAt": "2025-10-31T12:00:00Z",
        "expiresAt": "2025-10-31T12:15:00Z",
        "fileCount": 3,
        "totalSize": 5242880,
        "viewCount": 42,
        "downloadCount": 10,
        "url": "https://exchanger.app/aB3xY",
        "isActive": true
      }
    ],
    "pagination": {
      "total": 100,
      "page": 1,
      "limit": 20,
      "totalPages": 5
    }
  }
}
```

#### DELETE /api/shares/[id]
Delete a share (creator only)

**Response:**
```json
{
  "success": true,
  "message": "Share deleted successfully"
}
```

#### POST /api/shares/[id]/extend
Extend share expiration (premium only)

**Request Body:**
```json
{
  "expirationMinutes": 1440 // 1 day
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "newExpiresAt": "2025-11-01T12:00:00Z"
  }
}
```

#### GET /api/user/shares/[id]/analytics
Get detailed analytics for a share (premium only)

**Response:**
```json
{
  "success": true,
  "data": {
    "totalViews": 150,
    "uniqueViewers": 42,
    "totalDownloads": 35,
    "viewsByCountry": {
      "US": 50,
      "CZ": 30,
      "DE": 20
    },
    "viewsOverTime": [
      {
        "timestamp": "2025-10-31T12:00:00Z",
        "views": 5
      }
    ],
    "downloadsByFile": [
      {
        "fileId": "uuid",
        "filename": "document.pdf",
        "downloads": 20
      }
    ]
  }
}
```

#### GET /api/user/profile
Get user profile

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "avatarUrl": "https://...",
    "subscriptionTier": "premium",
    "subscriptionStatus": "active",
    "createdAt": "2025-01-01T00:00:00Z",
    "preferences": {
      "defaultExpiration": 1440,
      "defaultPasswordProtected": false
    }
  }
}
```

#### PATCH /api/user/profile
Update user profile

**Request Body:**
```json
{
  "name": "New Name",
  "preferences": {
    "defaultExpiration": 1440
  }
}
```

#### GET /api/user/subscription
Get subscription details

**Response:**
```json
{
  "success": true,
  "data": {
    "tier": "premium",
    "status": "active",
    "currentPeriodEnd": "2025-11-30T23:59:59Z",
    "cancelAtPeriodEnd": false,
    "stripeCustomerId": "cus_xxx"
  }
}
```

### 9.3 Admin Endpoints (Future)

#### GET /api/admin/stats
System-wide statistics

#### GET /api/admin/users
List users with filters

#### DELETE /api/admin/shares/[id]
Force delete any share

---

## UI/UX Guidelines

### 10.1 Design Principles

1. **Simplicity First**: Minimize steps to share
2. **Visual Clarity**: Clear hierarchy, generous whitespace
3. **Responsive**: Mobile-first design
4. **Fast**: Perceived performance (skeleton loaders, optimistic updates)
5. **Accessible**: WCAG 2.1 AA compliance
6. **Trustworthy**: Professional, secure visual language

### 10.2 Color Palette (Suggested)

```
Primary: #3B82F6 (Blue-500) - Action buttons, links
Primary Dark: #1E40AF (Blue-800) - Hover states
Secondary: #8B5CF6 (Violet-500) - Premium features
Success: #10B981 (Green-500) - Confirmations
Warning: #F59E0B (Amber-500) - Expiration warnings
Error: #EF4444 (Red-500) - Errors, destructive actions
Neutral: #6B7280 (Gray-500) - Text, borders
Background: #F9FAFB (Gray-50) - Page background
Surface: #FFFFFF (White) - Cards, modals
```

### 10.3 Typography

```
Font Family:
- Headings: Inter (Google Fonts)
- Body: Inter (Google Fonts)
- Code: JetBrains Mono (monospace)

Sizes:
- H1: 2.5rem (40px) - Page titles
- H2: 2rem (32px) - Section titles
- H3: 1.5rem (24px) - Subsections
- Body: 1rem (16px) - Default text
- Small: 0.875rem (14px) - Captions, metadata
- Tiny: 0.75rem (12px) - Timestamps, legal
```

### 10.4 Key Pages & Layouts

#### Homepage (`/`)
```
┌─────────────────────────────────────────────────────┐
│  [Logo] Exchanger          [Login] [Get Premium]    │
├─────────────────────────────────────────────────────┤
│  ┌───────────────────────────────────────────────┐ │
│  │ [  728x90 AD BANNER - Free users only  ]     │ │
│  │ Remove ads - Upgrade to Premium →            │ │
│  └───────────────────────────────────────────────┘ │
│                                                      │
│         Share files instantly, securely,            │
│              across any device                      │
│                                                      │
│  ┌────────────────────────────────────────────┐    │
│  │  [📁 Drop files here or click to browse]  │    │
│  │                                            │    │
│  │  Or paste/type text:                      │    │
│  │  [Rich text editor area]                  │    │
│  └────────────────────────────────────────────┘    │
│                                                      │
│  ⚙️ Options:                                        │
│  [ ] Password protect                               │
│  [ ] Burn after reading 🔒 Premium                 │
│  Expires in: [15 min ▾] (Premium: up to 1 day)     │
│                                                      │
│  [     Share Now     ]  ← Big CTA button           │
│                                                      │
│  ✓ Up to 250MB free | 5GB with Premium             │
│  ✓ Auto-delete after expiration                    │
│  ✓ Works on all devices                            │
│                                                      │
├─────────────────────────────────────────────────────┤
│  How It Works | Features | Pricing | Languages     │
└─────────────────────────────────────────────────────┘
```

#### Share Page (`/[id]`)
```
┌─────────────────────────────────────────────────────┐
│  [Logo] Exchanger                    [🏠 Create New]│
├─────────────────────────────────────────────────────┤
│  ┌───────────────────────────────────────────────┐ │
│  │ [  728x90 AD BANNER - Free users only  ]     │ │
│  └───────────────────────────────────────────────┘ │
│                                                      │
│  📦 My Project Files                                │
│  Expires in: ⏱️ 12 minutes 34 seconds              │
│  👁️ 42 views                                        │
│                                                      │
│  [Password Protected] Enter password: [___] [✓]    │
│  (if applicable)                                    │
│                                                      │
│  📄 Text Content:                                   │
│  ┌────────────────────────────────────────────┐    │
│  │ Here are the files for the project...     │    │
│  │ [Rich text displayed]                     │    │
│  └────────────────────────────────────────────┘    │
│  [📋 Copy Text]                                    │
│                                                      │
│  📁 Files (3):                                      │
│  ┌────────────────────────────────────────────┐    │
│  │ 🖼️ image.png (2.5 MB)        [Preview] [⬇]│    │
│  │ 📄 document.pdf (1.2 MB)     [Preview] [⬇]│    │
│  │ 📊 data.xlsx (500 KB)                  [⬇]│    │
│  └────────────────────────────────────────────┘    │
│  [⬇ Download All as ZIP]                          │
│                                                      │
│  📱 Share this page:                                │
│  ┌──────────────┐                                   │
│  │   QR CODE    │  [📤 Share] [🔗 Copy Link]      │
│  │   [image]    │                                   │
│  └──────────────┘                                   │
│                                                      │
│  ⚠️ This share will be permanently deleted after   │
│     expiration. Download now!                      │
│                                                      │
└─────────────────────────────────────────────────────┘
```

#### User Dashboard (`/dashboard`)
```
┌─────────────────────────────────────────────────────┐
│  [Logo] Exchanger  Dashboard  [Profile ▾] [Logout] │
├─────────────────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌──────────┐          │
│  │ Active   │  │ Total    │  │ Views    │          │
│  │ Shares   │  │ Uploaded │  │ Today    │          │
│  │   12     │  │   156    │  │   342    │          │
│  └──────────┘  └──────────┘  └──────────┘          │
│                                                      │
│  Active Shares                  [🆕 Create New]    │
│  ┌────────────────────────────────────────────┐    │
│  │ 🔗 aB3xY - Project Files                  │    │
│  │ ⏱️ Expires in 8 min | 👁️ 12 views         │    │
│  │ [Copy Link] [QR] [Extend 🔒] [Delete]    │    │
│  ├────────────────────────────────────────────┤    │
│  │ 🔗 xYz12 - Meeting Notes                  │    │
│  │ ⏱️ Expires in 45 min | 👁️ 3 views         │    │
│  │ [Copy Link] [QR] [Extend 🔒] [Delete]    │    │
│  └────────────────────────────────────────────┘    │
│                                                      │
│  Recent History (Last 50)                           │
│  [Filter: All ▾] [Search...]                       │
│  ...                                                 │
│                                                      │
└─────────────────────────────────────────────────────┘
```

#### Pricing Page (`/pricing`)
```
┌─────────────────────────────────────────────────────┐
│  [Logo] Exchanger         [Login] [Start Free]     │
├─────────────────────────────────────────────────────┤
│                                                      │
│              Choose Your Plan                       │
│                                                      │
│  ┌──────────────┐  ┌──────────────┐                │
│  │   FREE       │  │  PREMIUM ⭐  │                │
│  │              │  │              │                │
│  │   $0/mo      │  │  $4.99/mo    │                │
│  │              │  │              │                │
│  │ ✓ 250MB max  │  │ ✓ 5GB max    │                │
│  │ ✓ 15 min     │  │ ✓ 1 day max  │                │
│  │ ✓ QR codes   │  │ ✓ Custom URLs│                │
│  │ ✓ Basic      │  │ ✓ Analytics  │                │
│  │   analytics  │  │ ✓ Unlimited  │                │
│  │ ✓ Ads        │  │ ✓ Ad-free    │                │
│  │              │  │ ✓ Priority   │                │
│  │              │  │ ✓ Burn After │                │
│  │              │  │   Reading    │                │
│  │              │  │ ✓ Extend     │                │
│  │              │  │   expiration │                │
│  │              │  │              │                │
│  │ [Start Free] │  │ [Upgrade]    │                │
│  └──────────────┘  └──────────────┘                │
│                                                      │
└─────────────────────────────────────────────────────┘
```

### 10.5 Key UX Flows

#### Upload Flow (Free User)
1. User lands on homepage
2. Drag files OR click to browse OR paste text
3. Files upload with progress bar
4. (Optional) Set password, toggle preview
5. Click "Share Now"
6. Share page loads with QR code, link, share button
7. Auto-copy link to clipboard + show toast notification
8. Show countdown timer
9. (Optional) Create account prompt with benefits

#### Download Flow (Recipient)
1. User clicks link or scans QR code
2. Share page loads
3. (If password-protected) Enter password
4. View text content, file list
5. (Optional) Preview files
6. Click download individual file OR download all
7. File downloads, counter increments

#### Premium Upgrade Flow
1. Free user sees premium badge on feature
2. Clicks "Upgrade to Premium"
3. Redirects to pricing page
4. Clicks "Upgrade" on Premium plan
5. (If not logged in) OAuth login
6. Stripe Checkout opens
7. User enters payment details
8. Redirects back to dashboard with success message
9. Premium features unlocked immediately

### 10.6 Accessibility Requirements

- **Keyboard Navigation**: All interactive elements accessible via keyboard
- **Screen Reader Support**: Proper ARIA labels, semantic HTML
- **Color Contrast**: Minimum 4.5:1 for text, 3:1 for UI components
- **Focus Indicators**: Visible focus states on all interactive elements
- **Alt Text**: All images have descriptive alt text
- **Form Labels**: All form inputs have associated labels
- **Error Messages**: Clear, accessible error announcements
- **Skip Links**: Skip to main content link at top

### 10.7 Mobile Considerations

- **Touch Targets**: Minimum 44x44px for all buttons/links
- **Responsive Breakpoints**:
  - Mobile: < 640px
  - Tablet: 640px - 1024px
  - Desktop: > 1024px
- **Mobile Upload**: Native file picker integration
- **QR Code Scanning**: Native share sheet on mobile
- **Swipe Gestures**: Swipe to delete on dashboard (iOS/Android pattern)
- **Bottom Navigation**: Fixed bottom bar for key actions on mobile

---

## Security & Privacy

### 11.1 Data Protection

#### Encryption
- **In Transit**: TLS 1.3 for all connections
- **At Rest**: AES-256 encryption for stored files
- **Database**: Encrypted fields for sensitive data (passwords, tokens)
- **Passwords**: bcrypt with salt (cost factor 12)

#### Data Retention
- **Files**: Deleted immediately after expiration
- **Database Records**: Soft-deleted, hard-deleted after 30 days
- **Analytics**: Anonymized, aggregated after 90 days
- **User Data**: Retained until account deletion + 30 days

#### GDPR Compliance
- **Right to Access**: User can export all their data
- **Right to Erasure**: Delete account and all associated data
- **Data Portability**: Export shares and analytics in JSON format
- **Cookie Consent**: Banner on first visit (EU users)
- **Privacy Policy**: Clear, accessible explanation of data usage

### 11.2 Authentication & Authorization

#### OAuth Security
- **PKCE Flow**: Proof Key for Code Exchange for OAuth
- **State Parameter**: CSRF protection
- **Token Storage**: HTTP-only cookies for refresh tokens
- **Access Tokens**: Short-lived (15 min), JWT format

#### Session Management
- **Session Expiry**: 30 days inactivity
- **Device Management**: View and revoke active sessions
- **2FA**: Optional (Phase 3)

### 11.3 Abuse Prevention

#### Rate Limiting (per hour)
| User Type | Uploads | Downloads | Password Attempts |
|-----------|---------|-----------|-------------------|
| Anonymous | 5       | 50        | 3                 |
| Free      | 10      | 100       | 5                 |
| Premium   | 100     | Unlimited | 10                |

#### CAPTCHA
- **Triggers**: After rate limit exceeded
- **Provider**: hCaptcha or Cloudflare Turnstile (invisible)
- **Bypass**: Logged-in premium users

#### Content Moderation
- **Phase 1**: User reporting system
- **Phase 2**: Automated scanning for known malware hashes
- **Phase 3**: VirusTotal API integration
- **Phase 4**: AI-based content moderation (NSFW, illegal content)

#### IP Banning
- **Temporary Ban**: 15 minutes after 5 failed password attempts
- **Permanent Ban**: Manual admin action for severe abuse
- **Bypass**: User can appeal via email

### 11.4 Secure File Handling

#### Upload Validation
- **File Size**: Enforce limits server-side
- **MIME Type**: Validate against whitelist (or allow all with warnings)
- **Filename Sanitization**: Remove special characters, path traversal attempts
- **Magic Number Verification**: Check file headers match extension

#### Download Security
- **Signed URLs**: Temporary, expiring download links (15 min)
- **Content-Disposition**: Force download for potentially dangerous files
- **Content-Type**: Serve with correct MIME type
- **Virus Scanning**: Before download (Phase 3)

### 11.5 Infrastructure Security

#### Hosting
- **DDoS Protection**: Cloudflare
- **Web Application Firewall**: Cloudflare WAF
- **SSL/TLS**: Auto-renewing certificates via Vercel
- **Environment Variables**: Stored securely in Vercel/Supabase

#### Database
- **Access Control**: Least privilege principle
- **Backups**: Daily automated backups (7-day retention)
- **Connection Security**: SSL required
- **SQL Injection**: Parameterized queries, ORM usage

#### Monitoring
- **Error Tracking**: Sentry (no PII in logs)
- **Uptime Monitoring**: Better Uptime
- **Security Scanning**: Dependabot, Snyk
- **Log Retention**: 30 days, anonymized

---

## Internationalization (i18n)

### 12.1 Supported Languages (Launch)

1. **English (en)** - Default
2. **Czech (cs)**
3. **German (de)**
4. **Spanish (es)**
5. **Polish (pl)**

### 12.2 Implementation

#### URL Structure
```
https://exchanger.app/en
https://exchanger.app/cs
https://exchanger.app/de
https://exchanger.app/es
https://exchanger.app/pl
```

#### Language Detection
1. Check URL path (`/cs/...`)
2. Check user preference (if logged in)
3. Check `Accept-Language` header
4. Fallback to English

#### Translation Files
```
/locales
  /en
    common.json
    homepage.json
    dashboard.json
    errors.json
  /cs
    common.json
    homepage.json
    ...
  /de
  /es
  /pl
```

#### Translation Keys
```json
// common.json
{
  "app.name": "Exchanger",
  "app.tagline": "Share files instantly, securely, across any device",
  "buttons.upload": "Upload",
  "buttons.download": "Download",
  "buttons.share": "Share",
  "buttons.copy_link": "Copy Link",
  "time.minutes": "{{count}} minute",
  "time.minutes_plural": "{{count}} minutes",
  "file.size.mb": "{{size}} MB"
}
```

### 12.3 Localization Considerations

#### Date/Time Formatting
- Use `Intl.DateTimeFormat` for locale-aware formatting
- Display timezone-aware timestamps
- Use relative time ("5 minutes ago") with appropriate translations

#### Number Formatting
- Use `Intl.NumberFormat` for file sizes, counts
- Proper decimal separators (`.` vs `,`)

#### Currency
- Display in user's local currency (Stripe handles conversion)
- Show USD equivalent for transparency

#### Content
- All UI text translatable
- Error messages localized
- Email notifications in user's language
- Legal documents (ToS, Privacy Policy) in all languages

### 12.4 SEO for Multi-Language

#### hreflang Tags
```html
<link rel="alternate" hreflang="en" href="https://exchanger.app/en" />
<link rel="alternate" hreflang="cs" href="https://exchanger.app/cs" />
<link rel="alternate" hreflang="de" href="https://exchanger.app/de" />
<link rel="alternate" hreflang="es" href="https://exchanger.app/es" />
<link rel="alternate" hreflang="pl" href="https://exchanger.app/pl" />
<link rel="alternate" hreflang="x-default" href="https://exchanger.app/en" />
```

#### Localized Metadata
- Unique `<title>` and `<meta description>` per language
- Open Graph tags in each language
- Localized content, not just UI translation
- Country-specific landing pages (future)

---

## SEO Strategy

### 13.1 Technical SEO

#### Performance
- **Core Web Vitals**: All metrics in "Good" range
  - LCP (Largest Contentful Paint): < 2.5s
  - FID (First Input Delay): < 100ms
  - CLS (Cumulative Layout Shift): < 0.1
- **Time to First Byte**: < 600ms
- **Image Optimization**: WebP format, lazy loading, responsive images
- **Code Splitting**: Route-based splitting in Next.js
- **CDN**: Cloudflare for global edge caching

#### Indexability
- **Sitemap**: Auto-generated XML sitemap
  - Homepage (all languages)
  - Pricing page (all languages)
  - Blog posts (future)
- **Robots.txt**:
  ```
  User-agent: *
  Allow: /
  Disallow: /api/
  Disallow: /dashboard/
  Sitemap: https://exchanger.app/sitemap.xml
  ```
- **Canonical URLs**: Proper canonical tags to avoid duplicates
- **No Index**: Share pages (`/[id]`) set to `noindex` (ephemeral content)

#### Structured Data
```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Exchanger",
  "description": "Share files instantly, securely, across any device",
  "url": "https://exchanger.app",
  "applicationCategory": "UtilitiesApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "operatingSystem": "Any",
  "browserRequirements": "Requires JavaScript"
}
```

### 13.2 Content Strategy

#### Core Pages (All Languages)
1. **Homepage**: Main entry point, value proposition
2. **Pricing**: Clear pricing tiers with CTA
3. **How It Works**: Step-by-step guide with screenshots
4. **Features**: Detailed feature list with benefits
5. **FAQ**: Common questions (20+ items)
6. **Terms of Service**: Legal agreement, acceptable use policy
7. **Privacy Policy**: GDPR-compliant data handling
8. **Acceptable Use Policy**: Prohibited content and enforcement
9. **DMCA Policy**: Copyright infringement process
10. **Contact/Support**: Abuse reporting, general inquiries
11. **Blog**: (Phase 2)
   - "How to Share Files Securely"
   - "Best Practices for Cross-Platform Sharing"
   - "Exchanger vs. Competitors"
   - Language-specific content

#### Keyword Targeting

**English:**
- Primary: "share files online", "temporary file sharing", "secure file transfer"
- Secondary: "qr code file sharing", "cross platform file sharing", "anonymous file upload"
- Long-tail: "how to share large files between android and iphone", "temporary file hosting"

**Czech:**
- "sdílení souborů online", "dočasné sdílení souborů", "bezpečný přenos souborů"

**German:**
- "dateien online teilen", "temporärer dateiaustausch", "sicherer dateitransfer"

**Spanish:**
- "compartir archivos online", "transferencia temporal de archivos", "enviar archivos seguros"

**Polish:**
- "udostępnianie plików online", "tymczasowe udostępnianie plików", "bezpieczny transfer plików"

### 13.3 On-Page SEO

#### Meta Tags Template
```html
<!-- English Homepage -->
<title>Exchanger - Share Files Instantly & Securely Across Any Device</title>
<meta name="description" content="Share files and text instantly with QR codes. Works on any device, auto-deletes after 15 minutes. Free up to 250MB. No account required." />
<meta name="keywords" content="file sharing, secure file transfer, qr code sharing, temporary files, cross-platform" />

<!-- Open Graph -->
<meta property="og:title" content="Exchanger - Instant Secure File Sharing" />
<meta property="og:description" content="Share files across any device with QR codes. Auto-delete, secure, and free." />
<meta property="og:image" content="https://exchanger.app/og-image.png" />
<meta property="og:url" content="https://exchanger.app/en" />
<meta property="og:type" content="website" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Exchanger - Instant Secure File Sharing" />
<meta name="twitter:description" content="Share files across any device with QR codes." />
<meta name="twitter:image" content="https://exchanger.app/twitter-card.png" />
```

#### Heading Structure
```
H1: Exchanger - Share Files Instantly & Securely (once per page)
H2: How It Works
H3: 1. Upload Your Files
H3: 2. Get a Unique Link & QR Code
H3: 3. Share Across Any Device
H2: Features
H3: Temporary & Secure
H3: Cross-Platform Compatible
H2: Pricing
```

### 13.4 Off-Page SEO

#### Backlink Strategy
- **Product Hunt Launch**: High-quality backlink + initial traffic
- **Hacker News Post**: "Show HN: Exchanger - Temporary File Sharing"
- **GitHub README**: Open-source QR code generator linking to service
- **Blog Outreach**: Guest posts on tech blogs
- **Directory Submissions**:
  - AlternativeTo.net
  - Capterra
  - G2
  - Product Hunt alternatives

#### Social Media
- **Twitter/X**: Share tips, use cases, updates
- **Reddit**: r/webdev, r/productivity (no spam, genuine engagement)
- **LinkedIn**: Professional use cases
- **YouTube**: Tutorial videos (future)

### 13.5 Local SEO (If Applicable)

- Google My Business (if offering local services in future)
- Local language content targeting specific countries
- Country-specific landing pages (e.g., `/cz/` for Czech users)

### 13.6 Monitoring & Analytics

#### Tools
- **Google Search Console**: Track indexing, queries, clicks
- **Google Analytics 4** or **Plausible**: Privacy-friendly analytics
- **Ahrefs/SEMrush**: Keyword tracking, backlink monitoring
- **Lighthouse**: Automated performance audits

#### KPIs
- Organic traffic growth (month-over-month)
- Keyword rankings (top 10 for target keywords)
- Backlink count and quality
- Core Web Vitals scores
- Conversion rate (upload to premium)

---

## Monetization

### 14.1 Revenue Streams

#### 1. Subscription (Primary)
- **Freemium Model**: Free tier with ads, premium at $4.99/month
- **Tiers**:
  - **Free**: $0/month (with ads)
  - **Premium**: $4.99/month or $49.99/year (save 17%)
  - **Enterprise** (Future): Custom pricing for teams

#### 2. Advertising (Secondary)
- **Ad Networks**:
  - Google AdSense (primary)
  - Brave Ads (privacy-respecting alternative)
  - Carbon Ads (tech-focused, non-intrusive)
- **Ad Placement**:
  - **Homepage**:
    - Horizontal banner ad at top (728x90 leaderboard) - Desktop
    - Mobile banner (320x50) - Mobile
    - Sidebar ad (300x250 medium rectangle) - Desktop only
  - **Share Page (Recipient View)**:
    - Small banner ad above file list (728x90 or 300x250)
    - Bottom sticky ad on mobile (320x50)
  - **Dashboard** (Free users only):
    - Small banner in sidebar
  - **No ads during**:
    - Upload process (to avoid friction)
    - Payment/checkout flow
    - Settings pages
- **Ad Revenue Target**: $1-3 CPM initially, $5-10 CPM with optimization
- **Ad-Free**: Premium subscribers see no ads across entire platform
- **Ad Frequency**: Max 2 ads per page to maintain good UX

#### 3. AdBlock Detection & Monetization Recovery
- **Detection**: Check if ads load on page load
- **User Response**:
  - Show non-intrusive modal after 3 seconds
  - Message: "👋 We noticed you're using an ad blocker. Exchanger is free and supported by ads. Please consider disabling your ad blocker or upgrading to Premium for an ad-free experience."
  - **CTA Options**:
    - "Disable AdBlock" (instructions link)
    - "Upgrade to Premium" (redirect to pricing)
    - "Dismiss" (can still use service, show banner reminder)
- **Frequency**: Show popup once per session (don't spam)
- **Alternative Monetization**:
  - Offer "Pay what you want" one-time donation option
  - Cryptocurrency donations (future, optional)
- **Respectful Approach**: Users can still use service with AdBlock, but gentle reminder
- **A/B Testing**: Test different messaging to optimize conversion

#### 3. Enterprise (Future)
- **Custom Plans**: For teams, enterprises
- **Features**:
  - Team collaboration
  - Admin dashboard
  - Custom branding
  - API access
  - Higher limits (10GB+)
  - SLA guarantees
  - Priority support
- **Pricing**: Starting at $99/month per team

#### 4. API Access (Future)
- **Developer Tier**: $19/month
  - API access
  - 1000 API calls/month
  - Documentation and SDKs

### 14.2 Premium Subscription Details

#### Features Comparison

| Feature | Free | Premium ($4.99/mo) |
|---------|------|---------------------|
| Max File Size | 250MB | 5GB |
| Expiration Time | 15 min | Up to 1 day |
| Custom URLs | ❌ | ✅ |
| Unlimited Shares | ❌ (10/day) | ✅ |
| Analytics | Basic | Detailed |
| Ads | ✅ | ❌ |
| Burn After Reading | 1/day | Unlimited |
| Notifications | ❌ | ✅ Email |
| Extend Expiration | ❌ | ✅ |
| Priority Support | ❌ | ✅ |

#### Pricing Strategy
- **Monthly**: $4.99/month
- **Annual**: $49.99/year (17% discount = 2 months free)
- **Introductory Offer**: First month at $1.99 (optional, for launch)
- **Student Discount**: 30% off with valid student email (future)

#### Payment Processing
- **Stripe**: Primary payment processor
- **Supported Methods**:
  - Credit/Debit cards (Visa, Mastercard, Amex)
  - Apple Pay
  - Google Pay
  - SEPA Direct Debit (EU)
  - PayPal (optional)
- **Billing Cycle**: Monthly or annual, auto-renewing
- **Cancellation**: Instant via Stripe Customer Portal, access until period end

### 14.3 Conversion Funnel

#### Free → Premium Triggers
1. **File Size Limit**: "Upgrade to share files up to 5GB"
2. **Time Limit**: "Need more time? Premium extends to 1 day"
3. **Custom URL**: "Want a memorable link? Upgrade to Premium"
4. **Analytics**: "See who viewed your share (Premium feature)"
5. **Ad Fatigue**: "Remove ads forever with Premium"
6. **Feature Discovery**: Premium badges throughout UI

#### Upgrade Flow
1. User encounters premium feature
2. "Upgrade to Premium" modal with benefits
3. Click "Start Premium"
4. Login (if not authenticated)
5. Stripe Checkout with plan selection (monthly/annual)
6. Payment details
7. Confirmation → redirect to dashboard
8. Welcome email with premium tips

### 14.4 Churn Prevention

#### Retention Strategies
- **Onboarding**: Highlight premium features immediately after upgrade
- **Engagement Emails**:
  - "You're getting the most out of Premium"
  - "Did you know Premium users can...?"
- **Usage Insights**: "You've saved X hours with Exchanger this month"
- **Referral Program** (Future): Give 1 month free for each referral
- **Pause Subscription** (instead of cancel): Reduce price for 3 months

#### Cancellation Flow
- **Exit Survey**: "Why are you canceling?" (optional)
- **Offer Discount**: "Stay for $2.99/month for 3 months"
- **Confirm Cancellation**: "You'll lose access on [date]"
- **Win-Back Email**: 30 days after cancellation with offer

### 14.5 Revenue Projections (Example)

**Assumptions:**
- Launch: 1000 free users/month
- Growth: 20% month-over-month
- Conversion Rate: 3% free → premium
- Ad Revenue: $1 CPM (conservative)

**Month 6 Projections:**
- Free Users: ~3,000
- Premium Users: 90 (3% conversion)
- AdBlock Users: ~40% (1,200 users)
- Monthly Revenue:
  - Subscriptions: 90 × $4.99 = $449
  - Ads (1,800 users × 10 pageviews × $0.002 CPM) = $36
  - AdBlock → Premium conversion (5 users) = $25
  - **Total: ~$510/month**

**Year 1 Target:**
- Free Users: 15,000
- Premium Users: 450 (3% conversion)
- AdBlock Users: ~40% (6,000)
- Monthly Revenue:
  - Subscriptions: 450 × $4.99 = $2,246
  - Ads (9,000 users × 10 pageviews × $0.003 CPM) = $270
  - AdBlock → Premium (15 users) = $75
  - **Total: ~$2,600/month = $31,200/year**

**Year 2 Target:**
- Free Users: 50,000
- Premium Users: 1,500 (3% conversion rate)
- AdBlock Users: ~40% (20,000)
- Monthly Revenue:
  - Subscriptions: 1,500 × $4.99 = $7,485
  - Ads (30,000 users × 10 pageviews × $0.005 CPM) = $1,500
  - AdBlock → Premium (30 users) = $150
  - **Total: ~$9,135/month = $109,620/year**

**Note:** Ad CPM expected to increase over time with:
- Better targeting and optimization
- Higher traffic volume (better ad rates)
- Quality content attracting premium advertisers
- Carbon Ads or premium ad networks (tech audience pays more)

---

## Development Phases

### Phase 1: MVP (Minimum Viable Product)
**Timeline: 4-6 weeks**

#### Goals
- Launch functional file sharing service
- Prove core value proposition
- Gather initial user feedback

#### Features
- [x] Homepage with file upload (drag-and-drop)
- [x] Rich text editor for text sharing
- [x] Generate unique 5-character IDs
- [x] QR code generation
- [x] Share page with download functionality
- [x] 15-minute auto-expiration
- [x] Basic analytics (view counter)
- [x] Responsive design (mobile + desktop)
- [x] Multi-language support (all 5 languages)
- [x] Password protection
- [x] Anonymous usage (no account required)
- [x] Rate limiting (basic)
- [x] File preview (images, PDFs)
- [x] Ad integration (Google AdSense)
- [x] AdBlock detection with friendly popup
- [x] Terms of Service page
- [x] Privacy Policy page
- [x] Acceptable Use Policy
- [x] Report Abuse mechanism

#### Tech Stack Setup
- [x] Next.js project initialization
- [x] Supabase setup (database + storage)
- [x] Vercel deployment
- [x] Cloudflare R2 (or Supabase Storage)
- [x] next-intl configuration
- [x] Tailwind CSS + UI components

#### Success Criteria
- ✅ Users can upload and share files successfully
- ✅ QR codes work reliably
- ✅ Files auto-delete after 15 minutes
- ✅ Core Web Vitals in "Good" range (ads don't degrade performance)
- ✅ 5+ positive user testimonials
- ✅ Ads display properly on 95%+ of free user visits
- ✅ AdBlock detection works correctly
- ✅ Legal pages (ToS, Privacy) are complete and accessible
- ✅ Ad revenue > $50/month (initial target)

---

### Phase 2: User Management & Premium Features
**Timeline: 4-6 weeks**

#### Goals
- Enable user accounts
- Launch premium subscription
- Implement monetization

#### Features
- [x] OAuth authentication (Google, Apple)
- [x] User dashboard
- [x] View all active shares
- [x] Manual share deletion
- [x] Share history
- [x] Stripe integration
- [x] Premium subscription plans
- [x] Custom URLs (premium)
- [x] Extended expiration (premium)
- [x] Detailed analytics (premium)
- [x] Ad integration (Google AdSense) for free tier
- [x] Burn after reading feature
- [x] Email notifications (expiration warnings)
- [x] User settings page

#### Success Criteria
- ✅ 1% conversion rate (free → premium)
- ✅ Stripe payments processing successfully
- ✅ Users can manage subscriptions
- ✅ Dashboard is intuitive and fast
- ✅ Email notifications are timely and accurate

---

### Phase 3: Security & Growth
**Timeline: 4-6 weeks**

#### Goals
- Enhance security
- Improve SEO and discoverability
- Increase user base

#### Features
- [x] VirusTotal integration (malware scanning)
- [x] Enhanced rate limiting (Redis-based)
- [x] CAPTCHA for anonymous uploads
- [x] IP banning system
- [x] Content reporting mechanism
- [x] SEO optimizations (structured data, sitemaps)
- [x] Blog section (content marketing)
- [x] Referral program
- [x] Email marketing (welcome series, engagement)
- [x] Social sharing optimization
- [x] Mobile PWA support (installable web app)

#### Success Criteria
- ✅ Zero malware uploads detected after scanning
- ✅ Organic traffic grows 50% month-over-month
- ✅ 10+ blog posts published
- ✅ 100+ premium subscribers
- ✅ App is installable on mobile (PWA)

---

### Phase 4: Advanced Features & Scale
**Timeline: Ongoing**

#### Goals
- Scale infrastructure
- Add enterprise features
- Expand platform (mobile apps)

#### Features
- [ ] React Native mobile apps (iOS + Android)
- [ ] API access for developers
- [ ] Webhooks for share events
- [ ] Team collaboration features
- [ ] Enterprise plans with custom branding
- [ ] Advanced analytics (heatmaps, session recordings)
- [ ] Integration with other services (Zapier, etc.)
- [ ] Multi-factor authentication (2FA)
- [ ] End-to-end encryption option
- [ ] Custom domains (enterprise)
- [ ] White-label solution (enterprise)

#### Success Criteria
- ✅ Mobile apps published on App Store and Play Store
- ✅ 10+ enterprise customers
- ✅ 1,000+ premium subscribers
- ✅ API has 100+ active developers
- ✅ Infrastructure scales to 100k+ shares/day

---

## Success Metrics

### 16.1 Key Performance Indicators (KPIs)

#### User Acquisition
- **Monthly Active Users (MAU)**: Target 10k in 6 months
- **Sign-ups**: Target 500/month by month 6
- **Organic Traffic**: Target 50k visits/month by year 1
- **Conversion Rate (visitor → upload)**: Target 15%

#### Engagement
- **Shares Created**: Target 100k/month by year 1
- **Average Files per Share**: Target 2.5
- **Share Access Rate**: % of shares accessed at least once (target 70%)
- **Return Users**: % of users who create multiple shares (target 30%)

#### Revenue
- **Monthly Recurring Revenue (MRR)**: Target $5k by month 12
- **Conversion Rate (free → premium)**: Target 3%
- **Customer Lifetime Value (LTV)**: Target $60 (12 months retention)
- **Customer Acquisition Cost (CAC)**: Target < $20
- **LTV:CAC Ratio**: Target > 3:1

#### Technical
- **Uptime**: Target 99.9%
- **Average Load Time**: Target < 2 seconds
- **Error Rate**: Target < 0.1%
- **Storage Usage**: Monitor and optimize

#### Support
- **Response Time**: Target < 24 hours
- **Customer Satisfaction**: Target > 4.5/5 stars
- **Churn Rate**: Target < 5% monthly

### 16.2 Analytics Tools

- **Google Analytics 4**: User behavior, funnels, events
- **Mixpanel** or **Amplitude**: Product analytics, cohort analysis
- **Stripe Dashboard**: Revenue, subscriptions, churn
- **Supabase Dashboard**: Database queries, storage usage
- **Vercel Analytics**: Web vitals, edge insights
- **Sentry**: Error tracking, performance monitoring

### 16.3 Regular Reporting

- **Daily**: Signups, shares created, errors
- **Weekly**: MAU, MRR, conversion rates, top traffic sources
- **Monthly**: Financial review, feature usage, cohort retention, roadmap review
- **Quarterly**: Strategic review, goal setting, competitive analysis

---

## Appendices

### A. Competitive Analysis

| Competitor | Pros | Cons | Differentiation |
|------------|------|------|-----------------|
| WeTransfer | Simple, well-known | 2GB free limit, no QR codes | Exchanger: Smaller files, QR codes, faster |
| SendAnywhere | QR codes, cross-platform | Cluttered UI, ads | Exchanger: Cleaner UI, temporary |
| Snapdrop | P2P, private | Requires devices on same network | Exchanger: Works anywhere, cloud-based |
| Firefox Send (discontinued) | Secure, temporary | No longer available | Exchanger: Similar concept, active |

**Exchanger's Unique Value:**
- QR codes built-in (not an afterthought)
- Multi-language from day 1
- Clean, simple UI (no clutter)
- Predictable expiration (not file-based)
- Combined file + text sharing

### B. Legal Considerations

#### Required Documents
1. **Terms of Service**: User agreement, acceptable use policy
2. **Privacy Policy**: Data collection, usage, retention (GDPR-compliant)
3. **Cookie Policy**: If using cookies for analytics/auth
4. **DMCA Policy**: Copyright infringement procedure
5. **Acceptable Use Policy**: Prohibited content and activities

#### Detailed Terms of Service Requirements

**1. Acceptable Use Policy - Prohibited Content:**

Users are strictly prohibited from uploading, storing, or sharing:

**Illegal Content:**
- Copyrighted material (movies, TV shows, music, software) without authorization
- Pirated software, cracks, keygens, or license generators
- Child sexual abuse material (CSAM)
- Content that violates any local, state, national, or international law

**Harmful Content:**
- Malware, viruses, trojans, ransomware, or any malicious code
- Phishing pages or content designed to steal credentials
- Content that promotes terrorism or violent extremism
- Content that incites violence or harm against individuals or groups

**Restricted Content:**
- Personal data of others without their consent (doxxing)
- Non-consensual intimate images (revenge porn)
- Spam or unsolicited commercial content
- Content that infringes on intellectual property rights
- Hate speech or content that promotes discrimination

**File Sharing Limitations:**
- Users may only share files they own or have permission to distribute
- Commercial distribution of copyrighted content is prohibited
- Files must be for personal or legitimate business use only

**2. User Responsibilities:**
- Users are solely responsible for the content they upload
- Users must ensure they have the legal right to share files
- Users must not use the service to circumvent copyright protection
- Users must respect intellectual property rights of others

**3. Enforcement & Consequences:**
- **First Violation**: Warning + content removal
- **Second Violation**: 30-day account suspension
- **Third Violation**: Permanent account termination
- **Severe Violations**: Immediate permanent ban + report to authorities
  - CSAM → Report to NCMEC (National Center for Missing & Exploited Children)
  - Copyright infringement → DMCA takedown + rights holder notification
  - Malware distribution → Report to hosting provider and abuse databases

**4. Reporting Mechanism:**
- "Report Abuse" button on every share page
- Report categories:
  - Copyright infringement
  - Illegal content
  - Malware/viruses
  - Personal information (doxxing)
  - Spam/scam
  - Other (with description)
- Email: abuse@exchanger.app
- Response time: < 24 hours for review, < 1 hour for severe cases (CSAM, malware)

**5. DMCA Compliance:**
- Designated Copyright Agent contact information
- Counter-notification process
- Repeat infringer policy (3 strikes → account termination)
- Safe Harbor provisions under DMCA 512(c)

**6. Service Limitations:**
- No guarantee of service availability (provided "as is")
- Files may be deleted at any time for violations
- Service reserves right to modify or terminate service
- No backup responsibility (users must keep own copies)

**7. Privacy & Data Handling:**
- Files encrypted at rest
- Automatic deletion after expiration
- No unauthorized access to user files
- Data may be accessed if legally required (subpoena, court order)
- Anonymized analytics for service improvement

**8. Liability Disclaimer:**
- Service not liable for user-generated content
- Users indemnify Exchanger against claims arising from their uploads
- No warranty for file integrity or availability
- Users upload at their own risk

**9. Jurisdiction & Governing Law:**
- Service operated under [Your Country] law
- Disputes resolved in [Your Jurisdiction] courts
- International users agree to jurisdiction

**10. Content Moderation:**
- Automated scanning for known malware hashes
- VirusTotal integration (Phase 3)
- User reporting system
- Manual review for reported content
- Proactive monitoring for high-risk patterns

**11. Age Requirements:**
- Users must be 13+ years old (COPPA compliance)
- Users 13-18 require parental consent
- No collection of data from children under 13

**12. Terms Updates:**
- Terms may be updated with 30 days notice
- Continued use after update constitutes acceptance
- Material changes communicated via email (logged-in users)

#### Compliance
- **GDPR**: EU data protection (right to access, delete, export)
- **CCPA**: California privacy law (if targeting US)
- **ePrivacy Directive**: Cookie consent (EU)
- **PCI DSS**: Stripe handles, but ensure compliance
- **DMCA**: Takedown procedure for copyrighted content

#### Insurance
- **Cyber Liability Insurance**: For data breaches (consider after significant revenue)
- **General Liability**: For business operations

### C. Support & Documentation

#### User Documentation
- **FAQ**: 20+ common questions with detailed answers
- **How-to Guides**: Step-by-step tutorials with screenshots
- **Video Tutorials**: YouTube channel (future)
- **Troubleshooting**: Common issues and solutions

#### Developer Documentation (Phase 4)
- **API Reference**: Complete endpoint documentation
- **SDKs**: JavaScript, Python, PHP libraries
- **Code Examples**: Sample implementations
- **Webhooks Guide**: Event types and payload structure

#### Support Channels
- **Email**: support@exchanger.app (response < 24h)
- **Live Chat**: Intercom or Crisp (premium users, future)
- **Help Center**: Self-service knowledge base
- **Community Forum**: User discussions (future)
- **Twitter/X**: @ExchangerApp for updates and quick questions

### D. Marketing & Launch Plan

#### Pre-Launch (2 weeks before)
- [ ] Build landing page with waitlist
- [ ] Create social media accounts
- [ ] Write initial blog posts (3-5)
- [ ] Prepare Product Hunt launch materials
- [ ] Reach out to beta testers

#### Launch Day
- [ ] Publish Product Hunt post (6 AM PT)
- [ ] Post on Hacker News ("Show HN")
- [ ] Share on Twitter, LinkedIn, Reddit (r/InternetIsBeautiful, r/productivity)
- [ ] Send email to waitlist
- [ ] Monitor feedback and respond

#### Post-Launch (1-4 weeks)
- [ ] Publish launch retrospective blog post
- [ ] Guest post on relevant blogs
- [ ] Submit to directories (AlternativeTo, etc.)
- [ ] Engage with early users for testimonials
- [ ] Iterate based on feedback

#### Ongoing Marketing
- [ ] SEO content creation (2 posts/week)
- [ ] Social media engagement (daily)
- [ ] Email newsletter (monthly)
- [ ] Paid ads (Google, Facebook) when profitable
- [ ] Partnership outreach (complementary services)

### E. Risk Analysis

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Abuse (illegal content) | High | High | Rate limiting, content scanning, reporting system |
| Storage costs exceed revenue | Medium | High | Aggressive expiration, file size limits, premium push |
| Competitors copy features | High | Medium | Focus on UX, brand, community |
| Security breach | Low | Critical | Regular audits, encryption, bug bounty program (future) |
| GDPR violation | Low | High | Legal review, data minimization, compliance tools |
| Low user adoption | Medium | High | Pivot features based on feedback, marketing investment |
| Technical downtime | Medium | Medium | Monitoring, redundancy, incident response plan |
| Payment fraud | Low | Medium | Stripe's built-in fraud detection |

### F. Contact & Resources

#### Project Contacts
- **Product Owner**: Jakub Hořínek
- **Lead Developer**: Claude Code (AI-assisted)
- **Domain**: exchanger.app (example)

#### Official Documentation (2025)
- [Next.js 15 Documentation](https://nextjs.org/docs) - Latest: 15.5
- [React 19 Documentation](https://react.dev/) - Latest: 19.2
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/) - Latest: v4.0
- [Supabase Documentation](https://supabase.com/docs) - 2025 features
- [Stripe Integration Guide](https://stripe.com/docs) - Server Actions approach
- [Vercel Deployment Docs](https://vercel.com/docs)
- [next-intl Documentation](https://next-intl.dev/) - v3.25+
- [Web Share API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Share_API)
- [qrcode.react](https://www.npmjs.com/package/qrcode.react) - v4.1+

#### Additional Resources
- [React 19 New Hooks Guide](https://react.dev/reference/react)
- [Next.js 15 Migration Guide](https://nextjs.org/docs/app/building-your-application/upgrading)
- [Tailwind CSS v4 Upgrade Guide](https://tailwindcss.com/docs/upgrade-guide)
- [Supabase Auth with Next.js](https://supabase.com/docs/guides/auth/server-side/nextjs)
- [Stripe with Next.js 15 Server Actions](https://stripe.com/docs/payments/checkout)

---

## Conclusion

Exchanger is positioned to become the go-to solution for quick, secure, cross-platform file sharing. By focusing on simplicity, privacy, and universal compatibility, the service addresses a clear market need.

### Technology Stack Summary (2025)

**Core Technologies:**
- ✅ **Next.js 15.5** with App Router - Latest stable, React 19 support
- ✅ **React 19.2** with Server Components - Production-ready, revolutionary performance
- ✅ **Tailwind CSS v4.0** - 5x faster builds, CSS-first configuration
- ✅ **Supabase** - PostgreSQL + Auth + Storage, 2025 features (S3 protocol, anonymous auth)
- ✅ **TypeScript 5.3+** - Type safety throughout
- ✅ **next-intl 3.25+** - Industry-standard i18n for Next.js

**Key Advantages:**
- 🚀 **Performance**: Server Components, optimized builds, edge caching
- 🎯 **Modern**: Latest React 19 hooks (useOptimistic, useFormStatus, use)
- 🔒 **Secure**: Supabase RLS, PKCE flow, encryption at rest
- 🌍 **Global**: Multi-language from day 1, CDN delivery
- 💰 **Cost-effective**: Supabase free tier, Vercel free tier, scalable pricing

### Expected Performance Metrics

Based on 2025 tech stack:
- **Initial Load**: ~1.8s (28% faster than baseline)
- **Time to Interactive**: ~2.0s (33% faster)
- **Lighthouse Score**: 95+ (targeting 100)
- **Build Time**: 5x faster with Tailwind v4
- **Bundle Size**: 28% smaller with Server Components

### Next Steps
1. **✅ PRD Complete**: Updated with 2025 tech stack
2. **Set Up Development Environment**: Initialize Next.js 15.5 project with TypeScript
3. **Configure Tools**: Tailwind v4, Supabase, next-intl
4. **Begin Phase 1 Development**: Start with core upload/download functionality
5. **Iterate and Launch**: Build MVP, gather feedback, iterate, launch publicly

### Development Approach with Claude Code
This PRD is designed to be consumed by AI agents (like Claude Code) for implementation. Each feature should be broken down into smaller, actionable tasks with clear acceptance criteria.

**Example Task Breakdown (React 19 Approach):**
- "Implement file upload with drag-and-drop"
  - Set up react-dropzone v14.3+
  - Add file validation (size, type) with Zod
  - Implement upload progress with useOptimistic()
  - Create Server Action for upload handling
  - Handle upload errors gracefully with useActionState()
  - Add accessibility (keyboard navigation, screen reader support)
  - Write tests for upload flow

**Modern Implementation Pattern:**
```typescript
// Server Component (default)
async function SharePage({ params }) {
  const share = await fetchShare(params.id); // Server-side
  return <ShareView share={share} />;
}

// Client Component (interactive)
'use client';
function DownloadButton({ fileId }) {
  const [optimisticDownloads, addDownload] = useOptimistic(...);
  // Interactive logic
}
```

By following this structured approach and leveraging React 19's latest features, Claude Code can systematically build Exchanger from the ground up, feature by feature, ensuring quality, performance, and completeness at each step.

---

**Document Version:** 2.0
**Last Updated:** 2025-10-31
**Status:** Ready for Development with 2025 Tech Stack
**Tech Stack Version:** Next.js 15.5, React 19.2, Tailwind CSS v4.0

---

## Quick Reference

### Installation Commands
```bash
# Create Next.js 15 project
npx create-next-app@latest exchanger --typescript --tailwind --app

# Install core dependencies
npm install @supabase/supabase-js @supabase/ssr next-intl react-dropzone qrcode.react zod react-hook-form stripe @stripe/stripe-js

# Install dev dependencies
npm install -D @types/node @types/react @types/react-dom

# Install UI dependencies (optional)
npm install clsx tailwind-merge @tailwindcss/typography @tailwindcss/forms
```

### Environment Variables Template
```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Redis (for rate limiting)
REDIS_URL=your-redis-url
```

### Recommended VS Code Extensions
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- Prisma (if using)
- GitLens

**Ready to start building! 🚀**

