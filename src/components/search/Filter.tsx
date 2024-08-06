import useDebounce from '@/useDebounce'
import React, { useState } from 'react'
import data from "../../assets/natega.grades.json"

export default function Filter() {
    const [name, setName] = useState("")
    const [id, setId] = useState("")
  
    const debouncedName = useDebounce(name, 500)
    const debouncedId = useDebounce(id, 500)
  
    const filter = (data as any[]).filter(d => 
      (debouncedName && d["الاسم"].includes(debouncedName)) ||
      (debouncedId && (d["رقم الجلوس"].toString().includes(debouncedId)))
    )
  
  return (
    <div className="flex w-[400px] flex-col gap-2 h-full bg-slate-100 p-2">
    <div className="w-full">
      <span>البحث بالاسم</span>
      <input type="text" value={name} placeholder='الاسم' onChange={(e) => setName(e.target.value)} className='border border-[#ccc] block p-2 w-full my-2' />
    </div>
    <div className="w-full">
      <span>البحث برقم الجلوس</span>
      <input type="number" value={id} placeholder='رقم الجلوس' onChange={(e) => setId(e.target.value)} className='border border-[#ccc] block p-2 w-full my-2' />
    </div>
  </div>
  )
}
