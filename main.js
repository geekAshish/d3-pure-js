import { line, range, select } from "d3";

const svg = select("div")
  .append("svg")
  .attr("width", innerWidth)
  .attr("height", innerHeight);

let t = 0;
setInterval(() => {
  // Topic : D3 data join
  // timestamp : 6:20:00
  // const n = 10 + Math.sin(t) * 5; // dynamic create data number
  const data = range(20).map((d) => ({
    x: d * 50 + 50,
    y: 250 + Math.sin(d * 0.5 + t) * 100,
    r: 20 + Math.sin(d * 0.5 + t * 2) * 5,
  }));

  const lineGenerator = line()
    .x((d) => d.x)
    .y((d) => d.y);

  // const circles = svg.selectAll("circle").data(data);
  // const circlesEnter = circles.enter().append("circle").attr("r", 20); // enter data
  // circles
  //   .merge(circlesEnter)
  //   .attr("cx", (d) => d.x)
  //   .attr("cy", (d) => d.y); // updating element in dom
  // circles.exit().remove(); // exit, removing element from dom

  // or we can do

  const circles = svg
    .selectAll("circle")
    .data(data)
    .join("circle") // it's gives you merged enter, update, exit selection
    .attr("r", (d) => d.r)
    .attr("cx", (d) => d.x)
    .attr("cy", (d) => d.y);

  svg
    .selectAll("path")
    .data([null])
    .join("path")
    .attr("d", lineGenerator(data))
    .attr("fill", "none")
    .attr("stroke", "black");

  // slow down animation
  t = t + 0.01;
}, 1000 / 60); // 60 fps

/*
NOTE:

enter
update
exit

*/
