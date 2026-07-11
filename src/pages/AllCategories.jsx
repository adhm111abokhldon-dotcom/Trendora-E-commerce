import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Categories from "../components/ui/Categories";

const AllCategories = () => {
  const [allCategories, setAllCategories] = useState([]);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/category-list`)
      .then((res) => res.json())
      .then((data) => setAllCategories(data));
  }, []);
  if (!allCategories) return <p>Loading</p>;
  console.log(allCategories);
  return (
    <Categories
      heading={"Categories"}
      categories={allCategories}
      allCategories={true}
      link={"/categories"}
      subHeading={`${allCategories.length} category Availabil`}
    />
  );
};

export default AllCategories;
