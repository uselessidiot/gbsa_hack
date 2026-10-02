-- ========================================================
-- G-BRIDGE AI (GBSA Intelligence Platform) Supabase SQL Schema
-- Paste this script into your Supabase SQL Editor to initialize tables.
-- ========================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Companies Table
CREATE TABLE IF NOT EXISTS public.companies (
    id VARCHAR PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    name VARCHAR NOT NULL,
    business_number VARCHAR,
    industry VARCHAR NOT NULL,
    sub_industry VARCHAR,
    location VARCHAR NOT NULL,
    founded_year INT NOT NULL,
    employees INT NOT NULL,
    revenue NUMERIC DEFAULT 0,
    export_amount NUMERIC DEFAULT 0,
    certifications TEXT[],
    patents TEXT[],
    summary TEXT,
    keywords TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Documents Table
CREATE TABLE IF NOT EXISTS public.documents (
    id VARCHAR PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    company_id VARCHAR REFERENCES public.companies(id) ON DELETE CASCADE,
    file_name VARCHAR NOT NULL,
    file_size INT,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    page_count INT DEFAULT 1,
    file_search_store_id VARCHAR,
    storage_path VARCHAR
);

-- 3. Analyses Table
CREATE TABLE IF NOT EXISTS public.analyses (
    id VARCHAR PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    company_id VARCHAR REFERENCES public.companies(id) ON DELETE CASCADE,
    document_id VARCHAR,
    analysis_version VARCHAR DEFAULT 'TEM-v1.0',
    tem_diagnosis JSONB NOT NULL,
    primary_bottleneck VARCHAR NOT NULL,
    secondary_bottleneck VARCHAR,
    bottlenecks JSONB NOT NULL,
    company_requested_support TEXT[],
    recommended_support TEXT[],
    support_gap_analysis TEXT,
    strengths TEXT[],
    weaknesses TEXT[],
    evidence_list JSONB NOT NULL,
    action_plan_90days JSONB NOT NULL,
    verification_needed TEXT[],
    ai_insight_summary TEXT,
    status VARCHAR DEFAULT 'COMPLETED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. B2B Profiles Table
CREATE TABLE IF NOT EXISTS public.b2b_profiles (
    company_id VARCHAR PRIMARY KEY REFERENCES public.companies(id) ON DELETE CASCADE,
    company_name VARCHAR NOT NULL,
    industry VARCHAR NOT NULL,
    technologies TEXT[],
    products TEXT[],
    target_customers TEXT[],
    capabilities TEXT[],
    needs TEXT[],
    desired_partners TEXT[],
    visibility VARCHAR DEFAULT 'PUBLIC',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Support Programs Table
CREATE TABLE IF NOT EXISTS public.support_programs (
    id VARCHAR PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    organization VARCHAR NOT NULL,
    title VARCHAR NOT NULL,
    category VARCHAR NOT NULL,
    budget_max_million NUMERIC,
    target_tech_level TEXT[],
    target_exec_level TEXT[],
    target_market_level TEXT[],
    target_bottlenecks TEXT[],
    eligibility_criteria TEXT[],
    application_deadline VARCHAR,
    status VARCHAR DEFAULT 'OPEN',
    detail_url VARCHAR,
    tags TEXT[]
);

-- RLS (Row Level Security) - Public Read for Hackathon Demo
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.b2b_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_programs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read companies" ON public.companies FOR SELECT USING (true);
CREATE POLICY "Allow public read analyses" ON public.analyses FOR SELECT USING (true);
CREATE POLICY "Allow public read b2b_profiles" ON public.b2b_profiles FOR SELECT USING (true);
CREATE POLICY "Allow public read support_programs" ON public.support_programs FOR SELECT USING (true);

CREATE POLICY "Allow authenticated insert companies" ON public.companies FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated insert analyses" ON public.analyses FOR INSERT WITH CHECK (true);
