const svgContainer = document.getElementById("svg-container");

const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

svg.setAttribute("width", innerWidth);
svg.setAttribute("height", innerHeight);
svgContainer.appendChild(svg);

const maskRectCircle = (id, circleMaskColor, rectMaskColor) => {
  const mask = document.createElementNS("http://www.w3.org/2000/svg", "mask");
  mask.setAttribute("id", id);
  svg.appendChild(mask);

  const maskReact = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "rect"
  );
  maskReact.setAttribute("width", innerWidth);
  maskReact.setAttribute("height", innerHeight);
  maskReact.setAttribute("fill", rectMaskColor);
  mask.appendChild(maskReact);

  const circle = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );
  circle.setAttribute("cx", innerWidth / 2);
  circle.setAttribute("cy", innerHeight / 2);
  circle.setAttribute("r", 200);
  circle.setAttribute("fill", circleMaskColor);
  mask.appendChild(circle);
};

maskRectCircle("circle-mask", "black", "white");
maskRectCircle("circle-mask-2", "white", "black");

// creating a rectangle
const n = 130;
for (let i = 0; i < n; i++) {
  const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  rect.setAttribute("x", i * 10);
  rect.setAttribute("width", 5);
  rect.setAttribute("height", innerHeight);
  rect.setAttribute("mask", "url(#circle-mask-2)");
  svg.appendChild(rect);
}
for (let i = 0; i < n; i++) {
  const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  rect.setAttribute("y", i * 10);
  rect.setAttribute("width", innerWidth);
  rect.setAttribute("height", 5);
  rect.setAttribute("mask", "url(#circle-mask)");
  svg.appendChild(rect);
}
