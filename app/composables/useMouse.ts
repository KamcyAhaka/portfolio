import { ref, onMounted, onUnmounted } from "vue";

export const useMouse = () => {
  const x = ref(0);
  const y = ref(0);

  const updateMousePosition = (e: MouseEvent) => {
    x.value = e.clientX;
    y.value = e.clientY;
    document.body.style.setProperty("--mouse-x", `${e.clientX}px`);
    document.body.style.setProperty("--mouse-y", `${e.clientY}px`);
  };

  onMounted(() => {
    window.addEventListener("mousemove", updateMousePosition);
  });

  onUnmounted(() => {
    window.removeEventListener("mousemove", updateMousePosition);
  });

  return { x, y };
};
