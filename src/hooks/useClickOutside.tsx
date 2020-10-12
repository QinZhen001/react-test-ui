import {RefObject,useEffect, Ref} from "react"

function useClickOutside(ref:RefObject<HTMLElement>,handler:Function){
  useEffect(()=>{
    const listener = (event:MouseEvent) => {
      if(!ref.current || ref.current.contains(event.target as HTMLElement)){
        return 
      }
      handler(event)
    }
  },[ref,handler])
}

export default useClickOutside