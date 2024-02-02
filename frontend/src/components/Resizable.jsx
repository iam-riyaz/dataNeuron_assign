import React, { useEffect, useState } from "react";
import "./Resizable.css";
import { Resizable } from "react-resizable";
import axios from "axios";

export const ResizableComponent = () => {
  const [height1, setHeight1] = useState(800);
  const [width1, setWidth1] = useState(500);
  const [inputText, setInputText] = useState("");
  const [listData, setListData] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [newText, setNewText] = useState("");
  const [apiCount,setApiCount] = useState(0)

  const handleResize = (e, { size }) => {
    // Handle resize logic here
    setHeight1(size.height);
    setWidth1(size.width);
    console.log(size.width);
  };

  const handleAdd = () => {
    if (inputText.length != 0) {
      axios
        .post("https://data-neuron-assign.onrender.com/data/post", { text: inputText })
        .then((res) => {setListData(res.data.data)})
        .catch((err) => console.log(err));
    
      setApiCount((pre)=>pre+1)
    }
    setInputText("");
  };

  const handleUpdate = (data, index) => {
    setEditIndex(index);
    setNewText(data.text);
  };

  const handleSave = (id) => {

    axios.patch("https://data-neuron-assign.onrender.com/data/update",{text:newText,id:id}).then((res)=>{ console.log(res.data.data); setListData(res.data.data)}).catch((err)=>console.log(err))
     setApiCount((pre)=>pre+1)
    setEditIndex(-1);
  };

  useEffect(() => {
    axios
      .get("https://data-neuron-assign.onrender.com/data/get")
      .then((res) => {

        setListData(res.data.data);
      
      })
      .catch((err) => {
        console.log(err);
      });
      setApiCount((pre)=>pre+1)

  }, []);

  return (
    <>
    <div className="container">
    <h2>API Hit After intial loading/reloading: {apiCount}</h2>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <Resizable
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          height={height1}
          width={width1}
          onResize={handleResize}
          axis={"both"}
          handle={
            <div
              style={{
                cursor: "move",
                border: "2px solid gray",
                borderRadius: "5px",
                width: width1 / 4,
                height: height1 / 2,
              }}
            >
              Window 1
            </div>
          }
        >
          <span></span>
        </Resizable>
        <Resizable
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          height={height1}
          width={width1}
          onResize={handleResize}
          axis={"both"}
          handle={
            <div
              style={{
                overflow:"auto",
                padding:"5px",
                cursor: "move",
                border: "2px solid gray",
                width: width1 * (3 / 4),
                height: height1 / 2,
                borderRadius: "5px",
              }}
            >
              window 2
              <div>
                <div>
                  <input
                    value={inputText}
                    style={{ width: "60%" }}
                    type="text"
                    name=""
                    id=""
                    onChange={(e) => setInputText(e.target.value)}
                  />
                  <button onClick={handleAdd} style={{ width: "20%" }}>
                    Add
                  </button>
                </div>
                <div>
                  {listData.map((e, index) => {
                    return (
                      <div>
                        {editIndex === index ? (
                          <div>
                            <input
                              type="text"
                              value={newText}
                              onChange={(e) => setNewText(e.target.value)}
                            />
                            <button onClick={() => handleSave(e._id)}>
                              save
                            </button>
                          </div>
                        ) : (
                          <li style={{ marginTop: "2px" }}>
                            {e.text}{" "}
                            <button onClick={() => handleUpdate(e, index)}>
                              Update
                            </button>
                          </li>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          }
        >
          <span></span>
        </Resizable>
      </div>
      <div>
        <Resizable
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          height={height1}
          width={width1}
          onResize={handleResize}
          axis={"both"}
          handle={
            <div
              style={{
                cursor: "move",
                border: "2px solid gray",
                width: width1,
                height: height1 / 4,
                borderRadius: "5px",
                marginTop: "2px",
              }}
            >
              window 3
            </div>
          }
        >
          <span></span>
        </Resizable>
      </div>

    </div>
      
    </>
  );
};


