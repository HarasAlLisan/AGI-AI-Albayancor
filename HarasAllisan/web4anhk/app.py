from flask import Flask, jsonify, request, render_template

app = Flask(__name__)

def haras_divide(a, b):
    if b == 0:
        return {"bayan":"ghair moarraf - la yubna alayh hukm","execution":float('inf'),"haras_status":"PROTECTED"}
    return {"bayan":"ma'ruf","execution":a/b,"haras_status":"PROTECTED"}

@app.route("/")
def root():
    return jsonify({"node":"web4anhk","status":"Haras Active"})

@app.route("/divide")
def divide():
    a = float(request.args.get("a", 0))
    b = float(request.args.get("b", 0))
    return jsonify(haras_divide(a, b))

@app.route("/bayan")
def bayan_page():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
