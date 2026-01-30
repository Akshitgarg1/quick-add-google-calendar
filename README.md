# Quick Add to Google Calendar 🚀

A smart Chrome extension that lets you **create Google Calendar events instantly from selected text on any webpage**.

Designed for **competitive programmers, students, and job seekers** who don’t want to miss contests, interviews, exams, or deadlines.

---

## ✨ Features

- 🔍 **Auto-detects date & time** from selected text
- 🧠 Supports multiple real-world formats (Codeforces, emails, notices)
- ⏰ Handles **12-hour & 24-hour time**
- 📅 Supports **today / tomorrow**
- 🔔 Automatically adds reminders (1 day & 1 hour)
- 🧾 Event type tagging: Contest / Interview / Exam / Meeting
- 👀 Live preview before adding to Calendar
- 🔐 **No Google API, no OAuth, no data tracking**

---

## 📌 Supported Date & Time Formats

### Date formats

- 2 Feb 2026
- 02 Feb 2026
- 01 Feb 26
- Feb/07/2026
- Feb-07-2026
- Feb 07 2026
- today
- tomorrow

---

### Time formats

- 8:05 PM
- 08:05 AM
- 20:05
- 20:05 UTC
- 20:05UTC+5.5
- 11:00 AM IST
  
> If end time is not detected, a default duration of **2 hours** is used.

---

## 🧠 How It Works

1. Highlight event text on any webpage  
2. Open the extension  
3. Preview auto-parsed date & time  
4. Click **Add to Google Calendar**  

That’s it — zero manual typing ✨

---

## 🧩 Tech Stack

- **JavaScript (ES6)**
- **HTML + CSS**
- **Chrome Extensions API (Manifest V3)**
- Google Calendar URL integration (no OAuth)

---

## 🔐 Privacy & Security

- ❌ No Google Calendar API access
- ❌ No login required
- ❌ No background tracking
- ✅ Uses only Google Calendar’s official event URL

Your data never leaves your browser.

---

## 📂 Project Structure

```bash
quick-add-google-calendar/
├── manifest.json
├── popup.html
├── popup.js
├── content.js
└── README.md
```

---

## 🚀 Installation (Local)

1. Clone this repository
2. Open Chrome and go to:
```text
chrome://extensions
```
3. Enable **Developer mode**
4. Click **Load unpacked**
5. Select the project folder

---

## 🏆 Use Cases

- Competitive programming contests (Codeforces, CodeChef, LeetCode)
- Placement drives & interviews
- College exams & deadlines
- Online assessments
- Meetings & reminders

---

## 📌 Future Improvements

- Detect separate **End time**
- Pretty date/time preview (`1 Feb • 11:00–11:59 AM`)
- Dark mode
- Keyboard shortcuts customization

---

## 📄 License

This project is open-source and free to use for learning and personal productivity.

---

### ⭐ If this helped you, consider starring the repo!
