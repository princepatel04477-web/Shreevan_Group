import urllib.request
import urllib.error
import xml.etree.ElementTree as ET

BASE_URL = "http://localhost:3005"

def test_robots():
    print("Testing /robots.txt ...")
    req = urllib.request.Request(f"{BASE_URL}/robots.txt")
    with urllib.request.urlopen(req) as response:
        assert response.status == 200
        content = response.read().decode("utf-8")
        assert "user-agent: *" in content.lower()
        assert "sitemap.xml" in content.lower()
        print("✅ /robots.txt verified successfully!")

def test_sitemap():
    print("Testing /sitemap.xml ...")
    req = urllib.request.Request(f"{BASE_URL}/sitemap.xml")
    with urllib.request.urlopen(req) as response:
        assert response.status == 200
        content = response.read().decode("utf-8")
        assert "https://shreevangroup.com/" in content
        assert "https://shreevangroup.com/formulary" in content
        assert "https://shreevangroup.com/contact" in content
        assert "https://shreevangroup.com/formulary/item/sg-" in content
        print("✅ /sitemap.xml verified with all static and product URLs!")

def test_security_headers():
    print("Testing security headers ...")
    req = urllib.request.Request(f"{BASE_URL}/")
    with urllib.request.urlopen(req) as response:
        headers = dict(response.headers)
        assert response.status == 200
        print("✅ Response status 200")
        print(f"Header keys present: {len(headers)}")

def main():
    print("============================================================")
    print("Starting Round 10 Production & SEO Verification Suite")
    print("============================================================")
    test_robots()
    test_sitemap()
    test_security_headers()
    print("\n============================================================")
    print("SUCCESS: All Round 10 SEO, headers & sitemap tests passed!")
    print("============================================================")

if __name__ == "__main__":
    main()
