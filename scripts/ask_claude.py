import sys
import subprocess
import os

def main():
    if len(sys.argv) < 2:
        print("Usage: python scripts/ask_claude.py \"<prompt>\" OR python scripts/ask_claude.py --file <path>", flush=True)
        sys.exit(1)
        
    if sys.argv[1] == "--file":
        with open(sys.argv[2], "r", encoding="utf-8") as f:
            prompt = f.read()
    else:
        prompt = sys.argv[1]
        
    print(f"Sending prompt to Claude Code CLI ({len(prompt)} chars)...", flush=True)
    try:
        proc = subprocess.run(
            ["claude.cmd", "-p", prompt],
            shell=True,
            input="",
            capture_output=True,
            text=True,
            timeout=120
        )
        print("=== Claude Code Review Output ===", flush=True)
        print(proc.stdout, flush=True)
        if proc.stderr:
            print("=== Stderr ===", file=sys.stderr, flush=True)
            print(proc.stderr, file=sys.stderr, flush=True)
        sys.exit(proc.returncode)
    except Exception as e:
        print(f"Error executing claude: {e}", file=sys.stderr, flush=True)
        sys.exit(1)

if __name__ == "__main__":
    main()
