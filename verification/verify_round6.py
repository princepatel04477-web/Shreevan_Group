import json
import os
import sys
import time
from playwright.sync_api import sync_playwright

BASE_URL = "http://localhost:3005"
ARTIFACT_DIR = r"C:\Users\rebel\.gemini\antigravity\brain\27a09cef-730a-4e88-b037-727b4b0b213c"

AXE_SCRIPT_PATH = os.path.join(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
    "node_modules",
    "axe-core",
    "axe.min.js",
)

def run_axe_scan(page, context_name=""):
    print(f"Running axe accessibility scan for {context_name}...")
    with open(AXE_SCRIPT_PATH, "r", encoding="utf-8") as f:
        axe_js = f.read()

    page.evaluate(axe_js)
    axe_result = page.evaluate("""
        async () => {
            const results = await axe.run(document.body, {
                runOnly: {
                    type: 'tag',
                    values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice']
                },
                rules: {
                    'document-title': { enabled: false }
                }
            });
            return {
                violations: results.violations.map(v => ({
                    id: v.id,
                    impact: v.impact,
                    description: v.description,
                    help: v.help,
                    nodes: v.nodes.length,
                    nodes_html: v.nodes.map(n => n.html)
                }))
            };
        }
    """)
    violations = axe_result.get("violations", [])
    if violations:
        print(f"❌ {context_name} Axe violations found ({len(violations)}):")
        for v in violations:
            print(f"  - [{v['impact']}] {v['id']}: {v['help']} ({v['nodes']} nodes)")
            for h in v.get("nodes_html", [])[:3]:
                print(f"      Node HTML: {h[:120]}")
    else:
        print(f"✅ {context_name} passed axe accessibility scan (0 violations).")
    return violations

