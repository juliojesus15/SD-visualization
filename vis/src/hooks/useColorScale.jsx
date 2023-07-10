import * as d3 from "d3"

import { scaleOrdinal } from 'd3-scale';


const useScaleColor = () => {
  const colorScale = scaleOrdinal()
  .domain([
    'pass_semester', 
    'repeat_semester', 
    'dropout_semester',    
    'tab-blue',
    'tab-orange',
    'tab-green', 
    'tab-red',   
    'tab-purple',
    'tab-brown',
    'tab-pink', 
    'tab-gray', 
    'tab-olive',
    'tab-cyan',
  ])
  .range([
    'stroke-pass-light/50 dark:stroke-pass-light/60 cursor-pointer', 
    'stroke-repeat-light/50 dark:stroke-repeat-light/60 cursor-pointer',
    'stroke-dropout-light/50 dark:stroke-dropout-light/60 cursor-pointer',
    'stroke-tab-blue cursor-pointer',
    'stroke-tab-orange cursor-pointer',
    'stroke-tab-green cursor-pointer', 
    'stroke-tab-red cursor-pointer',   
    'stroke-tab-purple cursor-pointer',
    'stroke-tab-brown cursor-pointer',
    'stroke-tab-pink cursor-pointer', 
    'stroke-tab-gray cursor-pointer', 
    'stroke-tab-olive cursor-pointer',
    'stroke-tab-cyan cursor-pointer',    
  ]);

  return colorScale;
};

export default useScaleColor;