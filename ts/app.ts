/**
 * Interface for the history state object
 */
interface ViewState {
  viewId: string;
}

/**
 * Switches between different page views and handles navigation history.
 */
function showView(viewId: string, pushHistory: boolean = true): void {
  // Query all views and cast to NodeListOf<HTMLElement> to access .style
  const views = document.querySelectorAll<HTMLElement>('.page-view');
  views.forEach((view) => (view.style.display = 'none'));

  const targetView = document.getElementById(viewId);
  if (targetView) {
    targetView.style.display = 'block';
  }

  // Handle the Download Button with Animation
  const downloadBtn = document.querySelector<HTMLElement>(".top-nav-download-kura");

  if (downloadBtn) {
    if (viewId === 'privacy-view') {
      downloadBtn.style.display = "block";
      // Small timeout to allow the display change to register before animating
      setTimeout(() => downloadBtn.classList.add("button-visible"), 10);
    } else {
      downloadBtn.classList.remove("button-visible");
      // Wait for the CSS transition (400ms) before hiding display
      setTimeout(() => {
        if (!downloadBtn.classList.contains("button-visible")) {
          downloadBtn.style.display = "none";
        }
      }, 400);
    }
  }

  // Update Browser History
  if (pushHistory) {
    const url = viewId === 'home-view' ? window.location.pathname : `?view=${viewId}`;
    const state: ViewState = { viewId };
    history.pushState(state, "", url);
  }

  window.scrollTo(0, 0);
}

// Handle Browser Back/Forward buttons
window.addEventListener("popstate", (event: PopStateEvent) => {
  const state = event.state as ViewState | null;
  if (state && state.viewId) {
    showView(state.viewId, false);
  } else {
    showView('home-view', false);
  }
});

// Initialize on page load
window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const view = params.get('view');

  if (view && document.getElementById(view)) {
    showView(view, false);
  } else {
    // Set initial state for home if no specific view is requested
    const initialState: ViewState = { viewId: 'home-view' };
    history.replaceState(initialState, "", window.location.pathname);
  }
});
