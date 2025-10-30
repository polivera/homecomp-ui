import { ref, onMounted, onUnmounted, computed } from "vue";

export function useDevice() {
  const isMobile = ref(false);

  const checkDevice = () => {
    console.log(window.innerWidth);
    console.log("check size");
    isMobile.value = window.innerWidth <= 768;
  };

  onMounted(() => {
    checkDevice();
    window.addEventListener("resize", checkDevice);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", checkDevice);
  });

  checkDevice();

  return {
    isMobile: computed(() => isMobile.value),
    isDesktop: computed(() => !isMobile.value),
  };
}
