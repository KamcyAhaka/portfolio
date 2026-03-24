export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("magnetic", {
    mounted(el: HTMLElement) {
      el.style.willChange = "transform";
      el.style.transition = "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)";

      const mouseMoveHandler = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Intensity of the magnetic pull
        const maxDistanceX = rect.width * 0.2;
        const maxDistanceY = rect.height * 0.2;

        const distanceX = ((e.clientX - centerX) / (rect.width / 2)) * maxDistanceX;
        const distanceY = ((e.clientY - centerY) / (rect.height / 2)) * maxDistanceY;

        el.style.transform = `translate3d(${distanceX}px, ${distanceY}px, 0)`;
      };

      const mouseLeaveHandler = () => {
        el.style.transform = `translate3d(0, 0, 0)`;
      };

      el.addEventListener("mousemove", mouseMoveHandler);
      el.addEventListener("mouseleave", mouseLeaveHandler);

      // Store handlers so we can remove them later
      (el as any)._magneticHandlers = { mouseMoveHandler, mouseLeaveHandler };
    },
    unmounted(el: HTMLElement) {
      if ((el as any)._magneticHandlers) {
        const { mouseMoveHandler, mouseLeaveHandler } = (el as any)._magneticHandlers;
        el.removeEventListener("mousemove", mouseMoveHandler);
        el.removeEventListener("mouseleave", mouseLeaveHandler);
      }
    },
  });
});
