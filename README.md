# 🌾 KrishiMitra — Smart Mandi Price Prediction

### 🧠 AI-powered Price Forecasting for Indian Farmers

KrishiMitra is an intelligent web application that predicts *mandi crop prices* using a trained *Machine Learning model*.  
It helps farmers and traders estimate market prices based on *crop, state, district, market, variety, grade, arrival quantity, and date*.

---

## 🚀 Tech Stack

*Frontend:* HTML • Tailwind CSS • JavaScript  
*Backend:* Flask (Python)  
*ML Model:* Scikit-Learn • Pandas • NumPy  
*Storage:* Joblib (.pkl model + encoders)

---

## 📁 Project Structure
bash
KrishiMitra/
├── backend/
│   ├── app.py                # Flask backend
│   ├── model_utils.py        # Model + encoders loading
│   └── saved_models/         # ML model and encoders
│
├── frontend_static/
│   ├── index.html            # Main UI
│   ├── script.js             # Dropdowns & prediction logic
│   └── assets/               # Images, icons, etc.
│
├── .gitignore
└── README.md



---

# 🧩 Features

- 🌾 *Predicts modal price* for selected crop  
- 📍 *Filters by:* state, district, market, variety, and grade  
- 🧾 *Auto-suggest dropdowns* with typeahead search  
- 📅 *Integrated date picker* for easy date selection  
- ⚡ *Instant results* with smooth animations  
- 💾 *Pre-trained ML model* using Random Forest Regressor  

---

# 🧠 Model Overview

*Algorithm:* Random Forest Regressor  
*Target:* Modal Price (₹ per quintal)  

### 🧮 Features Used
- Crop  
- State  
- District  
- Market  
- Variety  
- Grade  
- Arrival Quantity  
- Day, Month, Year  

---

# 📦 Model Files

| File | Description |
|------|--------------|
| price_model.pkl | Trained price prediction model |
| crop_encoder.pkl | Crop name encoder |
| state_encoder.pkl | State encoder |
| district_encoder.pkl | District encoder |
| market_encoder.pkl | Market encoder |
| variety_encoder.pkl | Variety encoder |
| grade_encoder.pkl | Grade encoder |

---

# 🧾 API Endpoints

| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | /health | Check server status |
| GET | /options | Fetch dropdown option data |
| POST | /predict | Predict modal price |

### 🧰 Example Request
```json
{
  "crop": "Wheat",
  "state": "Maharashtra",
  "district": "Pune",
  "market": "Pune Market",
  "variety": "Sharbati",
  "grade": "FAQ",
  "arrival": 120,
  "day": 6,
  "month": 11,
  "year": 2025
}
