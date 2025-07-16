const { title, description, assets } = window.projectConfig;

// Update document meta
document.title = `${title} AR`;
document.getElementById("page-title").textContent = `${title} AR`;
document.getElementById("meta-description").setAttribute("content", description);
document.getElementById("project-title").textContent = title;

// Set logo
const footerLogo = document.getElementById("footer-logo");
if (footerLogo && assets.logo) footerLogo.src = assets.logo;

// Utility to create AR button
function createARButton(href, label) {
  return `
    <a href="${href}" rel="ar" aria-label="${label}">
      <img src="${assets.image}" alt="View ${title} in AR" loading="eager" />
    </a>
  `;
}

// Device detection
const ua = navigator.userAgent;
const isIOS = /iPhone|iPad|iPod/i.test(ua);
const isAndroid = /Android/i.test(ua);

// DOM elements
const arButton = document.getElementById("ar-button");
const fallback = document.getElementById("fallback");

// Platform-specific AR launch
if (isIOS) {
  arButton.innerHTML = createARButton(assets.usdz, `View ${title} in AR on iOS`);
} else if (isAndroid) {
  const intentUrl = `intent://arvr.google.com/scene-viewer/1.0?file=${encodeURIComponent(
    assets.glb
  )}&mode=ar_preferred#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;end;`;
  arButton.innerHTML = createARButton(intentUrl, `View ${title} in AR on Android`);
} else {
  fallback.textContent = "AR is only supported on iOS and Android devices.";
  arButton.innerHTML = `<button class="disabled-btn" disabled>AR Not Available</button>`;
}
