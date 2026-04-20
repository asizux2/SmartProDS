#!/usr/bin/env python3
"""
MarBrain CLI - Unified CLI for MarBrain 360° Research Platform

Usage:
    marbrain scrape <url> [--type TYPE]
    marbrain pipeline clean <file>
    marbrain deploy dashboard <entity>
    marbrain schedule add <type> <agent>
    marbrain deepdive run <entity> [--dives N]
    marbrain extract entities <day_folder>
    marbrain learn track <entity> [--success]
    marbrain --help

Examples:
    marbrain scrape "https://example.com" --type ecommerce
    marbrain pipeline clean "raw_data.json"
    marbrain deploy dashboard "Talabat Egypt"
    marbrain schedule add daily research
    marbrain deepdive run "Talabat Egypt" --dives 5
"""

import click
import subprocess
import sys
import os

BASE_PATH = "C:/Users/eslam/MyKnoweldgeBase/SmartProds/marbrain/core"

@click.group()
@click.version_option(version="1.0.0")
def cli():
    """MarBrain 360° - Autonomous Research Platform CLI"""
    pass

@cli.group()
def scrape():
    """Web and social media scraping"""
    pass

@scrape.command()
@click.argument('url')
@click.option('--type', default='general', help='Type: ecommerce, news, general')
def run(url, type):
    """Scrape a website"""
    script_path = f"{BASE_PATH}/agent-scraper/script.py"
    cmd = [sys.executable, script_path, "run", url, type]
    subprocess.run(cmd)

@scrape.command()
@click.argument('platform')
@click.argument('handles')
def social(platform, handles):
    """Scrape social media"""
    script_path = f"{BASE_PATH}/agent-scraper/script.py"
    cmd = [sys.executable, script_path, "social", platform, handles]
    subprocess.run(cmd)

@cli.group()
def pipeline():
    """Data cleaning and validation"""
    pass

@pipeline.command()
@click.argument('filepath', required=False)
def clean(filepath):
    """Clean scraped data"""
    script_path = f"{BASE_PATH}/agent-data-pipeline/script.py"
    cmd = [sys.executable, script_path, "clean"]
    if filepath:
        cmd.append(filepath)
    subprocess.run(cmd)

@pipeline.command()
@click.argument('filepath')
def validate(filepath):
    """Validate data quality"""
    script_path = f"{BASE_PATH}/agent-data-pipeline/script.py"
    cmd = [sys.executable, script_path, "validate", filepath]
    subprocess.run(cmd)

@cli.group()
def deploy():
    """Dashboard deployment"""
    pass

@deploy.command()
@click.argument('entity_name')
@click.argument('data_file', required=False)
def dashboard(entity_name, data_file):
    """Build and deploy dashboard"""
    script_path = f"{BASE_PATH}/agent-dashboard-deploy/script.py"
    cmd = [sys.executable, script_path, "full-cycle", entity_name]
    if data_file:
        cmd.append(data_file)
    subprocess.run(cmd)

@deploy.command()
def vercel():
    """Deploy to Vercel"""
    script_path = f"{BASE_PATH}/agent-dashboard-deploy/script.py"
    cmd = [sys.executable, script_path, "deploy"]
    subprocess.run(cmd)

@cli.group()
def schedule():
    """Cron job scheduling"""
    pass

@schedule.command()
@click.argument('name')
@click.argument('schedule_type')
@click.argument('agent')
def add(name, schedule_type, agent):
    """Add a scheduled task"""
    script_path = f"{BASE_PATH}/agent-scheduler/script.py"
    cmd = [sys.executable, script_path, "add", name, schedule_type, agent]
    subprocess.run(cmd)

@schedule.command()
def list():
    """List all schedules"""
    script_path = f"{BASE_PATH}/agent-scheduler/script.py"
    cmd = [sys.executable, script_path, "list"]
    subprocess.run(cmd)

@schedule.command()
def check():
    """Check and run due schedules"""
    script_path = f"{BASE_PATH}/agent-scheduler/script.py"
    cmd = [sys.executable, script_path, "check"]
    subprocess.run(cmd)

@cli.group()
def deepdive():
    """Deep dive execution"""
    pass

@deepdive.command()
@click.argument('entity_name')
@click.option('--dives', default=5, help='Number of deep dives')
def run(entity_name, dives):
    """Run deep dive research"""
    script_path = f"{BASE_PATH}/agent-deep-dive-runner/script.py"
    cmd = [sys.executable, script_path, entity_name]
    subprocess.run(cmd)

@cli.group()
def extract():
    """Entity extraction"""
    pass

@extract.command()
@click.argument('day_folder')
def entities(day_folder):
    """Extract entities from research"""
    script_path = f"{BASE_PATH}/agent-entity-extractor/script.py"
    cmd = [sys.executable, script_path, day_folder]
    subprocess.run(cmd)

@cli.group()
def learn():
    """Learning loop"""
    pass

@learn.command()
@click.argument('entity')
@click.option('--success', is_flag=True, help='Mark as success')
def track(entity, success):
    """Track entity research"""
    script_path = f"{BASE_PATH}/agent-learning-loop/script.py"
    success_flag = "success=true" if success else "success=false"
    cmd = [sys.executable, script_path, "track", entity, success_flag]
    subprocess.run(cmd)

@learn.command()
def optimize():
    """Generate optimization recommendations"""
    script_path = f"{BASE_PATH}/agent-learning-loop/script.py"
    cmd = [sys.executable, script_path, "optimize"]
    subprocess.run(cmd)

@cli.command()
@click.argument('day')
def research(day):
    """Run day research"""
    script_path = f"{BASE_PATH}/agent-day-research-runner/script.py"
    cmd = [sys.executable, script_path, day]
    subprocess.run(cmd)

@cli.command()
def status():
    """Show MarBrain status"""
    status_file = "D:/SmartProDS/mr-runs/365-day-status.json"
    if os.path.exists(status_file):
        with open(status_file) as f:
            click.echo(f.read())
    else:
        click.echo("No status file found")

if __name__ == '__main__':
    cli()
