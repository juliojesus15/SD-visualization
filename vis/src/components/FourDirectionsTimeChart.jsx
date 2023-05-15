const {
  useEffect,
  useState
} = "react";


const data1 = [{
  id: 100,
  course: 35,
  speed: 0,
  time: 5
}];

const data2 = [{
  id: 101,
  course: 80,
  speed: 25,
  time: 12
}, {
  id: 102,
  course: 256,
  speed: 0,
  time: 15
}];

export const FourDirectionsTimeChart = () => {
  const [data, setData] = useState([]);
  const [constants, setConstants] = useState({});

  // Initialization logic, run only once
  useEffect(() => {
    const width = document.getElementById("container").clientWidth;
    const height = document.getElementById("container").clientHeight;
    const R = (width + height) / 8;
    const CX = width / 2;
    const CY = height / 2;
    const smallR = R * 0.1;

    setConstants({
      R,
      CX,
      CY,
      smallR
    });

    const circleColor = "bisque";
    const itemColor = "#3F4200";

    const svg = d3.select("#container")
      .append("svg")
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", `0 0 ${width} ${height}`);

    const mainCircle = svg.append("circle")
      .attr('id', 'mainCircle')
      .attr("fill", circleColor);

    const centerCircle = svg.append("circle")
      .attr('id', 'innerCircle')
      .attr("fill", "white");

    // Times concentric circles ---
    for (let i = 0; i <= 23; i += 4) {
      svg.append("circle")
        .attr("class", "concentric")
        .datum(i)
        .attr("fill", "none")
        .attr("stroke-dasharray", "4 20")
        .attr("stroke", "gray")
        .attr("stroke-width", 1);
    }

    // Cardinal points ---
    svg.append("text")
      .attr("id", "N")
      .text("N")
      .attr("fill", "black")
      .attr("text-anchor", "middle")
      .style("font-family", "serif")
    svg.append("text")
      .attr("id", "S")
      .text("S")
      .attr("fill", "black")
      .attr("text-anchor", "middle")
      .style("font-family", "serif")
      .attr("alignment-baseline", "hanging")
    svg.append("text")
      .attr("id", "E")
      .text("E")
      .attr("fill", "black")
      .attr("text-anchor", "start")
      .attr("alignment-baseline", "middle")
      .style("font-family", "serif");
    svg.append("text")
      .attr("id", "O")
      .text("O")
      .attr("fill", "black")
      .attr("text-anchor", "end")
      .attr("alignment-baseline", "middle")
      .style("font-family", "serif")
  }, []);

  // Drawing logic, run whenever `constants` changes (which is only once)
  useEffect(() => {
    const { R, smallR, CX, CY } = constants;
    const textTime = 25;
    const fontSize = R * 0.25;

    const svg = d3.select("#container svg");

    const mainCircle = svg.select("#mainCircle")
      .attr("r", R)
      .attr("cx", CX)
      .attr("cy", CY);

    const centerCircle = svg.select("#innerCircle")
      .attr("r", smallR)
      .attr("cx", CX)
      .attr("cy", CY);

    // Times concentric circles ---
    function timeToRadius(time) {
      return (smallR + timePercentage(time) * (R - smallR));
    }

    svg.selectAll(".concentric")
      .attr("cx", CX)
      .attr("cy", CY)
      .attr("r", d => timeToRadius(d))

    // Cardinal points ---
    svg.select("text#N")
      .attr("font-size", fontSize)
      .attr("dx", getPosition(0, textTime).x)
      .attr("dy", getPosition(0, textTime).y);
    svg.select("text#S")
      .attr("font-size", fontSize)
      .attr("dx", getPosition(180, textTime).x)
      .attr("dy", getPosition(180, textTime).y);
    svg.select("text#E")
      .attr("font-size", fontSize)
      .attr("dx", getPosition(-90, textTime).x)
      .attr("dy", getPosition(-90, textTime).y);
    svg.select("text#O")
      .attr("font-size", fontSize)
      .attr("dx", getPosition(90, textTime).x)
      .attr("dy", getPosition(90, textTime).y);
  }, [constants]);

  const timePercentage = (time) => {
    const percentage = (time * 100 / 23) / 100;
    return percentage;
  };

  function timeToRadius(time) {
    const {
      smallR,
      R
    } = constants;
    return (smallR + timePercentage(time) * (R - smallR));
  }

  const getRadians = (degrees) => degrees * Math.PI / 180 + Math.PI / 2;

  function getPosition(degrees, time) {
    const {
      smallR,
      R,
      CX,
      CY
    } = constants;
    const x = (smallR + timePercentage(time) * (R - smallR)) * Math.cos(getRadians(degrees)) + CX;
    const y = (smallR + timePercentage(time) * (R - smallR)) * Math.sin(getRadians(degrees)) * -1 + CY;
    return {
      x,
      y
    };
  }

  useEffect(() => {
    const svg = d3.select('#container svg');

    // Data mapping ---
    let position;
    
    const points = svg.selectAll('.point').data(data);
    
    // Remove old points
    points.exit().remove();
    
    // Append and set constants only for new points
    points
      .enter()
      .append('circle')
      .attr('class', 'point')
      .attr("r", 15)
      .attr("opacity", 0.4)
    
      // Then, take both the new and the updated points
      .merge(points)
      .attr("cx", d => getPosition(d.course, d.time).x)
      .attr("cy", d => getPosition(d.course, d.time).y)
      .attr("fill", d => d.speed === 0 ? "brown" : "red");
  }, [data]);

  useEffect(() => {
    let i = 0;
    setInterval(() => {
      setData(i % 2 === 0 ? data1 : data2);
      i++;
    }, 2000);
  }, []);

  return ( <div id = "container"
    style = {
      {
        width: '100%',
        height: '100%'
      }
    } > </div>
  )
}

