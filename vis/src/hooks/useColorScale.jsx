import * as d3 from "d3"

import { scaleOrdinal } from 'd3-scale';

const useScaleColor = () => {
  const colorScale = scaleOrdinal()
  .domain([
    'pass_semester', 
    'repeat_semester', 
    'dropout_semester'
  ])
  .range([
    'stroke-blue-500/50 dark:stroke-blue-700/50 cursor-pointer', 
    'stroke-yellow-500/30 dark:stroke-yellow-700/50 cursor-pointer',
    'stroke-red-500/50 dark:stroke-red-700/50 cursor-pointer'
  ]);

  return colorScale;
};

export default useScaleColor;