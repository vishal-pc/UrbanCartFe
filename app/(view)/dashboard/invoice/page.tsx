"use client";
import React, { useState, useEffect } from "react";
import "./style.css";

const InvoicePage = () => {
  const [date, setDate] = useState("");
  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    setDate(formattedDate);
  }, []);

  return (
    <>
      <div className="bodys">
        <div className="invoice-container">
          <div className="invoice-header">
            <h1 className="invoice-title" style={{ textAlign: "end" }}>
              Invoice
            </h1>
          </div>

          <div className="container">
            <div className="billing-information">
              <h1 style={{ fontFamily: "auto" }}>BILLED TO</h1>
              <p>Samira Hadid</p>
              <p>123 Anywhere St., Any City, ST 12345</p>
              <p>(555) 555-5555</p>
            </div>

            <div className="billing-informations">
              <h1 style={{ fontFamily: "auto" }}>Invoice NO 123</h1>
              <p>{date}</p>
            </div>
          </div>

          <div className="invoice-details">
            <table className="table-start">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Unit Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Eggshell Camisole Top</td>
                  <td>1</td>
                  <td>$123.00</td>
                  <td>$123.00</td>
                </tr>
                <tr>
                  <td>Cuban Collar Shirt</td>
                  <td>2</td>
                  <td>$127.00</td>
                  <td>$254.00</td>
                </tr>
                <tr>
                  <td>Floral Cotton Dress</td>
                  <td>1</td>
                  <td>$129.00</td>
                  <td>$129.00</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="invoice-summary">
            <table>
              <tbody>
                <tr>
                  <th>Subtotal</th>
                  <td>$500.00</td>
                </tr>
                <tr>
                  <th>Tax (0%)</th>
                  <td>$0.00</td>
                </tr>
                <tr>
                  <th>Total</th>
                  <td>$500.00</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="container mt-5">
            <div className="payment-information">
              <p className="payment-instructions">Payment Information:</p>
              <p>Payment Method : Card</p>
              <p>Pay By : {date}</p>
            </div>

            <div className="payment-information">
              <p className="payment-instructions">Users Name</p>
              <p>1231 Street , model town</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvoicePage;
