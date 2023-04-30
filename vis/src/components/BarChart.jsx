import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'


export const BarChart = ({ data, width, height}) => {    
    const barChartRef = useRef(null)

    useEffect(()=> {
        drawChart()        
    },[])

    const drawChart = () => {
        const divElement = barChartRef.current;
        //console.log(divElement);
        //console.log(data) 

        const data_ = data;

        const svg = d3.select(barChartRef.current).append("svg")
            .attr("width", width)
            .attr("height", height);

        svg.selectAll("rect")
            .data(data_)
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
            .attr("y", (d, i) => 290 - (10 * d) - 3)
    }

    
    return <div  ref={barChartRef}></div>
    
}

