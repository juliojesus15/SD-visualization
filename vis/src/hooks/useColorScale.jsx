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
    'stroke-tab-blue/50 cursor-pointer',
    'stroke-tab-orange/50 cursor-pointer',
    'stroke-tab-green/50 cursor-pointer', 
    'stroke-tab-red/50 cursor-pointer',   
    'stroke-tab-purple/50 cursor-pointer',
    'stroke-tab-brown/50 cursor-pointer',
    'stroke-tab-pink/50 cursor-pointer', 
    'stroke-tab-gray/50 cursor-pointer', 
    'stroke-tab-olive/50 cursor-pointer',
    'stroke-tab-cyan/50 cursor-pointer',    
  ]);

  return colorScale;
};

export default useScaleColor;