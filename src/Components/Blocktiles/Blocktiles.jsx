import React, { useState, useEffect } from "react";
import "./Blocktiles.scss";
import ".././singlePost.css";
import { urlFor, client } from "../../client";
import { motion } from "framer-motion";

const SinglePost = ({ title, content, imgurl }) => {
  return (
    <div className="singlePost">
      <img className="postImage" src={imgurl} alt="" />
      <div className="blogDetails">
        <h4 className="font-bold blogTitle">{title}</h4>
        <hr className="lineSpace" />
        <p>{content}</p>
        <hr className="lineSpace" />
      </div>
        <h4 className="mx-5 p-2 bg-gray-700 h-[250px] rounded-md font-semibold About">About-</h4>
    </div>
  );
};

const Blocktiles = () => {
  const [blogtiles, setBlogtiles] = useState([]);
  const [selected, setSelected] = useState("");
  const [WorkFilter, setWorkFilter] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });

  const setSelectedTitle = (title) => {
    setSelected(title);
  };

  const handleWorkFilter = (item) => {
    setActiveFilter(item);
    setAnimateCard([{ y: 100, opacity: 0 }]);

    setTimeout(() => {
      setAnimateCard([{ y: 0, opacity: 1 }]);

      if (item === "All") {
        setWorkFilter(blogtiles);
      } else {
        setWorkFilter(
          blogtiles.filter((work) => work.categories.includes(item))
        );
      }
    }, 500);
  };

  const handleSinglePost = () => {
    const singlePost = blogtiles.filter((obj) => obj.title === selected);
    console.log(singlePost[0]);
    return singlePost[0];
  };

  useEffect(() => {
    const query = '*[_type == "blogtiles"]';
    client.fetch(query).then((data) => {
      setBlogtiles(data);
      setWorkFilter(data);
      console.log(data);
    });
  }, []);

  return (
    <>
      {selected ? (
        <SinglePost
          title={handleSinglePost().title}
          content={handleSinglePost().description}
          imgurl={urlFor(handleSinglePost().imgUrl)}
        />
      ) : (
        <div className="app__blogtiles">
          {blogtiles.map((item, index) => (
            <motion.div
              whileInView={{ opecity: 1 }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.5, type: "tween" }}
              key={item.title + index}
              className="app__blogtiles-item"
              onClick={() => setSelectedTitle(item.title)}
            >
              <img
                src={urlFor(item.imgUrl)}
                alt={item.title}
                className="object-cover"
              />
              <h2 className="bold-text" style={{ marginTop: 10 }}>
                {item.title}
              </h2>
              <p className="p-text">{item.description}</p>
            </motion.div>
          ))}
        </div>
      )}
    </>
  );
};

export default Blocktiles;
