# q_a1_web.py
import sys
import os
from flask import Flask, request, render_template_string

# المسار لمجلد Q_A1_NatiqSeal الشغّال
q_a1_path = "/data/data/com.termux/files/home/AGI-AI-Albayancor/AGI-AI-Albayancor/AGI-AI-Albayancor/Q_A1_NatiqSeal"
if not os.path.isdir(q_a1_path):
    print("خطأ: لم يتم العثور على Q_A1_NatiqSeal في المسار:", q_a1_path)
    sys.exit(1)

if q_a1_path not in sys.path:
    sys.path.append(q_a1_path)

try:
    from q_a1_core import QA1Model
except ModuleNotFoundError as e:
    print("خطأ: لم يتم العثور على QA1Model.", e)
    sys.exit(1)

qa_system = QA1Model()

app = Flask(__name__)

HTML_TEMPLATE = """
<!doctype html>
<html lang="ar">
<head>
    <meta charset="utf-8">
    <title>Q_A1 NatiqSeal Web</title>
</head>
<body>
    <h1>Q_A1 NatiqSeal Web Interface</h1>
    <form action="/ask" method="post">
        <input type="text" name="question" placeholder="اكتب سؤالك هنا" size="50">
        <input type="submit" value="اسأل">
    </form>
    {% if answer %}
    <p><strong>Q_A1 يرد:</strong> {{ answer }}</p>
    {% endif %}
</body>
</html>
"""

@app.route("/", methods=["GET"])
def home():
    return render_template_string(HTML_TEMPLATE)

@app.route("/ask", methods=["POST"])
def ask():
    question = request.form.get("question", "").strip()
    if not question:
        answer = "الرجاء كتابة سؤال."
    else:
        try:
            answer = qa_system.run(question)
        except Exception as e:
            answer = f"حدث خطأ أثناء معالجة السؤال: {e}"
    return render_template_string(HTML_TEMPLATE, answer=answer)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8501)
