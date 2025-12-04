/*
  # Create Shots and Attendance Tables

  1. New Tables
    - `shots`
      - `id` (uuid, primary key)
      - `client_name` (text)
      - `project_name` (text)
      - `shot_name` (text)
      - `status` (text)
      - `workload` (integer, 0-100)
      - `eta_date` (date)
      - `assigned_to` (text)
      - `estimated_id` (text)
      - `package_id` (text)
      - `in_date` (date)
      - `created_at` (timestamp)

    - `attendance`
      - `id` (uuid, primary key)
      - `team_member_name` (text)
      - `date` (date)
      - `status` (text: Present, Absent, On Leave, Remote)
      - `check_in_time` (time)
      - `check_out_time` (time)
      - `notes` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add public read policies for dashboard access
*/

CREATE TABLE IF NOT EXISTS shots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name text NOT NULL,
  project_name text NOT NULL,
  shot_name text NOT NULL,
  status text NOT NULL DEFAULT 'Active',
  workload integer NOT NULL DEFAULT 0,
  eta_date date NOT NULL,
  assigned_to text NOT NULL,
  estimated_id text NOT NULL,
  package_id text NOT NULL,
  in_date date NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS attendance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  team_member_name text NOT NULL,
  date date NOT NULL,
  status text NOT NULL DEFAULT 'Present',
  check_in_time time,
  check_out_time time,
  notes text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE shots ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to shots"
  ON shots FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access to attendance"
  ON attendance FOR SELECT
  TO public
  USING (true);

INSERT INTO shots (client_name, project_name, shot_name, status, workload, eta_date, assigned_to, estimated_id, package_id, in_date) VALUES
('LLP', 'BETA', 'SH-001-A', 'Active', 60, '2025-12-10', 'PAINT', 'EST-2401', 'PKG-MS-047', '2025-12-01'),
('LLP', 'BETA', 'SH-001-B', 'In Progress', 75, '2025-12-12', 'ROTO', 'EST-2401', 'PKG-MS-047', '2025-12-02'),
('RUL', 'DKT', 'SH-002-A', 'In Progress', 90, '2025-12-15', 'ROTO', 'EST-2402', 'PKG-NF-183', '2025-12-03'),
('TRX', 'HRG', 'SH-003-A', 'Review', 92, '2025-12-06', 'ROTO', 'EST-2403', 'PKG-WB-291', '2025-12-04'),
('GOF', 'FRM', 'SH-004-A', 'Active', 45, '2025-12-09', 'COMP', 'EST-2404', 'PKG-UP-156', '2025-12-05'),
('LLP', 'FIRE', 'SH-005-A', 'Completed', 100, '2025-11-30', 'PAINT', 'EST-2405', 'PKG-SP-092', '2025-11-20'),
('RSE', 'GHW', 'SH-006-A', 'In Progress', 45, '2025-12-18', 'PAINT', 'EST-2406', 'PKG-AP-321', '2025-12-06');

INSERT INTO attendance (team_member_name, date, status, check_in_time, check_out_time, notes) VALUES
('Alex Johnson', '2025-12-04', 'Present', '09:30:00', '18:00:00', 'Working on compositing'),
('Sarah Smith', '2025-12-04', 'Present', '09:00:00', '17:30:00', NULL),
('Mike Chen', '2025-12-04', 'Remote', '10:00:00', '19:00:00', 'VPN connection'),
('Emma Davis', '2025-12-04', 'On Leave', NULL, NULL, 'Medical leave'),
('James Wilson', '2025-12-04', 'Present', '08:45:00', '18:15:00', NULL),
('Alex Johnson', '2025-12-03', 'Present', '09:30:00', '18:00:00', NULL),
('Sarah Smith', '2025-12-03', 'Absent', NULL, NULL, NULL);
