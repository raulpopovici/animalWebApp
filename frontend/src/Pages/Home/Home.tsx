import React from "react";
import styles from "./Home.module.css";
import cat from "../../Assets/cat.jpg";

const Home = () => {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.quoteAndPictureContainer}>
        <div className={styles.quoteAndPictureContainerMiddleColumn}>
          <img src={cat} className={styles.catImage} />
          <div className={styles.quoteAndPictureContainerMiddleColumn_text}>
            We Care As Much As You Do!
          </div>
          <img src={cat} className={styles.secondPicture} />
        </div>
      </div>
      <div className={styles.pageGridSecondRow}>Second Row</div>
      <div className={styles.pageGridThirdRow}>Third Row</div>
    </div>
  );
};

export default Home;
