import Link from "next/link";
import React, { useState } from "react";

const Checkout = (props: any) => {
  const [checkout, setCheckout] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    gender: "",
    city: "",
    state: "",
    address: "",
  });
  const [message, setMessage] = useState("");
  const handleSubmit = (event: any) => {
    event.preventDefault();
  };
  return (
    <section className="py-[150px]">
      <form
        onSubmit={handleSubmit}
        className="flex w-4/5 flex-col gap-2 mx-auto items-center"
      >
        {message.length > 0 && (
          <div className="border border-green-500 bg-green-500 p-3 my-5 w-[30%] text-center rounded text-white ">
            {message}
          </div>
        )}
        {props.cart[0].itemCode !== "" ? (
          <div className="w-full">
            <h3 className="text-3xl my-3">Review Your Items</h3>
            <ul>
              <li className="w-full">
                <div className="w-full bg-slate-200 flex justify-between text-center p-2 rounded">
                  <h5 className="w-[16%] text-xl font-semibold">SNo</h5>
                  <h5 className="w-[16%] text-xl font-semibold">
                    Product Name
                  </h5>
                  <h5 className="w-[16%] text-xl font-semibold">Size</h5>
                  <h5 className="w-[16%] text-xl font-semibold">Quantity</h5>
                  <h5 className="w-[16%] text-xl font-semibold">Price</h5>
                  <h5 className="w-[16%] text-xl font-semibold">Total Price</h5>
                </div>
              </li>
              {props.cart.map((item: any, index: any) => {
                return (
                  <li className="w-full">
                    <div className="w-full flex bg-slate-50 justify-between text-center p-3 rounded">
                      <h5 className="w-[16%] text-lg">1</h5>
                      <h5 className="w-[16%] text-lg">{item.name}</h5>
                      <h5 className="w-[16%] text-lg">{item.size}</h5>
                      <h5 className="w-[16%] text-lg">{item.qty}</h5>
                      <h5 className="w-[16%] text-lg">Rs. {item.price} /-</h5>
                      <h5 className="w-[16%] text-lg">Rs. {props.total} /-</h5>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <div className="w-full flex flex-col">
            <h3 className="text-4xl my-3">Review Your Items</h3>
            <h4 className="text-xl">Your Cart Is Empty !</h4>
            <Link href={"/tshirts"}>
              <button className="bg-amber-600 w-1/5 rounded py-2 px-4 text-white outline-none my-5">
                Add Items
              </button>
            </Link>
          </div>
        )}
        <div>
          <h2 className="text-5xl font-semibold mb-8 mt-3">PLACE ORDER !</h2>
        </div>
        <div className="w-full flex gap-10">
          <div className="w-1/2 flex flex-col gap-2">
            <label htmlFor="name">Name</label>
            <input
              onChange={(e) =>
                setCheckout({ ...checkout, name: e.target.value })
              }
              className="border w-[full] border-gray-600 outline-none p-3 rounded "
              type="text"
              name="name"
              id="name"
            />
          </div>
          <div className="w-1/2 flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              onChange={(e) =>
                setCheckout({ ...checkout, email: e.target.value })
              }
              className="border w-[full] border-gray-600 outline-none p-3 rounded "
              type="email"
              name="email"
              id="email"
            />
          </div>
        </div>
        <div className="w-full flex gap-10">
          <div className="w-full flex gap-10">
            <div className="w-1/2 flex flex-col gap-2">
              <label htmlFor="phoneNumber">phone Number</label>
              <input
                onChange={(e) =>
                  setCheckout({ ...checkout, phoneNumber: e.target.value })
                }
                className="border w-full border-gray-600 outline-none p-3 rounded "
                type="text"
                name="phoneNumber"
                id="phoneNumber"
              />
            </div>
            <div className="w-1/2 flex flex-col gap-2">
              <label htmlFor="gender">Gender</label>
              <input
                onChange={(e) =>
                  setCheckout({ ...checkout, gender: e.target.value })
                }
                className="border w-full border-gray-600 outline-none p-3 rounded "
                type="text"
                name="gender"
                id="gender"
              />
            </div>
          </div>
        </div>
        <div className="w-full flex gap-10">
          <div className="w-full flex gap-10">
            <div className="w-1/2 flex flex-col gap-2">
              <label htmlFor="phoneNumber">City</label>
              <input
                onChange={(e) =>
                  setCheckout({ ...checkout, city: e.target.value })
                }
                className="border w-full border-gray-600 outline-none p-3 rounded "
                type="text"
                name="city"
                id="city"
              />
            </div>
            <div className="w-1/2 flex flex-col gap-2">
              <label htmlFor="gender">State</label>
              <input
                onChange={(e) =>
                  setCheckout({ ...checkout, state: e.target.value })
                }
                className="border w-full border-gray-600 outline-none p-3 rounded "
                type="text"
                name="state"
                id="state"
              />
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col">
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="gender">Address</label>
            <textarea
              onChange={(e) =>
                setCheckout({ ...checkout, address: e.target.value })
              }
              className="border w-full border-gray-600 outline-none p-3 rounded "
              name="address"
              rows={3}
              id="address"
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-10 text-3xl border border-amber-600 bg-amber-600 text-white w-[30%] p-3 rounded"
        >
          Checkout
        </button>
      </form>
      <hr className="w-4/5 mx-auto my-14" />
    </section>
  );
};

export default Checkout;
