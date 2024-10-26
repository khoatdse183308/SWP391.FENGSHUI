import React, { useState, useEffect, useRef } from "react";

import { Button } from "antd";

import { Link, useNavigate } from "react-router-dom";

import { useLocation } from "react-router-dom";
import HeaderTemplate from "../../components/header-page";
import koiImage from "./path-to-koi-image.jpg";
import "./index.css";
import FooterPage from "../../components/footer-page";
import { Carousel } from "antd";
import KoiImage1 from "./hinh-nen-ca-chep-2k-dep-cho-may-tinh_025211326.jpg";
import KoiImage2 from "./animals-aquatic-animal-fish-koi-fish.jpg";
import api from "../../config/axios";
<<<<<<< HEAD
import { motion } from "framer-motion";
import { UserOutlined, StarFilled } from "@ant-design/icons";
=======
import { motion } from 'framer-motion';
import { UserOutlined, StarFilled } from '@ant-design/icons';

>>>>>>> fcc6ed334b5314b956076ceb0b29dd06c4373ed6

const contentStyle = {
  margin: 0,
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const handleUserAds = () => {
<<<<<<< HEAD
  if (!localStorage.getItem("userId")) {
=======
  if(!localStorage.getItem("userId")){
>>>>>>> fcc6ed334b5314b956076ceb0b29dd06c4373ed6
    toast.warning("Vui lòng đăng nhập để sử dụng chức năng này");
    return <Navigate to="/login" />;
  }
  return;
<<<<<<< HEAD
};
=======
}

const testimonials = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    role: "Chủ cửa hàng cá Koi",
    content: "Trang web này đã giúp tôi tìm hiểu rất nhiều về cách chăm sóc cá Koi. Thông tin rất hữu ích!",
    rating: 5,
  },
  {
    id: 2,
    name: "Trần Thị B",
    role: "Người nuôi cá cảnh",
    content: "Tôi rất thích tính năng tư vấn cá theo bản mệnh. Nó giúp tôi chọn được những chú cá phù hợp nhất.",
    rating: 4,
  },
  {
    id: 3,
    name: "Lê Văn C",
    role: "Nhà thiết kế hồ cá",
    content: "Đăng quảng cáo trên trang web này giúp tôi tiếp cận được nhiều khách hàng tiềm năng hơn. Rất hiệu quả!",
    rating: 5,
  },
];

function Home() {
>>>>>>> fcc6ed334b5314b956076ceb0b29dd06c4373ed6

const testimonials = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    role: "Chủ cửa hàng cá Koi",
    content:
      "Trang web này đã giúp tôi tìm hiểu rất nhiều về cách chăm sóc cá Koi. Thông tin rất hữu ích!",
    rating: 5,
  },
  {
    id: 2,
    name: "Trần Thị B",
    role: "Người nuôi cá cảnh",
    content:
      "Tôi rất thích tính năng tư vấn cá theo bản mệnh. Nó giúp tôi chọn được những chú cá phù hợp nhất.",
    rating: 4,
  },
  {
    id: 3,
    name: "Lê Văn C",
    role: "Nhà thiết kế hồ cá",
    content:
      "Đăng quảng cáo trên trang web này giúp tôi tiếp cận được nhiều khách hàng tiềm năng hơn. Rất hiệu quả!",
    rating: 5,
  },
];

