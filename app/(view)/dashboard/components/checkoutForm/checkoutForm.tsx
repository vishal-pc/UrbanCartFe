"use cleint";
import React, { useState, useEffect } from "react";
import { addressType } from "@/app/types/userTypes";
import { toast } from "react-toastify";
import { addAddressApi, getAddressAPI } from "@/app/services/apis/address";
import { getToCartAPI, getItemInCartAPI } from "@/app/services/apis/user";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
  GetState,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import PlaceOrder from "./placeOrder";
import { loadStripe } from "@stripe/stripe-js";
import { stripeSessionAPI } from "@/app/services/apis/user";
import { delAddressByIdAPI } from "@/app/services/apis/address";
import { DelIcon } from "@/public/svg/del";
import { EditIcon } from "@/public/svg/edit";
import { AddIcon } from "@/public/svg/add";
import ModalCompo from "./modal";
import { useFormik } from "formik";
import * as yup from "yup";

const CheckoutForm = () => {
  const AddressValue = {
    streetAddress: "",
    nearByAddress: "",
    country: "india",
    stateName: "",
    cityName: "",
    areaPincode: "",
    mobileNumber: "",
  };
  const publishableKey: string | any =
    process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;


  const [countryid, setCountryid] = useState(101);
  const [stateid, setstateid] = useState(0);
  const [objData, setObjData] = useState({
    stateName: "",
    stateId: 0,
    cityName: "",
    cityId: 0,
  });

  const [fillForm, setFillForm] = useState(false);
  const [showAddress, setShowAddress] = useState([]);
  const [checkBoxId, setCheckBoxId] = useState<any>("");
  const [getAllData, setGetAllData] = useState<any | []>([]);
  const [subTotal, setSubTotal] = useState("");
  const [orderStatus, setOrderStatus] = useState(false);

  const [checked, setChecked] = useState(false);

  const allAddress = async () => {
    const getAllAdd = await getAddressAPI();
    if (getAllAdd.status == 200 && getAllAdd.addressData != "") {
      setFillForm(true);
      setShowAddress(getAllAdd.addressData);
    } else {
      setChecked(false);
    }
  };

  useEffect(() => {
    allAddress();
  }, []);
  const handleUpdateSuccess=async()=>{
    const response= await getAddressAPI();
    if(response?.status===200){
      allAddress()
    }
  }

  const AdressSchema = yup.object({
    streetAddress: yup.string().required("Street Addres is requried"),
    nearByAddress: yup.string().required("Near by Address is requried"),
    areaPincode: yup
      .string()
      .required("Pincode is required")
      .matches(/^\d{6}$/, "Pincode must be exactly 6 digits"),
    mobileNumber: yup
      .string()
      .required("Mobile number is required")
      .matches(/^[0-9]+$/, "Mobile number must contain only digits")
      .min(10, "Mobile number must be at least 10 digits")
      .max(10, "Mobile number must be at most 10 digits"),
  });

  const { values, errors, touched, handleBlur, validateForm,handleChange, handleSubmit } =
    useFormik({
      initialValues: AddressValue,
      validationSchema: AdressSchema,
      onSubmit: async (values, action) => {
        console.log("formValue", values, objData)
        console.log("clikced");
        const updatedObject: any = {
          ...values,
          stateName: objData.stateName,
          stateId: objData.stateId,
          cityName: objData.cityName,
          cityId: objData.cityId,
        };
        const resp = await addAddressApi(updatedObject);
        if (resp.status == 201) {
          setCheckBoxId(resp.data);
          setOrderStatus(true);
          const getAllAdd = await getAddressAPI();
          if (getAllAdd.status == 200) {
            console.log("getAllAdd--", resp);
            setFillForm(true);
            setShowAddress(getAllAdd.addressData);
          }
        }else{
            toast.error(resp?.message)
        }
      },
    });

  const handleCustomList = (e: any) => {
    const { name, id, latitude } = e;

    if (latitude) {
      setObjData((prevData) => ({
        ...prevData,
        cityName: name,
        cityId: id,
      }));
      handleChange({ target: { name: 'cityName', value: name } });
    } else {
      if (id !== stateid) {
        setstateid(id);
        setObjData((prevData) => ({
          ...prevData,
          stateName: name,
          stateId: id,
        }));
      handleChange({ target: { name: 'stateName', value: name } });
      }
    }
    validateForm()
  };


  const getAllCart = async () => {
    const resp = await getToCartAPI();
    if (resp?.status == 200) {
      const datas = resp.data.cartItems.filter((data: {message:string}) => {
        if (data.message !== "Product not found") {
          return data;
        }
      });
      setGetAllData(datas);
      setSubTotal(resp.data.totalCartAmount);
    }
  };

  useEffect(() => {
    getAllCart();
  }, []);

  const handleCheckbox = (e: any) => {
    setCheckBoxId(e);
  };

  // validate payment methods
  const handlePaymentSubmit = (e: any) => {
    if (checkBoxId._id == "") {
      toast.error("please select address");
    } else if (checkBoxId._id != "") {
      let finalAd: any;
      showAddress.filter((data: any) => {
        if (data._id == checkBoxId._id) {
          finalAd = data;
        }
      });
      if (finalAd._id) {
        setOrderStatus(true);
      }
    }
  };

  const india = [
    {
      id: 101,
      name: "India",
      emoji: "🇮🇳",
    },
  ];

  const delAddressHandler = async (id: string) => {
    // console.log(id);
    const resp = await delAddressByIdAPI(id);
    if (resp.status == 200) {
      allAddress();
    }
    // console.log("dele----",resp)
  };

  const checkedAddress = (e: any) => {
    const { value } = e.target;
    if (value == "check1") {
      setChecked(true);
    } else if (value == "check2") {
      setChecked(false);
    }
    // console.log("checkedAddress",e.target.value)
  };

  return (
    <>
      {orderStatus == false ? (
        <div className="mx-auto w-full  max-w-lg">
          <div className="flex items-center mb-4">
            <input
              id="default-radio-1"
              type="radio"
              value="check1"
              name="default-radio"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600"
              onChange={(e) => checkedAddress(e)}
            />
            <label
              htmlFor="default-radio-1"
              className="ms-2  font-medium text-md text-gray-900 dark:text-black-300"
            >
              Shipping Previous Address
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="default-radio-2"
              type="radio"
              value="check2"
              name="default-radio"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600"
              checked={checked == false ? true : undefined}
              onChange={(e) => checkedAddress(e)}
            />
            <label
              htmlFor="default-radio-2"
              className="ms-2 text-md font-medium text-gray-900 dark:text-black-300"
            >
              Shipping New Address
            </label>
          </div>
        </div>
      ) : (
        ""
      )}
      {checked == false && orderStatus == false ? (
        <div className="mx-auto w-full max-w-lg mt-5">
          {/* <h3>Previous address</h3> */}

          <h1 className="relative text-2xl font-medium text-gray-700 sm:text-3xl">
            New Address{" "}
            <span className="mt-2 block h-1 w-10 bg-teal-600 sm:w-20"></span>
          </h1>

          <form className="mt-10 flex flex-col" onSubmit={handleSubmit}>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="text-md font-semibold text-gray-500"
                  htmlFor="grid-last-name"
                >
                  Street Address
                </label>
                <input
                  name="streetAddress"
                  className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-md placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                  id="grid-last-name"
                  type="text"
                  placeholder="please enter your street address"
                  value={values.streetAddress}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.streetAddress && touched.streetAddress ? (
                  <p className="text-red-500">{errors.streetAddress}</p>
                ) : null}
              </div>

              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="text-md font-semibold text-gray-500"
                  htmlFor="grid-first-name"
                >
                  Near By Address
                </label>
                <input
                  name="nearByAddress"
                  className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-md placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                  id="grid-first-names"
                  type="text"
                  placeholder="please enter your near by address"
                  value={values.nearByAddress}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.nearByAddress && touched.nearByAddress ? (
                  <p className="text-red-500">{errors.nearByAddress}</p>
                ) : null}
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-2">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="text-md font-semibold text-gray-500"
                  htmlFor="grid-city"
                >
                  Country
                </label>

                <input
                  name="country"
                  className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-md placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                  id="grid-city"
                  type="text"
                  placeholder="Country"
                  defaultValue={`${india[0].emoji} ${india[0].name}`}
                  disabled
                />
              </div>

              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="text-md font-semibold text-gray-500"
                  htmlFor="grid-city"
                >
                  Mobile No
                </label>
                <input
                  name="mobileNumber"
                  className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-md placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                  id="grid-city"
                  type="text"
                  placeholder="Mobile No"
                  maxLength={10}
                  minLength={10}
                  value={values.mobileNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.mobileNumber && touched.mobileNumber ? (
                  <p className="text-red-500">{errors.mobileNumber}</p>
                ) : null}
              
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-2">
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  className="text-md font-semibold text-gray-500"
                  htmlFor="grid-state"
                >
                  State
                </label>

                <div className="relative">
                

                  <StateSelect
                    countryid={countryid}
                    onChange={(e: any) => handleCustomList(e)}
                    name="stateName"
                    className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-md placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                    placeHolder="Select State"
                  />
                    {errors.stateName && touched.stateName ? (
                  <p className="text-red-500">{errors.stateName}</p>
                ) : null}
                </div>
              </div>

              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  className="text-md font-semibold text-gray-500"
                  htmlFor="grid-city"
                >
                  City
                </label>
            
                <CitySelect
                  countryid={countryid}
                  stateid={stateid}
                  onChange={(e: any) => handleCustomList(e)}
                //   className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-md placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                  id="grid-city"
                  placeHolder="Select City"
                />
                 {errors.cityName && touched.cityName ? (
                  <p className="text-red-500">{errors.cityName}</p>
                ) : null}
              </div>

              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  className="text-md font-semibold text-gray-500"
                  htmlFor="grid-zip"
                >
                  Pincode
                </label>
                <input
                  name="areaPincode"
                  className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-md placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                  id="grid-zip"
                  type="text"
                  placeholder="Pincode"
                  maxLength={6}
                  minLength={6}
                  value={values.areaPincode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.areaPincode && touched.areaPincode ? (
                  <p className="text-red-500">{errors.areaPincode}</p>
                ) : null}
              </div>
            </div>

            <button
              type="submit"
             
              className="mt-10 inline-flex w-full items-center justify-center rounded bg-gray-700 py-2.5 px-4 text-base font-semibold tracking-wide text-white  outline-none ring-offset-2 transition hover:text-opacity-100 focus:ring-2 focus:gray-teal-500 sm:text-md"
            >
              Add Address
            </button>
          </form>
        </div>
      ) : checked == true && orderStatus == false ? (
        <div className="mx-auto w-full max-w-lg mt-5">
          <h1 className="relative text-2xl font-medium text-gray-700 sm:text-1xl">
            Previous Saved Address
            <span className="mt-2 block h-1 w-10 bg-teal-600 sm:w-20"></span>
          </h1>

          <div className="flex items-center mt-5">
            {/* <h3 className="text-md font-semibold text-gray-500 mt-5">Select Address</h3>

                <button className="ml-auto bg-blue-500 text-white px-1 py-1 rounded mr-4"><AddIcon /> Add New Address</button>
                <ModalCompo /> */}
          </div>

          <fieldset className="mt-4">
            {showAddress && showAddress.length > 0
              ? showAddress.map((dm: any, i) => (
                  <div className="flex items-center mb-4" key={i}>
                    <input
                      id="country-option-1"
                      type="radio"
                      name="countries"
                      value={dm._id}
                      className="w-4 h-4 border-gray-300  dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                      onChange={(e) => handleCheckbox(dm)}
                    />
              
                    <div className="flex items-center">
                      <label
                        htmlFor="country-option-1"
                        className="block ms-2 text-md font-medium text-gray-900 dark:text-gray-500"
                      >
                        {dm?.streetAddress}, {dm?.nearByAddress},{" "}
                        {dm?.areaPincode}
                      </label>
                      {/* <button className=" bg-gray-400 text-white px-2 py-1 rounded flex items-center ml-12"><EditIcon/></button> */}
                      <ModalCompo data={dm} onUpdateSuccess={handleUpdateSuccess}/>
                      <button
                        className=" ml-[1rem] py-1 px-2 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-gray-400 text-white disabled:opacity-50 disabled:pointer-events-none"
                        type="submit"
                        onClick={() => delAddressHandler(dm._id)}
                      >
                        <DelIcon />
                      </button>
                    </div>
                  </div>
                ))
              : "No addresses available"}
          </fieldset>

          <button
            type="submit"
            className="mt-10 inline-flex w-full items-center justify-center rounded bg-gray-600 py-2.5 px-4 text-base font-semibold tracking-wide text-white outline-none ring-offset-2 transition hover:text-opacity-100 focus:ring-2 focus:gray-teal-500 sm:text-md"
            onClick={handlePaymentSubmit}
          >
            Place Order{" "}
          </button>
        </div>
      ) : (
        ""
      )}

      {orderStatus == true ? <PlaceOrder checkBoxId={checkBoxId} /> : ""}
    </>
  );
};

export default CheckoutForm;

