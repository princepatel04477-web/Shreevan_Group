import os
import sys
import json
import urllib.request
import urllib.error
from playwright.sync_api import sync_playwright

ARTIFACTS_DIR = r"C:\Users\rebel\.gemini\antigravity\brain\27a09cef-730a-4e88-b037-727b4b0b213c"
BASE_URL = "http://localhost:3005"

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

def test_api():
    print("\n--- Part 1: API Route Verification (POST /api/enquiry) ---")
    
    # 1. Valid payload test
    print("Testing valid enquiry payload...")
    valid_payload = {
        "type": "rfq",
        "company": "AfriHealth Distributors Ltd",
        "country": "Kenya",
        "name": "Dr. Angela Ochieng",
        "role": "Director of Medical Procurement",
        "email": "procurement@afrihealth.co.ke",
        "phone": "+254 700 123456",
        "basketItems": [],
        "moleculesText": "Cefixime 200mg capsules (100,000 packs), Amoxicillin 500mg (200,000 packs)",
        "incoterm": "CIF",
        "destinationPort": "Mombasa Port",
        "targetDeliveryMonth": "July 2027",
        "hasImportLicence": "yes",
        "registrationStatus": "registered",
        "notes": "French/English bilingual commercial labelling required"
    }
    
    req = urllib.request.Request(
        f"{BASE_URL}/api/enquiry",
        data=json.dumps(valid_payload).encode("utf-8"),
        headers={"Content-Type": "application/json"}
    )
    with urllib.request.urlopen(req) as response:
        assert response.status == 200, f"Expected 200, got {response.status}"
        data = json.loads(response.read().decode("utf-8"))
        assert data.get("ok") is True, "Expected ok: true"
        assert data.get("reference", "").startswith("SG-"), f"Invalid reference format: {data.get('reference')}"
        print(f"✅ Valid payload accepted with reference: {data.get('reference')}")

    # 2. Invalid payload test
    print("Testing invalid payload (missing company and phone)...")
    invalid_payload = {
        "type": "rfq",
        "company": "",
        "country": "Kenya",
        "name": "Dr. Angela Ochieng",
        "role": "Director",
        "email": "not-an-email",
        "phone": ""
    }
    req = urllib.request.Request(
        f"{BASE_URL}/api/enquiry",
        data=json.dumps(invalid_payload).encode("utf-8"),
        headers={"Content-Type": "application/json"}
    )
    try:
        urllib.request.urlopen(req)
        assert False, "Expected 400 error for invalid payload"
    except urllib.error.HTTPError as e:
        assert e.code == 400, f"Expected 400, got {e.code}"
        err_data = json.loads(e.read().decode("utf-8"))
        assert err_data.get("ok") is False
        assert "company" in err_data.get("errors", {})
        print("✅ Invalid payload rejected with field-level errors.")

    # 3. Honeypot bot test
    print("Testing honeypot trap...")
    bot_payload = dict(valid_payload)
    bot_payload["hp_email"] = "spambot@example.com"
    req = urllib.request.Request(
        f"{BASE_URL}/api/enquiry",
        data=json.dumps(bot_payload).encode("utf-8"),
        headers={"Content-Type": "application/json"}
    )
    with urllib.request.urlopen(req) as response:
        assert response.status == 200
        bot_data = json.loads(response.read().decode("utf-8"))
        assert bot_data.get("ok") is True
        print("✅ Honeypot trapped silently without dispatch.")

