# MarBrain CLI

> **Version**: 1.0
> **Generated**: 2026-04-20
> **Purpose**: CLI harness for MarBrain 360° Autonomous Research Platform

**MarBrain CLI** provides command-line interfaces for all MarBrain autonomous research agents, making them discoverable and usable by any AI agent supporting CLI-Anything.

## Installation

```bash
# Clone the repo
git clone https://github.com/yourusername/marbrain-cli.git
cd marbrain-cli

# Install globally
pip install -e .
```

## Available CLIs

| CLI | Purpose |
|-----|---------|
| `marbrain-scraper` | Web & social media scraping |
| `marbrain-pipeline` | Data cleaning & validation |
| `marbrain-deploy` | Dashboard build & deploy |
| `marbrain-scheduler` | Cron job management |
| `marbrain-deepdive` | Deep dive execution |
| `marbrain-extract` | Entity extraction |
| `marbrain-learn` | Learning loop optimization |

## Quick Start

```bash
# Scrape a website
marbrain-scraper run "https://example.com"

# Clean data
marbrain-pipeline clean "raw_data.json"

# Deploy dashboard
marbrain-deploy dashboard "entity_name"

# Add schedule
marbrain-scheduler add daily research

# Run deep dive
marbrain-deepdive entity "Talabat Egypt"
```

## For AI Agents

This repo follows CLI-Anything specifications so AI agents can:
1. Discover all available commands via `--help`
2. Execute workflows via standard CLI
3. Get structured JSON output for automation
4. Chain multiple commands together

## Documentation

See `skills/` directory for individual CLI documentation.

## License

MIT