# Wardle Travel demo site (contact-first)

A static, placeholder-content demo of the Wardle Travel website for stakeholder review. This is the simple version of [WardleTravel](https://github.com/Jools33/WardleTravel): there is no online booking. Instead every page points customers to the store by phone, WhatsApp, a ready-written message, or a visit, so there is no booking integration to pay for. Styling (colours, Inter font, rounded cards) is borrowed from Wardle Compass; layout follows wonderlingtravel.co.uk.

There's no build step: plain HTML, CSS and JavaScript, so it runs as-is on GitHub Pages.

## Pages

- `index.html` – home: "Talk to us" hero with four contact options front and centre (call, WhatsApp, message, visit), why use a local agent, how it works, the message template, welcome, testimonials, visit us
- `about.html` – who we are, team, call or message
- `contact.html` – contact options, branch details, opening hours, map placeholder, message template

On phones a bar fixed to the bottom of the screen offers Call, WhatsApp, Message and Directions on every page.

## Message template

The "Send us a message" form doesn't need a server. Customers fill in where, when, who's going and so on, and the page writes a tidy enquiry for them. They can edit it, then press "Send by email" (opens their email app via `mailto:`), "Send on WhatsApp" (opens `wa.me` with the text filled in) or copy it. Nothing is sent until they press send in their own app.

Social links are placeholders that show a "coming soon" message.

## Passcode

Every page is hidden behind a passcode screen (`assets/site.js`). This is only a basic hiding mechanism: GitHub Pages is public and anyone determined can read the page source. Don't put anything confidential on the site.

To change the passcode, hash the new one and replace `PASSCODE_SHA256` in `assets/site.js`:

```sh
echo -n "new-passcode" | sha256sum
```

## Business details

Branch name, address, phone, WhatsApp number and email live in `BUSINESS` at the top of `assets/site.js`. They are placeholders for now (phone numbers use the Ofcom 01632 960xxx range reserved for fiction); swap in the real details once confirmed. WhatsApp uses the same number as the phone so customers only need one; the WhatsApp links won't work until it's a real WhatsApp Business number.

## Caching

GitHub Pages lets browsers cache CSS and JS for about 10 minutes. After changing `assets/styles.css` or `assets/site.js`, bump the `?v=` number on their links in each HTML file so visitors get the new version straight away.

## Run locally

```sh
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Deploy

Settings → Pages → Build and deployment → Deploy from a branch → pick the branch and `/ (root)`.