function Home() {
  const processedRef = useRef(false);

  const [advertisements, setAdvertisements] = useState({
    diamond: [],
    gold: [],
  });

  const [blogs, setBlogs] = useState([]);

  const [adIndex, setAdIndex] = useState(0);

  const showPrevious = () => {
    setAdIndex(Math.max(adIndex - 3, 0));
  };

  const showNext = () => {
    setAdIndex(
      Math.min(adIndex + 3, Math.max(advertisements.gold.length - 3, 0))
    );
  };
  const fetchAds = async () => {
    try {
      const [diamondResponse, goldResponse] = await Promise.all([
        await api.get('Advertisement/GetAdvertisementByRank', { params: { rank: 'Diamond' } }),
        await api.get('Advertisement/GetAdvertisementByRank', { params: { rank: 'Gold' } })
      ]);

      setAdvertisements({
        diamond: diamondResponse.data,
        gold: goldResponse.data
      });
    } catch (error) {
      console.error("Error fetching advertisements:", error);
    }
  };
  const fetchBlogs = async () => {
    try {
      const response = await api.get('Blog/GetAllBlog');
      setBlogs(response.data.slice(0, 3)); // Get first 3 blogs
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const fetchAds = async () => {
    try {
      const [diamondResponse, goldResponse] = await Promise.all([
        await api.get("Advertisement/GetAdvertisementByRank", {
          params: { rank: "Diamond" },
        }),
        await api.get("Advertisement/GetAdvertisementByRank", {
          params: { rank: "Gold" },
        }),
      ]);

      setAdvertisements({
        diamond: diamondResponse.data,
        gold: goldResponse.data,
      });
    } catch (error) {
      console.error("Error fetching advertisements:", error);
    }
  };
  const fetchBlogs = async () => {
    try {
      const response = await api.get("Blog/GetAllBlog");
      setBlogs(response.data.slice(0, 3)); // Get first 3 blogs
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    if (!processedRef.current) {
      fetchBlogs();
      fetchAds();
      processedRef.current = true;
    }
  }, []);

  return (
    <>
      <HeaderTemplate></HeaderTemplate>

      <Carousel autoplay className="carousel">
        {advertisements.diamond
          .filter((ad) => ad.status === "Approved")
          .map((ad) => (
            <div className="carousel-item" key={ad.id}>
              <img
                style={contentStyle}
                src={ad.image}
                alt={ad.heading}
                className="header-img"
              />
              <div className="carousel-content">
<<<<<<< HEAD
                <Link
                  style={{ color: "white" }}
                  to={`/advertisement-detail/${ad.adId}`}
                >
=======
                <Link style={{color: "white"}} to={`/advertisement-detail/${ad.adId}`}>

>>>>>>> fcc6ed334b5314b956076ceb0b29dd06c4373ed6
                  <h3>{ad.heading}</h3>
                </Link>
              </div>
            </div>
          ))}
      </Carousel>
      <div className="home-content">
        <body>
<<<<<<< HEAD
          <div id="about-us" className="container">
            <div className="feature about-us-title">
              <div className="rectangle"></div>
              <h2 style={{ margin: "0 40px" }}>Về chúng tôi</h2>
            </div>
            <div className="about-us-container">
              <div className="about-us-content">
                <p>
                  Chào mừng bạn đến với Koi Phong Thủy - nơi hội tụ đam mê và
                  kiến thức về cá Koi. Chúng tôi tự hào là điểm đến hàng đầu cho
                  những người yêu thích và nuôi cá Koi tại Việt Nam.
                </p>
                <p>
                  Với hơn 10 năm kinh nghiệm trong lĩnh vực này, chúng tôi cung
                  cấp:
                </p>
                <ul>
                  <li>Thông tin chuyên sâu về các loại cá Koi</li>
                  <li>Tư vấn chọn cá và thiết kế hồ theo phong thủy</li>
                  <li>Chia sẻ kinh nghiệm nuôi cá Koi</li>
                  <li>Dịch vụ quảng cáo cho các cơ sở kinh doanh cá Koi</li>
                </ul>
                <p>
                  Chúng tôi cam kết mang đến cho bạn những thông tin chính xác,
                  hữu ích và cập nhật nhất về thế giới cá Koi. Hãy cùng Koi
                  Phong Thủy khám phá vẻ đẹp và nghệ thuật của việc nuôi cá Koi!
                </p>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xmlns:svgjs="http://svgjs.dev/svgjs"
                viewBox="0 0 800 800"
              >
                <g
                  stroke-width="10"
                  stroke="hsl(0, 0%, 100%)"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-dasharray="5.5 21"
                  transform="matrix(0.22495105434386492,0.9743700647852352,-0.9743700647852352,0.22495105434386492,626.7676041765482,-265.72844765164007)"
                >
                  <path
                    d="M204 204Q487 359 400 400Q394 23 596 596 "
                    marker-end="url(#SvgjsMarker3948)"
                  ></path>
                </g>
                <defs>
                  <marker
                    markerWidth="5"
                    markerHeight="5"
                    refX="2.5"
                    refY="2.5"
                    viewBox="0 0 5 5"
                    orient="auto"
                    id="SvgjsMarker3948"
                  >
                    <polygon
                      points="0,5 1.6666666666666667,2.5 0,0 5,2.5"
                      fill="hsl(0, 0%, 100%)"
                    ></polygon>
                  </marker>
                </defs>
              </svg>
=======
        <div id="about-us" className="container">
            <div className="feature about-us-title">
            <div className="rectangle"></div>
              <h2 style={{margin: "0 40px"}}>Về chúng tôi</h2>
              
              
            </div>
            <div className="about-us-container">
            <div className="about-us-content">
              <p>
                Chào mừng bạn đến với Koi Phong Thủy - nơi hội tụ đam mê và kiến thức về cá Koi. Chúng tôi tự hào là điểm đến hàng đầu cho những người yêu thích và nuôi cá Koi tại Việt Nam.
              </p>
              <p>
                Với hơn 10 năm kinh nghiệm trong lĩnh vực này, chúng tôi cung cấp:
              </p>
              <ul>
                <li>Thông tin chuyên sâu về các loại cá Koi</li>
                <li>Tư vấn chọn cá và thiết kế hồ theo phong thủy</li>
                <li>Chia sẻ kinh nghiệm nuôi cá Koi</li>
                <li>Dịch vụ quảng cáo cho các cơ sở kinh doanh cá Koi</li>
              </ul>
              <p>
                Chúng tôi cam kết mang đến cho bạn những thông tin chính xác, hữu ích và cập nhật nhất về thế giới cá Koi. Hãy cùng Koi Phong Thủy khám phá vẻ đẹp và nghệ thuật của việc nuôi cá Koi!
              </p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs" viewBox="0 0 800 800"><g stroke-width="10" stroke="hsl(0, 0%, 100%)" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="5.5 21" transform="matrix(0.22495105434386492,0.9743700647852352,-0.9743700647852352,0.22495105434386492,626.7676041765482,-265.72844765164007)"><path d="M204 204Q487 359 400 400Q394 23 596 596 " marker-end="url(#SvgjsMarker3948)"></path></g><defs><marker markerWidth="5" markerHeight="5" refX="2.5" refY="2.5" viewBox="0 0 5 5" orient="auto" id="SvgjsMarker3948"><polygon points="0,5 1.6666666666666667,2.5 0,0 5,2.5" fill="hsl(0, 0%, 100%)"></polygon></marker></defs></svg>

>>>>>>> fcc6ed334b5314b956076ceb0b29dd06c4373ed6
            </div>
          </div>
          {/* Trending Feature */}
          <section id="trending-feature" className="feature-section">
            <div className="feature-header">
              <h2>Tính năng nổi bật</h2>
              <div className="koi-divider"></div>
            </div>
            <div className="feature-container">
<<<<<<< HEAD
              <motion.div
=======
              <motion.div 
>>>>>>> fcc6ed334b5314b956076ceb0b29dd06c4373ed6
                className="feature-card"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="feature-icon">
                  <img src={KoiImage1} alt="Tư vấn cá và hồ" />
                </div>
                <h3>Tư vấn cá và hồ theo bản mệnh</h3>
<<<<<<< HEAD
                <Link to="calculation" className="feature-link">
                  Khám phá
                </Link>
              </motion.div>
              <motion.div
=======
                <Link to="calculation" className="feature-link">Khám phá</Link>
              </motion.div>
              <motion.div 
>>>>>>> fcc6ed334b5314b956076ceb0b29dd06c4373ed6
                className="feature-card"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="feature-icon">
                  <img src={koiImage} alt="Tính độ tương hợp" />
                </div>
                <h3>Tính độ tương hợp của cá và hồ theo bản mệnh</h3>
<<<<<<< HEAD
                <Link to="calculate-compability" className="feature-link">
                  Tìm hiểu thêm
                </Link>
              </motion.div>
              <motion.div
=======
                <Link to="calculate-compability" className="feature-link">Tìm hiểu thêm</Link>
              </motion.div>
              <motion.div 
>>>>>>> fcc6ed334b5314b956076ceb0b29dd06c4373ed6
                className="feature-card"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="feature-icon">
                  <img src={KoiImage2} alt="Đăng tin quảng cáo" />
                </div>
                <h3>Đăng tin quảng cáo</h3>
<<<<<<< HEAD
                <Link to="/user-ads" className="feature-link">
                  Bắt đầu ngay
                </Link>
=======
                <Link to="/user-ads" className="feature-link">Bắt đầu ngay</Link>
>>>>>>> fcc6ed334b5314b956076ceb0b29dd06c4373ed6
              </motion.div>
            </div>
          </section>
          <div id="Advertisements" className="container">
            <div className="feature">
<<<<<<< HEAD
              <div class="rectangle"></div>
              <h2>Quảng cáo</h2>
=======

            <div class="rectangle"></div>
            <h2>Quảng cáo</h2>
            

>>>>>>> fcc6ed334b5314b956076ceb0b29dd06c4373ed6
            </div>
            <div className="advertisement-container">
              <button
                className="nav-button nav-button-left"
                onClick={showPrevious}
                disabled={adIndex === 0}
              >
                <svg viewBox="0 0 24 24" width="24" height="24">
                  <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                </svg>
              </button>
              <div className="Card-container">
                {advertisements.gold.filter((ad) => ad.status === "Approved")
                  .length > 0 ? (
                  advertisements.gold
                    .filter((ad) => ad.status === "Approved")
                    .slice(adIndex, adIndex + 3)
                    .map((ad) => (
<<<<<<< HEAD
                      <div className="Card" key={ad.adId}>
                        <img src={ad.image} alt={ad.heading} />
                        <Link to={`/advertisement-detail/${ad.adId}`}>
                          <h3>{ad.heading}</h3>
                        </Link>
=======

                      <div className="Card" key={ad.adId}>

                        <img
                          src={ad.image}
                          alt={ad.heading}
                        />
                        <Link to={`/advertisement-detail/${ad.adId}`}>
                          <h3>{ad.heading}</h3>
                        </Link>

>>>>>>> fcc6ed334b5314b956076ceb0b29dd06c4373ed6
                      </div>
                    ))
                ) : (
                  <p>
                    No approved gold advertisements available at the moment.
                  </p>
                )}
              </div>

              <div className="view-all-blogs-container">
<<<<<<< HEAD
                <Link to="/ads-list" className="view-all-blogs-btn">
                  Xem tất cả quảng cáo
                </Link>
              </div>
=======
              <Link to="/ads-list" className="view-all-blogs-btn">
                Xem tất cả quảng cáo
              </Link>
            </div>
>>>>>>> fcc6ed334b5314b956076ceb0b29dd06c4373ed6
              <button
                className="nav-button nav-button-right"
                onClick={showNext}
                disabled={adIndex >= advertisements.gold.length - 3}
              >
                <svg viewBox="0 0 24 24" width="24" height="24">
                  <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                </svg>
              </button>
            </div>
          </div>
<<<<<<< HEAD

          <section className="testimonial-section">
            <div className="container">
              <div className="feature">
                <h2 style={{ color: "#00838f" }}>
                  Khách hàng nói gì về chúng tôi
                </h2>
                <div style={{ width: "1000px" }} className="koi-divider"></div>
=======
          
          
         
          <section className="testimonial-section">
            <div className="container">
              <div className="feature">
                <h2 style={{color: "#00838f"}}>Khách hàng nói gì về chúng tôi</h2>
                <div style={{width: "1000px"}} className="koi-divider"></div>
>>>>>>> fcc6ed334b5314b956076ceb0b29dd06c4373ed6
              </div>
              <Carousel autoplay effect="fade">
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id}>
<<<<<<< HEAD
                    <motion.div
=======
                    <motion.div 
>>>>>>> fcc6ed334b5314b956076ceb0b29dd06c4373ed6
                      className="testimonial-card"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="testimonial-avatar">
                        <UserOutlined />
                      </div>
                      <h3>{testimonial.name}</h3>
                      <p className="testimonial-role">{testimonial.role}</p>
<<<<<<< HEAD
                      <p className="testimonial-content">
                        "{testimonial.content}"
                      </p>
=======
                      <p className="testimonial-content">"{testimonial.content}"</p>
>>>>>>> fcc6ed334b5314b956076ceb0b29dd06c4373ed6
                      <div className="testimonial-rating">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <StarFilled key={i} />
                        ))}
                      </div>
                    </motion.div>
                  </div>
                ))}
              </Carousel>
            </div>
          </section>

          {/* Blog */}

          <div id="blog" className="container">
            <div className="feature">
