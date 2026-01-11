-- Migration: add_bodyweight_feature
-- Created at: 20260111203333

BEGIN;

CREATE TYPE weight_unit AS ENUM ('kg', 'lb');

CREATE TABLE bodyweight_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,

    weight_kg NUMERIC(5,2) NOT NULL,
    original_unit weight_unit NOT NULL DEFAULT 'kg',
    original_value NUMERIC(5,2) NOT NULL,

    notes TEXT,
    recorded_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_bodyweight_logs_account_time
ON bodyweight_logs (account_id, recorded_at DESC);

COMMIT;
