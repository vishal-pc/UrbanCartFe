import { GetAllProductAPI } from '@/app/services/apis/admin/products'
import React, { useEffect, useState } from 'react'

interface Product {
    productName: string;
    productBrand: string;
    productDescription: string;
    productFeature: string;
}

const AllProducts = () => {
    const [products,setProducts]=useState<Product[]>([])
   
    const getAllProducts=async()=>{
        const response=await GetAllProductAPI()
        if(response?.status===200){
            setProducts(response?.data?.products)
            console.log(response?.data?.products)
        }
    }
    useEffect(()=>{
       getAllProducts()
    },[])
  return (
    <div>AllProducts</div>
  )
}

export default AllProducts