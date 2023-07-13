import { useEffect, useRef, useContext } from 'react';
import * as d3 from 'd3';


import { StudentContext } from '../context/StudentContext';


import { Spinner } from './icons/Spinner';

export const CustomPointCloud = () => {
  const { points, labels, studentsToPCloud, setTemporal, isLoadingPCloud } = useContext(StudentContext)
  const chartRef = useRef(null);

  useEffect(() => {
    if (points && labels) {
      //const svg = d3.select(PCloudRef.current).attr('class', 'border');
      const svg = d3.select(chartRef.current);

      const margin = { top: 20, right: 20, bottom: 40, left: 40 };
      const width = 420 - margin.left - margin.right;
      const height = 280 - margin.top - margin.bottom;

      const xMin = d3.min(points, (d) => d[0]);
      const xMax = d3.max(points, (d) => d[0]);
      const yMin = d3.min(points, (d) => d[1]);
      const yMax = d3.max(points, (d) => d[1]);

    
      const xScale = d3.scaleLinear()
        .domain([xMin, xMax]) // Rango de valores en el eje x
        .range([0, width]); // Rango de píxeles en el gráfico

      const yScale = d3.scaleLinear()
        .domain([yMin, yMax])
        .range([height, 0]);


      const colors = {
        0: "fill-pass-light",
        1: "fill-dropout-light",
      }


      const circles = svg
        .selectAll("circle")
        .data(points)
        .join("circle")
        .attr("id", (d,i) => {
        //console.log("🚀 ~ file: CustomPointCloud.jsx:49 ~ .attr ~ i:", i)

          return `dot-${i}`
        })
        .attr('cx', d => xScale(d[0]))  
        .attr('cy', d => yScale(d[1]))
        .attr("r", 3)
        .attr("opacity", 0.5)
        .attr('stroke', '#606060')
        .attr('class', (d, i) => colors[ labels[i] ]) 
        //.attr("fill", 'steelblue');

      // Por terminar, hover sobre el rectangulo
      circles
      .append("title")
      .text( (d, i) => {
        return studentsToPCloud[i]
      })  

      let coords = [];
      const lineGenerator = d3.line();

      const pointInPolygon = (point, vs) => {
        var x = point[0],
            y = point[1];
    
        var inside = false;
        for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
          var xi = vs[i][0],
              yi = vs[i][1];
          var xj = vs[j][0],
              yj = vs[j][1];
    
          var intersect = yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
          if (intersect) inside = !inside;
        }
    
        return inside;
      };

      const drawPath = () => {
        svg
          .select("#lasso")
          .attr("class", "stroke-gray-500 dark:stroke-gray-300 fill-gray-300/50 dark:fill-gray-700/50")
          .style("stroke-width", 2)        
          .attr("d", lineGenerator(coords));
      }

      const dragStart = () => {
        coords = [];
        circles.attr("fill", "steelblue");
        svg.select("#lasso").remove();
        svg.append("path").attr("id", "lasso");
      }

      const dragMove = (event) => {
        let mouseX = event.sourceEvent.offsetX;
        let mouseY = event.sourceEvent.offsetY;
        coords.push([mouseX, mouseY]);
        drawPath();
      }

      const dragEnd = () => {
        let selectedDots = [];
        circles.each((d, i) => {          
          
          let point = [xScale(d[0]), yScale(d[1])]; 

          if (pointInPolygon(point, coords)) {            
            svg.select(`#dot-${i}`)
              //.attr("stroke-width", 4);
              .classed("fill-pass-light", false)
              .classed("fill-dropout-light", false)
              .classed("fill-yellow-500", true)
            selectedDots.push(studentsToPCloud[i]);
          }
        });
        console.log(`select: ${selectedDots}`);
        setTemporal(selectedDots)
      }

      const drag = d3.drag()
        .on("start", dragStart)
        .on("drag", dragMove)
        .on("end", dragEnd);

      svg.call(drag);
    }
  }, [points, labels]);

  return ( 
     <div className='flex justify-center items-center h-full '>
     { isLoadingPCloud 
         ? <Spinner /> 
         : <div>
           { points && labels 
             ? <svg ref={chartRef} width={420} height={280} className='bg-gray100 w-full h-full'> <g id="chart" /> </svg>
             : <span className='font-roboto font-medium text-xs text-gray-700 dark:text-gray-300'> No se ha seleccionado ningun nodo para la proyección </span>
           }
           </div>      
     }
     </div>
  )
};
