import React, { useEffect, useState } from "react";

import web3 from "./web3";
import lottery from "./lottery";

const App = () => {
  const [manager, setManager] = useState("");
  useEffect(() => {
    const fetchManager = async () => {
      const manager = await lottery.methods.manager().call();
      setManager(manager);
    };
    fetchManager();
    // const players = lottery.methods.getPlayers().call();
    // const balance = web3.eth.getBalance(lottery.options.address);
  }, []);
  return (
    <div>
      <h2>LOtter COntract</h2>
      <p>This contract is managed by {manager}</p>
    </div>
  );
};
export default App;
