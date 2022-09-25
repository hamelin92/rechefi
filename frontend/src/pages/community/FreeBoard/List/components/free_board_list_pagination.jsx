import { Pagination, PaginationItem } from "@mui/material";
import React from "react";
import { Link, useLocation } from "react-router-dom";

function FreeBoardPagination({ totalPages, urlLink }) {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(
    query.get("page") || "1",
    totalPages
  );
  return (
    <Pagination
      page={page}
      count={totalPages}
      renderItem={(item) => (
        <PaginationItem
          component={Link}
          to={`${urlLink}${
            item.page === 1 ? "" : `?page=${item.page}`
          }`}
          {...item}
        />
      )}
    />
  );
}

export default FreeBoardPagination;
