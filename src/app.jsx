import { useState } from "react";

const demo_data = [
  {
    pk: "ID#432432",
    sk: "USER",
    first: "garrett",
    last: "bland",
    age: 28,
    married: "true",
    sex: "male",
    likes_coffee: "yes",
  },
  {
    pk: "ID#202927",
    sk: "USER",
    first: "michelle",
    last: "bland",
    age: 29,
    hair_color: "brown",
    married: "true",
    middle: "lynn",
    car: "toyota",
    sex: "female",
  },
];

/**
 * Use a new Set to use unique values, and then Array.from to convert
 * back to normal array we loop through
 */
const getAttributeNames = (dataItems = []) => {
  let attributeNames = [];

  dataItems.forEach((item) => {
    Object.keys(item).forEach((key) => {
      if (!attributeNames.includes(key)) {
        attributeNames.push(key);
      }
    });
  });

  return attributeNames;
};

const globalSecordayIndexItems = (dataItems, partitionKey, sortKey) => {
  return dataItems
    .map((item) => {
      let newItem = {};
      if (item.hasOwnProperty(partitionKey) && item.hasOwnProperty(sortKey)) {
        newItem[partitionKey] = item[partitionKey];
        newItem[sortKey] = item[sortKey];

        Object.entries(item).forEach((data) => {
          if (data[0] !== partitionKey || data[0] !== sortKey) {
            newItem[data[0]] = data[1];
          }
        });

        return newItem;
      }
      return false;
    })
    .filter((_) => _);
};

export function App() {
  const [gsipk, setGSIpk] = useState("sex");
  const [gsisk, setGSIsk] = useState("car");

  return (
    <div className="container mx-auto p-5 bg-gray-100 space-y-10">
      <div>Table Name: Workhays Table</div>
      <div className="space-y-12 overflow-x-scroll">
        <div>
          <div className="text-sm text-gray-700">Table Items</div>
          <div className="grid grid-flow-col auto-cols-max">
            {getAttributeNames(demo_data).map((item) => (
              <div className="w-32 bg-orange-100 overflow-hidden mr-2">
                {item}
              </div>
            ))}
          </div>
          <div className="">
            {demo_data.map((item) => (
              <div className="grid grid-flow-col auto-cols-max">
                {getAttributeNames(demo_data).map((attribute) => {
                  if (item.hasOwnProperty(attribute)) {
                    return (
                      <div className="w-32 bg-blue-100 overflow-hidden mr-2">
                        {item[attribute]}
                      </div>
                    );
                  } else {
                    return (
                      <div className="w-32 bg-blue-100 overflow-hidden mr-2" />
                    );
                  }
                })}
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-700">Global Secondary Index 1</div>
          <div className="flex space-x-4">
            <select onChange={(e) => setGSIpk(e.target.value)}>
              {getAttributeNames(demo_data).map((item) => (
                <option selected={gsipk === item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <select onChange={(e) => setGSIsk(e.target.value)}>
              {getAttributeNames(demo_data).map((item) => (
                <option selected={gsisk === item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-flow-col auto-cols-max">
            {getAttributeNames(
              globalSecordayIndexItems(demo_data, gsipk, gsisk)
            ).map((item, index) => (
              <div className="w-32 bg-orange-100 overflow-hidden mr-2">
                {item}
                {index === 0 ? "(PK)" : index === 1 ? "(SK)" : null}
              </div>
            ))}
          </div>
          <div className="">
            {globalSecordayIndexItems(demo_data, gsipk, gsisk).map((item) => (
              <div className="grid grid-flow-col auto-cols-max">
                {getAttributeNames(
                  globalSecordayIndexItems(demo_data, gsipk, gsisk)
                ).map((attribute, index) => {
                  if (item.hasOwnProperty(attribute)) {
                    return (
                      <div className="w-32 bg-blue-100 overflow-hidden mr-2">
                        {item[attribute]}
                      </div>
                    );
                  } else {
                    return (
                      <div className="w-32 bg-blue-100 overflow-hidden mr-2" />
                    );
                  }
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
