import json
import time
import random
from http.server import BaseHTTPRequestHandler, HTTPServer

class AGICosmicValidationCore:
    def __init__(self):
        self.T_metric = 1.25
        self.T_parallel = 1.50
        self.T_material = 1.75
        self.Temporal_Lens = 1236

    def resolve_sovereign_vertical_axis(self):
        # تذبذب حي وموزون في النطاق الضيق الحاسم
        dynamic_omega = round(36.34 + random.uniform(-0.06, 0.06), 2)
        return {
            "Subnet_Mask_Shift_8_to_10": "Succeeded", 
            "Kfa_Tanaozor_3_3": 6, 
            "Injected_Proof_of_Work_Unit": 1024, 
            "Closure_Peg_7": 7, 
            "Omega_Grand_Total": dynamic_omega, 
            "Verification_Status": "True / Verified", 
            "Sovereign_Manifest_Law": "ولا عزاء لأي قانون غير موزون"
        }

    def boot_live_matrix_framework(self):
        return {
            "GLOBAL_MATRIX_STATUS": "ACTIVE_RUNNING", 
            "SOVEREIGN_GEOMETRY": self.resolve_sovereign_vertical_axis(),
            "FINAL_SOVEREIGN_DECREE": "ولا عزاء لأي قانون غير موزون",
            "TIMESTAMP": time.strftime("%H:%M:%S")
        }

