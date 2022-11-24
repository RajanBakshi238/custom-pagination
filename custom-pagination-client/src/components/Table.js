import React, { useEffect, useState } from "react";

import Pagination from "./Pagination";
import axios from "../api/axios";

const Table = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [page, setPage] = useState({
    current: 1,
    totalItems: null,
    pageSize: 2,
  });

  const fetchData = (current, pageSize) => {
    setLoading(true);
    axios
      .get(`/tasks?page=${current}&pageSize=${pageSize}`)
      .then((res) => {
        // console.log(res.data, "reponse>>>>>>>>>>>");
        setData(res.data.data);
        setPage((prev) => ({
          ...prev,
          // current,
          totalItems: res.data.results,
        }));
      })
      .catch((err) => {
        console.log(err, "error");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  console.log(data, ">>>>>>>>>>>>>>>TESTING PAGINATE DATA");
  console.log(page, '>>>>>>>>>>>PAGE FROM TABLE')

  useEffect(() => {
    fetchData(page.current, page.pageSize);
  }, [page.current]);

  const onPageChange = (page) => {
    setPage((prev) => ({
      ...prev,
      current: page,
    }));
  };


  if (loading) {
    return <h1>Loading ..........</h1>;
  }

  return (
    <div>
      <h1>Table</h1>
      <Pagination
        onPageChange={onPageChange}
        totalCount={page.totalItems}
        currentPage={page.current}
        pageSize={page.pageSize}
      />
    </div>
  );
};

export default Table;
