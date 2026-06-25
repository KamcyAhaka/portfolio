/**
 * Shared state for navigating to a specific philosophy pillar from anywhere on the page.
 * The hero section sets `pendingPillar` when a philosophy tag is clicked.
 * The philosophy section watches it, scrolls its pillars container to the right item,
 * activates it, then clears the pending value.
 */
export const usePhilosophyNav = () => {
  const pendingPillar = useState<string | null>("philosophy-nav-pending", () => null);

  const navigateToPillar = (word: string) => {
    pendingPillar.value = word;
  };

  const clearPendingPillar = () => {
    pendingPillar.value = null;
  };

  return { pendingPillar, navigateToPillar, clearPendingPillar };
};
