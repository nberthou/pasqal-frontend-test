import { useEffect, useState } from "react";
import * as ReactDOM from "react-dom";
import data from "./data.json";

import CrossIcon from "./icons/cross.svg";
import { Select } from './components/Select'

import { getData, Item } from "./api";


import "./index.css";

const Root = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectData, setSelectData] = useState<Item[]>([]);
  const [selectSearchInput, setSelectSearchInput] = useState<string>('');

  useEffect(() => {
   const fetchData = async () => {
    return await getData();
   }

   fetchData().then((data) => {
    setSelectData(data);
   })
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      return await getData(selectSearchInput);
     }
  
     fetchData().then((data) => {
      setSelectData(data);
     })
  }, [selectSearchInput])


  return (
    <div className="Root">
      <div className="Root__header">
        <h1>Pasqal interviews</h1>
        <h1>Multiselect</h1>
      </div>
      <div className="Root__content">
        <div>{selectedItems.length} items selected:</div>
        <br />
        <div>
          {selectedItems.map((e) => (
            <div>{JSON.stringify(e)}</div>
          ))}
        </div>
      </div>
      <div className="Root__separator" />

      {/* TODO: Insert your component below */}
      <CrossIcon />
      <div className="Root__select">
        <Select
          setSelectedItems={setSelectedItems}
          selectedItems={selectedItems}
          data={selectData}
          selectSearchInput={selectSearchInput}
          setSelectSearchInput={setSelectSearchInput}
        />
      </div>
    </div>
  );
};

console.log(getData());

ReactDOM.render(<Root />, document.getElementById("root"));
