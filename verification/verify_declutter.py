import os
import sys
import json
import time
from playwright.sync_api import sync_playwright

SCREENSHOTS_DIR = r"C:\Users\rebel\.gemini\antigravity\brain\27a09cef-730a-4e88-b037-727b4b0b213c"

def test_homepage():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)

        # 1. Desktop Test (1440x900)
        context = browser.new_context(bypass_csp=True, viewport={"width": 1440, "height": 900})
        page = context.new_page()

        print("Navigating to http://localhost:3005/ (Desktop 1440x900)...")
        page.goto("http://localhost:3005/", wait_until="networkidle")
        time.sleep(2)

        # Screenshot hero
        hero_path = os.path.join(SCREENSHOTS_DIR, "declutter-hero-desktop.png")
        page.screenshot(path=hero_path)
        print(f"Saved: {hero_path}")

        # Scroll to Chapter 2
        page.evaluate("document.getElementById('chapter-portfolio').scrollIntoView({ behavior: 'smooth' })")
        time.sleep(1)
        ch2_path = os.path.join(SCREENSHOTS_DIR, "declutter-portfolio-desktop.png")
        page.screenshot(path=ch2_path)
        print(f"Saved: {ch2_path}")

        # Scroll to Chapter 3 Quality
        page.evaluate("document.getElementById('chapter-quality').scrollIntoView({ behavior: 'smooth' })")
        time.sleep(1)
        ch3_path = os.path.join(SCREENSHOTS_DIR, "declutter-quality-desktop.png")
        page.screenshot(path=ch3_path)
        print(f"Saved: {ch3_path}")

        # Scroll to Chapter 4 Documentation
        page.evaluate("document.getElementById('chapter-documentation').scrollIntoView({ behavior: 'smooth' })")
        time.sleep(1)
        ch4_path = os.path.join(SCREENSHOTS_DIR, "declutter-documentation-desktop.png")
        page.screenshot(path=ch4_path)
        print(f"Saved: {ch4_path}")

        # Full page screenshot
        full_path = os.path.join(SCREENSHOTS_DIR, "declutter-full-desktop.png")
        page.screenshot(path=full_path, full_page=True)
        print(f"Saved: {full_path}")

        # Inject axe-core
        page.add_script_tag(url="https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.9.1/axe.min.js")
        page.wait_for_function("typeof window.axe !== 'undefined'", timeout=5000)
        axe_res = page.evaluate("axe.run()")
        violations = axe_res.get("violations", [])
        print(f"Axe Violations on Desktop: {len(violations)}")
        if violations:
            for v in violations:
                print(f"  - [{v.get('id')}] {v.get('help')} ({len(v.get('nodes', []))} nodes)")

        # 2. Mobile Test (390x844)
        m_context = browser.new_context(bypass_csp=True, viewport={"width": 390, "height": 844})
        m_page = m_context.new_page()
        m_page.goto("http://localhost:3005/", wait_until="networkidle")
        time.sleep(1)

        m_page.add_script_tag(url="https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.9.1/axe.min.js")
        m_page.wait_for_function("typeof window.axe !== 'undefined'", timeout=5000)
        m_axe = m_page.evaluate("axe.run()")
        m_violations = m_axe.get("violations", [])
        print(f"Axe Violations on Mobile: {len(m_violations)}")
        if m_violations:
            for v in m_violations:
                print(f"  - [{v.get('id')}] {v.get('help')} ({len(v.get('nodes', []))} nodes)")

        m_full_path = os.path.join(SCREENSHOTS_DIR, "declutter-full-mobile.png")
        m_page.screenshot(path=m_full_path, full_page=True)
        print(f"Saved: {m_full_path}")

        browser.close()
        print("All verification steps completed successfully.")

if __name__ == "__main__":
    test_homepage()
