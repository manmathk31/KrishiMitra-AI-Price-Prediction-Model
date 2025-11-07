const API_BASE = ""; // same origin via Flask

const inputs = {
  crop: document.getElementById("search-crop"),
  state: document.getElementById("search-state"),
  market: document.getElementById("search-market"),
  variety: document.getElementById("search-variety"),
  grade: document.getElementById("search-grade"),
  arrival: document.getElementById("input-arrival"),
  date: document.getElementById("input-date"),
};

const lists = {
  crop: document.getElementById("list-crop"),
  state: document.getElementById("list-state"),
  market: document.getElementById("list-market"),
  variety: document.getElementById("list-variety"),
  grade: document.getElementById("list-grade"),
};

const selected = { crop: null, state: null, market: null, variety: null, grade: null };

let OPTIONS_LOADED = false;
let OPTIONS = {};

const KEY_MAP = {
  crop: "crops",
  state: "states",
  market: "markets",
  variety: "varieties",
  grade: "grades",
};

// debounce helper
function debounce(fn, wait = 200) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}

function displaySelected(k) {
  const span = document.getElementById("sel-" + k);
  if (span) span.innerText = selected[k] || "—";
}

function setSelected(k, val) {
  selected[k] = val;
  inputs[k].value = val;
  displaySelected(k);
  lists[k].style.display = "none";
}

function populateList(k, arr) {
  const node = lists[k];
  node.innerHTML = "";
  if (!arr || arr.length === 0) {
    node.style.display = "none";
    return;
  }

  arr.slice(0, 200).forEach(opt => {
    const div = document.createElement("div");
    div.className = "dropdown-row";
    div.textContent = opt;
    // Use mousedown instead of click to ensure it fires before blur
    div.addEventListener("mousedown", e => {
      e.preventDefault(); // prevent losing focus before setting
      setSelected(k, opt);
    });
    node.appendChild(div);
  });

  node.style.display = "block";
}

async function loadOptions() {
  if (OPTIONS_LOADED) return OPTIONS;
  try {
    const res = await fetch(API_BASE + "/options");
    if (!res.ok) throw new Error("Failed to load options");
    OPTIONS = await res.json();
    OPTIONS_LOADED = true;
    return OPTIONS;
  } catch (err) {
    console.error("Error loading options:", err);
    alert("Could not load options from backend.");
    return {};
  }
}

function attachTypeahead(k) {
  const input = inputs[k];
  const list = lists[k];

  input.addEventListener("focus", async () => {
    if (!OPTIONS_LOADED) await loadOptions();
    const key = KEY_MAP[k];
    populateList(k, OPTIONS[key]?.slice(0, 50) || []);
  });

  // ❌ remove old blur — we’ll handle closing globally
  input.addEventListener(
    "input",
    debounce(async e => {
      const q = e.target.value.trim().toLowerCase();
      if (!OPTIONS_LOADED) await loadOptions();
      const key = KEY_MAP[k];
      const opts = OPTIONS[key] || [];
      const filtered = q
        ? opts.filter(o => o.toLowerCase().includes(q))
        : opts.slice(0, 50);
      populateList(k, filtered);
    }, 150)
  );
}

// attach to all
["crop", "state", "market", "variety", "grade"].forEach(attachTypeahead);

// ✅ Global click listener to close dropdowns safely
document.addEventListener("click", e => {
  Object.keys(lists).forEach(k => {
    const input = inputs[k];
    const list = lists[k];
    if (!input.contains(e.target) && !list.contains(e.target)) {
      list.style.display = "none";
    }
  });
});

function showLoading(on = true) {
  const loader = document.getElementById("loading");
  const btn = document.getElementById("btn-predict");
  if (on) {
    loader.classList.remove("hidden");
    btn.disabled = true;
  } else {
    loader.classList.add("hidden");
    btn.disabled = false;
  }
}

function animatePrice(price) {
  const el = document.getElementById("result-price");
  const target = Math.round(price);
  let current = 0;
  const step = Math.max(1, Math.round(target / 40));
  const interval = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(interval);
    }
    el.innerText = "₹" + current.toLocaleString();
  }, 20);
}

// Predict button
document.getElementById("btn-predict").addEventListener("click", async () => {
  const required = ["crop", "state", "market", "variety", "grade"];
  for (const r of required) {
    if (!selected[r]) return alert(`Please select ${r}`);
  }

  const d = inputs.date.value ? new Date(inputs.date.value) : new Date();
  const payload = {
    crop: selected.crop,
    state: selected.state,
    market: selected.market,
    variety: selected.variety,
    grade: selected.grade,
    arrival: parseFloat(inputs.arrival.value) || 0.0,
    day: d.getDate(),
    month: d.getMonth() + 1,
    year: d.getFullYear(),
  };

  try {
    showLoading(true);
    const res = await fetch(API_BASE + "/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const body = await res.json();
    showLoading(false);

    if (!res.ok) throw new Error(body.error || "Prediction failed");
    animatePrice(body.predicted_price);
    document.getElementById("result-note").innerText = `Predicted on ${new Date().toLocaleString()}`;
  } catch (err) {
    showLoading(false);
    alert("Prediction error: " + err.message);
  }
});

// Reset
document.getElementById("btn-reset").addEventListener("click", () => {
  ["crop", "state", "market", "variety", "grade"].forEach(k => {
    selected[k] = null;
    inputs[k].value = "";
    displaySelected(k);
    lists[k].style.display = "none";
  });
  inputs.arrival.value = "";
  inputs.date.value = "";
  document.getElementById("result-price").innerText = "—";
  document.getElementById("result-note").innerText = "Estimated price based on model";
});

// Load on page start
loadOptions();
