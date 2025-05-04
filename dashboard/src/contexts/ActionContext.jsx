import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toastError, toastSuccess } from "../lib/Toast";

export const ActionContext = createContext();

function ActionProvider({ children }) {
  const [toggleRequest, setToggleRequest] = useState(false);
  const [editObject, setEditObject] = useState(null);
  const [url, setUrl] = useState("");

  function openModal(prd, modal_name, u) {
    setEditObject(prd);
    modal_name === "confirm_modal" && setUrl(u);
    document.getElementById(modal_name).showModal();
  }

  async function handleDelete() {
    try {
      const { data } = await axios.delete(`${url}${editObject._id}`);
      toastSuccess(data.message);
      setToggleRequest((prev) => !prev);
      setEditObject(null);
      document.getElementById("confirm_modal").close();
    } catch (error) {
      console.log(error);
      const err = error.response.data.error;
      toastError(err);
    }
  }

  useEffect(() => {}, [editObject]);

  const value = {
    toggleRequest,
    setToggleRequest,
    openModal,
    editObject,
    handleDelete,
  };
  return (
    <ActionContext.Provider value={value}>{children}</ActionContext.Provider>
  );
}

export default ActionProvider;