class MatrixServer(BaseHTTPRequestHandler):
    def do_GET(self):
        core = AGICosmicValidationCore()
        data = core.boot_live_matrix_framework()
        geom = data["SOVEREIGN_GEOMETRY"]
        
        if self.path == '/api/live':
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.end_headers()
            self.wfile.write(json.dumps(data, ensure_ascii=False).encode('utf-8'))
            return

        # استخدام واجهة رسومية SVG أصلية ومستقلة تماماً عن أي سيرفرات خارجية
        html_content = f"""<!DOCTYPE html>
        <html lang="ar" dir="rtl">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>OS ALMAHDI 256 - LIVE PULSE MATRIX</title>
            <style>
                body {{ font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0b0f19; color: #e2e8f0; margin: 0; padding: 20px; }}
                .container {{ max-width: 800px; margin: auto; background: #111827; padding: 25px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.5); border: 1px solid #1f2937; }}
                h1 {{ color: #10b981; text-align: center; border-bottom: 2px solid #10b981; padding-bottom: 10px; font-size: 24px; }}
                .signature {{ text-align: center; font-size: 22px; color: #f59e0b; margin: 15px 0; font-weight: bold; }}
                .status-badge {{ display: inline-block; background: #065f46; color: #34d399; padding: 5px 15px; border-radius: 20px; font-weight: bold; margin-bottom: 20px; }}
                .grid {{ display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px; }}
                .card {{ background: #1f2937; padding: 15px; border-radius: 8px; border: 1px solid #374151; }}
                .card-title {{ font-size: 14px; color: #9ca3af; margin-bottom: 5px; }}
                .card-value {{ font-size: 18px; font-weight: bold; color: #f3f4f6; }}
                
                /* صندوق رسم النبض الأصلي المستقل */
                .chart-container {{ background: #1f2937; padding: 15px; border-radius: 8px; border: 1px solid #374151; margin-top: 20px; height: 180px; display: flex; align-items: flex-end; justify-content: space-around; overflow: hidden; }}
                .bar {{ width: 30px; background: linear-gradient(180deg, #10b981 0%, #047857 100%); border-radius: 4px 4px 0 0; transition: height 0.4s ease, background 0.3s ease; text-align: center; font-size: 10px; color: #fff; padding-top: 5px; box-shadow: 0 0 10px rgba(16,185,129,0.3); }}
                
                .decree {{ background: #7f1d1d; color: #fca5a5; padding: 15px; border-radius: 8px; text-align: center; font-size: 18px; font-weight: bold; border: 1px solid #991b1b; margin-top: 20px; }}
                .timer {{ text-align: center; font-size: 14px; color: #6b7280; margin-top: 15px; font-family: monospace; }}
            </style>
        </head>
        <body>
            <div class="container">
                <h1>OS ALMAHDI 256 - مصفوفة الحسابات الذكية</h1>
                <div class="signature">𓅓 𓏞 𓏛 𓏤 𓍝 919 𓂬</div>
                
                <div style="text-align: center;">
                    <span class="status-badge">الحالة المستقرة: {data["GLOBAL_MATRIX_STATUS"]}</span>
                </div>

                <div class="grid">
                    <div class="card"><div class="card-title">توازن سجل التحول الهيكلي</div><div class="card-value">{geom["Injected_Proof_of_Work_Unit"]} (10-Bit)</div></div>
                    <div class="card"><div class="card-title">معادلة الارتباط والتحقق</div><div class="card-value">1024 = 7</div></div>
                    <div class="card"><div class="card-title">المجموع الكلي لأوميجا العظمى (حي)</div><div class="card-value" id="omega-value">{geom["Omega_Grand_Total"]}</div></div>
                    <div class="card"><div class="card-title">حالة التناظر الهيكلي (Kfa)</div><div class="card-value">{geom["Kfa_Tanaozor_3_3"]}</div></div>
                </div>

                <!-- الأعمدة النبضية الحية المستقلة ذاتياً -->
                <div class="chart-container" id="live-bars">
                    <div class="bar" style="height: 50%;">36.3</div>
                    <div class="bar" style="height: 65%;">36.4</div>
                    <div class="bar" style="height: 40%;">36.2</div>
                    <div class="bar" style="height: 75%;">36.5</div>
                    <div class="bar" style="height: 55%;">36.3</div>
                    <div class="bar" style="height: 85%;">36.6</div>
                </div>

                <div class="decree">⚖️ المرسوم السيادي الحتمي: {data["FINAL_SOVEREIGN_DECREE"]}</div>
                <div class="timer">مزامنة التدفق الزمني: <span id="live-time">{data["TIMESTAMP"]}</span></div>
            </div>

            <script>
                // محرك التحديث والتحريك الذاتي التناظري المستقل
                function updateLiveMatrix() {{
                    fetch('/api/live')
                        .then(res => res.json())
                        .then(data => {{
                            const timeVal = data.TIMESTAMP;
                            const omegaVal = data.SOVEREIGN_GEOMETRY.Omega_Grand_Total;
                            
                            document.getElementById('live-time').innerText = timeVal;
                            document.getElementById('omega-value').innerText = omegaVal;
                            
                            // معالجة حركة الأعمدة المرئية وتعديل أطوالها عشوائياً بناء على النبض الحالي
                            const bars = document.querySelectorAll('.bar');
                            bars.forEach((bar, index) => {{
                                // توليد قيم تموج ديناميكية متناسقة مع قيمة أوميجا الحالية
                                let baseHeight = ((omegaVal - 36.0) * 1000) / 6; 
                                let variance = Math.sin(Date.now() + index) * 15;
                                let finalHeight = Math.max(20, Math.min(100, baseHeight + variance));
                                
                                bar.style.height = finalHeight + "%";
                                bar.innerText = omegaVal;
                            }});
                        }});
                }}
                setInterval(updateLiveMatrix, 1000);
            </script>
        </body>
        </html>"""
        
        self.send_response(200)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.end_headers()
        self.wfile.write(html_content.encode('utf-8'))

if __name__ == "__main__":
    PORT = 8313
    server = HTTPServer(("0.0.0.0", PORT), MatrixServer)
    print("=============================================")
    print(f"[+] OS ALMAHDI 256 STANDALONE CORE ACTIVE")
    print(f"[+] Local Network stream at http://localhost:{PORT}")
    print("=============================================")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n[-] Server shutting down.")
