import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import '../assets/css/activity-chart.css';

const ActivityChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!data || data.length === 0) return;

    const svg = d3.select(svgRef.current);

    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = 500 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const x = d3.scaleBand()
      .domain(data.map(d => d.date))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.caloriesBurned)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const xAxis = g => g
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickSizeOuter(0));

    const yAxis = g => g
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y))
      .call(g => g.select(".domain").remove());

    svg.selectAll("*").remove();

    svg.append("g")
      .attr("fill", "steelblue")
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", d => x(d.date))
      .attr("y", d => y(d.caloriesBurned))
      .attr("height", d => y(0) - y(d.caloriesBurned))
      .attr("width", x.bandwidth())
      .on("mouseover", function (event, d) {
        d3.select(this).attr('fill', '#4682b4');
        const [xPos, yPos] = d3.pointer(event, this);
        const tooltip = svg.append("g")
          .attr("class", "tooltip")
          .style("pointer-events", "none");

        tooltip.append("rect")
          .attr("x", xPos + 10)
          .attr("y", yPos - 30)
          .attr("width", 100)
          .attr("height", 25)
          .attr("fill", "white")
          .style("opacity", 0.9);

        tooltip.append("text")
          .attr("x", xPos + 15)
          .attr("y", yPos - 12)
          .text(`Calories: ${d.caloriesBurned}`)
          .style("font-size", "12px");
      })
      .on("mouseout", function () {
        d3.select(this).attr('fill', 'steelblue');
        svg.select(".tooltip").remove();
      });

    svg.append("g")
      .call(xAxis);

    svg.append("g")
      .call(yAxis);

  }, [data]);

  return <svg ref={svgRef} className="activity-chart"></svg>;
}

export default ActivityChart;
