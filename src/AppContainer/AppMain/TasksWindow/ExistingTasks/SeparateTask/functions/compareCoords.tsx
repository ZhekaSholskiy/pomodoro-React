export function compareCoords(comparisingCoords: DOMRect, movingObj: DOMRect, index: number) {
  const widthObserver = comparisingCoords.left < movingObj.right &&
  comparisingCoords.right > movingObj.left;

  return index === 0 ? comparisingCoords.y >
  movingObj.top && comparisingCoords.y < movingObj.bottom && widthObserver :
  comparisingCoords.bottom >
  movingObj.top && comparisingCoords.top < movingObj.bottom && widthObserver;
}

