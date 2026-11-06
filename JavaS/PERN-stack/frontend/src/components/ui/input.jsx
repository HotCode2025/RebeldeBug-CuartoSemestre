import { forwardRef } from "react"

export const input = forwardRef ((props, ref) => {
  return (
    <input type="text" className="bg-slate-800 px-3 py-2 block my-2 w-full"
    {...props} ref={ref}/>
  )
})



export default input