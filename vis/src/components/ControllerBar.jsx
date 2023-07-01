import { useContext } from 'react'
import  ThemeButton from "./ThemeButton"

import { times } from '../constant/filter'

import { FilterContext } from "../context/FilterContext"
import { SelectSemester } from './SelectSemester'

export const ControllerBar = () => {
  const { handleBeginTime, handleEndTime, timelapse } = useContext(FilterContext)

  const filterTimes = timelapse.begin && times.filter( ( _, key) => key >timelapse.begin )

  return (
    <header className="flex gap-10 p-2 border-b mb-4 bg-gray-100 dark:border-gray-600 dark:bg-dark-100 justify-between">
      {
        //timelapse.begin && <pre> { timelapse.begin }</pre>
      }
      { 
        //timelapse.end && <pre> { timelapse.end }</pre>
      }

      <section className='flex gap-3'>
        <div className='flex gap-2'>
          <label className='font-roboto font-medium text-xs text-gray-600 dark:text-gray-100 my-auto'> Periodo inicial: </label>
          <SelectSemester defaultMessage={"Select an option"} options={times} />
        </div>
        <div className='flex gap-2'>
          <label className='font-roboto font-medium text-xs text-gray-600 dark:text-gray-100 my-auto'> Periodo final: </label>
          <SelectSemester defaultMessage={"Select an option"} options={times} />
        </div>
        <div className='flex gap-3 font-roboto text-xs text-gray-600 dark:text-gray-300'>
          <label className='font-medium my-auto'> Periodo Inicio: </label>        
          <select onChange={ handleBeginTime } name="beginTime" 
           className='
           font-medium max-h-7 overflow-y-hidden
           border border-gray-300 dark:border-gray-700
           rounded-lg px-3 py-1
           bg-gray-100 dark:bg-dark-200 '>
          <option value={10} defaultValue> 2015-01 </option>
          {
            times.map( ({id, name}, key) => { 
              return <option key={ key } value={ id } > { name } </option>
            })
          }
          </select>
        </div>
        
        <div className='flex gap-3 font-roboto text-xs text-gray-600 dark:text-gray-300'>
          <label className='font-medium my-auto'> Periodo Final: </label>        
          <select 
            onChange={handleEndTime} 
            id="endTime" 
            name="endTime" 
            className='
              font-medium
              border border-gray-300 dark:border-gray-700
              rounded-lg px-3 py-1
              bg-gray-100 dark:bg-dark-200 '
          >
          <option value={10} defaultValue className='bg-red-400'> seleccionar </option>
          {
            timelapse.begin && filterTimes.map( ({id, name}, key) => { 
              return <option key={ key } value={ id } className='bg-blue-700 dark:bg-red-700' > { name } </option>
            })
          }
          </select>
        </div>
      </section>
      <section>
        <ThemeButton />
      </section>
      
  
    </header>
  )
}