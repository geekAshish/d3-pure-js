// Towards Reusable charts : by author of D3 : https://bost.ocks.org/mike/chart/
// d3-axis : https://github.com/d3/d3-axis/blob/main/src/axis.js

import { axisBottom, axisLeft, extent, scaleLinear, transition } from "d3";

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

    // https://d3js.org/d3-transition
    // Example : https://observablehq.com/@d3/selection-join
    // First we have to create a transition object
    // 14:25:00
    const t = transition().duration(2000)
    const transitionCircle = circles => {
      circles.attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y)
    }
    const growRadius = circles => {
      circles
      .attr("r", 0) // we want radius to grow from 0 -> 3
      .call(enter => enter
        .transition(t)
        .attr("r", 3)
      ) // we have to use transition inside call because it's returs interselection, which is expected by join
    }

    selection
      .selectAll("circle")
      .data(marks)
      // .join("circle") // instead of that
      .join(
        enter => enter
          .append('circle')
          .call(transitionCircle)
          .call(growRadius),

        update => update
          .call(update => update
            .transition(t)
            .delay((d, i) => i * 10)
            .call(transitionCircle)
          ),

        exit => exit.remove()
      );

    const yAxis = axisLeft(y);
    const yAxisG = selection
      .selectAll('g.y-axis') // we're using class so that our y axis number don't get overlaped
      .data([null]) // null is just to create on element
      .join('g') // here what join does, it's checks for the g-tag with class y-axis, if it's there, it's not gonna create new g tag each time, it'll use the old g-tag with new value in it
      .attr('class', 'y-axis') // adding class y-axis
      .attr("transform", `translate(${margin.left}, 0)`)
      .transition(t);

    yAxis(yAxisG);

    selection
      .selectAll('g.x-axis')
      .data([null])
      .join('g')
      .attr('class', 'x-axis')
      .attr("transform", `translate(0, ${innerHeight - margin.bottom})`)
      .transition(t)
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
