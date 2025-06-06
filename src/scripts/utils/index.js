export function showFormattedDate(date, locale = "en-US", options = {}) {
  return new Date(date).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...options,
  });
}

export function showImageAlt(description) {
  const maxLength = 50;
  const trimedDescription =
    description.length > maxLength
      ? description.substring(0, maxLength)
      : description;

  return trimedDescription;
}

export function sleep(time = 1000) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export function convertBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; i++) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export function setupSkipToContent(element, mainContent) {
  element.addEventListener("click", () => mainContent.focus());
}

export function transitionHelper({ updateDOM, params = {} }) {
  if (!document.startViewTransition) {
    const promise = updateDOM(params);
    return {
      ready: Promise.resolve(),
      updateCallbackDone: promise.then(() => undefined),
      finished: promise,
    };
  }

  const transition = document.startViewTransition(() => {
    return updateDOM(params);
  });

  return {
    ready: transition.ready,
    updateCallbackDone: transition.updateCallbackDone,
    finished: transition.finished,
  };
}

/**
 * Ref: https://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
 */
export function convertBase64ToBlob(
  base64Data,
  contentType = "",
  sliceSize = 512,
) {
  const byteCharacters = atob(base64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: contentType });
}

export function isServiceWorkerAvailable() {
  return "serviceWorker" in navigator;
}

export async function registerServiceWorker() {
  if (!isServiceWorkerAvailable()) {
    console.log("Service Worker API unsupported");
    return;
  }

  try {
    const registration = await navigator.serviceWorker.register(
      `${import.meta.env.BASE_URL}sw.js`,
    );
    console.log("Service worker telah terpasang", registration);
  } catch (error) {
    console.error("Failed to install service worker:", error);
  }
}
