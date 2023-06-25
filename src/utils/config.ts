import { ethers } from "ethers";
import { toast } from "react-toastify";

export const AppConfig = {
  production: false,
  locale: "pt",
};

export const biconomyDashboard = {
  Polygon: {
    apiKey: "",
  },
  Mumbai: {
    apiKey: "",
  },
  goerli: {
    apiKey: "A9n_aXnOA.6e64180d-4d50-4394-8f64-4ec76d1cbb4d",
  },
};

/** Errors Messages */
export const showErrorMessage = (message: string) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const showInfoMessage = (message: string) => {
  toast.info(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const showSuccessMessage = (message: string) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const showSuccessMessagePending = (promise: Promise<void>) => {
  toast.promise(promise, {
    pending: "Promise is pending",
    success: "Promise resolved 👌",
    error: "Promise rejected 🤯",
  });
};

/** Ethers signatures */
export const getSignatureParametersEthers = (signature: any) => {
  if (!ethers.utils.isHexString(signature)) {
    throw new Error(
      'Given value "'.concat(signature, '" is not a valid hex string.')
    );
  }
  const r = signature.slice(0, 66);
  const s = "0x".concat(signature.slice(66, 130));
  let v = "0x".concat(signature.slice(130, 132));
  v = ethers.BigNumber.from(v).toString();
  if (![27, 28].includes(Number(v))) v += 27;
  return {
    r,
    s,
    v: Number(v),
  };
};
