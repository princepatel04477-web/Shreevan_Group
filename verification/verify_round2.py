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
    page.goto('http://localhost:3005/lab', wait_until='networkidle')
    page.wait_for_timeout(1000)

    # Initial Chapter 01 view
    page.screenshot(path='verification/round2-lab-1440x900.png')
    print("Captured round2-lab-1440x900.png")

    # 1. Click Batch Ticket to open popover
    ticket_btn = page.locator('button[aria-label*="Export Batch Ticket"]')
    if ticket_btn.count() > 0:
        ticket_btn.first.click()
        page.wait_for_timeout(500)
        page.screenshot(path='verification/round2-lab-ticket-open-1440x900.png')
        print("Captured round2-lab-ticket-open-1440x900.png")
        page.keyboard.press("Escape")
        page.wait_for_timeout(300)

    # 2. Scroll through chapters 1, 2, 3, 4, 5 to trigger doc collection
    print("Scrolling through chapters to trigger document collection...")
    for scroll_mult in [1.0, 2.0, 3.0, 4.0]:
        page.evaluate(f"window.scrollTo(0, window.innerHeight * {scroll_mult})")
        page.wait_for_timeout(600)

    # 3. Click Dossier Stack to fan out
    dossier_btn = page.locator('aside[aria-label="Export Dossier Stack"] button')
    if dossier_btn.count() > 0:
        dossier_btn.first.click()
        page.wait_for_timeout(700)
        page.screenshot(path='verification/round2-lab-dossier-open-1440x900.png')
        print("Captured round2-lab-dossier-open-1440x900.png")

        # Click first doc card to inspect
        doc_card = page.locator('button:has-text("SG-SPEC-")').first
        if doc_card.count() > 0:
            doc_card.click()
            page.wait_for_timeout(600)
            page.screenshot(path='verification/round2-lab-dossier-doc-1440x900.png')
            print("Captured round2-lab-dossier-doc-1440x900.png")
            page.keyboard.press("Escape")
            page.wait_for_timeout(300)

        # Close dossier modal
        page.keyboard.press("Escape")
        page.wait_for_timeout(400)

    # 4. Scroll to Interactive Components Lab (Loupe section)
    loupe_heading = page.locator('text=LOUPE INSPECTION')
    if loupe_heading.count() > 0:
        loupe_heading.first.scroll_into_view_if_needed()
        page.wait_for_timeout(600)
        # hover over the loupe data sheet container
        data_sheet = page.locator('text=AMOXICILLIN & POTASSIUM CLAVULANATE')
        if data_sheet.count() > 0:
            box = data_sheet.first.bounding_box()
            if box:
                page.mouse.move(box['x'] + 80, box['y'] + 60)
                page.wait_for_timeout(500)
                page.screenshot(path='verification/round2-lab-loupe-1440x900.png')
                print("Captured round2-lab-loupe-1440x900.png")

    page.close()

    # --- 5. Mobile 390x844 ---
    page_m = browser.new_page(viewport={'width': 390, 'height': 844})
    page_m.on('pageerror', lambda err: errors.append(f'[Mobile PageError] {str(err)}'))
    page_m.on('console', lambda msg: console_errors.append(f'[Mobile {msg.type}] {msg.text}') if msg.type in ['error'] else None)

    print("Navigating to http://localhost:3005/lab (Mobile)...")
    page_m.goto('http://localhost:3005/lab', wait_until='networkidle')
    page_m.wait_for_timeout(1000)

    page_m.screenshot(path='verification/round2-lab-390x844.png')
    print("Captured round2-lab-390x844.png")

    page_m.close()
    browser.close()

# Copy to artifact dir
for filename in [
    'round2-lab-1440x900.png',
    'round2-lab-ticket-open-1440x900.png',
    'round2-lab-dossier-open-1440x900.png',
    'round2-lab-dossier-doc-1440x900.png',
    'round2-lab-loupe-1440x900.png',
    'round2-lab-390x844.png',
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
