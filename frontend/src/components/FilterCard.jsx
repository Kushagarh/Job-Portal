import React, { useEffect, useState }  from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { setFilteredQuery, setSearchedQuery } from '@/redux/jobSlice'
import { useDispatch } from 'react-redux'

const fitlerData = [
    {
        fitlerType: "Location",
        array: ["Delhi", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        fitlerType: "Industry",
        array: ["Front end Developer", "Back end Developer", "FullStack Developer","APP Developer"]
    },
    {
        fitlerType: "Salary",
        array: ["0-40k", "50-1 lakh", "1 lakh to 5 lakh","6 lakh to 20 lakh"]
    },
]

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();
    const changeHandler = (value) => {
        setSelectedValue(value);
    }
    useEffect(()=>{
        // console.log(selectedValue)
        dispatch(setFilteredQuery(selectedValue));
    },[selectedValue]);
  return (
    <div className='w-full bg-white p-3 rounded-md'>
            <h1 className='font-bold text-lg'>Filter Jobs</h1>
            <hr className='mt-3' />
            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                {
                    fitlerData.map((data, index) => (
                        <div>
                            <h1 className='font-bold text-lg'>{data.fitlerType}</h1>
                            {
                                data.array.map((item, idx) => {
                                    const itemId = `id${index}-${idx}`
                                    return (
                                        <div className='flex items-center space-x-2 my-2'>
                                            <RadioGroupItem value={item} id={itemId} />
                                            <Label htmlFor={itemId}>{item}</Label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ))
                }
            </RadioGroup>
        </div>
  )
}

export default FilterCard