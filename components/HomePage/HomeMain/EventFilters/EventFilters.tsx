import React from 'react'

type Props = {
    isOnlyFreeEvents: boolean,
    setIsOnlyFreeEvents: React.Dispatch<React.SetStateAction<boolean>>
}

const EventFilters = ({isOnlyFreeEvents,setIsOnlyFreeEvents}:Props) => {
  return (
        <div>
        <label>
            
        <input onChange={()=>setIsOnlyFreeEvents(prev=>!prev)} checked={isOnlyFreeEvents} defaultChecked={false} type="checkbox" value="" id="isFreeCheckbox"/>
            Только бесплатные

        </label>
        </div>
  )
};

export default EventFilters