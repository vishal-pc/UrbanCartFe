"use client";
import { getAllPayments } from "@/app/services/apis/payment";
import { AddFeedBackApi } from "@/app/services/apis/user";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import * as yup from "yup";

export interface ContactType {
  reasonForContact: string;
  productId: string;
  userName: string;
  userEmail: string;
  userMobileNumber?: number | undefined;
  userComment: string;
}

interface product {
  productId: string,
  productName: string
}
const Contact = () => {
  const [Product, setProduct] = useState<product[]>([])
  const [names, setNames] = useState([])
  const [orderproductId, setProductId] = useState("")
  const OrderData = async () => {
    const response = await getAllPayments()
    if (response?.status === 200) {
      setProduct(response?.payments[0]?.totalProduct)
      const names = response.payments[0]?.totalProduct.map((product: { productName: string }) => product?.productName)
      setNames(names)
    } else {
      toast.error(response?.message)
    }
  }

  let contactForm: ContactType = {
    reasonForContact: "",
    productId: "",
    userName: "",
    userEmail: "",
    userComment: "",
    userMobileNumber: undefined,
  };

  const ContactFormValidation = yup.object({
    reasonForContact: yup
      .string()
      .required("Select reason for contact")
      .matches(/[a-zA-Z]/, "Invalid reason"),
    productId: yup
      .string()
      .required("Please select product"),
    userName: yup
      .string()
      .required("Please enter your name")
      .matches(/[a-zA-Z]/, "Invalid"),
    userEmail: yup.string().email().required("Please enter email"),
    userComment: yup
      .string().max(400)
      .required("Please enter  your feedback")
      .matches(/[a-zA-Z]/, "Invalid Message"),
    userMobileNumber: yup
      .string()
      .matches(/^[0-9]{10}$/, "Invalid mobile number")
      .required("Please enter your mobile number"),
  });

  const { values, touched, errors, handleBlur, setFieldValue, handleChange, handleSubmit } =
    useFormik({
      initialValues: contactForm,
      validationSchema: ContactFormValidation,
      onSubmit: async (values, action) => {
        let newValue = {
          ...values,
          productId: orderproductId
        }
        const response = await AddFeedBackApi(newValue)
        if (response?.status === 201) {
          action.resetForm()
          setFieldValue("userMobileNumber", "")
          toast.success(response?.message)
        } else {
          toast.error(response?.message)
        }
      }
    });
  useEffect(() => {
    OrderData()
  }, [])
  const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProductName = e.target.value;
    const selectedProduct = Product.find((product) => product.productName === selectedProductName);
    const productId = selectedProduct ? selectedProduct.productId : "";
    console.log(productId)
    setProductId(productId)
    setFieldValue("productId", e.target.value);
  };
  return (
    <div className="mt-8 mb-8 mr-12 ml-12 bg-white">
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
            Contact Us
          </h2>
          <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
            Encountering a product issue? Have feedback about our beta features?
            Interested in learning more about our Business plan? Reach out to us
            — we are here to help!
          </p>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label
                htmlFor="reasonForContact"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Your reason for Contact
              </label>
              <select
                id="reasonForContact"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                value={values.reasonForContact}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              >
                <option value="">Select reason for contact</option>
                <option value="Feedback">Feedback</option>
                <option value="Query">Query</option>
                <option value="Complaint">Complaint</option>
              </select>
              {errors.reasonForContact && touched.reasonForContact ? (
                <p>{errors.reasonForContact}</p>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="productId"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Product Name
              </label>
              <select
                id="productId"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                value={values.productId}
                onChange={handleProductChange}
                onBlur={handleBlur}
                required
              >
                <option value="">Select product</option>
                {names?.map((name, index) => (
                  <option key={index} value={name}>
                    {name}
                  </option>
                ))}
              </select>
              {errors.productId && touched.productId ? <p>{errors.productId}</p> : null}
            </div>
            <div>
              <label
                htmlFor="userName"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Your Name
              </label>
              <input
                type="text"
                id="userName"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                value={values.userName}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Name"
                required
              />
              {errors.userName && touched.userName ? (
                <p>{errors.userName}</p>
              ) : null}
            </div>
            <div>
              <label
                htmlFor="userEmail"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Your Email
              </label>
              <input
                type="email"
                id="userEmail"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                value={values.userEmail}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Email"
                required
              />
              {errors.userEmail && touched.userEmail ? (
                <p>{errors.userEmail}</p>
              ) : null}
            </div>
            <div>
              <label
                htmlFor="userMobileNumber"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Your Mobile Number
              </label>
              <input
                type="number"
                id="userMobileNumber"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                value={values.userMobileNumber || ""}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder=""
                required
              />
              {errors.userMobileNumber && touched.userMobileNumber ? (
                <p>{errors.userMobileNumber}</p>
              ) : null}
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="userComment"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
              >
                Your Message
              </label>
              <textarea
                id="userComment"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value={values.userComment}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Leave a comment..."
              ></textarea>
              {errors.userComment && touched.userComment ? (
                <p>{errors.userComment}</p>
              ) : null}
            </div>
            <button
              type="submit"
              className="py-3 px-5 text-sm font-medium text-center text-black rounded-lg bg-primary-700 sm:w-fit bg-gray-300  "
            >
              Send message
            </button>
          </form>
        </div>
      </section>
      <ToastContainer />
    </div>
  );
};

export default Contact

