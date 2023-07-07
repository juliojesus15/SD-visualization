import { useState } from "react";

import { ColorBox } from "./ColorBox";

const defaultSelectedColor = { 
  colorName:"tab-white", 
  color:"bg-tab-white" 
};

export const ColorPickerPopup = ({ addStudent, removeStudent, colors, updateColor, studentId, controllerOpenPopup, controllerClosePopup, isPopupOpen }) => {  
  
  const [ isOpen, setIsOpen ] = useState(false);    
  const [ selectedColor, setSelectedColor ] = useState(defaultSelectedColor);
  
  const handleColorSelection = (color, colorName, available) => {  
    if ( available ) {
      setSelectedColor({ colorName, color });
      addStudent(studentId);
      updateColor(colorName, false, studentId);
      controllerClosePopup();
      setIsOpen(!isOpen);
    }
  };
  
  const handleClick = () => {    
    const { colorName } = selectedColor;
    
    if (colorName !== "tab-white") {
      updateColor(colorName, true, "");
      setSelectedColor(defaultSelectedColor);
      removeStudent(studentId);
    } else {
      if (!isPopupOpen) {
        controllerOpenPopup();
        setIsOpen(!isOpen);
      }
    }          
  };

  return (
    <div className="relative"> 
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
        className={`border border-gray-400 shadow-md shadow-black/20 rounded-full w-4 h-4 hover:opacity-70 active:scale-95 cursor-pointer ${selectedColor.color} `}
      >
      </div>
    </div>
  );
};

