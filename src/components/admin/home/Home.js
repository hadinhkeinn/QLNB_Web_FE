import React, { useEffect } from "react";
import InfoBox from "../../infoBox/infoBox";
import styles from "./Home.module.scss";
import { AiOutlineUser } from "react-icons/ai";
import { BsNewspaper } from "react-icons/bs";
import { FaBell } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

//Icons
const userIcon = <AiOutlineUser size={30} color="#b624ff" />;
const newsIcon = <BsNewspaper size={30} color="#1f93ff" />;
const notifiIcon = <FaBell size={30} color="orangered" />;

const Home = () => {
  const dispatch = useDispatch();

  return (
    <div className={styles.home}>
      <h2>Trang chủ</h2>
      <div className={styles["info-box"]}>
        <InfoBox
          cardClass={`${styles.card} ${styles.card1}`}
          title={"Nhân viên"}
          count={`${3}`}
          icon={userIcon}
        />
        <InfoBox
          cardClass={`${styles.card} ${styles.card2}`}
          title={"Bản tin"}
          count={3}
          icon={newsIcon}
        />
        <InfoBox
          cardClass={`${styles.card} ${styles.card3}`}
          title={"Thông báo"}
          count={2}
          icon={notifiIcon}
        />
      </div>
    </div>
  );
};

export default Home;
