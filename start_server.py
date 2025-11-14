#!/usr/bin/env python3
"""
통계학 학습 가이드 - 로컬 웹서버 실행 스크립트
"""

import http.server
import socketserver
import webbrowser
import os
import sys
from pathlib import Path

PORT = 8000

def main():
    # 현재 디렉토리를 프로젝트 루트로 변경
    script_dir = Path(__file__).parent
    os.chdir(script_dir)

    # 핸들러 설정
    Handler = http.server.SimpleHTTPRequestHandler

    print("=" * 60)
    print("📊 통계학 완벽 학습 가이드")
    print("=" * 60)
    print(f"\n🚀 로컬 서버 시작 중...")
    print(f"📍 포트: {PORT}")
    print(f"🌐 URL: http://localhost:{PORT}")
    print(f"📁 디렉토리: {script_dir}")
    print("\n" + "=" * 60)
    print("💡 사용 방법:")
    print("   1. 브라우저가 자동으로 열립니다")
    print("   2. 또는 http://localhost:8000 로 접속하세요")
    print("   3. 종료하려면 Ctrl+C 를 누르세요")
    print("=" * 60 + "\n")

    try:
        with socketserver.TCPServer(("", PORT), Handler) as httpd:
            # 브라우저 자동 열기
            url = f"http://localhost:{PORT}/index.html"
            print(f"🌐 브라우저 열기: {url}\n")
            webbrowser.open(url)

            print("✅ 서버가 실행 중입니다...")
            print("⏸️  종료하려면 Ctrl+C 를 누르세요\n")

            # 서버 실행
            httpd.serve_forever()

    except KeyboardInterrupt:
        print("\n\n" + "=" * 60)
        print("🛑 서버를 종료합니다...")
        print("👋 통계 학습 화이팅!")
        print("=" * 60)
        sys.exit(0)
    except OSError as e:
        if e.errno == 48 or e.errno == 98:  # Address already in use
            print(f"\n❌ 오류: 포트 {PORT}가 이미 사용 중입니다.")
            print(f"💡 해결 방법:")
            print(f"   1. 다른 프로그램을 종료하거나")
            print(f"   2. 다른 포트를 사용하세요")
            print(f"   3. 또는 http://localhost:{PORT} 로 바로 접속하세요")
        else:
            print(f"\n❌ 오류 발생: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
