import { useEffect, useRef, useState, useContext } from 'react';
import * as d3 from 'd3';
import { getPointCloudData } from '../services/pcloudService';

import { StudentContext } from '../context/StudentContext';
import { Spinner } from './Spinner';



export const CustomPointCloud = () => {
  const PCloudRef = useRef(null);
  
  const [ points, setPoints ] = useState([]);
  const [ types, setTypes ] = useState([]);

  const [ isLoading, setIsLoading ] = useState(false);

  const { PCloudNode } = useContext(StudentContext)


  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); 

      try {
        const response = await getPointCloudData();
        //console.log("***", response);
        setPoints(response.data.points);
        setTypes(response.data.especies)
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false); 
      }
    };

    fetchData();
  }, [PCloudNode]);

  useEffect(() => {
    drawPCloud(points);
  }, [points]);


  const drawPCloud = ( data ) => {
    //d3.select(PCloudRef.current).remove();

    const svg = d3.select(PCloudRef.current).attr('class', 'border');

    const margin = { top: 20, right: 20, bottom: 40, left: 40 };
    const width = 420 - margin.left - margin.right;
    const height = 280 - margin.top - margin.bottom;

    const xMin = d3.min(data, (d) => d[0]);
    const xMax = d3.max(data, (d) => d[0]);
    const yMin = d3.min(data, (d) => d[1]);
    const yMax = d3.max(data, (d) => d[1]);

    
    const xScale = d3.scaleLinear()
      .domain([xMin, xMax]) // Rango de valores en el eje x
      .range([0, width]); // Rango de píxeles en el gráfico

    const yScale = d3.scaleLinear()
      .domain([yMin, yMax])
      .range([height, 0]);

    //const xAxis = d3.axisBottom(xScale);
    //const yAxis = d3.axisLeft(yScale);

    /*
    svg.append('g')
      .attr('transform', `translate(${margin.left}, ${height + margin.top})`)
      .call(xAxis);

    svg.append('g')
      .attr('transform', `translate(${20}, ${margin.top})`)
      .call(yAxis);

    */
    const colors = {
      0: "fill-dropout-light",
      1: "fill-pass-light",
      2: "fill-repeat-light",
    }
    svg 
      .selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', d => xScale(d[0]))  
      .attr('cy', d => yScale(d[1]))
      .attr('r', 3)
      //.style('fill', 'steelblue');
      //.attr('fill', (d, i) => colors[ types[i] ]) 
      .attr('fill', 'fill-red-500') 
      .attr('stroke', '#606060')
      .attr('class', (d, i) => colors[ types[i] ]) 

  }

  return (
    <div className='flex justify-center items-center h-full '>
    {isLoading ? (
      <Spinner />
    ) : (
      <>
        {PCloudNode !== "" && ( 
          <svg ref={PCloudRef} width={420} height={280} className='bg-gray-200 w-full h-full'>
            {/* Aquí se dibujarán los puntos */}
          </svg>
        )}
      </>
    )}
  </div>
  )
};
