-- Migration: Allow NULL consultation_date for consultations
-- This allows storing payment before Calendly booking happens

-- Alter consultations table to allow NULL consultation_date
ALTER TABLE consultations 
  ALTER COLUMN consultation_date DROP NOT NULL;

-- Add comment explaining the flow
COMMENT ON COLUMN consultations.consultation_date IS 
  'Initially NULL after payment. Set when Calendly booking is confirmed via webhook.';
