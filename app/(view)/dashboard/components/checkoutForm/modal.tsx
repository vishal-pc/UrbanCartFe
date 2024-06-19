import React,{useState,memo, ChangeEvent} from 'react'
import { EditIcon } from '@/public/svg/edit';
import { updateAddressAPI } from '@/app/services/apis/address';
import { CitySelect, CountrySelect, StateSelect, GetState } from "react-country-state-city";
import { addressType } from '@/app/types/userTypes';
import { toast } from 'react-toastify';

const ModalCompo = ({onUpdateSuccess,data }: {onUpdateSuccess: () => void ,data:any}) => {

    const formData = data
    // console.log(data?.data,"dfffffffffffffffffffffffffffffff")
    const id=data?._id
    const [countryid, setCountryid] = useState(101);
    const [stateid, setstateid] = useState(0);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [objData, setObjData] = useState({
      stateName: "",
      stateId: 0,
      cityName: "",
      cityId: 0,
    });
  
    const [formDataState, setFormDataState] = useState({
      streetAddress: formData?.streetAddress,
      nearByAddress: formData?.nearByAddress,
      country: "India",
      areaPincode: formData?.areaPincode,
      mobileNumber: formData?.mobileNumber,
      stateName: formData?.stateName,
      stateId: formData?.stateId,
      cityName: formData?.cityName,
      cityId: formData?.cityId
    });
  

    const toggleModal = () => {
      setIsModalOpen(!isModalOpen);
    };

    const updateAddressHanlder = async(e:React.SyntheticEvent<HTMLFormElement>) =>{
        e.preventDefault();
        console.log("update--",formDataState)
        console.log(id)
        const resp = await updateAddressAPI(id,formDataState)
        if(resp?.status===200){
          setIsModalOpen(false)
          onUpdateSuccess()
          toast.success(resp?.message)
        }else{
          toast.error(resp?.message)
        }
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
     
        setFormDataState(prevState => ({
          ...prevState,
          [name]: value
        }));
      
    };

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
    };
  }
  return (
    <>

        {/* <button
            type="button"
            className=" ml-auto py-1 px-2 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
            onClick={toggleModal}
         >
        + Add New Address
        </button> */}

        <button
            type="button"
            className=" ml-12 py-1 px-2 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-gray-400 text-white  disabled:opacity-50 disabled:pointer-events-none"
            onClick={toggleModal}
         >
            <EditIcon/>
        </button>

        {/*  bg-gray-400 text-white px-2 py-1 rounded flex items-center */}

      {isModalOpen && (
        <div
          id="hs-basic-modal"
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black bg-opacity-50"
        >
          <div className="sm:max-w-lg sm:w-full bg-white rounded-lg shadow-lg">
            <div className="flex justify-between items-center py-3 px-4 border-b">
              <h3 className="font-bold text-gray-800">Edit Address</h3>
              <button
                type="button"
                className="flex justify-center items-center w-7 h-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
                onClick={toggleModal}
              >
                <span className="sr-only">Close</span>
                <svg
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              </button>
            </div>


            {/* body */}
            <div className="p-4">
              {/* <p className="mt-1 text-gray-800">
                This is a wider card with supporting text below as a natural lead-in to additional content.
              </p> */}

              <form className="space-y-4">
                    <div>
                        <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Street Address</label>

                        <input type="text" name="streetAddress" id="streetAddress" className="bg-white-50 border border-gray-300 text-black-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black" placeholder="please enter your street address" required 
                      value={formDataState.streetAddress}
                      onChange={handleChange}
                        />

                    </div>

                    <div>
                        <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Near By Address</label>

                        <input type="text" name="nearByAddress" id="nearByAddress" className="bg-white-50 border border-gray-300 text-black-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black" placeholder="please enter your street address" required 
                       value={formDataState.nearByAddress}
                       onChange={handleChange}                       
                        />
                    </div>

                    

                    <div className="flex flex-wrap -mx-3 mb-2">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">

                            <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Country</label>

                            <input type="text" name="country" id="country" className="bg-white-50 border border-gray-300 text-black-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black" placeholder="please enter your street address" required 
                            value={formDataState.country}
                            disabled
 />
                        </div>

                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">

                             <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">mobileNumber</label>

                            <input type="text" name="mobileNumber" id="mobileNumber" className="bg-white-50 border border-gray-300 text-black-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black" placeholder="please enter your street address" required 
                            maxLength={10} minLength={10}
                            value={formDataState.mobileNumber}
                            onChange={handleChange}                        
                            />
                        </div>

                    </div>
             
                    <div className="flex flex-wrap -mx-3 mb-2">
                      <div className='flex'>

                      <div className='ml-3 mb-1'>
                      <label htmlFor="State" className="block mb-2 w-[50%] text-sm font-medium text-gray-900 dark:text-black">State name</label>

                    <StateSelect
                    countryid={countryid}
                    onChange={(e: any) => handleCustomList(e)}
                    name="stateName"
                    className="mt-1 block w-[50%] rounded border-gray-300 bg-gray-50 py-3 px-4 text-md placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                    placeHolder="Select State"
                  />
                      </div>
                 <div className='ml-3'>
                 <label htmlFor="City" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">City name</label>

                  <CitySelect
                      countryid={countryid}
                      stateid={stateid}
                      onChange={(e: any) => handleCustomList(e)}
                    //   className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-md placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                      id="grid-city"
                      placeHolder="Select City"
                    />
                 </div>
                      </div>
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">

                             <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Pincode</label>

                            <input type="text" name="areaPincode" id="areaPincode" className="bg-white-50 border border-gray-300 text-black-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black" placeholder="please enter your street address" required 
                            maxLength={6} minLength={6}
                            value={formDataState.areaPincode}
                            onChange={handleChange}                        
                            />
                        </div>

                    </div>

                </form>
            </div>




            <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t">
              <button
                type="button"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                onClick={toggleModal}
              >
                Close
              </button>
              <button
                type="submit"
                onClick={(e:any)=>updateAddressHanlder(e)}
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-gray-400 text-black "
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default memo(ModalCompo)