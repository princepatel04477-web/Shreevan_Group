import os
import shutil
import time
from playwright.sync_api import sync_playwright

os.makedirs('verification', exist_ok=True)
artifact_dir = r"C:\Users\rebel\.gemini\antigravity\brain\27a09cef-730a-4e88-b037-727b4b0b213c"

errors = []
console_errors = []

with sync_playwright() as p:
    browser = p.chromium.launch()

    # --- 1. Desktop 1440x900 ---
    page = browser.new_page(viewport={'width': 1440, 'height': 900})
    page.on('pageerror', lambda err: errors.append(f'[PageError] {str(err)}'))
    page.on('console', lambda msg: console_errors.append(f'[{msg.type}] {msg.text}') if msg.type in ['error'] else None)

    print("Navigating to http://localhost:3005/lab (Desktop)...")
    page.goto('http://localhost:3005/lab', wait_until='domcontentloaded')
    page.wait_for_selector('text=LAB ENVIRONMENT', timeout=10000)
    page.wait_for_timeout(2000) # allow R3F canvas to initialize

    # Milestone 0.0 — Idle Blister Pack Floating
    print("Capturing Progress 0.0 (Idle)...")
    btn_0 = page.locator('button:has-text("0.0 Idle Blister")')
    if btn_0.count() > 0:
        btn_0.click()
    page.wait_for_timeout(800)
    page.screenshot(path='verification/round3-hero-progress-0.0-1440x900.png')
    print("Captured round3-hero-progress-0.0-1440x900.png")

    # Milestone 0.3 — Tablet Press-Out (Domes compress, tablets push forward)
    print("Capturing Progress 0.3 (Tablet Press-Out)...")
    btn_3 = page.locator('button:has-text("0.3 Press-Out")')
    if btn_3.count() > 0:
        btn_3.click()
    page.wait_for_timeout(800)
    page.screenshot(path='verification/round3-hero-progress-0.3-1440x900.png')
    print("Captured round3-hero-progress-0.3-1440x900.png")

    # Milestone 0.6 — Transcontinental Flight Arcs
    print("Capturing Progress 0.6 (Flight Arcs)...")
    btn_6 = page.locator('button:has-text("0.6 Flight Arc")')
    if btn_6.count() > 0:
        btn_6.click()
    page.wait_for_timeout(800)
    page.screenshot(path='verification/round3-hero-progress-0.6-1440x900.png')
    print("Captured round3-hero-progress-0.6-1440x900.png")

    # Milestone 1.0 — Globe Landing & Market Nodes
    print("Capturing Progress 1.0 (Globe Landing)...")
    btn_10 = page.locator('button:has-text("1.0 Globe Landing")')
    if btn_10.count() > 0:
        btn_10.click()
    page.wait_for_timeout(800)
    page.screenshot(path='verification/round3-hero-progress-1.0-1440x900.png')
    print("Captured round3-hero-progress-1.0-1440x900.png")

    page.close()

    # --- 2. Mobile 390x844 ---
    page_m = browser.new_page(viewport={'width': 390, 'height': 844})
    page_m.on('pageerror', lambda err: errors.append(f'[Mobile PageError] {str(err)}'))
    page_m.on('console', lambda msg: console_errors.append(f'[Mobile {msg.type}] {msg.text}') if msg.type in ['error'] else None)

    print("Navigating to http://localhost:3005/lab (Mobile)...")
    page_m.goto('http://localhost:3005/lab', wait_until='domcontentloaded')
    page_m.wait_for_selector('text=LAB ENVIRONMENT', timeout=10000)
    page_m.wait_for_timeout(1500)

    page_m.screenshot(path='verification/round3-hero-mobile-390x844.png')
    print("Captured round3-hero-mobile-390x844.png")

    page_m.close()
    browser.close()

# Copy to artifact dir
for filename in [
    'round3-hero-progress-0.0-1440x900.png',
    'round3-hero-progress-0.3-1440x900.png',
    'round3-hero-progress-0.6-1440x900.png',
    'round3-hero-progress-1.0-1440x900.png',
    'round3-hero-mobile-390x844.png',
]:
    src = os.path.join('verification', filename)
    if os.path.exists(src):
        dst = os.path.join(artifact_dir, filename)
        shutil.copyfile(src, dst)
        print(f"Copied {filename} to artifact directory")

print("\n--- RESULTS ---")
print(f"Total Page Errors: {len(errors)}")
for e in errors:
    print(f"  {e}")
print(f"Total Console Errors: {len(console_errors)}")
for c in console_errors:
    print(f"  {c}")
