"use client"
import { GetUsersAdminAPI } from '@/app/services/apis/admin/products'
import React, { useEffect, useState } from 'react'
import Spiner from '../../components/spiner'
import Image from 'next/image'

const Userpage = () => {
    const [users,sertusers]=useState([])
    const [pending,setpending]=useState(true)
    
    //getting all users
     const getAllUsers=async()=>{
      const response=await GetUsersAdminAPI()
      if(response?.status===200){
        sertusers(response?.userData)
        setpending(false)
      }
     }
    useEffect(()=>{
      getAllUsers()
    },[])
  return (
    <>
    { !pending ? 
    <div>
      <div className='flex'>
        <h1 className='font-bold text-3xl my-6'>Users :</h1>
      </div>
   
 <div className="overflow-x-auto shadow-md sm:rounded-lg flex justify-center">
    <table className="w-full text-sm text-gray-700 dark:text-gray-400">
        <thead className="text-xs  uppercase bg-gray-100 dark:bg-gray-800 dark:text-gray-300">
            <tr>
                <th scope="col" className="px-8  py-3">
                   Profile
                </th>
                <th scope="col" className="px-8 py-3">
                   Name
                </th>
                <th scope="col" className="px-8 py-3">
                     Email
                </th>
                <th scope="col" className="px-8 py-3">
                     Number
                </th>
               
               
            </tr>
        </thead>
        <tbody className="bg-white  dark:bg-gray-900">
            {users?.map((user:{fullName:string,mobileNumber:number,profileImg:string,email:string},index:any) => (
                <tr key={index} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 text-center whitespace-nowrap font-medium text-gray-900 dark:text-gray-200">
                    <Image  src={user?.profileImg} alt={user?.fullName}  className="w-16 h-16 rounded-full" width={400} height={300} />
                    </td> 
                    <td className="px-6 py-4 text-center"> 
                    {user?.fullName[0].toUpperCase()+user?.fullName.slice(1)}
                    </td>
                    <td className="px-6 py-4 text-center"> 
                    {user?.email}
                    </td>
                    <td className="px-6 py-4 text-center"> 
                    {user?.mobileNumber}
                    </td>
                   
                </tr>
            ))}
        </tbody>
    </table>
</div>
</div>
   :"Loading......" }
    </>
 
  )
}

export default Userpage