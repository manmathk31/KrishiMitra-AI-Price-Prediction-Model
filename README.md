<div align="center">

# 🌾 KrishiMitra
## Smart Mandi Price Prediction

### 🧠 AI-Powered Price Forecasting for Indian Farmers

<img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python"/>
<img src="https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white" alt="Flask"/>
<img src="https://img.shields.io/badge/Scikit--Learn-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white" alt="Scikit-Learn"/>
<img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind"/>

---

*Empowering farmers with intelligent market insights through machine learning*

</div>

---

## 📖 About KrishiMitra

**KrishiMitra** is an intelligent web application that revolutionizes agricultural pricing in India. Using advanced **Machine Learning algorithms**, it predicts **mandi crop prices** with high accuracy, helping farmers and traders make informed decisions based on comprehensive market data.

> 💡 **Smart Decision Making** | 📊 **Data-Driven Insights** | ⚡ **Real-Time Predictions**

---

## ✨ Key Features

<table>
<tr>
<td width="50%">

### 🎯 Core Capabilities
- 🌾 **Accurate Price Prediction** for modal prices
- 📍 **Multi-level Filtering** (State → District → Market)
- 🔍 **Smart Search** with auto-suggest dropdowns
- 📅 **Date-based Analysis** with integrated picker

</td>
<td width="50%">

### ⚡ User Experience
- 💨 **Instant Results** with smooth animations
- 💾 **Pre-trained Model** (Random Forest Regressor)
- 🎨 **Modern UI** with Tailwind CSS
- 📱 **Responsive Design** for all devices

</td>
</tr>
</table>

---

## 🚀 Tech Stack

<div align="center">

| Layer | Technologies |
|:------|:-------------|
| **🎨 Frontend** | HTML5 • Tailwind CSS • JavaScript ES6+ |
| **⚙️ Backend** | Flask • Python 3.8+ |
| **🤖 Machine Learning** | Scikit-Learn • Pandas • NumPy |
| **💾 Model Storage** | Joblib (PKL format) |
| **🔧 Tools** | Git • VS Code • Jupyter Notebook |

</div>

---

## 📁 Project Structure

```
KrishiMitra/
│
├── 📂 backend/
│   ├── 🐍 app.py                    # Flask application server
│   ├── 🔧 model_utils.py            # Model loading & utilities
│   ├── 📋 requirements.txt          # Python dependencies
│   └── 📂 saved_models/             # ML artifacts
│       ├── price_model.pkl          # 🎯 Trained RF model
│       ├── crop_encoder.pkl         # 🌾 Crop encoder
│       ├── state_encoder.pkl        # 🗺️ State encoder
│       ├── district_encoder.pkl     # 📍 District encoder
│       ├── market_encoder.pkl       # 🏪 Market encoder
│       ├── variety_encoder.pkl      # 🌱 Variety encoder
│       └── grade_encoder.pkl        # ⭐ Grade encoder
│
├── 📂 frontend_static/
│   ├── 🌐 index.html                # Main user interface
│   └── ⚡ script.js                 # Client-side logic
│
├── 📄 .gitignore                    # Git ignore rules
└── 📖 README.md                     # Documentation
```

---

## 🧠 Machine Learning Model

<div align="center">

### 🎯 Algorithm: Random Forest Regressor

**Target Variable:** Modal Price (₹ per quintal)

</div>

### 📊 Input Features

<table>
<tr>
<td width="33%">

**🌾 Crop Information**
- Crop Type
- Variety
- Grade

</td>
<td width="33%">

**📍 Location Data**
- State
- District
- Market Name

</td>
<td width="33%">

**📅 Temporal & Quantity**
- Day, Month, Year
- Arrival Quantity

</td>
</tr>
</table>

### 🔧 Feature Engineering

| Feature | Type | Encoding | Example |
|---------|------|----------|---------|
| Crop | Categorical | Label Encoder | "Wheat" |
| State | Categorical | Label Encoder | "Maharashtra" |
| District | Categorical | Label Encoder | "Pune" |
| Market | Categorical | Label Encoder | "Pune Market" |
| Variety | Categorical | Label Encoder | "Sharbati" |
| Grade | Categorical | Label Encoder | "FAQ" |
| Arrival Quantity | Numerical | Standard Scaler | 120 quintals |
| Day | Numerical | Direct | 1-31 |
| Month | Numerical | Direct | 1-12 |
| Year | Numerical | Direct | 2025 |

---

## 💾 Model Artifacts

<div align="center">

| 📦 File Name | 📊 Description | 🎯 Purpose |
|:-------------|:---------------|:-----------|
| `price_model.pkl` | Random Forest Model | Price prediction engine |
| `crop_encoder.pkl` | Crop Label Encoder | Encodes crop names |
| `state_encoder.pkl` | State Label Encoder | Encodes state names |
| `district_encoder.pkl` | District Label Encoder | Encodes district names |
| `market_encoder.pkl` | Market Label Encoder | Encodes market names |
| `variety_encoder.pkl` | Variety Label Encoder | Encodes crop varieties |
| `grade_encoder.pkl` | Grade Label Encoder | Encodes quality grades |

</div>

---

## 🔌 API Documentation

### 📡 Base URL
```
http://localhost:5000
```

### 🛣️ Available Endpoints

<table>
<tr>
<td width="25%"><b>Method</b></td>
<td width="25%"><b>Endpoint</b></td>
<td width="50%"><b>Description</b></td>
</tr>
<tr>
<td><code>GET</code></td>
<td><code>/health</code></td>
<td>✅ Check server health status</td>
</tr>
<tr>
<td><code>GET</code></td>
<td><code>/options</code></td>
<td>📋 Fetch all dropdown options</td>
</tr>
<tr>
<td><code>POST</code></td>
<td><code>/predict</code></td>
<td>🎯 Predict modal price</td>
</tr>
</table>

### 📤 Request Example

**Endpoint:** `POST /predict`

**Request Body:**
```json
{
  "crop": "Wheat",
  "state": "Maharashtra",
  "district": "Pune",
  "market": "Pune Market",
  "variety": "Sharbati",
  "grade": "FAQ",
  "arrival": 120,
  "day": 8,
  "month": 11,
  "year": 2025
}
```

**Success Response:**
```json
{
  "success": true,
  "predicted_price": 2450.75,
  "unit": "₹/quintal",
  "timestamp": "2025-11-08T10:30:00Z"
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Invalid input",
  "message": "Crop name not found in database"
}
```

---

## 🌐 Live Demo

<div align="center">

### 🚀 **[Try KrishiMitra Now](https://your-deployment-link.com)**



</div>

---

## 📱 Usage Guide

1. **🌾 Select Crop** → Choose your crop from dropdown
2. **📍 Choose Location** → Select State → District → Market
3. **🌱 Specify Details** → Pick variety and grade
4. **📦 Enter Quantity** → Input expected arrival quantity
5. **📅 Select Date** → Choose prediction date
6. **🚀 Get Prediction** → Click "Predict Price" button
7. **💰 View Result** → See predicted modal price instantly

---

## 👨‍💻 Author

<div align="center">

<img src="https://github.com/yourusername.png" width="100" height="100" style="border-radius: 50%;" alt="Author"/>

### **Manmath Maroti Kornule**

*AI & ML Enthusiast*

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/yourusername)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/yourusername)
[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/yourusername)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:your.email@example.com)

</div>

---

<div align="center">

### 💚 Made with Love for Farmers

**If you find this project helpful, please ⭐ star this repository!**

---

*"Technology bridging the gap between farmers and fair prices"*

</div>
