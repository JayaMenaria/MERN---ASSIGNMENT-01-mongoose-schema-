# Assignment 1 — Conceptual Questions & Answers (Soch Ke Batao)

---

### Q1. Frontend pe already validation laga di hai. Phir schema me dobara kyun?

**Uttar (Answer):**

1. **Security & Bypass Prevention (Suraksha):**
   Frontend validation sirf browser level par hoti hai jise koi bhi user aasani se bypass kar sakta hai. Modern tools jaise Postman, `curl`, browser Developer Tools (Console/Network tab), ya JavaScript disable karke koi bhi direct backend server ko invalid HTTP requests bhej sakta hai. Agar DB/Schema level pe validation nahi hogi, to galat/corrupted data database me save ho jaayega.

2. **Single Source of Truth for Multiple Clients:**
   Aaj kal backend API sirf ek website se nahi balki Mobile Apps (iOS/Android), Third-party integrations, aur background scripts se bhi connect hoti hai. Agar validation sirf ek Web Frontend pe laga di, to baki sabhi apps me galat data entry hone ka risk rehta hai. Schema validation sabhi inputs ke liye ek single security checkpoint ban jaata hai.

3. **Role Difference:**
   - **Frontend Validation:** UX (User Experience) ke liye hota hai taaki user ko page reload/network request se pehle fast warning/feedback mil sake.
   - **Backend Schema Validation:** Data Integrity aur System Reliability ke liye mandatory final defense line hota hai.

---

### Q2. `trim: true` na lagao to `" Rahul "` aur `"Rahul"` ko DB alag maanega ya same?

**Uttar (Answer):**

Agar `trim: true` **nahi** lagayenge, to Database in dono ko **ALAG (Different)** string maanega.

**Reason:**
- Space character (` `) ka specific ASCII code (32) hota hai.
- `" Rahul "` string me leading (aage) aur trailing (peeche) spaces hain, jisse iski character length **7** hai.
- `"Rahul"` ki character length **5** hai.
- String comparison (`" Rahul " === "Rahul"`) `false` evaluate hoga. DB query ya search karte vakt `"Rahul"` dhoondhne par `" Rahul "` match nahi karega.

`trim: true` lagane se Mongoose data ko save hone se pehle aage-peeche ke extra spaces ko automatic remove kar deta hai, jisse data consistent aur clean rehta hai.

---

### Q3. `default: "pending"` aur `required: true` — dono ek saath lagana theek hai kya? Kya hoga agar dono laga do?

**Uttar (Answer):**

Dono ek saath lagane se koi syntax error nahi aata, par ye generally **Redundant (fayde-heen/dohra)** hota hai.

**Kya hoga jab dono laga denge:**
1. **Normal Case (Jab field bheja hi nahi gaya):**
   Jab user query/request me `status` value nahi bhejta (`undefined`), to Mongoose validation se pehle hi default value `"pending"` apply kar deta hai. Jab validation run hota hai, to `status` ki value `"pending"` hone ke kaaran `required: true` automatically pass ho jaata hai.

2. **Explicit Null Case (Jab `null` ya empty string bheja jaye):**
   Agar user explicitly `{ status: null }` bhejta hai, to default value bypass ho jaati hai aur `required: true` validation trigger hoke error throw karta hai ("Path `status` is required").

**Conclusion:**
Jab kisi field ko static fallback/default value di jaati hai (jaise status: `"pending"`), to wahan `required: true` lagana zaroori nahi hota, kyunki missing value hone pe Mongoose issue aane se pehle hi fallback value inject kar deta hai.
