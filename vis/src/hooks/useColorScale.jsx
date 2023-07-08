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
    'stroke-pass-light/50 dark:stroke-pass-light/60 cursor-pointer', 
    'stroke-repeat-light/50 dark:stroke-repeat-light/60 cursor-pointer',
    'stroke-dropout-light/50 dark:stroke-dropout-light/60 cursor-pointer'
  ]);

  return colorScale;
};

export default useScaleColor;