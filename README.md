# Wardle Travel demo site

A static, placeholder-content demo of the Wardle Travel website for stakeholder review. Styling (colours, Inter font, rounded cards) is borrowed from Wardle Compass; layout follows wonderlingtravel.co.uk.

There's no build step: plain HTML, CSS and JavaScript, so it runs as-is on GitHub Pages.

## Pages

The format follows wonderlingtravel.co.uk: booking first, then contact and about.

- `index.html` – home: "Book online today" hero with the booking form front and centre, what's included, welcome, testimonials, visit us
- `about.html` – who we are, team, ready to book
- `contact.html` – branch details, opening hours, map placeholder, enquiry form

The booking form, enquiry form and social links are placeholders that show a "coming soon" message.

## Passcode

Every page is hidden behind a passcode screen (`assets/site.js`). This is only a basic hiding mechanism: GitHub Pages is public and anyone determined can read the page source. Don't put anything confidential on the site.

To change the passcode, hash the new one and replace `PASSCODE_SHA256` in `assets/site.js`:

```sh
echo -n "new-passcode" | sha256sum
```

## Business details

Branch names, addresses and phone numbers live in `BUSINESS` at the top of `assets/site.js`. They are placeholders for now (phone numbers use the Ofcom 01632 960xxx range reserved for fiction); swap in the real details once confirmed.

## Caching

GitHub Pages lets browsers cache CSS and JS for about 10 minutes. After changing `assets/styles.css` or `assets/site.js`, bump the `?v=` number on their links in each HTML file so visitors get the new version straight away.

## Run locally

```sh
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Deploy

Settings → Pages → Build and deployment → Deploy from a branch → pick the branch and `/ (root)`.
