import React, { useState, useEffect } from "react";
import "./Blocktiles.scss";
import ".././singlePost.css";
import { urlFor, client } from "../../client";
import { motion } from "framer-motion";
import Moment from ".././Utilities/Date.jsx";
import { PortableText } from "@portabletext/react";


const SinglePost = ({ title, content, imgurl, date, author, about ,categories}) => {
  return (
    <div className="singlePost">
      <img className="postImage" src={imgurl} alt="" />
      <div className="blogDetails">
        <h4 className="font-bold blogTitle">{title}</h4>
        <Moment date={date} format="lll" />
        <hr className="lineSpace" />
        <PortableText value={content} />
        <hr className="lineSpace" />
      </div>
      <h4 className="mx-5 p-3 flex bg-gray-700 h-[250px] rounded-md font-semibold About">
        <div className="w-3/4">
          <span className="text-md">Author - {author}</span>
          <br />
          <span className="font-normal text-sm aboutSection">{about}</span>
        </div>
        <div className="w-1/4">
          Published on
          <br />
          <div className="text-[17px]">
            <Moment date={date} format="lll" />
          </div>
          <br />
          Categories  
          <br />
            {categories.map((category, index)=>{
             return <div className="text-[17px]" key={index}>
               - {category}
             </div>
           })}
          <br />
          
        </div>
      </h4>
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
          date={handleSinglePost()._updatedAt}
          author={handleSinglePost().author}
          about={handleSinglePost().about}
          categories={handleSinglePost().categories}
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
              <br />
              <div className="text-sm font-bold text-slate-300 dateBlog">
                <Moment date={item._updatedAt} format="lll" />
              </div>
              <div className="blogDescription">{item.summary}</div>
            </motion.div>
          ))}
        </div>
      )}
    </>
  );
};

export default Blocktiles;
