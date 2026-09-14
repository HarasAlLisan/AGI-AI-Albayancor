# agent_daemon.py (نسخة معدلة للتشغيل المستمر)
if __name__ == "__main__":
    node = NodeIdentity("CAIRO-ROOT-01", "Cairo, Egypt")
    agent = SyncAgent(node, ROOT_NODES)
    agent.start()  # سيبدأ الوكيل ويعمل في الخلفية

    # إبقاء البرنامج شغالاً حتى يقوم المستخدم بإيقافه (Ctrl+C)
    try:
        while True:
            time.sleep(60)  # نوم خفيف لتوفير الطاقة
    except KeyboardInterrupt:
        print("\n[!] إيقاف وكيل المزامنة...")
        agent.stop()
