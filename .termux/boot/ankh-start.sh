#!/data/data/com.termux/files/usr/bin/sh
termux-wake-lock
cd $HOME/AGI-AI-Albayancor/web4anhk
/data/data/com.termux/files/usr/bin/pm2 resurrect
# لو resurrect مش قام - شغله مباشر
/data/data/com.termux/files/usr/bin/pm2 start "npm run dev -- --port 4000 --host 0.0.0.0" --name ankh-4000 2>/dev/null
