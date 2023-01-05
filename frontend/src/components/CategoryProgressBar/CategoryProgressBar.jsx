import React from "react";
import styles from "./CategoryProgressBar.module.css";

const CategoryProgressBar = ({
  categories,
  categoryTransactions,
  total,
  heading,
}) => {
  return (
    <section className={`${styles["category-progress-container"]} row mb-5`}>
      <h2 className="mb-3">{heading} By Category</h2>
      <section className={`${styles["category-progress-container"]}`}>
        {categories.map((category) => {
          const categoryTotal = categoryTransactions
            .filter((t) => t.category.name === category.name)
            .map((t) => t.amount)
            .reduce((acc, curr) => acc + curr, 0);
          const width = ((categoryTotal / total) * 100).toFixed(0);
          return (
            categoryTotal > 0 && (
              <section key={category._id}>
                <h6>{category.name}</h6>
                <div className="progress mb-3">
                  <div
                    className="progress-bar"
                    style={{
                      width: `${width}%`,
                      color: "black",
                      backgroundColor: "#ff2625",
                    }}
                  >
                    {width} %
                  </div>
                </div>
              </section>
            )
          );
        })}
      </section>
    </section>
  );
};

export default CategoryProgressBar;
