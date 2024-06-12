"use cleint"
import React, { useState, useEffect } from 'react'
import { addressType } from '@/app/types/userTypes'
import { toast } from 'react-toastify';
import { addAddressApi,getAddressAPI } from '@/app/services/apis/address';
import { getToCartAPI ,getItemInCartAPI} from '@/app/services/apis/user';
import { CitySelect, CountrySelect, StateSelect, GetState } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import PlaceOrder from './placeOrder';
import { loadStripe } from '@stripe/stripe-js';
import { stripeSessionAPI } from '@/app/services/apis/user';
import { delAddressByIdAPI } from '@/app/services/apis/address';
import {DelIcon} from "@/public/svg/del"
import { EditIcon } from '@/public/svg/edit';
import { AddIcon } from "@/public/svg/add";
import ModalCompo  from './modal';

const CheckoutForm = () => {

    const publishableKey:string|any =  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;
    // const stripePromise = loadStripe(publishableKey);
    const [formValue, setFormValue] = useState<addressType | any>({
        streetAddress: "",
        nearByAddress: "",
        country: "india",
        stateName: "",
        cityName: "",
        areaPincode: "",
        mobileNumber: ""
    })

    const [countryid, setCountryid] = useState(101);
    const [stateid, setstateid] = useState(0);
    const [objData, setObjData] = useState({ stateName: "",stateId:0, cityName: "",cityId:0 });

    const [fillForm, setFillForm] = useState(false)
    const [showAddress, setShowAddress] =useState([])
    const [checkBoxId ,setCheckBoxId] = useState("")
    const [getAllData, setGetAllData] = useState<any|[]>([])
    const [subTotal, setSubTotal]     = useState("")
    const [orderStatus,setOrderStatus] = useState(false)

    const [checked,setChecked] = useState(false);


    const allAddress = async() =>{
        const getAllAdd = await getAddressAPI();
        if(getAllAdd.status == 200 && getAllAdd.addressData !=""){
            // console.log("getAllAdd--", getAllAdd)
            setFillForm(true);
            setShowAddress(getAllAdd.addressData)
        }else{
            setChecked(false)
        }
    }

    useEffect(() => {

        allAddress()

    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        // console.log("name", name)
        setFormValue((prevProps: addressType) => ({
            ...prevProps,
            [name]: value
        }));
    }

    // Add New Address into Database
    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()

        // console.log("formValue", formValue, objData)
        const updatedObject = {
            ...formValue,
            stateName: objData.stateName,
            stateId:objData.stateId,            
            cityName: objData.cityName,
            cityId:objData.cityId,
        };
        console.log("update object",updatedObject);
        let errForm: {} | "" = validate(updatedObject);

        if (!Object.keys(errForm).length) {
        
            const resp = await addAddressApi(updatedObject);
            console.log("addAddressApi ****************",resp);
            if (resp.status == 201) {
                console.log("resp--", resp.data._id)
                setCheckBoxId(resp.data._id)
                setOrderStatus(true)
                const getAllAdd = await getAddressAPI();
                if(getAllAdd.status == 200){
                    console.log("getAllAdd--", resp)
                    setFillForm(true);
                    setShowAddress(getAllAdd.addressData)
                }                
            }

        }

    }

    const validate = (values: any | {}) => {
        const errors: addressType | any = {};
        console.log("values==--- validate--", values)

        // Validate nearByAddress
        if (!values.nearByAddress) {
            errors.nearByAddress = "Address is required.";
            toast.error("Address is required.")
        }

        if (!values.streetAddress) {
            errors.streetAddress = "Street address is required.";
            toast.error("Street address is required.")
        }

        // Validate country
        if (!values.country) {
            errors.country = "Country is required.";
            toast.error("Country is required.")
        }

        // Validate state
        if (!values.stateName) {
            errors.state = "State is required.";
            toast.error("State is required.")
        }

        // Validate city
        if (!values.cityName) {
            errors.city = "City is required.";
            toast.error("City is required.")
        }

        if (!values.areaPincode) {
            errors.areaPincode = "Area pincode is required.";
            toast.error("Area pincode is required.")
        } else if (!/^\d+$/.test(values.areaPincode)) {
            errors.areaPincode = "Area pincode should contain only numbers.";
            toast.error("Area pincode should contain only numbers.")
        }

        // Validate mobileNumber
        if (!values.mobileNumber) {
            errors.mobileNumber = "Mobile number is required.";
            toast.error("Mobile number is required.")
        } else if (!/^\d+$/.test(values.mobileNumber)) {
            errors.mobileNumber = "Mobile number should contain only numbers.";
            toast.error("Mobile number should contain only numbers.")
        }

        return errors;
    }


    const handleCustomList = (e: any) => {
        const { name, id, latitude } = e;

        console.log(e)

        if (latitude) {
            // const dm = name;
            // objData.city = dm;
            // objData.cityId =id
            setObjData(prevData => ({
                ...prevData,
                cityName: name,
                cityId: id
            }));

        } else {
            if (id !== stateid) {
                setstateid(id);
                // objData.state = name;   
                // objData.stateId =id;     
                setObjData(prevData => ({
                    ...prevData,
                    stateName: name,
                    stateId: id
                }));
          
            }
        }
    }

    // cart Data show in these functions
    const getAllCart = async () => {
        const resp = await getToCartAPI();
        if (resp.status == 200) {
          const datas = resp.data.cartItems.filter((data:any)=>{
            if(data.message !== "Product not found"){
                return data
            }
          })
          // console.log("datas",datas)
          setGetAllData(datas)
          setSubTotal(resp.data.totalCartAmount);
        }
      }
    
      useEffect(() => {
        getAllCart()
      }, [])


    // validate payment methods
    const handleCheckbox = (e: any) => {
        console.log("e checkbox---",e)
        setCheckBoxId(e)
    }

    // validate payment methods
    const handlePaymentSubmit = (e: any) => {
        
        if(checkBoxId ==""){
            toast.error("please select address")
        }else if(checkBoxId !=""){

            let finalAd:any
            showAddress.filter((data:any)=>{
                if(data._id == checkBoxId){
                    finalAd = data;
                }
            })
            console.log(showAddress,"******************",finalAd._id)
            if(finalAd._id){
                setOrderStatus(true)
            }
        }

    }

    const india = [{
        "id": 101,
        "name": "India",
        "emoji": "🇮🇳"
    },]


    const delAddressHandler = async(id:any) =>{
        // console.log(id);
        const resp = await delAddressByIdAPI(id);
        if(resp.status == 200){
          allAddress()
        }
        // console.log("dele----",resp)
      }
    
    const checkedAddress = (e:any) =>{
        const {value} = e.target;
        if(value == "check1"){
           setChecked(true)
        }else if(value == "check2"){
            setChecked(false)
        }
        // console.log("checkedAddress",e.target.value)
    } 
    

    return (
        <>

{orderStatus==false  ? 
    <div className="mx-auto w-full  max-w-lg">
            <div className="flex items-center mb-4">
                <input id="default-radio-1" type="radio" value="check1" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600"
                onChange={(e)=>checkedAddress(e)}
                />
                <label htmlFor="default-radio-1" className="ms-2  font-medium text-md text-gray-900 dark:text-black-300">Shipping Previous Address</label>
            </div>
            <div className="flex items-center">
                <input  id="default-radio-2" type="radio" value="check2" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600" 
                checked={checked ==false ?true :undefined}
                onChange={(e)=>checkedAddress(e)}
                />
                <label htmlFor="default-radio-2" className="ms-2 text-md font-medium text-gray-900 dark:text-black-300">Shipping New Address</label>
            </div>
            </div>
:""}
         {checked ==false  && orderStatus==false? 

     <div className="mx-auto w-full max-w-lg mt-5">

                {/* <h3>Previous address</h3> */}
           

                <h1 className="relative text-2xl font-medium text-gray-700 sm:text-3xl">New Address <span className="mt-2 block h-1 w-10 bg-teal-600 sm:w-20"></span></h1>


                <form className="mt-10 flex flex-col" onSubmit={handleSubmit}>

                    <div className="flex flex-wrap -mx-3 mb-6">

                        <div className="w-full md:w-1/2 px-3">
                            <label className="text-md font-semibold text-gray-500" htmlFor="grid-last-name">
                                Street Address
                            </label>
                            <input name="streetAddress" className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-md placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" id="grid-last-name" type="text" placeholder="please enter your street address"
                                value={formValue.streetAddress}
                                onChange={(e) => handleChange(e)}

                            />
                        </div>

                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="text-md font-semibold text-gray-500" htmlFor="grid-first-name">
                                Near By Address
                            </label>
                            <input name="nearByAddress" className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-md placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" id="grid-first-names" type="text" placeholder="please enter your near by address"
                                value={formValue?.nearByAddress}
                                onChange={(e) => handleChange(e)}
                            />

                        </div>

                    </div>

                    <div className="flex flex-wrap -mx-3 mb-2">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="text-md font-semibold text-gray-500" htmlFor="grid-city">
                                Country
                            </label>

                            <input name="country" className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-md placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" id="grid-city" type="text" placeholder="Country"
                                defaultValue={`${india[0].emoji} ${india[0].name}`}
                                disabled
                            />
                        </div>

                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="text-md font-semibold text-gray-500" htmlFor="grid-city">
                                Mobile No
                            </label>
                            <input name="mobileNumber" className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-md placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" id="grid-city" type="text" placeholder="Mobile No"
                                maxLength={10} minLength={10}
                                value={formValue.mobileNumber}
                                onChange={(e) => handleChange(e)}
                            />
                            {/* <PhoneInput
          defaultCountry="IN"
          initialValueFormat="national"
          name="mobileNumber"
          className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-md placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" id="grid-city" type="text" placeholder="Mobile No"
          value={formValue.mobileNumber}
          onChange={(e) => innumber(e)} 

         /> */}
                        </div>

                    </div>



                    <div className="flex flex-wrap -mx-3 mb-2">

                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="text-md font-semibold text-gray-500" htmlFor="grid-state">
                                State
                            </label>

                            <div className="relative">
                                {/* <input name="state" className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-md placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" id="grid-city" type="text" placeholder="State"
            value={formValue.state}
            onChange={(e) => handleChange(e)}
            /> */}

                                <StateSelect
                                    countryid={countryid}
                                    onChange={(e: any) => handleCustomList(e)}
                                    // defaultValue={{id: 4017, name: 'Andhra Pradesh'}}
                                    name="state"
                                    className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-md placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                                    placeHolder="Select State"
                                />

                            </div>
                        </div>



                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="text-md font-semibold text-gray-500" htmlFor="grid-city">
                                City
                            </label>
                            {/* <input name="city" className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-md placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" id="grid-city" type="text" placeholder="City"
            value={formValue.city}
            onChange={(e) => handleChange(e)}        
            />      */}

                            <CitySelect
                                countryid={countryid}
                                stateid={stateid}
                                // defaultValue={{id: 57620, name: 'Akasahebpet'}}
                                onChange={(e: any) => handleCustomList(e)}
                                className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-md placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" id="grid-city"
                                placeHolder="Select City"
                            />
                        </div>



                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="text-md font-semibold text-gray-500" htmlFor="grid-zip">
                                Pincode
                            </label>
                            <input name="areaPincode" className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-md placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" id="grid-zip" type="text" placeholder="Pincode"
                                maxLength={6} minLength={6}
                                value={formValue.areaPincode}
                                onChange={(e) => handleChange(e)}
                            />
                        </div>

                    </div>

                    <button type="submit" className="mt-10 inline-flex w-full items-center justify-center rounded bg-gray-700 py-2.5 px-4 text-base font-semibold tracking-wide text-white  outline-none ring-offset-2 transition hover:text-opacity-100 focus:ring-2 focus:gray-teal-500 sm:text-md">Add Address</button>

                </form>

                {/* <p className="mt-10 text-center text-md font-semibold text-gray-500">By placing this order you agree to the <a href="#" className="whitespace-nowrap text-teal-400 underline hover:text-teal-600">Terms and Conditions</a></p> */}

        </div>     




: checked ==true  && orderStatus==false ?
        
        <div className='mx-auto w-full max-w-lg mt-5'>
            <h1 className="relative text-2xl font-medium text-gray-700 sm:text-1xl">Previous Saved Address<span className="mt-2 block h-1 w-10 bg-teal-600 sm:w-20"></span></h1>


            <div className="flex items-center mt-5">
                {/* <h3 className="text-md font-semibold text-gray-500 mt-5">Select Address</h3>

                <button className="ml-auto bg-blue-500 text-white px-1 py-1 rounded mr-4"><AddIcon /> Add New Address</button>
                <ModalCompo /> */}
            
            </div>
               
            <fieldset className='mt-4'>

            {showAddress && showAddress.length > 0 ? (

                showAddress.map((dm:any, i) => (

                <div className="flex items-center mb-4" key={i}>
                    <input id="country-option-1" type="radio" name="countries" value={dm._id} className="w-4 h-4 border-gray-300  dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600" onChange={(e)=>handleCheckbox(dm._id)}  />
{/* 
                    <label htmlFor="country-option-1" className="block ms-2  text-md font-medium text-gray-900 dark:text-gray-500">
                    {dm?.streetAddress}, {dm?.nearByAddress}, {dm?.areaPincode}
                    </label> */}
                <div className="flex items-center">
                <label htmlFor="country-option-1" className="block ms-2 text-md font-medium text-gray-900 dark:text-gray-500">
                    {dm?.streetAddress}, {dm?.nearByAddress}, {dm?.areaPincode}
                    </label>
                    {/* <button className=" bg-gray-400 text-white px-2 py-1 rounded flex items-center ml-12"><EditIcon/></button> */}
                    <ModalCompo data={dm} />
                    <button className="bg-red-400 text-white px-2 py-1 rounded flex items-center ml-2" type="submit" onClick={() => delAddressHandler(dm._id)}><DelIcon /></button>

                </div>

                </div>
                ))

                ) :  ( "No addresses available")
            
            }

            </fieldset>

            <button type="submit" className="mt-10 inline-flex w-full items-center justify-center rounded bg-gray-600 py-2.5 px-4 text-base font-semibold tracking-wide text-white outline-none ring-offset-2 transition hover:text-opacity-100 focus:ring-2 focus:gray-teal-500 sm:text-md" onClick={handlePaymentSubmit}>Place Order </button>
        </div>
        :""
    } 

        {orderStatus ==true ? 
        <PlaceOrder  checkBoxId={checkBoxId}/>
        :""}

     </>
    )
}

export default CheckoutForm

{/* : fillForm ==true && orderStatus ==false ? */}