<<<<<<< HEAD
              <div class="rectangle"></div>
=======
            <div class="rectangle"></div>
>>>>>>> fcc6ed334b5314b956076ceb0b29dd06c4373ed6

              <h2>Blog</h2>
              <div class="rectangle"></div>
            </div>
            <div className="Card-container">
              {blogs.map((blog) => (
                <div className="Card" key={blog.blogId}>
                  <img
                    src={blog.image}
                    alt={blog.heading}
                    className="img-feature"
                  />
                  <Link to={`/blog-detail/${blog.blogId}`}>
                    <h3>{blog.heading}</h3>
                  </Link>
                </div>
              ))}
            </div>
            <div className="view-all-blogs-container">
              <Link to="/blogs-list" className="view-all-blogs-btn">
<<<<<<< HEAD
                Xem tất cả blogs
=======

                Xem tất cả blogs

>>>>>>> fcc6ed334b5314b956076ceb0b29dd06c4373ed6
              </Link>
            </div>
          </div>
        </body>
        <div id="contact">
<<<<<<< HEAD
          <FooterPage></FooterPage>
=======
        <FooterPage></FooterPage>
>>>>>>> fcc6ed334b5314b956076ceb0b29dd06c4373ed6
        </div>
      </div>
    </>
  );
}

export default Home;
