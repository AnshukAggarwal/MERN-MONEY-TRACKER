import React from "react";

const CategoryProgressBar = ({
  categories,
  categoryTransactions,
  total,
  heading,
}) => {
  return (
    <section className="test p-5 row mb-5">
      <h2 className="mb-3">{heading} By Category</h2>
      <section className="test p-4">
        {categories.map((category) => {
          const categoryTotal = categoryTransactions
            .filter((t) => t.category.name === category.name)
            .map((t) => t.amount)
            .reduce((acc, curr) => acc + curr, 0);
          const width = ((categoryTotal / total) * 100).toFixed(0);
          return (
            categoryTotal > 0 && (
              <>
                <h6>{category.name}</h6>
                <div className="progress mb-3" key={category._id}>
                  <div
                    className="progress-bar"
                    key={category._id}
                    role="progressbar"
                    style={{
                      width: `${width}%`,
                      color: "black",
                      backgroundColor: "#ff2625",
                    }}
                  >
                    {width} %
                  </div>
                </div>
              </>
            )
          );
        })}
      </section>
    </section>
  );
};

export default CategoryProgressBar;
