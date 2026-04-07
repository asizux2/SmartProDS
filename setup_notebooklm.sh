#!/bin/bash
# ─────────────────────────────────────────────────────────────────────────────
# NotebookLM Research Generator — Ontrac Solutions Market Research
# Run this script from your Windows machine (WSL or Git Bash with Python 3.8+)
# ─────────────────────────────────────────────────────────────────────────────

set -e

echo "📦 Installing notebooklm-py..."
pip install notebooklm-py --quiet

echo "🔐 Checking auth..."
notebooklm auth check || {
  echo "Auth expired. Run: notebooklm login"
  exit 1
}

echo "📓 Creating notebook..."
notebooklm create "Ontrac Solutions — Telecom & Fintech BI Market Research Egypt 2026"

# Add market research text as a source
RESEARCH_TEXT=$(cat <<'RESEARCH'
TELECOM & FINTECH BI ANALYTICS MARKET RESEARCH — EGYPT / MENA 2026
Target Company: Ontrac Solutions | Score: 10/11 | Cairo, Egypt

== MARKET SIZING ==

TAM (Total Addressable Market): $18.1 Billion
- Telecom Analytics Global: $6.8B (MarketsandMarkets 2024, CAGR 12.4%)
- Fintech Analytics Global: $11.3B (Grand View Research 2024)
- Combined CAGR 2024-2029: 12.4%
- Confidence: HIGH (sourced from 2 independent research providers)

SAM (Serviceable Addressable Market): $890 Million
- MENA region Telecom BI + Fintech Analytics combined
- MENA represents approximately 4.9% of global market
- Primary countries: Egypt, Saudi Arabia, UAE
- CAGR 2024-2028: 14.1%
- Sources: IDC MEA Analytics Spending Guide Q3 2025, Statista MENA Fintech Revenue 2025
- Confidence: MEDIUM

SOM (Serviceable Obtainable Market): $45 Million
- Egypt-addressable BI Analytics segment
- Based on Egypt's ~15% share of MENA fintech and telecom IT spend
- Sources: CBE Annual Report 2024, ITIDA Egypt Digital Economy 2025
- Confidence: LOW (inferred, not independently surveyed)

== DEMAND TRENDS ==

Trend 1: AI-driven churn prediction replacing rule-based BI in Egyptian telcos
- Vodafone Egypt, Orange Egypt, and Etisalat launched ML-powered churn scoring pilots in 2024-2025
- Creates demand for Python + Power BI hybrid analysts bridging model outputs to executive dashboards
- Impact: HIGH | Metric: +34% ML-BI hybrid roles YoY (LinkedIn Egypt Q4 2025)

Trend 2: BNPL regulation forcing compliance analytics dashboards across Egyptian fintech
- CBE Directive No. 42/2024 mandates real-time portfolio risk reporting for all BNPL providers
- MYLO, valU, and Sympl now require automated compliance dashboards
- Impact: HIGH | 12 BNPL providers now CBE-regulated (CBE 2025)

Trend 3: Real-time NPS & CSAT dashboards becoming standard in tier-1 telco operations
- Egyptian telcos shifting from quarterly to continuous listening programs
- Requires live dashboard infrastructure linked to IVR, app ratings, and social sentiment
- Impact: MEDIUM | 78% of MENA telcos plan real-time CX analytics by 2026 (Gartner MENA CX Survey)

Trend 4: Embedded Power BI replacing standalone BI tools inside SME-focused banks
- Egyptian digital banks embedding analytics via Power BI Embedded
- Eliminating costly BI licenses and demanding specialized implementation partners
- Impact: MEDIUM | 3x Power BI Embedded deal volume in MENA (Microsoft FY25 Partner Report)

Trend 5: GIS-based network coverage analytics accelerating for Egypt 5G rollout planning
- Egypt awarded 5G spectrum licenses in late 2024
- All four major carriers require spatial analytics for tower placement optimization
- Impact: EMERGING | EGP 12B 5G capex committed by Egyptian operators 2025-2027 (NTRA 2025)

== UNDERSERVED OPPORTUNITIES ==

Opportunity 1: Cross-Domain Telecom × Fintech Data Fusion (HIGH URGENCY)
No local consultancy offers unified dashboards modeling telco ARPU, churn, and financial transaction behavior simultaneously. This intersection — where Ontrac operates — is currently served only by fragmented freelancers or expensive MNCs. A specialized analytics partner speaking both telco KPIs (ARPU, MOU, data ARPU) and fintech metrics (GMV, NPL rate, approval rate) is rare and high-leverage.
Proof of fit: Eslam's Vodafone ETL pipeline (500K+ records/wave) + Banking NPS/CSAT dashboards (QNB, Bank Misr, Alex Bank) + NIQ Python automation platform directly map to this gap.

Opportunity 2: Automated Mystery Shopping Analytics Pipelines (HIGH URGENCY)
Egyptian telcos and banks still rely on manually compiled Excel mystery shopping reports submitted weeks after fieldwork. No local provider offers end-to-end automation: STG/SurveyToGo ingestion → Power BI dashboard → email-triggered alerts. This gap costs operators 3-6 weeks of reporting lag per wave and prevents real-time corrective action at branch level.
Proof of fit: Mobil Egypt Mystery Shopping automation (80+ stations, 3 waves, 6 KPIs) + STG/Power BI integration (15+ active dashboards) — proven execution.

Opportunity 3: Lightweight BI-as-a-Service for Mid-Market Fintech (MEDIUM URGENCY)
Egyptian fintech Series A/B companies ($5M-$30M ticket size) cannot afford Deloitte retainers but need institutional-quality dashboards for board reporting, investor updates, and CBE submissions. A productized BI retainer offering — 3-5 Power BI dashboards + monthly refresh + on-call support — priced at EGP 15K-30K per month is an unserved segment between freelancers (too unstructured) and consultancies (too expensive).
Proof of fit: NIQ automation platform saving 40 hours/month + Python replacing manual workflows — efficiency delivery proof.

== COMPETITIVE LANDSCAPE ==

Player 1: Deloitte Digital Egypt
- HQ: Cairo (Smart Village)
- Focus: Full-service digital transformation
- Stack: SAP Analytics Cloud, Tableau, Azure
- Strength: Brand name, MNC relationships, large delivery team
- Weakness: Minimum engagement $200K+; no Python/Power BI specialization; slow delivery
- Threat to Eslam: LOW — competes on enterprise tier, not SME/mid-market segment

Player 2: Pioneers Technology
- HQ: Cairo (Mohandessin)
- Focus: IT integration, ERP, SAP
- Stack: SAP BI, Oracle Analytics
- Strength: Established telco client base (Etisalat integrations)
- Weakness: No Python analytics; weak Power BI bench; no fintech domain expertise
- Threat to Eslam: MEDIUM — overlaps on telco clients but not on analytics depth

Player 3: Raya IT
- HQ: Cairo (Nile City)
- Focus: Telecom IT services, infrastructure
- Stack: Cisco, Huawei tooling; limited BI
- Strength: Deep telco hardware/network relationships
- Weakness: BI capability is thin; no statistical modeling; no fintech vertical
- Threat to Eslam: LOW — hardware-first, rarely competes on analytics projects

Player 4: Freelance Analysts (LinkedIn / Upwork)
- HQ: Remote
- Focus: Isolated dashboard builds
- Stack: Power BI / Tableau (individual)
- Strength: Low cost, fast start
- Weakness: No cross-domain expertise; no business context; no SLA; no Python/GIS stack
- Threat to Eslam: HIGH on price — but wins on depth, reliability, and proof points

== POSITIONING ADVANTAGE ==
Unique cross-domain depth (Telecom ETL + Fintech NPS + GIS + Python automation) that no single competitor replicates. Price-competitive vs. MNCs while delivering institutional-quality outputs. Direct proof points in 8 verified client engagements across Egypt.
RESEARCH
)

echo "📄 Adding research as text source..."
echo "$RESEARCH_TEXT" > /tmp/ontrac_market_research.txt
notebooklm source add /tmp/ontrac_market_research.txt

echo "⏳ Waiting for source to be processed..."
sleep 10
notebooklm source list

echo ""
echo "🎙️ Generating audio podcast..."
notebooklm generate audio "Focus on the Egypt Telecom and Fintech BI opportunity for a senior data analyst with 8 proven client engagements. Highlight the cross-domain opportunity, the three underserved gaps, and why local expertise beats MNC consulting on price and speed."

echo ""
echo "🖼️ Generating infographic..."
notebooklm generate infographic --orientation landscape --detail detailed

echo ""
echo "⏳ Waiting for artifacts to complete (this takes 10-20 minutes)..."
notebooklm artifact wait

echo ""
echo "📥 Downloading outputs..."
mkdir -p public/research
notebooklm download audio public/research/ontrac_audio.mp3
notebooklm download infographic public/research/ontrac_infographic.png

echo ""
echo "✅ Done! Files saved to public/research/"
echo "  - public/research/ontrac_audio.mp3"
echo "  - public/research/ontrac_infographic.png"
echo ""
echo "Run 'npm run dev' to preview, or deploy to Vercel."
