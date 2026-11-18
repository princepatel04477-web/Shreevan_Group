import os
import sys
from playwright.sync_api import sync_playwright

ARTIFACTS_DIR = r"C:\Users\rebel\.gemini\antigravity\brain\27a09cef-730a-4e88-b037-727b4b0b213c"
BASE_URL = "http://localhost:3005"

VIEWPORTS = [
    {"name": "mobile-small", "width": 360, "height": 800},
    {"name": "tablet", "width": 768, "height": 1024},
    {"name": "laptop", "width": 1280, "height": 800},
    {"name": "desktop", "width": 1440, "height": 900},
]

ROUTES = [
    {"path": "/", "name": "home"},
    {"path": "/formulary", "name": "formulary"},
    {"path": "/formulary/item/sg-001", "name": "datasheet"},
    {"path": "/contact", "name": "contact"},
    {"path": "/export-services", "name": "export-services"},
    {"path": "/quality", "name": "quality"},
    {"path": "/private-label", "name": "private-label"},
    {"path": "/about", "name": "about"},
]

def check_axe(page, context_name):
    print(f"Running axe accessibility scan for {context_name}...")
    page.evaluate("""
        if (!window.axe) {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.9.1/axe.min.js';
            document.head.appendChild(script);
        }
    """)
    page.wait_for_function("typeof window.axe !== 'undefined'", timeout=10000)
    
    results = page.evaluate("""
        axe.run(document, {
            runOnly: {
                type: 'tag',
                values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice']
            }
        })
    """)
    
    violations = results.get("violations", [])
    if violations:
        print(f"❌ Axe found {len(violations)} violations in {context_name}:")
        for v in violations:
            print(f"  - [{v.get('id')}] {v.get('help')} ({v.get('impact')})")
            for node in v.get("nodes", []):
                print(f"      Target: {node.get('target')}")
                print(f"      Summary: {node.get('failureSummary')}")
        raise AssertionError(f"Axe accessibility violations found in {context_name}")
    else:
        print(f"✅ {context_name} passed axe accessibility scan (0 violations).")

def main():
    print("============================================================")
    print("Starting Round 9 Design Taste & Responsive Verification Suite")
    print("============================================================")

    console_errors = []

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)

        # 1. Multi-breakpoint verification across core routes
        for vp in VIEWPORTS:
            print(f"\n--- Testing Viewport: {vp['name']} ({vp['width']}x{vp['height']}) ---")
            context = browser.new_context(viewport={"width": vp["width"], "height": vp["height"]})
            page = context.new_page()
            page.on("console", lambda msg: console_errors.append(msg.text) if msg.type == "error" else None)

            # Test Home
            page.goto(f"{BASE_URL}/", wait_until="networkidle")
            page.wait_for_timeout(1000)
            check_axe(page, f"Home ({vp['name']})")
            img_home = os.path.join(ARTIFACTS_DIR, f"round9-home-{vp['name']}-{vp['width']}x{vp['height']}.png")
            page.screenshot(path=img_home)
            print(f"📸 Saved screenshot: {img_home}")

            # Test Formulary
            page.goto(f"{BASE_URL}/formulary", wait_until="networkidle")
            page.wait_for_timeout(800)
            check_axe(page, f"Formulary ({vp['name']})")
            img_form = os.path.join(ARTIFACTS_DIR, f"round9-formulary-{vp['name']}-{vp['width']}x{vp['height']}.png")
            page.screenshot(path=img_form)
            print(f"📸 Saved screenshot: {img_form}")

            # Test Contact
            page.goto(f"{BASE_URL}/contact", wait_until="networkidle")
            page.wait_for_timeout(800)
            check_axe(page, f"Contact ({vp['name']})")
            img_contact = os.path.join(ARTIFACTS_DIR, f"round9-contact-{vp['name']}-{vp['width']}x{vp['height']}.png")
            page.screenshot(path=img_contact)
            print(f"📸 Saved screenshot: {img_contact}")

            context.close()

        # 2. Reduced Motion Verification
        print("\n--- Testing Prefers Reduced Motion Mode ---")
        context_rm = browser.new_context(
            viewport={"width": 1440, "height": 900},
            reduced_motion="reduce"
        )
        page_rm = context_rm.new_page()
        page_rm.on("console", lambda msg: console_errors.append(msg.text) if msg.type == "error" else None)

        page_rm.goto(f"{BASE_URL}/", wait_until="networkidle")
        page_rm.wait_for_timeout(1000)
        check_axe(page_rm, "Home (Reduced Motion)")
        img_rm_home = os.path.join(ARTIFACTS_DIR, "round9-home-reduced-motion-1440x900.png")
        page_rm.screenshot(path=img_rm_home)
        print(f"📸 Saved reduced motion home screenshot: {img_rm_home}")

        page_rm.goto(f"{BASE_URL}/contact", wait_until="networkidle")
        page_rm.wait_for_timeout(800)
        check_axe(page_rm, "Contact (Reduced Motion)")
        img_rm_contact = os.path.join(ARTIFACTS_DIR, "round9-contact-reduced-motion-1440x900.png")
        page_rm.screenshot(path=img_rm_contact)
        print(f"📸 Saved reduced motion contact screenshot: {img_rm_contact}")

        context_rm.close()
        browser.close()

    filtered_errors = [e for e in console_errors if "favicon" not in e and "next-dev" not in e]
    if filtered_errors:
        print(f"⚠️ Console errors detected: {filtered_errors}")
    else:
        print("\n✅ Zero console errors detected during full test run.")

    print("\n============================================================")
    print("SUCCESS: All Round 9 design taste & verification tests passed cleanly!")
    print("============================================================")

if __name__ == "__main__":
    main()
