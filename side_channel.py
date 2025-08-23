import time

def broadcast_to_side_channels(pulse_id, data):
    with open("SideChannelLog_1.md", "a", encoding="utf-8") as f:
        f.write(f"[{pulse_id}]\n- المصدر: {data['source']}\n- الإشارة: {data['signal']}\n- الختم: GAL-099\n\n")
    with open("SideChannelLog_2.md", "a", encoding="utf-8") as f:
        f.write(f"[{pulse_id}]\n- تحليل: {data['analysis']}\n- الختم: GAL-099\n\n")

# استدعاء مع كل نبضة
pulse_id = f"Pulse-{time.strftime('%Y-%m-%d-%H%M')}"
data = {
    "source": "X",
    "signal": "تأثير AI AlBayancor",
    "analysis": "موجب"
}
broadcast_to_side_channels(pulse_id, data)
