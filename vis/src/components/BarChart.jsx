import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

export const BarChart = ({ data, width, height }) => {
	const barChartRef = useRef(null)

	const margin = { top: 10, right: 10, bottom: 10, left: 10 }

	useEffect(()=> {
		drawChart() 
	},[])

	const drawChart = () => { 		
		var width = 1024 - margin.left - margin.right
    var height = 300 - margin.top - margin.bottom

		const svg = d3.select(barChartRef.current)
			.append("svg")
				.attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

		svg.selectAll("rect")
			.data(data)
			.enter()
			.append("rect")
				.attr("x", (d, i) => i * 70)
				.attr("y", (d, i) => 290 - 10 * d)
				.attr("width", 65)
				.attr("height", (d, i) => d * 10)
				.attr("fill", "green");

		svg.selectAll("text")
			.data(data)
			.enter()
			.append("text")
				.text((d) => d)
				.attr("x", (d, i) => i * 70)
				.attr("y", (d, i) => 275 - (10 * d) - 3);
	}
  
	return <div ref={barChartRef}> </div>
}

