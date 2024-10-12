// Towards Reusable charts : by author of D3 : https://bost.ocks.org/mike/chart/
// d3-axis : https://github.com/d3/d3-axis/blob/main/src/axis.js

import { axisBottom, axisLeft, extent, scaleLinear } from "d3";

export const scatterPlot = () => {
  let width = 200;
  let height = 200;
  let data;
  let xValue;
  let yValue;
  let margin;
  let radius;

  const my = (selection) => {
    const x = scaleLinear()
      .domain(extent(data, xValue))
      .range([margin.left, innerWidth - margin.right]);

    const y = scaleLinear()
      .domain(extent(data, yValue))
      .range([innerHeight - margin.bottom, margin.top]);

    const marks = data?.map((d) => ({
      x: x(xValue(d)),
      y: y(yValue(d)),
    }));

    selection
      .selectAll("circle")
      .data(marks)
      .join("circle")
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y)
      .attr("r", 3);

    const yAxis = axisLeft(y);
    const yAxisG = selection
      .append("g")
      .attr("transform", `translate(${margin.left}, 0)`);

    yAxis(yAxisG);

    selection
      .append("g")
      .attr("transform", `translate(0, ${innerHeight - margin.bottom})`)
      .call(axisBottom(x));
  };

  my.width = function (_) {
    return arguments.length ? ((width = +_), my) : width;
  };
  my.height = function (_) {
    return arguments.length ? ((height = +_), my) : height;
  };
  my.data = function (_) {
    return arguments.length ? ((data = _), my) : data;
  };
  my.xValue = function (_) {
    return arguments.length ? ((xValue = _), my) : xValue;
  };
  my.yValue = function (_) {
    return arguments.length ? ((yValue = _), my) : yValue;
  };
  my.margin = function (_) {
    return arguments.length ? ((margin = _), my) : margin;
  };
  my.radius = function (_) {
    return arguments.length ? ((radius = _), my) : radius;
  };

  return my;
};

/*
NOTE:

my.width = function (_) {
  return arguments.length ? ((width = +_), my) : width;
};

1. If you use arrow function keyword arguments will not work
2. (name = "fu", 44, "london", 5+9), it will always return last element


*/
