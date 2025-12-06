/*
  # Create waitlist table

  1. New Tables
    - `waitlist`
      - `id` (uuid, primary key) - Unique identifier for each signup
      - `email` (text, unique) - User's email address
      - `created_at` (timestamptz) - Timestamp of signup
      - `source` (text) - Source of signup (default: "landing")
  
  2. Security
    - Enable RLS on `waitlist` table
    - Add policy for public inserts (allowing anyone to join waitlist)
    - Add policy for authenticated users to read all waitlist entries
*/

CREATE TABLE IF NOT EXISTS waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  source text DEFAULT 'landing'
);

ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert into waitlist (public signups)
CREATE POLICY "Anyone can join waitlist"
  ON waitlist
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow authenticated users to view waitlist
CREATE POLICY "Authenticated users can view waitlist"
  ON waitlist
  FOR SELECT
  TO authenticated
  USING (true);