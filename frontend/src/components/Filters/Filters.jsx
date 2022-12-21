import React from "react";

const Filters = ({
  type,
  category,
  categories,
  handleTypeChange,
  handleCategoryChange,
}) => {
  return (
    <>
      <section className="d-flex flex-column">
        <h6>Filter By Type</h6>
        <select
          value={type}
          onChange={handleTypeChange}
          className="form-select me-2"
        >
          <option value="all">All</option>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>
      </section>
      <section>
        <h6>Filter By Category</h6>
        <select
          value={category}
          onChange={handleCategoryChange}
          className="form-select"
        >
          <option value="all">All</option>
          {categories.map((category) => {
            return (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            );
          })}
        </select>
      </section>
    </>
  );
};

export default Filters;
