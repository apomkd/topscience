#!/usr/bin/env python3
import json
import os
import sys
import time
import requests
from pathlib import Path

def load_env_file(path: str):
    p = Path(path)
    if not p.exists():
        return
    for line in p.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        k, v = line.split("=", 1)
        os.environ.setdefault(k.strip(), v.strip())

def generate_image(prompt: str):
    enabled = os.getenv("BFL_ENABLED", "0")
    if enabled != "1":
        return {"ok": False, "reason": "BFL disabled", "image_url": None}

    api_key = os.getenv("BFL_API_KEY", "")
    if not api_key:
        return {"ok": False, "reason": "BFL_API_KEY missing", "image_url": None}

    width = int(os.getenv("BFL_WIDTH", "1536"))
    height = int(os.getenv("BFL_HEIGHT", "864"))

    trigger_url = "https://api.bfl.ai/v1/flux-2-klein-9b"
    result_url = "https://api.bfl.ai/v1/get_result"
    headers = {"Content-Type": "application/json", "X-Key": api_key}
    payload = {"prompt": prompt, "width": width, "height": height}

    r = requests.post(trigger_url, headers=headers, json=payload, timeout=30)
    if r.status_code != 200:
        return {"ok": False, "reason": f"trigger_failed_{r.status_code}", "detail": r.text[:500], "image_url": None}

    request_id = r.json().get("id")
    if not request_id:
        return {"ok": False, "reason": "missing_request_id", "image_url": None}

    for _ in range(90):
        pr = requests.get(result_url, headers=headers, params={"id": request_id}, timeout=15)
        if pr.status_code != 200:
            time.sleep(2)
            continue
        data = pr.json()
        status = data.get("status")
        if status == "Ready":
            image_url = data.get("result", {}).get("sample")
            if image_url:
                return {"ok": True, "image_url": image_url, "request_id": request_id}
            return {"ok": False, "reason": "ready_but_no_image_url", "image_url": None}
        if status == "Failed":
            return {"ok": False, "reason": "generation_failed", "image_url": None}
        time.sleep(2)

    return {"ok": False, "reason": "timeout_waiting_result", "image_url": None}

def main():
    if len(sys.argv) < 2:
        print("Usage: bfl_generate_image.py \"<prompt>\"")
        sys.exit(1)
    load_env_file("/opt/topscience/.env.ai-draft")
    prompt = sys.argv[1]
    print(json.dumps(generate_image(prompt), ensure_ascii=False))

if __name__ == "__main__":
    main()
