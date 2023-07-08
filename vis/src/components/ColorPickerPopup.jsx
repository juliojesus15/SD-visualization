import { useState,  } from "react";

import { ColorBox } from "./ColorBox";


export const ColorPickerPopup = ({ addStudent, removeStudent, colors, updateColor, studentId }) => {  
  
  const [ isOpen, setIsOpen ] = useState(false);    

  const [colorName, setColorName] = useState("tab-white");
  const [color, setColor] = useState("bg-tab-white");


  
  const handleColorSelection = (color, colorName, available) => {  
    console.log("*** Color: ", color, " colorName: ",colorName)
    if ( available ) {      
      //customColor['colorName'] = colorName
      //customColor['color'] = color
      //setCustomColor( (prev) => ({...prev, colorName:colorName, color:color }));
      setColorName(colorName);
      setColor(color);
      /*setCustomColor((prevState) => {
          console.log("2: ","a")
          return {
          ...prevState,
          'colorName': colorName,
          'color':color
          }
        }
      );*/
      addStudent(studentId);
      updateColor(colorName, false, studentId);
      //controllerClosePopup();
      setIsOpen(!isOpen);
    }
  };
  
  const handleClick = () => {    
    
    if (colorName !== "tab-white") {
      updateColor(colorName, true, "");
      setColorName(colorName);
      setColor(color);
      removeStudent(studentId);
    } else {
      if (isOpen==false) {
        console.log("Abriendo popup ...")
        //controllerOpenPopup();
        setIsOpen(!isOpen);
      }
    }          
  };

  return (
    <div className="relative flex justify-center"> 
      {
        isOpen && ( 
          <div className="
            absolute top-0 left-4
            bg-gray-50 dark:bg-dark-200
            border border-gray-300 dark:border-gray-600
            shadow-md shadow-gray-400 dark:shadow-black/30 
            flex flex-col items-center justify-center gap-2 
            w-40 h-24 
            z-10 px-2"
          >
            <span className="font-roboto font-medium text-gray-800 dark:text-gray-300"> Seleccionar color: </span>
            <div className="flex flex-wrap justify-between gap-1">
            {
              colors.map( (color, key) => (
                <div key={ key } onClick={ () => handleColorSelection(color.bg, color.name, color.available) } >                
                  <ColorBox color={color} />
                </div>            
              ))
            }
            </div>
          </div>        
        )
      }
      <div 
        onClick={ handleClick } 
        className={`border border-gray-400 shadow-md shadow-black/20 rounded-full w-4 h-4 hover:opacity-70 active:scale-95 cursor-pointer ${color} `}
      >
      </div>
    </div>
  );
};