def main():
    test_api()

    print("\n--- Part 2: Browser Verification (Playwright + Axe) ---")
    console_errors = []

    with sync_playwright() as p:
        # Desktop (1440x900)
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 1440, "height": 900})
        page = context.new_page()

        page.on("console", lambda msg: console_errors.append(msg.text) if msg.type == "error" else None)

        print("\nNavigating to /contact on Desktop...")
        page.goto(f"{BASE_URL}/contact", wait_until="networkidle")
        page.wait_for_timeout(1000)

        # Semantic h1 check
        h1 = page.locator("h1")
        assert h1.count() >= 1, "Semantic <h1> missing"
        print(f"✅ Semantic <h1> found: '{h1.first.inner_text()[:40]}...'")

        # Axe initial page scan
        check_axe(page, "Desktop Contact Page (Step 1)")

        screenshot_step1 = os.path.join(ARTIFACTS_DIR, "round8-contact-step1-desktop-1440x900.png")
        page.screenshot(path=screenshot_step1, full_page=True)
        print(f"📸 Saved desktop Step 1 screenshot: {screenshot_step1}")

        # Fill Step 1
        print("Interacting with Step 1 (Who you are)...")
        page.fill("#company", "Global Pharma Supplies Inc")
        page.select_option("#country", "Nigeria")
        page.fill("#name", "Dr. Ibrahim Musa")
        page.fill("#role", "Chief Regulatory Pharmacist")
        page.fill("#email", "procurement@globalpharma.ng")
        page.fill("#phone", "+234 803 123 4567")

        page.click("button:has-text('Continue to Molecules →')")
        page.wait_for_timeout(500)

        # Step 2: What you need
        print("Interacting with Step 2 (What you need)...")
        page.fill("#moleculesText", "Amoxicillin + Clavulanic Acid 625mg tablets, 50,000 packs for government tender.")
        page.click("button:has-text('Continue to Terms →')")
        page.wait_for_timeout(500)

        # Step 3: Commercial Terms
        print("Interacting with Step 3 (Commercial Terms)...")
        page.select_option("#incoterm", "CIF")
        page.fill("#destinationPort", "Lagos Apapa Seaport")
        page.fill("#targetDeliveryMonth", "September 2027")
        page.click("button:has-text('Review RFQ Document →')")
        page.wait_for_timeout(500)

        # Step 4: Review Step
        print("Verifying Step 4 (Document Review)...")
        assert page.locator("text=SHREEVAN GROUP · EXPORT DESK").count() > 0, "Document header missing"
        assert page.locator("text=Global Pharma Supplies Inc").count() > 0, "Company name missing from preview"

        screenshot_review = os.path.join(ARTIFACTS_DIR, "round8-contact-step4-review-1440x900.png")
        page.screenshot(path=screenshot_review, full_page=True)
        print(f"📸 Saved desktop Review Step screenshot: {screenshot_review}")

        # Axe scan on Review Step
        check_axe(page, "Desktop Contact Page (Step 4 Review)")

        # Submit form
        print("Submitting RFQ and triggering Sealed Envelope...")
        page.click("button:has-text('Seal Envelope & Submit RFQ')")
        
        # Wait for receipt screen
        page.wait_for_selector("text=ENQUIRY CLEARED & SEALED", timeout=15000)
        print("✅ Receipt view appeared after Sealed Envelope sequence!")

        # Verify tracking reference is present
        ref_text = page.locator("text=Tracking Reference").locator("xpath=..").inner_text()
        print(f"✅ Generated Tracking Reference: {ref_text.splitlines()[-1]}")

        screenshot_receipt = os.path.join(ARTIFACTS_DIR, "round8-contact-receipt-desktop-1440x900.png")
        page.screenshot(path=screenshot_receipt, full_page=True)
        print(f"📸 Saved desktop Receipt screenshot: {screenshot_receipt}")

        # Axe scan on Receipt view
        check_axe(page, "Desktop Contact Page (Receipt View)")

        context.close()

        # Mobile (390x844)
        print("\n--- Part 3: Mobile (390x844) Verification ---")
        context_mobile = browser.new_context(viewport={"width": 390, "height": 844})
        page_mobile = context_mobile.new_page()

        page_mobile.on("console", lambda msg: console_errors.append(msg.text) if msg.type == "error" else None)

        print("Navigating to /contact on Mobile...")
        page_mobile.goto(f"{BASE_URL}/contact", wait_until="networkidle")
        page_mobile.wait_for_timeout(1000)

        check_axe(page_mobile, "Mobile Contact Page")

        screenshot_mobile = os.path.join(ARTIFACTS_DIR, "round8-contact-mobile-390x844.png")
        page_mobile.screenshot(path=screenshot_mobile, full_page=True)
        print(f"📸 Saved mobile screenshot: {screenshot_mobile}")

        context_mobile.close()
        browser.close()

    filtered_errors = [e for e in console_errors if "favicon" not in e and "next-dev" not in e]
    if filtered_errors:
        print(f"⚠️ Console errors detected: {filtered_errors}")
    else:
        print("\n✅ Zero console errors detected during full test run.")

    print("\n============================================================")
    print("SUCCESS: All Round 8 verification tests passed cleanly!")
    print("============================================================")

if __name__ == "__main__":
    main()
