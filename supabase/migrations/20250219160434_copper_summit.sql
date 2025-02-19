/*
  # Initial Schema Setup for Reservation System

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `name` (text)
      - `created_at` (timestamp)
    
    - `resources`
      - `id` (uuid, primary key)
      - `name` (text)
      - `type` (text)
      - `description` (text)
      - `created_at` (timestamp)
    
    - `reservations`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `resource_id` (uuid, references resources)
      - `start_time` (timestamp)
      - `end_time` (timestamp)
      - `status` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create profiles table
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users,
  name text NOT NULL,
  created_at timestamptz DEFAULT now(),
  is_admin BOOLEAN DEFAULT FALSE
);

-- Create resources table
CREATE TABLE resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL CHECK (type IN ('room', 'equipment')),
  description text,
  created_at timestamptz DEFAULT now()
);

-- Create reservations table
CREATE TABLE reservations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles NOT NULL,
  resource_id uuid REFERENCES resources NOT NULL,
  start_time timestamptz NOT NULL,
  end_time timestamptz NOT NULL,
  status text NOT NULL CHECK (status IN ('pending', 'confirmed', 'cancelled')) DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  CONSTRAINT valid_time_range CHECK (end_time > start_time)
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Resources policies
CREATE POLICY "Anyone can view resources"
  ON resources FOR SELECT
  TO authenticated
  USING (true);

-- Reservations policies
CREATE POLICY "Users can view their own reservations"
  ON reservations FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create reservations"
  ON reservations FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own reservations"
  ON reservations FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

-- Adicionar coluna is_admin na tabela profiles
ALTER TABLE profiles ADD COLUMN is_admin BOOLEAN DEFAULT FALSE;

-- Criar políticas para administradores
CREATE POLICY "Admins can do everything"
  ON profiles FOR ALL
  TO authenticated
  USING (auth.uid() IN (
    SELECT id FROM profiles WHERE is_admin = true
  ));

CREATE POLICY "Admins can manage all resources"
  ON resources FOR ALL
  TO authenticated
  USING (auth.uid() IN (
    SELECT id FROM profiles WHERE is_admin = true
  ));

CREATE POLICY "Admins can manage all reservations"
  ON reservations FOR ALL
  TO authenticated
  USING (auth.uid() IN (
    SELECT id FROM profiles WHERE is_admin = true
  ));

-- Create indexes
CREATE INDEX idx_reservations_user ON reservations(user_id);
CREATE INDEX idx_reservations_resource ON reservations(resource_id);
CREATE INDEX idx_reservations_time ON reservations(start_time, end_time);
CREATE INDEX idx_profiles_admin ON profiles(is_admin);