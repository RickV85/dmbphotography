// utils.js
export const createHandleResizeMobileRes = (setMobileRes, setImgs, vertImgs, horizImgs) => {
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
