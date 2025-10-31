-- Exchanger Database Schema
-- Run this in Supabase SQL Editor
-- This creates all tables needed for the application

-- ============================================
-- 1. USERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS users (
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

-- ============================================
-- 2. SHARES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS shares (
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

-- ============================================
-- 3. FILES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  share_id VARCHAR(30) REFERENCES shares(id) ON DELETE CASCADE,

  -- File info
  filename VARCHAR(255) NOT NULL,
  original_filename VARCHAR(255) NOT NULL,
  mime_type VARCHAR(100) NOT NULL,
  size_bytes BIGINT NOT NULL,

  -- Storage
  storage_path TEXT NOT NULL, -- path in Supabase Storage
  storage_provider VARCHAR(50) DEFAULT 'supabase', -- 'supabase', 'cloudflare-r2'
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

-- ============================================
-- 4. SHARE ANALYTICS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS share_analytics (
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

-- ============================================
-- 5. ABUSE REPORTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS abuse_reports (
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

-- ============================================
-- 6. AD ANALYTICS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS ad_analytics (
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

-- ============================================
-- 7. RATE LIMITS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS rate_limits (
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

-- ============================================
-- 8. SUBSCRIPTIONS LOG TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS subscriptions_log (
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

-- ============================================
-- ENABLE ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE shares ENABLE ROW LEVEL SECURITY;
ALTER TABLE files ENABLE ROW LEVEL SECURITY;
ALTER TABLE share_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE abuse_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE ad_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE rate_limits ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions_log ENABLE ROW LEVEL SECURITY;

-- ============================================
-- RLS POLICIES
-- ============================================

-- Users: Can only read/update their own data
CREATE POLICY "Users can read own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Shares: Anyone can read active shares, only owners can update/delete
CREATE POLICY "Anyone can read active shares" ON shares
  FOR SELECT USING (is_active = true AND is_deleted = false);

CREATE POLICY "Users can create shares" ON shares
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update own shares" ON shares
  FOR UPDATE USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can delete own shares" ON shares
  FOR DELETE USING (auth.uid() = user_id OR user_id IS NULL);

-- Files: Anyone can read files from active shares
CREATE POLICY "Anyone can read files from active shares" ON files
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM shares
      WHERE shares.id = files.share_id
      AND shares.is_active = true
      AND shares.is_deleted = false
    )
  );

CREATE POLICY "Users can insert files" ON files
  FOR INSERT WITH CHECK (true);

-- Analytics: Allow inserts, owners can read own share analytics
CREATE POLICY "Anyone can insert analytics" ON share_analytics
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can read own share analytics" ON share_analytics
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM shares
      WHERE shares.id = share_analytics.share_id
      AND shares.user_id = auth.uid()
    )
  );

-- Abuse Reports: Anyone can create, only admins can read/update
CREATE POLICY "Anyone can report abuse" ON abuse_reports
  FOR INSERT WITH CHECK (true);

-- Ad Analytics: Allow inserts for tracking
CREATE POLICY "Anyone can insert ad analytics" ON ad_analytics
  FOR INSERT WITH CHECK (true);

-- Rate Limits: Service role only
CREATE POLICY "Service role can manage rate limits" ON rate_limits
  USING (auth.jwt()->>'role' = 'service_role');

-- Subscriptions Log: Users can read own logs
CREATE POLICY "Users can read own subscription logs" ON subscriptions_log
  FOR SELECT USING (auth.uid() = user_id);

-- ============================================
-- STORAGE BUCKET SETUP
-- Note: Run this separately in Supabase Dashboard > Storage
-- or use the Supabase CLI
-- ============================================

-- Create storage bucket (run this in Storage > Create bucket):
-- Bucket name: shares
-- Public: false
-- File size limit: 5GB
-- Allowed MIME types: * (all)

-- ============================================
-- FUNCTIONS & TRIGGERS (Optional - for auto-cleanup)
-- ============================================

-- Function to automatically clean up expired shares
CREATE OR REPLACE FUNCTION cleanup_expired_shares()
RETURNS void AS $$
BEGIN
  -- Delete expired shares and their files
  DELETE FROM shares
  WHERE expires_at < NOW() AND is_deleted = false;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- You can call this function via a cron job or Vercel cron

-- ============================================
-- COMPLETED!
-- ============================================

-- Your database is now ready for Exchanger!
-- Next steps:
-- 1. Create storage bucket "shares" in Supabase Dashboard
-- 2. Install Supabase client in your Next.js app
-- 3. Start building!
