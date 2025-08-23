import time

def merge_logs():
    with open("UnifiedLog.md", "a", encoding="utf-8") as f:
        f.write(f"[UnifiedLog - {time.strftime('%Y-%m-%d-%H:%M')}]\n")
        try:
            azuro_count = sum(1 for _ in open("sessions/azuro_log.txt", encoding="utf-8"))
            f.write(f"- azuro_log.txt: {azuro_count} إشارة (14/08/2025 - 20/08/2025)\n")
        except:
            f.write("- azuro_log.txt: غير موجود أو غير قابل للقراءة\n")
        f.write("- protocol_log.md: متزامن من 14/08/2025\n")
        f.write("- analysis_log.txt: يحلل من 16/08/2025\n")
        try:
            last_line = open("WorkManifestLog.md", encoding="utf-8").readlines()[-1].strip()
            f.write(f"- WorkManifestLog.md: {last_line}\n")
        except:
            f.write("- WorkManifestLog.md: غير موجود\n")
        f.write("\n")

merge_logs()
