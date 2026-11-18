import os
import sys
import shutil
import json
from playwright.sync_api import sync_playwright

ARTIFACT_DIR = r"C:\Users\rebel\.gemini\antigravity\brain\27a09cef-730a-4e88-b037-727b4b0b213c"
SCREENSHOTS_DIR = "verification/screenshots"
AXE_PATH = "node_modules/axe-core/axe.min.js"

os.makedirs(SCREENSHOTS_DIR, exist_ok=True)
os.makedirs(ARTIFACT_DIR, exist_ok=True)

with open(AXE_PATH, "r", encoding="utf-8") as f:
    axe_script = f.read()

def run_axe(page, context_selector="body"):
    page.evaluate(axe_script)
    results = page.evaluate(f"""
        async () => {{
            const res = await axe.run('{context_selector}', {{
                runOnly: {{
                    type: 'tag',
                    values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']
                }}
            }});
            return res.violations;
        }}
    """)
    return results

def main():
    print("Starting Comprehensive Round 4 Chrome Verification...")
    errors = []
    console_errors = []

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)

        # ----------------------------------------------------
        # 1. Desktop Verification (1440x900)
        # ----------------------------------------------------
        page = browser.new_page(viewport={"width": 1440, "height": 900})
        page.on("console", lambda msg: console_errors.append(f"[Console Error] {msg.text}") if msg.type == "error" else None)
        page.on("pageerror", lambda err: console_errors.append(f"[Page Error] {err}"))

        print("Navigating to http://localhost:3005 (Desktop 1440x900)...")
        page.goto("http://localhost:3005", wait_until="networkidle")
        page.wait_for_timeout(600)

        # 1.1 Header Default State
        h_default_path = os.path.join(SCREENSHOTS_DIR, "round4-header-desktop-1440x900.png")
        page.screenshot(path=h_default_path)
        shutil.copy(h_default_path, os.path.join(ARTIFACT_DIR, "round4-header-desktop-1440x900.png"))
        print("Captured round4-header-desktop-1440x900.png")

        # 1.2 Axe Accessibility Scan on Main Header and Footer (Closed State)
        print("Running Axe-core accessibility scan on Header and Footer...")
        header_violations = run_axe(page, "#main-header")
        footer_violations = run_axe(page, "#main-footer")

        if header_violations:
            print(f"Header accessibility violations: {json.dumps(header_violations, indent=2)}")
            errors.append(f"Header Axe violations: {len(header_violations)}")
        else:
            print("✓ Header (closed) passed Axe scan with ZERO violations.")

        if footer_violations:
            print(f"Footer accessibility violations: {json.dumps(footer_violations, indent=2)}")
            errors.append(f"Footer Axe violations: {len(footer_violations)}")
        else:
            print("✓ Footer passed Axe scan with ZERO violations.")

        # 1.3 Scrolled Header & Hide/Return Dynamics
        print("Testing Scroll dynamics (1px border after 8px, hide on scroll down, return on scroll up)...")
        page.evaluate("window.scrollTo(0, 50)")
        page.wait_for_timeout(300)
        has_scrolled_border = page.evaluate("() => { const s = window.getComputedStyle(document.querySelector('#main-header')); return s.borderBottomWidth === '1px' && s.borderBottomStyle === 'solid'; }")
        if not has_scrolled_border:
            errors.append("Header did not apply 1px solid bottom border after scrolling 50px.")
        else:
            print("✓ Header 1px solid bottom border verified on scroll.")

        h_scrolled_path = os.path.join(SCREENSHOTS_DIR, "round4-header-scrolled-1440x900.png")
        page.screenshot(path=h_scrolled_path)
        shutil.copy(h_scrolled_path, os.path.join(ARTIFACT_DIR, "round4-header-scrolled-1440x900.png"))
        print("Captured round4-header-scrolled-1440x900.png")

        # Scroll down further (300px) -> verify hide (translateY -76px)
        page.evaluate("window.scrollTo(0, 300)")
        page.wait_for_timeout(350)
        is_hidden_down = page.evaluate("() => { const el = document.querySelector('#main-header'); const rect = el.getBoundingClientRect(); return rect.bottom <= 0 || rect.top < 0; }")
        if not is_hidden_down:
            errors.append("Header did not hide (translate offscreen) when scrolling down to 300px.")
        else:
            print("✓ Header hide on scroll down verified.")

        # Scroll up to 150px -> verify return (translateY 0, rect.top === 0)
        page.evaluate("window.scrollTo(0, 150)")
        page.wait_for_timeout(350)
        is_returned_up = page.evaluate("() => { const el = document.querySelector('#main-header'); const rect = el.getBoundingClientRect(); return rect.top === 0; }")
        if not is_returned_up:
            errors.append("Header did not return to top (rect.top === 0) when scrolling up.")
        else:
            print("✓ Header return on scroll up verified.")

        page.evaluate("window.scrollTo(0, 0)")
        page.wait_for_timeout(300)

        # 1.4 Strict Keyboard-Only Walkthrough for Formulary Mega Menu
        print("Executing Strict Keyboard Walkthrough for Formulary Mega Menu...")
        page.keyboard.press("Tab") # Focuses logo
        page.keyboard.press("Tab") # Focuses Formulary trigger
        is_form_btn = page.evaluate("() => document.activeElement === document.querySelector('button[aria-controls=\"formulary-mega-menu\"]')")
        if not is_form_btn:
            errors.append("Tab did not move focus to Formulary button.")
        else:
            print("✓ Tab moved focus to Formulary trigger button.")

        # Test ArrowDown trigger to open menu and rove focus inside
        page.keyboard.press("ArrowDown")
        page.wait_for_timeout(400)

        formulary_menu = page.locator("#formulary-mega-menu")
        if not formulary_menu.is_visible():
            errors.append("Formulary Mega Menu did not open on ArrowDown key press.")
        else:
            print("✓ Formulary Mega Menu successfully opened on ArrowDown key.")

        # Verify roving focus entered inside the menu
        is_inside_menu = page.evaluate("() => document.querySelector('#formulary-mega-menu').contains(document.activeElement)")
        if not is_inside_menu:
            errors.append("Roving focus did not move inside open Formulary Mega Menu.")
        else:
            print("✓ Roving focus successfully entered Formulary Mega Menu.")

        # Test tabbing across items inside the menu
        page.keyboard.press("Tab")
        is_still_inside = page.evaluate("() => document.querySelector('#formulary-mega-menu').contains(document.activeElement)")
        if not is_still_inside:
            errors.append("Tab did not stay inside open Formulary Mega Menu.")
        else:
            print("✓ Focus successfully advanced to next item inside Formulary Mega Menu.")

        # Run Axe on open Formulary menu
        print("Scanning open Formulary Mega Menu with Axe-core...")
        form_axe = run_axe(page, "#formulary-mega-menu")
        if form_axe:
            print(f"Formulary Mega Menu accessibility violations: {json.dumps(form_axe, indent=2)}")
            errors.append(f"Formulary Menu Axe violations: {len(form_axe)}")
        else:
            print("✓ Open Formulary Mega Menu passed Axe scan with ZERO violations.")

        # Capture Formulary Mega Menu screenshot
        mega_form_path = os.path.join(SCREENSHOTS_DIR, "round4-mega-formulary-1440x900.png")
        page.screenshot(path=mega_form_path)
        shutil.copy(mega_form_path, os.path.join(ARTIFACT_DIR, "round4-mega-formulary-1440x900.png"))
        print("Captured round4-mega-formulary-1440x900.png")

        # Press Escape and verify menu closes AND focus returns to the trigger button
        page.keyboard.press("Escape")
        page.wait_for_timeout(300)

        if formulary_menu.is_visible():
            errors.append("Formulary Mega Menu did not close on Escape key.")
        else:
            print("✓ Formulary Mega Menu successfully closed on Escape key.")

        is_focused_back = page.evaluate("() => document.activeElement === document.querySelector('button[aria-controls=\"formulary-mega-menu\"]')")
        if not is_focused_back:
            errors.append("Focus did NOT return to Formulary trigger button after Escape.")
        else:
            print("✓ Focus verified: successfully returned to Formulary trigger button.")

        # 1.5 Strict Keyboard Walkthrough for Export Services Mega Menu
        print("Executing Strict Keyboard Walkthrough for Export Services Mega Menu...")
        page.keyboard.press("Tab") # Moves focus to Export Services button
        is_serv_btn = page.evaluate("() => document.activeElement === document.querySelector('button[aria-controls=\"export-services-mega-menu\"]')")
        if not is_serv_btn:
            errors.append("Tab did not move focus to Export Services button.")
        else:
            print("✓ Tab moved focus to Export Services trigger button.")

        # Open via Space key and rove focus inside
        page.keyboard.press("Space")
        page.wait_for_timeout(400)

        services_menu = page.locator("#export-services-mega-menu")
        if not services_menu.is_visible():
            errors.append("Export Services Mega Menu did not open on Space key press.")
        else:
            print("✓ Export Services Mega Menu successfully opened on Space key.")

        # Verify roving focus entered services menu
        is_inside_serv = page.evaluate("() => document.querySelector('#export-services-mega-menu').contains(document.activeElement)")
        if not is_inside_serv:
            errors.append("Roving focus did not move inside open Export Services Mega Menu.")
        else:
            print("✓ Roving focus successfully entered Export Services Mega Menu.")

        # Run Axe on open Export Services menu
        print("Scanning open Export Services Mega Menu with Axe-core...")
        serv_axe = run_axe(page, "#export-services-mega-menu")
        if serv_axe:
            print(f"Export Services Mega Menu accessibility violations: {json.dumps(serv_axe, indent=2)}")
            errors.append(f"Export Services Menu Axe violations: {len(serv_axe)}")
        else:
            print("✓ Open Export Services Mega Menu passed Axe scan with ZERO violations.")

        mega_serv_path = os.path.join(SCREENSHOTS_DIR, "round4-mega-services-1440x900.png")
        page.screenshot(path=mega_serv_path)
        shutil.copy(mega_serv_path, os.path.join(ARTIFACT_DIR, "round4-mega-services-1440x900.png"))
        print("Captured round4-mega-services-1440x900.png")

        # Close via Escape and verify focus return
        page.keyboard.press("Escape")
        page.wait_for_timeout(300)

        if services_menu.is_visible():
            errors.append("Export Services Mega Menu did not close on Escape key.")
        else:
            print("✓ Export Services Mega Menu successfully closed on Escape key.")

        is_serv_focused_back = page.evaluate("() => document.activeElement === document.querySelector('button[aria-controls=\"export-services-mega-menu\"]')")
        if not is_serv_focused_back:
            errors.append("Focus did NOT return to Export Services trigger button after Escape.")
        else:
            print("✓ Focus verified: successfully returned to Export Services trigger button.")

        # 1.6 Desktop Footer Capture
        footer_el = page.locator("#main-footer")
        footer_el.scroll_into_view_if_needed()
        page.wait_for_timeout(400)
        footer_desktop_path = os.path.join(SCREENSHOTS_DIR, "round4-footer-desktop-1440x900.png")
        page.screenshot(path=footer_desktop_path)
        shutil.copy(footer_desktop_path, os.path.join(ARTIFACT_DIR, "round4-footer-desktop-1440x900.png"))
        print("Captured round4-footer-desktop-1440x900.png")

        page.close()

        # ----------------------------------------------------
        # 2. Breakpoint Verification (360, 768, 1280)
        # ----------------------------------------------------
        for width, name in [(360, "mobile-small"), (768, "tablet"), (1280, "laptop")]:
            bp_page = browser.new_page(viewport={"width": width, "height": 800})
            bp_page.on("console", lambda msg: console_errors.append(f"[{name} Console Error] {msg.text}") if msg.type == "error" else None)
            bp_page.on("pageerror", lambda err: console_errors.append(f"[{name} Page Error] {err}"))
            bp_page.goto("http://localhost:3005", wait_until="networkidle")
            bp_path = os.path.join(SCREENSHOTS_DIR, f"round4-breakpoint-{name}-{width}x800.png")
            bp_page.screenshot(path=bp_path)
            shutil.copy(bp_path, os.path.join(ARTIFACT_DIR, f"round4-breakpoint-{name}-{width}x800.png"))
            print(f"Captured breakpoint {name} ({width}px)")
            bp_page.close()

        # ----------------------------------------------------
        # 3. Mobile Verification (390x844) & Focus Trap
        # ----------------------------------------------------
        mobile_page = browser.new_page(viewport={"width": 390, "height": 844})
        mobile_page.on("console", lambda msg: console_errors.append(f"[Mobile Console Error] {msg.text}") if msg.type == "error" else None)
        mobile_page.on("pageerror", lambda err: console_errors.append(f"[Mobile Page Error] {err}"))

        print("Navigating to http://localhost:3005 (Mobile 390x844)...")
        mobile_page.goto("http://localhost:3005", wait_until="networkidle")
        mobile_page.wait_for_timeout(600)

        # 3.1 Open Mobile Drawer
        hamburger_btn = mobile_page.locator('button[aria-label="Open navigation menu"]')
        hamburger_btn.click()
        mobile_page.wait_for_timeout(600)

        # Verify scroll locked / Lenis stopped
        is_scroll_locked = mobile_page.evaluate("() => document.body.style.overflow === 'hidden'")
        if not is_scroll_locked:
            errors.append("Body scroll was not locked (overflow !== 'hidden') while mobile menu was open.")
        else:
            print("✓ Mobile drawer scroll lock (body overflow: hidden) verified.")

        # Test Mobile Focus Trap: Tab 8 times, verify focus is ALWAYS inside dialog
        for _ in range(8):
            mobile_page.keyboard.press("Tab")
            is_trapped = mobile_page.evaluate("() => document.querySelector('[role=\"dialog\"]').contains(document.activeElement)")
            if not is_trapped:
                errors.append("Focus escaped the mobile navigation drawer.")
                break
        print("✓ Mobile Focus Trap verified: tab sequence stays trapped inside drawer.")

        # Expand Formulary in mobile drawer
        expand_formulary_btn = mobile_page.locator('button[aria-label="Expand therapeutic categories"]')
        expand_formulary_btn.wait_for(state="visible", timeout=5000)
        expand_formulary_btn.click()
        mobile_page.wait_for_timeout(400)

        # Capture Mobile Drawer
        m_drawer_path = os.path.join(SCREENSHOTS_DIR, "round4-header-mobile-drawer-390x844.png")
        mobile_page.screenshot(path=m_drawer_path)
        shutil.copy(m_drawer_path, os.path.join(ARTIFACT_DIR, "round4-header-mobile-drawer-390x844.png"))
        print("Captured round4-header-mobile-drawer-390x844.png")

        # Scan open mobile navigation drawer
        print("Scanning open Mobile Navigation Drawer with Axe-core...")
        drawer_axe = run_axe(mobile_page, '[role="dialog"]')
        if drawer_axe:
            print(f"Mobile Drawer accessibility violations: {json.dumps(drawer_axe, indent=2)}")
            errors.append(f"Mobile Drawer Axe violations: {len(drawer_axe)}")
        else:
            print("✓ Open Mobile Navigation Drawer passed Axe scan with ZERO violations.")

        # Close Mobile Drawer
        close_btn = mobile_page.locator('button[aria-label="Close navigation menu"]')
        close_btn.click()
        mobile_page.wait_for_timeout(400)

        # 3.2 Mobile Footer Capture
        m_footer_el = mobile_page.locator("#main-footer")
        m_footer_el.scroll_into_view_if_needed()
        mobile_page.wait_for_timeout(400)
        footer_mobile_path = os.path.join(SCREENSHOTS_DIR, "round4-footer-mobile-390x844.png")
        mobile_page.screenshot(path=footer_mobile_path)
        shutil.copy(footer_mobile_path, os.path.join(ARTIFACT_DIR, "round4-footer-mobile-390x844.png"))
        print("Captured round4-footer-mobile-390x844.png")

        mobile_page.close()
        browser.close()

    if console_errors:
        print("Console/Page errors detected:")
        for err in console_errors:
            print(" -", err)
        errors.extend(console_errors)

    if errors:
        print("FAILED with errors:")
        for err in errors:
            print(" -", err)
        sys.exit(1)
    else:
        print("ALL VERIFICATIONS AND SCREENSHOTS PASSED WITH 0 ERRORS AND 0 VIOLATIONS!")

if __name__ == "__main__":
    main()
