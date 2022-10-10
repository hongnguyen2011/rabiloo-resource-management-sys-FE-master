import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

let listeners = [];

function useAppAccount() {
  const cookies = new Cookies();
  const accountLocal = cookies.get("account");
  const [account, setAccount] = useState(accountLocal);

  useEffect(() => {
    listeners.push(setAccount);
    return () => {
      const newListeners = listeners.filter((listener) => {
        return listener !== setAccount;
      });
      listeners = newListeners;
    };
  }, []);

  useEffect(() => {
    cookies.set("account", account);
    listeners.forEach((listener) => listener(account));
  }, [account]);

  //write this to recommend code in other files
  let accountForRecommend = {
    name: null,
    email: null,
    phone: null,
  };
  if (account) {
    accountForRecommend = account;
  }

  return {
    account: accountForRecommend,
    setAccount: setAccount,
  };
}

export { useAppAccount };
