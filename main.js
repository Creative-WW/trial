const config = window.projectConfig;

// Update meta + page content
document.title = config.title + " AR";
document.getElementById('page-title').textContent = config.title + " AR";
document.getElementById('meta-description').setAttribute("content", config.description);

// Inject title and project number dynamically into header spans
const titleTextSpan = document.querySelector('#project-title .title-text');
const projectNumberSpan = document.querySelector('#project-title .project-number');

if (titleTextSpan) {
  titleTextSpan.textContent = config.title;
}

if (projectNumberSpan && config.projectNumber) {
  projectNumberSpan.textContent = config.projectNumber;
}

// Set footer logo dynamically
const footerLogo = document.getElementById('footer-logo');
if (footerLogo && config.logo) {
  footerLogo.src = config.logo;
}

// AR logic
const arButton = document.getElementById('ar-button');
const fallback = document.getElementById('fallback');
const isiOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
const isAndroid = /Android/i.test(navigator.userAgent);

if (isiOS) {
  arButton.innerHTML = `
    <a rel="ar" href="${config.usdz}" aria-label="View ${config.title} in AR on iOS">
      <img src="${config.image}" alt="View in AR" loading="eager" />
    </a>
  `;
} else if (isAndroid) {
  const intentUrl = `intent://arvr.google.com/scene-viewer/1.0?file=${encodeURIComponent(config.glb)}&mode=ar_preferred#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;end;`;
  arButton.innerHTML = `
    <a href="${intentUrl}" aria-label="View ${config.title} in AR on Android">
      <img src="${config.image}" alt="View in AR" loading="eager" />
    </a>
  `;
} else {
  fallback.textContent = 'AR is only supported on iOS and Android devices.';
  arButton.innerHTML = `<button class="disabled-btn" disabled>AR Not Available</button>`;
}
