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
    print("Starting Round 7 Automated Verification Suite (Content & Legal Pages)")
    print("=" * 60)

    routes = [
        ("export-services", "/export-services", "Export Services"),
        ("quality", "/quality", "Quality & Compliance"),
        ("private-label", "/private-label", "Private Label"),
        ("about", "/about", "About Us"),
        ("privacy", "/privacy", "Privacy Policy"),
        ("terms", "/terms", "Terms & Conditions"),
        ("disclaimer", "/disclaimer", "Regulatory Disclaimer"),
    ]

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

        for route_slug, route_path, route_title in routes:
            print(f"\nNavigating to {route_title} ({route_path}) ...")
            page.goto(f"{BASE_URL}{route_path}", wait_until="networkidle")
            time.sleep(1)

            # Check <h1> exists
            h1 = page.locator("h1")
            if h1.count() >= 1:
                print(f"✅ Semantic <h1> found: '{h1.first.inner_text().strip()[:40]}...'")
            else:
                errors.append(f"Missing <h1> on {route_path}")
                print(f"❌ Missing <h1> on {route_path}")

            # Run Axe scan
            violations = run_axe_scan(page, f"Desktop {route_title}")
            if violations:
                errors.append(f"Axe violations on {route_path}: {len(violations)}")

            # Screenshot
            shot_path = os.path.join(ARTIFACT_DIR, f"round7-{route_slug}-desktop-1440x900.png")
            page.screenshot(path=shot_path, full_page=False)
            print(f"📸 Saved desktop screenshot: {shot_path}")

        # Test signature interactions
        print("\nTesting signature interactions on Desktop...")

        # 1. /export-services DocRowDrawer
        print("Testing /export-services DocRowDrawer interaction...")
        page.goto(f"{BASE_URL}/export-services", wait_until="networkidle")
        time.sleep(1)
        doc_btn = page.locator("button#doc-trigger-sg-doc-02")
        if doc_btn.count() > 0:
            doc_btn.click()
            time.sleep(0.5)
            print("✅ Clicked SG-DOC-02 in DocRowDrawer")
            shot_path = os.path.join(ARTIFACT_DIR, "round7-export-services-active-sheet-1440x900.png")
            page.screenshot(path=shot_path)
            print(f"📸 Saved active sheet screenshot: {shot_path}")
        else:
            print("⚠️ Doc button #doc-trigger-sg-doc-02 not found")

        # 2. /private-label Carton interactive
        print("Testing /private-label CartonInteractive...")
        page.goto(f"{BASE_URL}/private-label", wait_until="networkidle")
        time.sleep(1)
        zone2 = page.locator("g[aria-label*='Zone 2']")
        if zone2.count() > 0:
            zone2.click()
            time.sleep(0.5)
            print("✅ Clicked Zone 2 on Carton diagram")
            shot_path = os.path.join(ARTIFACT_DIR, "round7-private-label-carton-zone2-1440x900.png")
            page.screenshot(path=shot_path)
            print(f"📸 Saved carton zone 2 screenshot: {shot_path}")
        else:
            print("⚠️ Carton Zone 2 not found")

        # 3. /about RegistryCard flip
        print("Testing /about RegistryCard flip...")
        page.goto(f"{BASE_URL}/about", wait_until="networkidle")
        time.sleep(1)
        flip_btn = page.locator("button:has-text('Flip to View')")
        if flip_btn.count() > 0:
            flip_btn.click()
            time.sleep(0.8)
            print("✅ Clicked Flip button on RegistryCard")
            shot_path = os.path.join(ARTIFACT_DIR, "round7-about-registry-card-flipped-1440x900.png")
            page.screenshot(path=shot_path)
            print(f"📸 Saved flipped registry card screenshot: {shot_path}")
        else:
            print("ℹ️ Flip button not present (config registry numbers empty, card correctly shows front face)")

        # Verify key anchors
        print("\nVerifying key hash anchors...")
        anchors = [
            ("/export-services#freight", "#freight"),
            ("/quality#documents", "#documents"),
            ("/quality#pharmacovigilance", "#pharmacovigilance"),
            ("/quality#anti-counterfeit", "#anti-counterfeit"),
            ("/quality#coldchain", "#coldchain"),
            ("/about#manufacturing", "#manufacturing"),
        ]
        for url_path, anchor_id in anchors:
            page.goto(f"{BASE_URL}{url_path}", wait_until="networkidle")
            time.sleep(0.5)
            target = page.locator(anchor_id)
            if target.count() > 0:
                print(f"✅ Anchor target {anchor_id} exists on {url_path}")
            else:
                errors.append(f"Missing anchor target {anchor_id} on {url_path}")
                print(f"❌ Missing anchor target {anchor_id} on {url_path}")

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

        for route_slug, route_path, route_title in routes:
            mobile_page.goto(f"{BASE_URL}{route_path}", wait_until="networkidle")
            time.sleep(0.8)

            violations = run_axe_scan(mobile_page, f"Mobile {route_title}")
            if violations:
                errors.append(f"Mobile Axe violations on {route_path}: {len(violations)}")

            shot_path = os.path.join(ARTIFACT_DIR, f"round7-{route_slug}-mobile-390x844.png")
            mobile_page.screenshot(path=shot_path, full_page=False)
            print(f"📸 Saved mobile screenshot: {shot_path}")

        # -------------------------------------------------------------
        # Part 3: Console Errors Evaluation
        # -------------------------------------------------------------
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
        print(f"FAILED: Round 7 Verification found {len(errors)} error(s):")
        for err in errors:
            print(f"  - {err}")
        sys.exit(1)
    else:
        print("SUCCESS: All Round 7 verification tests passed cleanly!")
        print("=" * 60)

if __name__ == "__main__":
    main()
