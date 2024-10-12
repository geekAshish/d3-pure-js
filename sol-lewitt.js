import { range, select, symbol, symbols } from "d3";

const svg = select("div")
  .append("svg")
  .attr("width", innerWidth)
  .attr("height", innerHeight);

const marksArray = [];

for (let i = 0; i < 130; i++) {
  marksArray.push({
    y: i * 10,
    x: i * 10,
    width: innerWidth,
    height: 5,
  });
}

svg
  .append("g") // alternative of class
  .selectAll("rect")
  .data(marksArray)
  .join("rect")
  .attr("y", (d) => d.y)
  .attr("width", innerWidth)
  .attr("height", 5)
  //.attr("class", "horizontal") // we use class to differentiate code block for rectangles, otherwise it'll create mess, or we can use group
  .attr("mask", "url(#mask)");

svg
  .append("g")
  .selectAll("rect")
  .data(marksArray)
  .join("rect")
  .attr("x", (d) => d.x)
  .attr("width", 5)
  .attr("height", innerHeight)
  //.attr("class", "vertical")
  .attr("mask", "url(#mask-1)");

const createShapeMask = (selection, id, reactColor, maskColor) => {
  const mask = selection.append("mask").attr("id", id);

  mask
    .append("rect")
    .attr("width", innerWidth)
    .attr("height", innerHeight)
    .attr("fill", reactColor);

  // shape you want to create
  // mask
  //   .append("circle")
  //   .attr("cx", innerWidth / 2)
  //   .attr("cy", innerHeight / 2)
  //   .attr("r", 200)
  //   .attr("fill", circleColor);

  // mask
  // .append("g")
  // .attr("transform", `translate(${innerWidth / 2}, ${innerHeight / 2})`)
  // .append("path")
  // .attr("d", symbol(symbols[0], 50000)())
  // .attr("fill", maskColor);

  // multiple shape at a time
  mask
    .selectAll("g")
    .data(range(symbols.length))
    .join((enter) =>
      enter
        .append("g")
        .attr(
          "transform",
          (d) => `translate(${d * 150 + 200}, ${innerHeight / 2})`
        )
        .append("path")
        .attr("d", (d) => symbol(symbols[d], 5000)())
        .attr("fill", maskColor)
    );
};

// createShapeMask(svg, "mask", "black", "white");
// createShapeMask(svg, "mask-1", "white", "black");

// another way to calling function in d3
svg
  .call(createShapeMask, "mask", "black", "white")
  .call(createShapeMask, "mask-1", "white", "black");
