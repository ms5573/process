import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function Timeline({ data, averageDurations, processVariants }) {
  const variantsRef = useRef();
  const svgRef = useRef();

  useEffect(() => {
    console.log('Timeline component received data length:', data.length);
    console.log('Timeline component received averageDurations:', averageDurations);
    console.log('Timeline component received processVariants:', processVariants);

    if (data && averageDurations) {
      const parsedAvgDurations = d3.csvParse(averageDurations);
      console.log('Parsed Average Durations:', parsedAvgDurations);

      const margin = { top: 20, right: 200, bottom: 30, left: 150 },
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

      d3.select(svgRef.current).selectAll("*").remove(); // Clear previous SVG content

      const svg = d3.select(svgRef.current)
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      const y = d3.scaleBand()
        .domain(parsedAvgDurations.map(d => d.event_type))
        .range([0, height])
        .padding(0.1);

      const x = d3.scaleLinear()
        .domain([0, d3.max(parsedAvgDurations, d => parseFloat(d.average_duration))])
        .range([0, width]);

      // Add bars
      svg.selectAll('.bar')
        .data(parsedAvgDurations)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('y', d => y(d.event_type))
        .attr('height', y.bandwidth())
        .attr('x', 0)
        .attr('width', d => x(+d.average_duration))
        .attr('fill', 'steelblue');

      // Add x-axis
      svg.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x).ticks(5));

      // Add y-axis
      svg.append('g')
        .call(d3.axisLeft(y));

      // Add average durations text
      svg.selectAll('.avg-duration')
        .data(parsedAvgDurations)
        .enter()
        .append('text')
        .attr('class', 'avg-duration')
        .attr('x', d => x(+d.average_duration) + 5)
        .attr('y', d => y(d.event_type) + y.bandwidth() / 2)
        .attr('dy', '0.35em')
        .text(d => `Avg: ${(+d.average_duration).toFixed(2)} days`);

      // Add x-axis label
      svg.append('text')
        .attr('transform', `translate(${width/2},${height + margin.bottom})`)
        .style('text-anchor', 'middle')
        .text('Average Duration (days)');

      // After creating the visualization
      console.log('Visualization created with data:', parsedAvgDurations);
    } else {
      console.log('Missing data or averageDurations');
    }

    // Add new code to display process variants
    if (processVariants && processVariants.length > 0) {
      const variantsContainer = d3.select(variantsRef.current);
      variantsContainer.selectAll("*").remove();

      const table = variantsContainer.append("table")
        .attr("class", "variants-table");

      const header = table.append("thead").append("tr");
      header.append("th").text("Process Variant");
      header.append("th").text("Case Count");

      const rows = table.append("tbody")
        .selectAll("tr")
        .data(processVariants)
        .enter()
        .append("tr");

      rows.append("td")
        .text(d => d.variant);
      rows.append("td")
        .text(d => d.count);
    }
  }, [data, averageDurations, processVariants]);

  return (
    <div>
      <div ref={variantsRef}></div>
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default Timeline;