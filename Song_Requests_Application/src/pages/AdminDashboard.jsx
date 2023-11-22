import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "../App.css";
import ChartComponent from "../components/ChartComponent";

const AdminDashboard = () => {
  const location = useLocation();
  const id = location.state?.id;

  const [originalData, setOriginalData] = useState({});
  const [data, setData] = useState({
    name: "",
    location: "",
    charge_customers: false,
    amount: {
      category_6: "",
      category_7: "",
      category_8: "",
      category_9: "",
      category_10: "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://stg.dhunjam.in/account/admin/${id}`
        );
        if (response.data.response === "Success") {
          setData(response.data.data);
          setOriginalData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const [formIsValid, setFormIsValid] = useState(true);

  const handleRadioChange = (e) => {
    console.log(e.target.value);
    const chargeCustomersValue = e.target.value === "true";
    setFormIsValid(chargeCustomersValue);

    setData((prevData) => ({
      ...prevData,
      charge_customers: chargeCustomersValue,
    }));
  };

  const handleCustomAmountChange = (e) => {
    const customAmount = e.target.value;
    setData((prevData) => ({
      ...prevData,
      amount: { ...prevData.amount, category_6: customAmount },
    }));
    setFormIsValid(parseInt(customAmount, 10) >= 99);
  };

  const handleRegularAmountChange = (category, value) => {
    setData((prevData) => ({
      ...prevData,
      amount: { ...prevData.amount, [category]: value },
    }));
  };

  useEffect(() => {
    const Amounts = [
      data.amount.category_6,
      data.amount.category_7,
      data.amount.category_8,
      data.amount.category_9,
      data.amount.category_10,
    ];

    const isValid = Amounts.every(
      (amount, index) =>
        !data.charge_customers ||
        parseInt(amount, 10) >= [99, 79, 59, 39, 19][index]
    );

    setFormIsValid(isValid);
  }, [data]);

  const categories = [
    "Category 6",
    "Category 7",
    "Category 8",
    "Category 9",
    "Category 10",
  ];
  const amounts = [
    data.amount.category_6,
    data.amount.category_7,
    data.amount.category_8,
    data.amount.category_9,
    data.amount.category_10,
  ];

  const handleSave = async () => {
    try {
      const modifiedCategory = {};
      for (const category of [
        "category_6",
        "category_7",
        "category_8",
        "category_9",
        "category_10",
      ]) {
        if (data.amount[category] != originalData.amount[category]) {
          modifiedCategory[category] = parseInt(data.amount[category], 10);
        }
      }
      const modifiedAmounts = { amount: { ...modifiedCategory } };
      const response = await axios.put(
        `https://stg.dhunjam.in/account/admin/${id}`,
        modifiedAmounts
      );
      if (response.data.response === "Success") {
        alert(`sent successfully`);
      }
      if (response.response.data.status) {
      } else {
        alert(`please enter valid amount`);
      }
    } catch (error) {
      if (error.response.data.status) {
        alert(`please enter invalid amount`);
      }
      console.error("Error sending data:", error);
    }
  };

  return (
    <>
      <div className="container">
        <div className="flex-container">
          <h1>
            {data.name}, {data.location} on Dhun Jam
          </h1>

          <div className="item">
            <div className="description">
              Do you want to charge your customers for requesting songs?
            </div>
            <div className="radio-container fields">
              <label>
                <input
                  type="radio"
                  value="true"
                  checked={data.charge_customers}
                  onChange={handleRadioChange}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  value="false"
                  checked={!data.charge_customers}
                  onChange={handleRadioChange}
                />
                No
              </label>
            </div>
          </div>
        </div>

        <div className="item">
          <div className="description">Custom song request amount-</div>
          <div>
            <input
              className="input custom"
              type="number"
              value={data.amount.category_6}
              disabled={!data.charge_customers && !formIsValid}
              onChange={handleCustomAmountChange}
            />
          </div>
        </div>

        <div className="item">
          <div className="description">
            Regular song request amounts, from high to low-
          </div>
          <div className="input-container">
            {["category_7", "category_8", "category_9", "category_10"].map(
              (category, index) => (
                <input
                  key={index}
                  className="input field"
                  type="number"
                  value={data.amount[category]}
                  disabled={!data.charge_customers && !formIsValid}
                  onChange={(e) =>
                    handleRegularAmountChange(category, e.target.value)
                  }
                />
              )
            )}
          </div>
        </div>
        <ChartComponent categories={categories} amounts={amounts} />
        <button
          className="save-button"
          type="submit"
          disabled={!data.charge_customers || !formIsValid}
          onClick={() => handleSave()}
        >
          Save
        </button>
      </div>
    </>
  );
};

export default AdminDashboard;
