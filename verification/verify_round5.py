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
    print("Starting Round 5 Automated Verification Suite")
    print("=" * 60)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 1440, "height": 900})
        page = context.new_page()

        console_errors = []
        page.on("console", lambda msg: console_errors.append(msg.text) if msg.type == "error" else None)
        page.on("pageerror", lambda exc: console_errors.append(str(exc)))

        # ---------------------------------------------------------
        # 1. Desktop Formulary Grid View (/formulary)
        # ---------------------------------------------------------
        print("\n--- Testing 1: /formulary Desktop Grid View ---")
        page.goto(f"{BASE_URL}/formulary", wait_until="networkidle")
        time.sleep(1)

        # Check Hero content
        h1_text = page.locator("h1").inner_text()
        print(f"Hero H1: '{h1_text}'")
        assert "Formulations, by molecule." in h1_text, "H1 text mismatch"

        # Check Periodic Grid Tiles
        tiles = page.locator("[data-testid='molecule-tile']")
        tile_count = tiles.count()
        print(f"Rendered molecule tiles count: {tile_count}")
        assert tile_count > 0, "No molecule tiles rendered"

        # Axe scan grid view
        grid_violations = run_axe_scan(page, "Desktop Formulary Grid View")
        if grid_violations:
            errors.append(f"Grid view axe violations: {len(grid_violations)}")

        # Capture Desktop Grid screenshot
        grid_screenshot_path = os.path.join(ARTIFACT_DIR, "round5-formulary-grid-1440x900.png")
        page.screenshot(path=grid_screenshot_path, full_page=False)
        print(f"Saved: {grid_screenshot_path}")

        # ---------------------------------------------------------
        # 2. Search Functionality ("cefixime")
        # ---------------------------------------------------------
        print("\n--- Testing 2: Search Query 'cefixime' ---")
        search_input = page.locator("#formulary-search")
        search_input.fill("cefixime")
        time.sleep(0.5)

        filtered_tiles = page.locator("[data-testid='molecule-tile']")
        filtered_count = filtered_tiles.count()
        print(f"Tiles found matching 'cefixime': {filtered_count}")
        assert filtered_count > 0, "No tiles found for 'cefixime'"

        # Verify all visible items contain cefixime
        for i in range(min(3, filtered_count)):
            name = filtered_tiles.nth(i).locator("h3").inner_text().lower()
            assert "cefixime" in name, f"Item '{name}' does not contain 'cefixime'"

        # Screenshot of search results
        search_screenshot_path = os.path.join(ARTIFACT_DIR, "round5-formulary-search-1440x900.png")
        page.screenshot(path=search_screenshot_path, full_page=False)
        print(f"Saved: {search_screenshot_path}")

        # Clear search
        clear_btn = page.locator("button[aria-label='Clear search query']")
        clear_btn.click()
        time.sleep(0.3)
        assert page.locator("[data-testid='molecule-tile']").count() == tile_count, "Clear search failed to restore tiles"

        # ---------------------------------------------------------
        # 3. Empty State Sourcing Redirect
        # ---------------------------------------------------------
        print("\n--- Testing 3: Empty State & Sourcing CTA ---")
        search_input.fill("xyznonexistentmolecule999")
        time.sleep(0.5)

        empty_state = page.locator("[data-testid='formulary-empty-state']")
        assert empty_state.is_visible(), "Empty state container not visible"
        empty_title = empty_state.locator("h3").inner_text()
        print(f"Empty state title: '{empty_title}'")
        assert "Not in the published list. We can source it." in empty_title, "Empty state title mismatch"

        # Clear query again
        search_input.fill("")
        time.sleep(0.3)

        # ---------------------------------------------------------
        # 4. View Presentation Toggle: Table View
        # ---------------------------------------------------------
        print("\n--- Testing 4: Procurement Table View ---")
        table_toggle_btn = page.locator("button[title='Ruled Procurement Table View']")
        table_toggle_btn.click()
        time.sleep(0.4)

        rows = page.locator("[data-testid='procurement-row']")
        row_count = rows.count()
        print(f"Procurement table rows count: {row_count}")
        assert row_count > 0, "No table rows rendered"

        # Verify table accessibility (th scope, caption)
        table_caption = page.locator("table caption").inner_text()
        print(f"Table caption: '{table_caption}'")
        th_elements = page.locator("table th[scope='col']")
        assert th_elements.count() >= 5, "Missing th scope='col' columns"

        # Axe scan table view
        table_violations = run_axe_scan(page, "Desktop Formulary Table View")
        if table_violations:
            errors.append(f"Table view axe violations: {len(table_violations)}")

        # Screenshot of Table View
        table_screenshot_path = os.path.join(ARTIFACT_DIR, "round5-formulary-table-1440x900.png")
        page.screenshot(path=table_screenshot_path, full_page=False)
        print(f"Saved: {table_screenshot_path}")

        # Switch back to Grid
        grid_toggle_btn = page.locator("button[title='Periodic Table Grid View']")
        grid_toggle_btn.click()
        time.sleep(0.3)

        # ---------------------------------------------------------
        # 5. Enquiry Basket Operations & Header Badge
        # ---------------------------------------------------------
        print("\n--- Testing 5: Enquiry Basket Drawer & Operations ---")
        first_tile = page.locator("[data-testid='molecule-tile']").first
        product_name = first_tile.locator("h3").inner_text()
        print(f"Adding product to enquiry: '{product_name}'")

        add_btn = first_tile.locator("button[aria-label*='Add']")
        add_btn.click()
        time.sleep(0.5)

        # Verify Drawer is visible
        drawer = page.locator("[role='dialog'][aria-labelledby='basket-title']")
        assert drawer.is_visible(), "Enquiry Basket Drawer did not open upon adding product"

        # Check item in drawer
        basket_items = drawer.locator("[role='listitem']")
        assert basket_items.count() >= 1, "Product not in basket list"
        print(f"Basket items count: {basket_items.count()}")

        # Update destination country
        country_input = page.locator("#basket-destination-country")
        country_input.fill("Kenya")
        time.sleep(0.2)

        # Axe scan open drawer
        drawer_violations = run_axe_scan(page, "Enquiry Basket Drawer")
        if drawer_violations:
            errors.append(f"Drawer axe violations: {len(drawer_violations)}")

        # Screenshot of open drawer
        drawer_screenshot_path = os.path.join(ARTIFACT_DIR, "round5-enquiry-basket-1440x900.png")
        page.screenshot(path=drawer_screenshot_path, full_page=False)
        print(f"Saved: {drawer_screenshot_path}")

        # Close drawer with Escape
        page.keyboard.press("Escape")
        time.sleep(0.4)
        assert not drawer.is_visible(), "Drawer did not close on Escape"

        # Verify Header CTA badge
        badge = page.locator("[data-testid='header-cta-badge']")
        assert badge.is_visible(), "Header CTA badge not visible after adding to basket"
        badge_val = badge.inner_text().strip()
        print(f"Header CTA badge count: {badge_val}")
        assert badge_val == "1", f"Badge expected 1, got '{badge_val}'"

        # ---------------------------------------------------------
        # 6. Technical Data Sheet (/formulary/item/[id])
        # ---------------------------------------------------------
        print("\n--- Testing 6: Technical Data Sheet Standalone Page ---")
        page.goto(f"{BASE_URL}/formulary/item/sg-001", wait_until="networkidle")
        time.sleep(0.8)

        sheet = page.locator("[data-testid='technical-data-sheet']")
        assert sheet.is_visible(), "Technical Data Sheet container not found"

        spec_header = page.locator("h1").inner_text()
        print(f"Spec sheet formulation: '{spec_header}'")

        # Verify Loupe container
        loupe_el = page.locator(".loupe-active")
        assert loupe_el.count() >= 1, "Loupe inspection container not found"

        # Verify "Documents available on request" checklist
        docs_section = page.locator("section[aria-labelledby='documents-heading']")
        assert docs_section.is_visible(), "Documents available on request section not found"

        # Check JSON-LD
        json_ld_script = page.locator("script[type='application/ld+json']").inner_text()
        json_ld_data = json.loads(json_ld_script)
        assert json_ld_data["@type"] == "Product", "JSON-LD @type is not Product"
        assert "offers" not in json_ld_data, "JSON-LD contains unbacked offers"
        print(f"Verified Product JSON-LD: '{json_ld_data['name']}'")

        # Axe scan Technical Data Sheet
        sheet_violations = run_axe_scan(page, "Technical Data Sheet Standalone")
        if sheet_violations:
            errors.append(f"Data Sheet axe violations: {len(sheet_violations)}")

        # Screenshot of Technical Data Sheet
        sheet_screenshot_path = os.path.join(ARTIFACT_DIR, "round5-datasheet-desktop-1440x900.png")
        page.screenshot(path=sheet_screenshot_path, full_page=False)
        print(f"Saved: {sheet_screenshot_path}")

        # ---------------------------------------------------------
        # 7. Category Route (/formulary/anti-infectives)
        # ---------------------------------------------------------
        print("\n--- Testing 7: Category Pre-filtered Route ---")
        page.goto(f"{BASE_URL}/formulary/anti-infectives", wait_until="networkidle")
        time.sleep(0.8)

        cat_h1 = page.locator("h1").inner_text()
        print(f"Category H1: '{cat_h1}'")
        assert "Anti-infectives" in cat_h1, "Category H1 mismatch"

        cat_tiles = page.locator("[data-testid='molecule-tile']")
        print(f"Anti-infectives tile count: {cat_tiles.count()}")
        assert 0 < cat_tiles.count() < tile_count, f"Category page is not pre-filtered (found {cat_tiles.count()} of {tile_count})"

        # Axe scan Category Route
        cat_violations = run_axe_scan(page, "Category Route")
        if cat_violations:
            errors.append(f"Category route axe violations: {len(cat_violations)}")

        # Screenshot of Category Route
        cat_screenshot_path = os.path.join(ARTIFACT_DIR, "round5-category-desktop-1440x900.png")
        page.screenshot(path=cat_screenshot_path, full_page=False)
        print(f"Saved: {cat_screenshot_path}")

        # ---------------------------------------------------------
        # 8. Mobile Breakpoint Verification (390x844)
        # ---------------------------------------------------------
        print("\n--- Testing 8: Mobile Breakpoint (390x844) ---")
        page.set_viewport_size({"width": 390, "height": 844})
        page.goto(f"{BASE_URL}/formulary", wait_until="networkidle")
        time.sleep(0.8)

        mobile_grid_path = os.path.join(ARTIFACT_DIR, "round5-formulary-mobile-390x844.png")
        page.screenshot(path=mobile_grid_path, full_page=False)
        print(f"Saved: {mobile_grid_path}")

        # Mobile Data Sheet
        page.goto(f"{BASE_URL}/formulary/item/sg-001", wait_until="networkidle")
        time.sleep(0.8)
        mobile_sheet_path = os.path.join(ARTIFACT_DIR, "round5-datasheet-mobile-390x844.png")
        page.screenshot(path=mobile_sheet_path, full_page=False)
        print(f"Saved: {mobile_sheet_path}")

        # Check for any console or page errors
        if console_errors:
            print(f"❌ Console errors encountered ({len(console_errors)}):")
            for err in console_errors:
                print(f"  - {err}")
            errors.extend(console_errors)
        else:
            print("✅ Zero console errors or unhandled exceptions.")

        browser.close()

    print("\n" + "=" * 60)
    if errors:
        print(f"❌ Round 5 Verification FAILED with {len(errors)} error(s):")
        for e in errors:
            print(f"  - {e}")
        sys.exit(1)
    else:
        print("✅ ALL ROUND 5 VERIFICATIONS PASSED WITH ZERO ERRORS!")
        print("=" * 60)
        sys.exit(0)

if __name__ == "__main__":
    main()