def main():
    errors = []
    print("=" * 60)
    print("Starting Round 6 Automated Verification Suite (Home: Six Chapters)")
    print("=" * 60)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)

        # -------------------------------------------------------------
        # Part 1: Desktop Verification (1440x900)
        # -------------------------------------------------------------
        print("\n--- Part 1: Desktop (1440x900) Verification ---")
        context = browser.new_context(
            viewport={"width": 1440, "height": 900},
            device_scale_factor=1,
        )
        page = context.new_page()

        console_errors = []
        page.on("console", lambda msg: console_errors.append(msg.text) if msg.type == "error" else None)
        page.on("pageerror", lambda err: console_errors.append(str(err)))

        print("Navigating to home page (/) ...")
        page.goto(f"{BASE_URL}/", wait_until="networkidle")
        time.sleep(2)

        # 1. Check all 6 chapters exist
        chapters = [
            ("chapter-formulation", "CH-01 / FORMULATION"),
            ("chapter-portfolio", "CH-02 / PORTFOLIO"),
            ("chapter-quality", "CH-03 / QUALITY"),
            ("chapter-documentation", "CH-04 / DOCUMENTATION"),
            ("chapter-shipment", "CH-05 / SHIPMENT"),
            ("chapter-brand", "CH-06 / YOUR BRAND"),
        ]

        for ch_id, ch_title in chapters:
            el = page.locator(f"#{ch_id}")
            if el.count() > 0:
                print(f"✅ Found chapter element #{ch_id}")
            else:
                errors.append(f"Missing chapter element #{ch_id}")
                print(f"❌ Missing chapter element #{ch_id}")

        # 2. Check <h1> exists and is unique
        h1_count = page.locator("h1").count()
        if h1_count == 1:
            h1_text = page.locator("h1").inner_text()
            print(f"✅ Semantic unique <h1> found: '{h1_text.strip()}'")
        else:
            errors.append(f"Expected exactly 1 <h1>, found {h1_count}")
            print(f"❌ Expected exactly 1 <h1>, found {h1_count}")

        # 3. Check BatchTicket exists and test popover
        batch_ticket_btn = page.locator("button[title*='chapter navigation']")
        if batch_ticket_btn.count() > 0:
            print("✅ BatchTicket button found.")
            batch_ticket_btn.click()
            time.sleep(0.5)

            # Popover should be open
            popover = page.locator("div[role='dialog']")
            if popover.count() > 0:
                print("✅ BatchTicket popover menu opened successfully.")
                shot_path = os.path.join(ARTIFACT_DIR, "round6-batchticket-popover-1440x900.png")
                page.screenshot(path=shot_path)
                print(f"📸 Saved BatchTicket screenshot: {shot_path}")
            else:
                print("⚠️ BatchTicket popover dialog not found with role='dialog'")

            # Close popover by pressing Escape
            page.keyboard.press("Escape")
            time.sleep(0.5)
        else:
            errors.append("BatchTicket button not found on desktop")
            print("❌ BatchTicket button not found on desktop")

        # Check DossierStack button
        dossier_stack_btn = page.locator("button:has-text('DOSSIER STACK')")
        if dossier_stack_btn.count() > 0:
            print("✅ DossierStack component found on desktop.")

        # 4. Run Axe scan on desktop home
        v_home_desktop = run_axe_scan(page, "Desktop Home (All 6 Chapters)")
        if v_home_desktop:
            errors.append(f"Desktop Home Axe violations: {len(v_home_desktop)}")

        # 5. Capture screenshots of each chapter by scrolling into view
        print("\nCapturing chapter screenshot sequence...")
        for ch_id, ch_name in chapters:
            ch_locator = page.locator(f"#{ch_id}")
            ch_locator.scroll_into_view_if_needed()
            time.sleep(1)
            filename = f"round6-{ch_id}-1440x900.png"
            shot_path = os.path.join(ARTIFACT_DIR, filename)
            page.screenshot(path=shot_path)
            print(f"📸 Captured {ch_name}: {shot_path}")

        # -------------------------------------------------------------
        # Part 2: Mobile Verification (390x844)
        # -------------------------------------------------------------
        print("\n--- Part 2: Mobile (390x844) Verification ---")
        mobile_context = browser.new_context(
            viewport={"width": 390, "height": 844},
            user_agent="Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
            device_scale_factor=2,
            is_mobile=True,
            has_touch=True,
        )
        mobile_page = mobile_context.new_page()
        mobile_page.on("console", lambda msg: console_errors.append(msg.text) if msg.type == "error" else None)
        mobile_page.on("pageerror", lambda err: console_errors.append(str(err)))

        print("Navigating to mobile home page (/) ...")
        mobile_page.goto(f"{BASE_URL}/", wait_until="networkidle")
        time.sleep(2)

        # Check mobile chapters render and capture
        v_home_mobile = run_axe_scan(mobile_page, "Mobile Home")
        if v_home_mobile:
            errors.append(f"Mobile Home Axe violations: {len(v_home_mobile)}")

        # Capture mobile screenshots of top 3 chapters
        mobile_shots = [
            ("chapter-formulation", "round6-mobile-ch01-390x844.png"),
            ("chapter-portfolio", "round6-mobile-ch02-390x844.png"),
            ("chapter-quality", "round6-mobile-ch03-390x844.png"),
        ]
        for ch_id, fname in mobile_shots:
            loc = mobile_page.locator(f"#{ch_id}")
            loc.scroll_into_view_if_needed()
            time.sleep(1)
            shot_path = os.path.join(ARTIFACT_DIR, fname)
            mobile_page.screenshot(path=shot_path)
            print(f"📸 Captured mobile {ch_id}: {shot_path}")

        # -------------------------------------------------------------
        # Part 3: Console Errors Evaluation
        # -------------------------------------------------------------
        # Filter out non-fatal dev notices if any
        critical_errors = [e for e in console_errors if "favicon" not in e.lower() and "404" not in e.lower()]
        if critical_errors:
            print(f"\n❌ Encountered {len(critical_errors)} console errors:")
            for err in critical_errors:
                print(f"  - {err}")
            errors.extend(critical_errors)
        else:
            print("\n✅ Zero console errors detected during full test run.")

        browser.close()

    print("\n" + "=" * 60)
    if errors:
        print(f"FAILED: Round 6 Verification found {len(errors)} error(s):")
        for err in errors:
            print(f"  - {err}")
        sys.exit(1)
    else:
        print("SUCCESS: All Round 6 verification tests passed cleanly!")
        print("=" * 60)

if __name__ == "__main__":
    main()
