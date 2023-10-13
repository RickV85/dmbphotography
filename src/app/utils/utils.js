// Could be updated to have multiple breakpoints and
// make mobileRes a quality value. Maybe for tablets?
export const createHandleResizeMobileRes = (
  setMobileRes,
  setImgs,
  vertImgs,
  horizImgs
) => {
  if (!window) return;
  const width = window.innerWidth;
  const height = window.innerHeight;
  const isMobile = width <= 550 && height < width;

  setMobileRes(isMobile);

  if (width > height) {
    setImgs(horizImgs);
  } else {
    setImgs(vertImgs);
  }
};

// Resets loading state when images swap from horiz
// to vertical or vice versa. Images are reloaded
// at times when window is resized to match sizing.
export const resetSwiperAndLoadingState = (
  setInitialImgsLoaded,
  setLoadedImgKeys,
  swiperRef
) => {
  setInitialImgsLoaded(false);
  setLoadedImgKeys([]);
  if (swiperRef.current) {
    swiperRef.current.slideTo(0);
    swiperRef.current.autoplay.stop();
  }
};

// Starts swiper autoplay once the initial images are loaded
// Can delete the last console log after build
export const startSwiperAfterImageLoad = (
  loadedImgKeys,
  initialImgsLoaded,
  setInitialImgsLoaded,
  swiperRef
) => {
  if ([0, 1].every((key) => loadedImgKeys.includes(key)) && swiperRef.current) {
    if (!initialImgsLoaded) {
      setInitialImgsLoaded(true);
      swiperRef.current.autoplay.start();
      console.log("initial images loaded");
    }
  }
  console.log(loadedImgKeys);
};

// Sets CSS variables for using inner H and W of viewport
// Used to help keep page sized to only viewable area
// not including the navigation bars on mobile
export const createUpdateViewport = () => {
  if (!window) return;
  const vw = window.innerWidth * 0.01;
  const vh = window.innerHeight * 0.01;

  document.documentElement.style.setProperty("--vw", `${vw}px`);
  document.documentElement.style.setProperty("--vh", `${vh}px`);
};
