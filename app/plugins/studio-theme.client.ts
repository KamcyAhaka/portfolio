// plugins/studio-theme.client.ts
export default defineNuxtPlugin(() => {
  if (import.meta.dev) {
    const observer = new MutationObserver(() => {
      const studio = document.querySelector("nuxt-studio");
      if (studio?.shadowRoot) {
        const lightEl = studio.shadowRoot.querySelector(".light");
        lightEl?.classList.replace("light", "dark");
        observer.disconnect();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }
});
