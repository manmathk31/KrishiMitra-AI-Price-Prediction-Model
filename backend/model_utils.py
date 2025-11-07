# backend/model_utils.py
import joblib
import os

BASE_DIR = os.path.dirname(__file__)
MODEL_PATH = os.path.join(BASE_DIR, "saved_models", "price_model.pkl")

ENCODERS = {
    "crop": os.path.join(BASE_DIR, "saved_models", "crop_encoder.pkl"),
    "state": os.path.join(BASE_DIR, "saved_models", "state_encoder.pkl"),
    "market": os.path.join(BASE_DIR, "saved_models", "market_encoder.pkl"),
    "variety": os.path.join(BASE_DIR, "saved_models", "variety_encoder.pkl"),
    "grade": os.path.join(BASE_DIR, "saved_models", "grade_encoder.pkl"),
}

# Load model
try:
    model = joblib.load(MODEL_PATH)
except Exception as e:
    raise RuntimeError(f"Failed to load model: {e}")

# Load encoders
encoders = {}
for k, p in ENCODERS.items():
    try:
        encoders[k] = joblib.load(p)
    except Exception as e:
        raise RuntimeError(f"Failed to load encoder {k}: {e}")

def get_options():
    """Return dictionary of lists for dropdowns."""
    return {
        "crops": list(encoders["crop"].classes_),
        "states": list(encoders["state"].classes_),
        "markets": list(encoders["market"].classes_),
        "varieties": list(encoders["variety"].classes_),
        "grades": list(encoders["grade"].classes_),
    }

def encode_input(payload):
    """
    Convert JSON payload into model input row.
    Expected keys: crop,state,market,variety,grade,arrival,day,month,year
    """
    try:
        c = int(encoders["crop"].transform([payload["crop"]])[0])
        s = int(encoders["state"].transform([payload["state"]])[0])
        m = int(encoders["market"].transform([payload["market"]])[0])
        v = int(encoders["variety"].transform([payload["variety"]])[0])
        g = int(encoders["grade"].transform([payload["grade"]])[0])
    except Exception as e:
        raise ValueError(f"Encoding error: {e}")

    arrival = float(payload.get("arrival", 0.0))
    day = int(payload.get("day", 1))
    month = int(payload.get("month", 1))
    year = int(payload.get("year", 2024))

    return [[c, s, m, v, g, arrival, day, month, year]]
