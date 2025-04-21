/*
  # Create notes table

  1. New Tables
    - `notes`
      - `id` (uuid, primary key)
      - `content` (text, not null)
      - `date` (date, not null)
      - `user_id` (uuid, nullable - references auth.users)
      - `created_at` (timestamp with time zone)
      - `updated_at` (timestamp with time zone)
  2. Security
    - Enable RLS on `notes` table
    - Add policies for authenticated users to CRUD their own notes
    - Add policies for public users to CRUD notes with null user_id
*/

CREATE TABLE IF NOT EXISTS notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content text NOT NULL,
  date date NOT NULL,
  user_id uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;

-- Create policy for authenticated users to read their own notes
CREATE POLICY "Authenticated users can read their own notes"
  ON notes
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id OR user_id IS NULL);

-- Create policy for authenticated users to insert their own notes
CREATE POLICY "Authenticated users can insert their own notes"
  ON notes
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create policy for authenticated users to update their own notes
CREATE POLICY "Authenticated users can update their own notes"
  ON notes
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create policy for authenticated users to delete their own notes
CREATE POLICY "Authenticated users can delete their own notes"
  ON notes
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create policy for public users to read notes without a user_id (guest notes)
CREATE POLICY "Public users can read notes without a user_id"
  ON notes
  FOR SELECT
  TO anon
  USING (user_id IS NULL);

-- Create policy for public users to insert notes without a user_id
CREATE POLICY "Public users can insert notes without a user_id"
  ON notes
  FOR INSERT
  TO anon
  WITH CHECK (user_id IS NULL);

-- Create policy for public users to update notes without a user_id
CREATE POLICY "Public users can update notes without a user_id"
  ON notes
  FOR UPDATE
  TO anon
  USING (user_id IS NULL)
  WITH CHECK (user_id IS NULL);

-- Create policy for public users to delete notes without a user_id
CREATE POLICY "Public users can delete notes without a user_id"
  ON notes
  FOR DELETE
  TO anon
  USING (user_id IS NULL);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS notes_date_idx ON notes(date);
CREATE INDEX IF NOT EXISTS notes_user_id_idx ON notes(user_id);
CREATE INDEX IF NOT EXISTS notes_date_user_id_idx ON notes(date, user_id);