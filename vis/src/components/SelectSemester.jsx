import { useState } from "react";

export const SelectSemester = ({ options, onSelect, defaultValue }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showOptions, setShowOptions] = useState(false);

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    setShowOptions(false);
    onSelect(() => option);
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  return (
    <div className="relative w-28 h-6 bg-gray-200 dark:bg-dark-200 rounded-md z-50">
      <div 
        onClick={ toggleOptions } 
        className="
          font-roboto font-medium text-gray-600 dark:text-gray-200 text-xs 
          absolute top-0 left-0 
          w-full h-full 
          cursor-pointer" 
      >
        <div className={`
          flex items-center justify-center 
          border border-gray-300 dark:border-gray-600 
          rounded-md 
          h-full 
          ${ showOptions ? "duration-0 rounded-b-none" : "duration-1000" } `} 
        > 
          { selectedOption != null ? selectedOption : defaultValue } 
        </div>
        { 
          <ul className={`
            flex flex-col 
            text-center 
            border-gray-300 dark:border-gray-600 
            rounded-b-md 
            overflow-x-hidden overflow-y-scroll 
            duration-300 ease-linear 
            ${ showOptions ? "h-32 border border-t-0": "h-0 " } `}
          > 
          { 
            options.map( (option, key) => (
                <li
                  key={ key }
                  onClick={ () => handleSelectOption(option.name) }
                  className="
                    even:bg-gray-200 dark:even:bg-dark-200 
                    odd:bg-gray-100  dark:odd:bg-dark-100 
                    hover:bg-green-600 dark:hover:bg-green-700
                    hover:text-gray-100 
                    active:scale-110
                    py-1 
                  "
                >
                  { option.name }
                </li>
              )
            )
          }
          </ul>        
        }
      </div>
    </div>
  )
}