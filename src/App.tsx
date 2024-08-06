import './App.css'
import data from "./assets/natega.grades.json" // should move natega.grades.json from data.natega to assets folder to work 
import { useState } from 'react'
import useDebounce from './useDebounce'
import { Virtuoso } from 'react-virtuoso'

function App() {
  const [name, setName] = useState("")
  const [id, setId] = useState("")

  const debouncedName = useDebounce(name, 500) 
  const debouncedId = useDebounce(id, 500)

  const filter = (data as any[]).filter(d => 
    (debouncedName && d["الاسم"].includes(debouncedName)) ||
    (debouncedId && (d["رقم الجلوس"].toString().includes(debouncedId)))
  )

  return (
    <div className='flex items-stretch gap-2' dir='rtl'>
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
      <div className='w-full'>
        <div className="flex">
          <span>عرض النتائج ({filter.length})</span>
        </div>
        <div className="flex items-center bg-slate-500">
          <p className='border-[1px] border-[#aaa] text-white p-2 w-[15%] truncate whitespace-nowrap'>رقم الجلوس</p>
          <p className='border-[1px] border-[#aaa] text-white p-2 w-[45%] truncate whitespace-nowrap'>الاسم</p>
          <p className='border-[1px] border-[#aaa] text-white p-2 w-[20%] truncate whitespace-nowrap'>الدرجة</p>
          <p className='border-[1px] border-[#aaa] text-white p-2 w-[20%] truncate whitespace-nowrap'>النسبة</p>
        </div>
        <Virtuoso
          data={filter}
          style={{ height: 400 }}
          className='w-full hide-scrollbar'
          itemContent={(_, d) => (
            <div className='flex items-center bg-slate-500'>
              <p className='border-[1px] border-[#aaa] text-white p-2 w-[15%] truncate whitespace-nowrap'>{d["رقم الجلوس"]}</p>
              <p className='border-[1px] border-[#aaa] text-white p-2 w-[45%] truncate whitespace-nowrap'>{d["الاسم"]}</p>
              <p className='border-[1px] border-[#aaa] text-white p-2 w-[20%] truncate whitespace-nowrap'>{d["الدرجة"]}</p>
              <p className='border-[1px] border-[#aaa] text-white p-2 w-[20%] truncate whitespace-nowrap'>{((+d["الدرجة"] / 410) * 100)?.toFixed(2) } %</p>
            </div>
          )}
        />
      </div>
    </div>
  )
}

export default App
