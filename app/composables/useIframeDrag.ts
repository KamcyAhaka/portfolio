// composables/useIframeDrag.ts
export function useIframeDrag(
  onSwipeLeft: () => void,
  onSwipeRight: () => void,
  options = { angleThreshold: 30, minDistance: 30 },
) {
  const overlayActive = ref(true); // controls pointer-events on the overlay
  let dragStartX = 0;
  let dragStartY = 0;
  let isDragging = false;
  let axisLocked = false;
  let lockedAxis: "horizontal" | "vertical" | null = null;

  function getAngle(dx: number, dy: number): number {
    return Math.abs(Math.atan2(dy, dx) * (180 / Math.PI));
  }

  function isHorizontal(angle: number): boolean {
    return angle < options.angleThreshold || angle > 180 - options.angleThreshold;
  }

  function onPointerDown(e: PointerEvent) {
    // Don't reset overlayActive here — it's managed by pointerup timeout
    dragStartX = e.clientX;
    dragStartY = e.clientY;
    isDragging = true;
    axisLocked = false;
    lockedAxis = null;
    console.log(`[useIframeDrag] pointerdown at (${e.clientX}, ${e.clientY})`);
  }

  function onPointerMove(e: PointerEvent) {
    if (!isDragging) return;

    const dx = e.clientX - dragStartX;
    const dy = e.clientY - dragStartY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (!axisLocked && distance < 8) return;

    if (!axisLocked) {
      const angle = getAngle(dx, dy);
      lockedAxis = isHorizontal(angle) ? "horizontal" : "vertical";
      axisLocked = true;
      console.log(`[useIframeDrag] axis locked → ${lockedAxis} (angle=${angle.toFixed(1)}°)`);

      if (lockedAxis === "horizontal") {
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      } else {
        // Disable overlay so iframe receives all subsequent events
        overlayActive.value = false;
        console.log("[useIframeDrag] vertical — overlay disabled, iframe now receiving events");
        isDragging = false;
        return;
      }
    }

    if (lockedAxis === "horizontal") {
      e.preventDefault();
      console.log(`[useIframeDrag] horizontal move dx=${dx.toFixed(1)}`);
    }
  }

  function onPointerUp(e: PointerEvent) {
    if (!isDragging) return;
    isDragging = false;

    const dx = e.clientX - dragStartX;
    const dy = e.clientY - dragStartY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    console.log(`[useIframeDrag] pointerup — axis=${lockedAxis}, dx=${dx.toFixed(1)}, distance=${distance.toFixed(1)}`);

    if (lockedAxis === "horizontal" && distance > options.minDistance) {
      if (dx < 0) {
        console.log("[useIframeDrag] → emitting swipe-left");
        onSwipeLeft();
      } else {
        console.log("[useIframeDrag] → emitting swipe-right");
        onSwipeRight();
      }
    }

    axisLocked = false;
    lockedAxis = null;

    // Re-enable overlay after gesture fully ends
    setTimeout(() => {
      overlayActive.value = true;
      console.log("[useIframeDrag] overlay re-enabled");
    }, 100);
  }

  function onPointerCancel() {
    console.log("[useIframeDrag] pointercancel — resetting");
    isDragging = false;
    axisLocked = false;
    lockedAxis = null;
    setTimeout(() => {
      overlayActive.value = true;
    }, 100);
  }

  return { overlayActive, onPointerDown, onPointerMove, onPointerUp, onPointerCancel };
}
