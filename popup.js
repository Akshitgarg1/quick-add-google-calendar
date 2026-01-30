// ---------------- DOM ----------------
const typeSelect = document.getElementById("eventType");
const previewTitle = document.getElementById("previewTitle");
const previewTime = document.getElementById("previewTime");
const addBtn = document.getElementById("addEvent");

// cached parsed result (single source of truth)
let cachedEvent = null;

// ---------------- PARSER ----------------
function parseEvent(text, eventType) {
  const lower = text.toLowerCase();

  const dateShortYearRegex =
  /(\d{1,2})\s?(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\s?(\d{2})(?!\d)/i;

  const dateSlashRegex =
  /(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[\/\- ](\d{1,2})[\/\- ](\d{4})/i;

  const dateRegex =
    /(\d{1,2})\s?(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\s?(\d{4})/i;

  const time12Regex =
  /(\d{1,2}):(\d{2})\s?(am|pm)(?:\s*(ist|utc).*)?/i;

  const time24Regex =
  /(\d{1,2}):(\d{2})(?:\s*UTC.*)?/i;

  const monthMap = {
  jan:"01", feb:"02", mar:"03", apr:"04",
  may:"05", jun:"06", jul:"07", aug:"08",
  sep:"09", oct:"10", nov:"11", dec:"12"
};

  const dateMatch = text.match(dateRegex);
  const time12Match = text.match(time12Regex);
  const time24Match = text.match(time24Regex);

  // ---------- DATE ----------
  let year, month, day;
const dateSlashMatch = text.match(dateSlashRegex);
const dateShortYearMatch = text.match(dateShortYearRegex);

if (dateSlashMatch) {
  month = monthMap[dateSlashMatch[1].toLowerCase()];
  day = dateSlashMatch[2].padStart(2, "0");
  year = dateSlashMatch[3];
}
else if (dateMatch) {
  day = dateMatch[1].padStart(2, "0");
  year = dateMatch[3];
  month = monthMap[dateMatch[2].toLowerCase()];
}

else if (dateShortYearMatch) {
  day = dateShortYearMatch[1].padStart(2, "0");
  month = monthMap[dateShortYearMatch[2].toLowerCase()];
  year = "20" + dateShortYearMatch[3]; // 26 → 2026
}

  else if (lower.includes("today") || lower.includes("tomorrow")) {
    const now = new Date();
    if (lower.includes("tomorrow")) now.setDate(now.getDate() + 1);

    year = now.getFullYear().toString();
    month = (now.getMonth() + 1).toString().padStart(2, "0");
    day = now.getDate().toString().padStart(2, "0");
  }

  if (!year || !month || !day) return null;

  // ---------- TIME ----------
  let hour = "20", minute = "00";
  let timeDetected = false;

  if (time12Match) {
    let h = parseInt(time12Match[1]);
    minute = time12Match[2];
    const ap = time12Match[3].toUpperCase();

    if (ap === "PM" && h !== 12) h += 12;
    if (ap === "AM" && h === 12) h = 0;

    hour = h.toString().padStart(2, "0");
    timeDetected = true;
  }
  else if (time24Match) {
    hour = time24Match[1].padStart(2, "0");
    minute = time24Match[2];
    timeDetected = true;
  }

  const start = `${year}${month}${day}T${hour}${minute}00`;

  let endHour = (parseInt(hour) + 2) % 24;
  endHour = endHour.toString().padStart(2, "0");
  const end = `${year}${month}${day}T${endHour}${minute}00`;

  return {
    title: `[${eventType}] ${text}`,
    start,
    end,
    timeDetected
  };
}

// ---------------- PREVIEW ----------------
function updatePreview() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { action: "GET_SELECTION" },
      (response) => {
        if (chrome.runtime.lastError) return;

        const rawText = response?.text?.trim() || "New Event";
        const eventType = typeSelect.value;

        previewTitle.textContent = `[${eventType}] ${rawText}`;

        cachedEvent = parseEvent(rawText, eventType);

        if (!cachedEvent) {
          previewTime.textContent = "⚠️ Date not detected";
        }
        else if (!cachedEvent.timeDetected) {
          previewTime.textContent = "⚠️ Time not detected (default 8:00 PM)";
        }
        else {
          previewTime.textContent = "📅 Date & time detected";
        }
      }
    );
  });
}

// ---------------- EVENTS ----------------
typeSelect.addEventListener("change", updatePreview);

addBtn.addEventListener("click", () => {
  if (!cachedEvent) {
    alert("Please include a valid date in the text.");
    return;
  }

  const reminders =
    "&reminders=useDefault=false" +
    "&reminderMinutes=1440" +
    "&reminderMinutes=60";

  const url =
    "https://calendar.google.com/calendar/render?action=TEMPLATE" +
    "&text=" + encodeURIComponent(cachedEvent.title) +
    "&dates=" + cachedEvent.start + "/" + cachedEvent.end +
    "&details=" + encodeURIComponent("Created via Chrome Extension") +
    reminders;

  chrome.tabs.create({ url });
});

// Enter key support
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addBtn.click();
});

// ---------------- INIT ----------------
updatePreview();
