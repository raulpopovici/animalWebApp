import React from "react";
import styles from "./Home.module.css";
import cat from "../../Assets/cat.jpg";
import homeDog from "../../Assets/homeDog.jpeg";

const Home = () => {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.quoteAndPictureContainer}>
        <div className={styles.quoteAndPictureContainerMiddleColumn}>
          <img src={cat} className={styles.catImage} />
          <div className={styles.quoteAndPictureContainerMiddleColumn_text}>
            We Care As Much As You Do!
          </div>
          <img src={homeDog} className={styles.secondPicture} />
        </div>
      </div>
      <div className={styles.pageGridSecondRow}>
        <div className={styles.littleSquare1}>Nourish</div>
        <div className={styles.littleSquare2}>Adopt</div>
        <div className={styles.littleSquare3}>Mate</div>
        <div className={styles.littleSquare4}>Love</div>
      </div>
    </div>
  );
};

export default Home;
