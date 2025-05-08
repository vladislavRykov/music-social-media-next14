import React, { useEffect, useRef, useState } from 'react'
import s from './UserLocation.module.scss'
import { Location } from '@/types/kudaGo';
import { useAsync } from '@/hooks/useFetching';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { setAuthUserLocation, setLocation } from '@/redux/slices/UserSlice';
import { selectUserAndLocation } from '@/redux/selectors/userSelectors';
import { getUserLocationA, setUserLocationA } from '@/actions/events';
import cn from 'classnames'

const UserLocation = () => {
    const dispatch = useAppDispatch()
    const listRef = useRef<HTMLUListElement>(null)
    const [isListOpen,setIsListOpen] = useState(false)
    const {
        isLoading,
        location,
        user,
      } = useAppSelector(selectUserAndLocation)
    const getLocations = async()=>{
      
        const res = await fetch(
          `http://localhost:3000/api/locations`
        )
        const data:Location[] = await res.json()

        const filteredData = data.filter(location=>location.slug!== 'interesting')

        return filteredData
      }

      const setLocations = async()=>{
       const allLocations = await getLocations()
       if(isLoading) return null
       if(!user || !user.location){
            dispatch(setLocation(allLocations[0]))
          }else{
            console.log( `http://localhost:3000/api/locations/${user.location}`)
            const res = await fetch(
              `http://localhost:3000/api/locations/${user.location}`
            )
            const data:Location = await res.json()
            dispatch(setLocation(data))
       }
       return allLocations
      }
      const onLocationClick = async (location: Location)=>{
        if(isLoading) return
        if(!user){
          dispatch(setLocation(location))
        }else{
          const res = await setUserLocationA(location.slug)
          console.log(res)
          if(!res.ok) return
          dispatch(setLocation(location))
     }
     setIsListOpen(false)
      }
      const {execute,status,data,error} = useAsync(setLocations,[isLoading])
      const handleClickOutside = (event) => {
          if (listRef.current && !listRef.current.contains(event.target)) {
            setIsListOpen(false)
          }
        };
      
        useEffect(() => {
           document.addEventListener('mousedown', handleClickOutside);
          return () => {
             document.removeEventListener('mousedown', handleClickOutside);
          };
        }, []);
      
  return (
    <div className={s.userLocation_wrapper}>
        <div className={s.userLocation_content}>
            <button disabled={isLoading || status==='pending' } className={s.userLocation_currentLocation} onClick={()=>setIsListOpen(true)}>{!isLoading&& location ? location?.name: 'Загрузка...'}</button>
            {isListOpen && <ul ref={listRef} className={s.userLocation_locationList}>
              {data?.map(dataLocation=><li className={cn(s.userLocation_location,{[s.userLocation_selectedLocation]:dataLocation.slug===location?.slug})} onClick={()=>onLocationClick(dataLocation)}>{dataLocation.name}</li>)}
            </ul>}
        </div>
    </div>
  )
}

export default UserLocation