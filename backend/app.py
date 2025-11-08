# backend/app.py
import os
from flask import Flask, jsonify, request, send_from_directory
from model_utils import model, get_options, encode_input

# Robust static folder path: compute absolute path to frontend_static
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
FRONTEND_STATIC = os.path.normpath(os.path.join(BASE_DIR, "..", "frontend_static"))

app = Flask(__name__, static_folder=FRONTEND_STATIC, static_url_path="/")

@app.get("/health")
def health():
    return jsonify({"status": "ok"})

@app.get("/options")
def options():
    return jsonify(get_options())

@app.post("/predict")
def predict():
    data = request.get_json(force=True)
    required = ["crop","state","district","market","variety","grade","arrival","day","month","year"]
    missing = [r for r in required if r not in data]
    if missing:
        return jsonify({"error": f"Missing fields: {missing}"}), 400
    try:
        X = encode_input(data)
        pred = model.predict(X)[0]
        return jsonify({"predicted_price": float(pred)})
    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": "Model error: " + str(e)}), 500

@app.get("/")
def index():
    return app.send_static_file("index.html")

@app.get("/<path:filename>")
def static_files(filename):
    return send_from_directory(app.static_folder, filename)

if __name__ == "__main__":
    # Local dev fallback
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)
