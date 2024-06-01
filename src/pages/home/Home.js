import React, { useState, useEffect } from "react";
import "./Home.scss";
import { getNews } from "../../redux/features/news/newSlice";
import { useDispatch, useSelector } from "react-redux";


const Home = () => {
    const newToRender = useSelector((state) => state.news.news);
    const dispatch = useDispatch();
    const [news, setNews] = useState([]);

    useEffect(() => {
        // Lấy dữ liệu tin tức từ API hoặc nguồn dữ liệu khác
        if (newToRender.length === 0) {
            dispatch(getNews());
        }
        setNews(newToRender);
    }, [newToRender, dispatch]);

    return (
        <div className="home-container">
            <h1>Bảng tin</h1>
            {news.map((item) => (
                <NewsItem key={item.id} title={item.title} content={item.content} />
            ))}
        </div>
    );
};

const NewsItem = ({ title, content }) => {
    return (
        <div className="news-item">
            <h2>{title}</h2>
            <p>{content}</p>
        </div>
    );
};

export default Home;