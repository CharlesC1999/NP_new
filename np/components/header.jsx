import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
// 收藏的數量資料
import { useFavor } from "@/hooks/use-favorData";
import { useSearchResults } from "@/contexts/searchContext";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./header.module.scss";
// import classNames from "classnames";
import routes from "@/contexts/routes"; // 導入路徑配置
//  react icon
import { IoLogOutOutline } from "react-icons/io5";
// sweetAlert
import Swal from "sweetalert2";
//react icon
import { AiOutlineHome } from "react-icons/ai";
import { RiDiscountPercentLine } from "react-icons/ri";
import { FaListUl, FaCheck } from "react-icons/fa";
import { LuChefHat, LuClipboardEdit } from "react-icons/lu";
import { GrGroup } from "react-icons/gr";
import { IoMdBusiness } from "react-icons/io";
// 引入食譜分類的鉤子
import { useCategoryForSQL } from "@/hooks/recipe/use-categoryForSQL";
import { useCategory } from "@/hooks/ClassProp";

const MobileSideBar = ({ onClose }) => {
  const sidebarRef = useRef(null);
  const router = useRouter();
  const { auth, logout } = useAuth();
  const [userData, setUserData] = useState("");
  const [isActive, setIsActive] = useState(true); // 控制動畫的狀態

  const goClassList = () => router.push(routes.classList);
  const goProductList = () => router.push(routes.productList);
  const goRecipeList = () => router.push(routes.recipeList);
  const goSpeekerList = () => router.push(routes.speakerList);
  const doLogin = () => router.push(routes.login);
  const doSignUp = () => router.push(routes.signUp);
  const goDashboard = () => router.push(routes.dashboard);
  const goHome = () => router.push(routes.home);

  useEffect(() => {
    // 組件渲染後立即執行的effect，檢查LocalStorage中是否有資料
    const userImage = localStorage.getItem("userData");
    if (userImage) {
      // 如果LocalStorage中有資料，則將其轉換為JavaScript物件並存入state中
      setUserData(JSON.parse(userImage));
    }
  }, []);

  // 關閉sidebar
  const handleClose = () => {
    if (sidebarRef.current) {
      // 添加動畫樣式
      sidebarRef.current.classList.add(styles.slideOut);

      // 結束用onClose
      const handleAnimationEnd = () => {
        onClose();
        // 移除監聽
        sidebarRef.current.removeEventListener(
          "animationend",
          handleAnimationEnd
        );
      };

      sidebarRef.current.addEventListener("animationend", handleAnimationEnd);
    } else {
      onClose(); // 如果参考不存在或动画未能正确设置，直接关闭
    }
  };

  const logoutButton = () => {
    Swal.fire({
      title: "確定要登出嗎？",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#c14d3c",
      cancelButtonColor: "#50bf8b",
      confirmButtonText: "登出",
      cancelButtonText: "取消",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        goHome();
        Swal.fire({
          title: "已登出",
          icon: "success",
          confirmButtonColor: "#50bf8b",
        });
      }
    });
  };

  return (
    <div className={styles.fullMobileScreen} onClick={handleClose}>
      <div
        className={styles.sideBarContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <section className={styles.memberContainer}>
          <div className={styles.memberSet}>
            <div className={styles.memberImg}>
              {auth.isLoggedIn ? (
                <img
                  src={
                    userData && userData.address
                      ? userData.address.startsWith("https")
                        ? userData.address
                        : `/images/member-image/${userData.address}`
                      : ""
                  }
                  alt="UserImg"
                />
              ) : (
                <img src="" alt="" />
              )}
            </div>
            {auth.isLoggedIn ? (
              <div className={styles.memberName}>{userData.name} 歡迎！</div>
            ) : (
              <div></div>
            )}
            <div className={styles.memberButtonContainer}>
              {auth.isLoggedIn ? (
                <button onClick={logoutButton} className={styles.memberButton}>
                  登出
                </button>
              ) : (
                <button onClick={doLogin} className={styles.memberButton}>
                  登入
                </button>
              )}
              |
              {auth.isLoggedIn ? (
                <button onClick={goDashboard} className={styles.memberButton}>
                  會員中心
                </button>
              ) : (
                <button onClick={doSignUp} className={styles.memberButton}>
                  註冊
                </button>
              )}
            </div>
          </div>
        </section>
        <section className={styles.optionContainer}>
          <div className={styles.optionBlock}>
            <button className={styles.optionBtn} onClick={goHome}>
              <AiOutlineHome size={24} />
              首頁
            </button>
          </div>
          <div className={styles.optionBlock}>
            <button className={styles.optionBtn}>
              <RiDiscountPercentLine size={24} />
              優惠活動
            </button>
          </div>
          <div className={styles.optionBlock}>
            <button className={styles.optionBtn} onClick={goProductList}>
              <FaListUl size={24} />
              商品列表
            </button>
          </div>
          <div className={styles.optionBlock}>
            <button className={styles.optionBtn} onClick={goRecipeList}>
              <LuChefHat size={24} />
              食譜精選
            </button>
          </div>
          <div className={styles.optionBlock}>
            <button className={styles.optionBtn} onClick={goClassList}>
              <LuClipboardEdit size={24} />
              精選課程
            </button>
          </div>
          <div className={styles.optionBlock}>
            <button className={styles.optionBtn} onClick={goSpeekerList}>
              <GrGroup size={24} />
              講師陣容
            </button>
          </div>
          <div className={styles.optionBlock}>
            <button className={styles.optionBtn}>
              <IoMdBusiness size={24} />
              關於我們
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

const HeaderComponent = () => {
  const { setResults } = useSearchResults(); //搜尋鉤子
  const [isSearchOpen, setIsSearchOpen] = useState(false); //搜尋下拉是否開啟
  const [selectedText, setSelectedText] = useState("所有分類"); //預設搜尋顯示結果文字
  const [searchInput, setSearchInput] = useState(""); //搜尋欄位預設輸入
  const [isProductOpen, setIsProductOpen] = useState(false);
  const [isRecipeOpen, setIsRecipeOpen] = useState(false);
  const [isClassOpen, setIsClassOpen] = useState(false);
  const dropdownRef = useRef(null);
  const productDropdownRef = useRef(null); // 產品下拉列表的參考
  const recipeDropdownRef = useRef(null); // 食譜下拉列表的參考
  const calssDropdownRef = useRef(null); // 課程下拉列表的參考
  const [showFullScreen, setShowFullScreen] = useState(false); // sidebar
  // 初始化狀態為 false，表示.mobileSearchArea區塊預設不顯示
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  // const [animation, setAnimation] = useState(""); //sidebar slideout
  const router = useRouter();
  const { auth, logout } = useAuth();
  const { favorClass, favorRecipe, favorProduct } = useFavor();
  const favorAmountC = favorClass.length;
  const favorAmountR = favorRecipe.length;
  const favorAmountP = favorProduct.length;
  const favorAmountTotal = favorAmountC + favorAmountR + favorAmountP;
  // console.log(auth);
  let hasMargin = true;
  let isMobile = false;
  // 下拉式分類連結（接收分類 context）
  const { setRecipeCategory } = useCategoryForSQL();
  const { setCategoryId } = useCategory();
  const handleCategoryChangeR = (category = "") => {
    setRecipeCategory(category);
  };
  const handleCategoryChangeC = (categoryId) => {
    setCategoryId(categoryId);
  };
  // 搜索下拉選單
  const menuItems = [
    { id: 1, name: "所有分類", className: styles.selectionLink },
    { id: 2, name: "商品列表", className: styles.selectionLink },
    { id: 3, name: "食譜精選", className: styles.selectionLink },
    { id: 4, name: "精選課程", className: styles.selectionLink },
    // { id: 5, name: "講師陣容", className: styles.selectionLink },
  ];

  // 食譜下拉選單
  const recipeCategory = [
    { id: 1, name: "主食", href: "#", className: styles.selectionLink },
    { id: 2, name: "醬料", href: "#", className: styles.selectionLink },
    { id: 3, name: "湯品", href: "#", className: styles.selectionLink },
    { id: 4, name: "飲品", href: "#", className: styles.selectionLink },
    { id: 5, name: "點心", href: "#", className: styles.selectionLink },
    { id: 6, name: "沙拉", href: "#", className: styles.selectionLink },
  ];

  // 商品下拉選單
  const productCategory = [
    {
      id: 1,
      name: "新鮮蔬菜",
      href: "/product?categoryFromDetail=1",
      className: styles.selectionLink,
    },
    {
      id: 2,
      name: "新鮮水果",
      href: "/product?categoryFromDetail=2",
      className: styles.selectionLink,
    },
    {
      id: 3,
      name: "嚴選肉類",
      href: "/product?categoryFromDetail=3",
      className: styles.selectionLink,
    },
    {
      id: 4,
      name: "海鮮水產",
      href: "/product?categoryFromDetail=4",
      className: styles.selectionLink,
    },
    {
      id: 5,
      name: "精選雞蛋",
      href: "/product?categoryFromDetail=5",
      className: styles.selectionLink,
    },
    {
      id: 6,
      name: "豆乳製品",
      href: "/product?categoryFromDetail=6",
      className: styles.selectionLink,
    },
    {
      id: 7,
      name: "素食專區",
      href: "/product?categoryFromDetail=7",
      className: styles.selectionLink,
    },
  ];

  // 課程下拉選單
  const classCategory = [
    { id: 1, name: "台式料理", href: "#", className: styles.selectionLink },
    { id: 2, name: "中式料理", href: "#", className: styles.selectionLink },
    { id: 3, name: "西式料理", href: "#", className: styles.selectionLink },
    { id: 4, name: "異國料理", href: "#", className: styles.selectionLink },
    { id: 5, name: "養生/素食", href: "#", className: styles.selectionLink },
    { id: 6, name: "烘焙/點心", href: "#", className: styles.selectionLink },
  ];
  // -----------------header 捲動效果 -------------------------------
  const [shrink, setShrink] = useState(false);
  const lastScrollY = useRef(0);
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const threshold = 100; //設定閾值避免偵測捲動太敏感導致閃爍問題
      console.log("currentScrollY", currentScrollY);
      // console.log("lastScrollY", lastScrollY.current);
      if (Math.abs(currentScrollY - lastScrollY.current) > threshold) {
        if (currentScrollY > lastScrollY.current) {
          setShrink(true);
          console.log("往下捲動");
        } else {
          setShrink(false);
          console.log("往上捲動");
        }
        lastScrollY.current = currentScrollY;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // -----------------------開關控制區--------------------------------
  // 搜尋開關控制
  const toggleDropdown = () => setIsSearchOpen(!isSearchOpen);

  // 開關控制
  const ProductToggleDropdown = (event) => {
    event.stopPropagation();
    setIsProductOpen((prev) => !prev);
  };
  const ClassToggleDropdown = (event) => {
    event.stopPropagation();
    setIsClassOpen((prev) => !prev);
  };
  const RecipeToggleDropdown = (event) => {
    event.stopPropagation();
    setIsRecipeOpen((prev) => !prev);
  };
  const handleMouseUp = (event) => {
    // 滑鼠點擊彈上後停止冒泡
    event.stopPropagation();
  };
  // ----------------------------------------------------------------

  // -----------------------點擊選項和區域外關閉控制區-----------------
  const handleItemClick = (name) => {
    setSelectedText(name); //點選項
    setIsSearchOpen(false); // 點選項關閉下拉
  };

  // 點擊搜尋分類選單外範圍關閉
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    console.log("搜索:", searchInput, "在:", selectedText);

    // 重新映射
    const routerNameMapping = {
      所有分類: "findAll",
      商品列表: "findProduct",
      食譜精選: "findRecipe",
      精選課程: "findClass",
    };
    // 端點對應設置
    const endpoint = routerNameMapping[selectedText];
    // 執行搜索邏輯
    try {
      const response = await fetch(
        `http://localhost:3005/api/search/${endpoint}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            searchText: searchInput,
            category: selectedText,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const results = await response.json();
      // 更新組件狀態以顯示搜索結果
      console.log(results);
      // 結果用鉤子傳遞
      setResults(results);
      // 導向到結果頁面並將搜索結果作為路由參數傳遞;
      router.push("/search-result");
    } catch (error) {
      console.error("搜索請求失敗:", error);
    }
    // 導向到結果頁面或更新組件顯示結果
  };

  const handleSearchM = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:3005/api/search/findAll`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          searchText: searchInput,
          category: selectedText,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const results = await response.json();
      // 更新組件狀態以顯示搜索結果
      console.log(results);
      // 結果用鉤子傳遞
      setResults(results);
      // 導向到結果頁面並將搜索結果作為路由參數傳遞;
      router.push("/search-result");
    } catch (error) {
      console.error("搜索請求失敗:", error);
    }
    // 導向到結果頁面或更新組件顯示結果
  };

  const handleProductClick = () => {
    setIsProductOpen(false); // 點選項關閉下拉
  };

  // 點擊搜尋分類選單外範圍關閉
  useEffect(() => {
    const handleClickProductOutside = (event) => {
      if (
        productDropdownRef.current &&
        !productDropdownRef.current.contains(event.target)
      ) {
        setIsProductOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickProductOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickProductOutside);
    };
  }, []);

  const handleClassClick = () => {
    setIsClassOpen(false); // 點選項關閉下拉
  };

  // 點擊搜尋分類選單外範圍關閉
  useEffect(() => {
    const handleClickClassOutside = (event) => {
      if (
        calssDropdownRef.current &&
        !calssDropdownRef.current.contains(event.target)
      ) {
        setIsClassOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickClassOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickClassOutside);
    };
  }, []);

  const handleRecipeClick = () => {
    setIsRecipeOpen(false); // 點選項關閉下拉
  };

  // 點擊搜尋分類選單外範圍關閉
  useEffect(() => {
    const handleClickRecipeOutside = (event) => {
      if (
        recipeDropdownRef.current &&
        !recipeDropdownRef.current.contains(event.target)
      ) {
        setIsRecipeOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickRecipeOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickRecipeOutside);
    };
  }, []);
  // ----------------------------手機搜------------------------------------
  const mobileSearch = () => {
    setShowMobileSearch(!showMobileSearch);
    console.log(showMobileSearch);
  };
  // ---------------------------------------------------------------------

  // swal登出彈出確認
  const logoutButton = () => {
    Swal.fire({
      title: "確定要登出嗎？",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#c14d3c",
      cancelButtonColor: "#50bf8b",
      confirmButtonText: "登出",
      cancelButtonText: "取消",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        goIndex();
        Swal.fire({
          title: "已登出",
          icon: "success",
          confirmButtonColor: "#50bf8b",
        });
      }
    });
  };

  // sidebar出來不准動
  useEffect(() => {
    if (showFullScreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showFullScreen]);

  // 使用配置的路由導航
  const goMemberDashboard = () => router.push(routes.dashboard);
  const goFavor = () => router.push(routes.favor);
  const doLogin = () => router.push(routes.login);
  const goIndex = () => router.push(routes.home);
  const goCart = () => router.push(routes.cartList);
  const goClassList = () => router.push(routes.classList);
  const goProductList = () => router.push(routes.productList);
  const goProductPromote = () => router.push(routes.productPromote);
  const goRecipeList = () => router.push(routes.recipeList);
  const goSpeekerList = () => router.push(routes.speakerList);

  return (
    <div className={styles.container}>
      <header className={shrink?`${styles.header} ${styles.shrink}`:`${styles.header}`}>
        <div
          className={
            shrink
              ? `${styles.headerContent} ${styles.shrink}`
              : `${styles.headerContent}`
          }
        >
          <div className={styles.logoWrapper}>
            <button
              className={styles.mobileMenu}
              onClick={() => {
                // console.log("Button clicked");
                setShowFullScreen(!showFullScreen);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30px"
                height="30px"
                viewBox="0 0 24 24"
              >
                <g fill="none">
                  <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                  <path
                    fill="black"
                    d="M20 17.5a1.5 1.5 0 0 1 .144 2.993L20 20.5H4a1.5 1.5 0 0 1-.144-2.993L4 17.5zm0-7a1.5 1.5 0 0 1 0 3H4a1.5 1.5 0 0 1 0-3zm0-7a1.5 1.5 0 0 1 0 3H4a1.5 1.5 0 1 1 0-3z"
                  />
                </g>
              </svg>
            </button>
            {showFullScreen && (
              <MobileSideBar onClose={() => setShowFullScreen(false)} />
            )}
            <a onClick={goIndex}>
              <img
                src="/images/np_logo.png"
                alt="Company Logo"
                className={
                  shrink ? `${styles.logo} ${styles.shrink}` : `${styles.logo}`
                }
              />
            </a>
          </div>

          <div className={styles.searchBar}>
            <div className={styles.searchBarLeft}>
              <div className={styles.dropdown} ref={dropdownRef}>
                <button
                  className={styles.searchDropBox}
                  onClick={toggleDropdown}
                >
                  <span className={styles.searchBarText}>
                    {selectedText}
                    {/* <!-- SVG 保持不變，作為下拉按鈕的一部分 --> */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="none"
                        stroke="black"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m7 10l5 5m0 0l5-5"
                      />
                    </svg>
                    {/* <!-- 所有分類 arrow down --> */}
                  </span>
                </button>
                {isSearchOpen && (
                  <div className={styles.dropdownContent}>
                    {menuItems.map((item, index) => (
                      <React.Fragment key={item.id}>
                        <a
                          onClick={() => handleItemClick(item.name)}
                          className={item.className}
                        >
                          {item.name}
                        </a>
                      </React.Fragment>
                    ))}
                  </div>
                )}
              </div>

              <span className={styles.searchBarDivider}>|</span>

              {/* <!-- 搜索欄位 --> */}
              <input
                type="text"
                className={styles.searchBarInput}
                placeholder="Search for items..."
                value={searchInput}
                onChange={handleInputChange}
              />
            </div>

            {/* <!-- 搜索按鈕 --> */}
            <button
              type="submit"
              className={styles.searchBarButton}
              onClick={handleSearch}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="#747E85"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21l-4.343-4.343m0 0A8 8 0 1 0 5.343 5.343a8 8 0 0 0 11.314 11.314"
                />
              </svg>
            </button>
          </div>
          <div
            // className={styles.mobileSearchArea}
            className={
              showMobileSearch
                ? styles.mobileSearchAreaShow
                : styles.mobileSearchArea
            }
          >
            <input
              type="text"
              className={styles.searchBarInputMobile}
              value={searchInput}
              onChange={handleInputChange}
            />
            <button
              type="submit"
              className={styles.searchBarButton}
              style={{ marginBottom: "3px" }}
            >
              <FaCheck onClick={handleSearchM} />
            </button>
          </div>
          <div className={styles.headerActions}>
            {auth.isLoggedIn ? (
              <div>
                <a onClick={mobileSearch} className={styles.pageLink}>
                  {/* <!-- 手機圖示svg --> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30px"
                    height="30px"
                    viewBox="0 0 24 24"
                    className={styles.iconLinkMobile}
                  >
                    {/* 這個要修改成彈出式搜索 */}
                    <path
                      fill="#50BF8B"
                      d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5q0-2.725 1.888-4.612T9.5 3q2.725 0 4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5q0-1.875-1.312-3.187T9.5 5Q7.625 5 6.313 6.313T5 9.5q0 1.875 1.313 3.188T9.5 14"
                    />
                  </svg>
                  {/* <span className={styles.iconText}> */}
                  {/* <!-- 願望清單 heart --> */}
                </a>
                <a onClick={goFavor} className={styles.pageLink}>
                  <div className={styles.favorIcon}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 256 256"
                      className={styles.mobileNone}
                    >
                      <path
                        fill="#50BF8B"
                        d="M178 28c-20.09 0-37.92 7.93-50 21.56C115.92 35.93 98.09 28 78 28a66.08 66.08 0 0 0-66 66c0 72.34 105.81 130.14 110.31 132.57a12 12 0 0 0 11.38 0C138.19 224.14 244 166.34 244 94a66.08 66.08 0 0 0-66-66m-5.49 142.36a328.69 328.69 0 0 1-44.51 31.8a328.69 328.69 0 0 1-44.51-31.8C61.82 151.77 36 123.42 36 94a42 42 0 0 1 42-42c17.8 0 32.7 9.4 38.89 24.54a12 12 0 0 0 22.22 0C145.3 61.4 160.2 52 178 52a42 42 0 0 1 42 42c0 29.42-25.82 57.77-47.49 76.36"
                      />
                    </svg>
                    {favorAmountTotal !== 0 && (
                      <div className={styles.favorAmount}>
                        {" "}
                        {favorAmountTotal}
                      </div>
                    )}
                  </div>

                  {/* 願望清單
                </span> */}
                </a>
              </div>
            ) : (
              <div>
                {/* <!-- 手機圖示svg --> */}
                {/* 這應該是搜索 */}
                <a onClick={mobileSearch} className={styles.pageLink}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30px"
                    height="30px"
                    viewBox="0 0 24 24"
                    className={styles.iconLinkMobile}
                  >
                    <path
                      fill="#50BF8B"
                      d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5q0-2.725 1.888-4.612T9.5 3q2.725 0 4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5q0-1.875-1.312-3.187T9.5 5Q7.625 5 6.313 6.313T5 9.5q0 1.875 1.313 3.188T9.5 14"
                    />
                  </svg>
                </a>
                {/* <span className={styles.iconText}> */}
                {/* <!-- 願望清單 heart --> */}
                <a onClick={doLogin} className={styles.pageLink}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 256 256"
                    className={styles.mobileNone}
                  >
                    <path
                      fill="#253D4E"
                      d="M178 28c-20.09 0-37.92 7.93-50 21.56C115.92 35.93 98.09 28 78 28a66.08 66.08 0 0 0-66 66c0 72.34 105.81 130.14 110.31 132.57a12 12 0 0 0 11.38 0C138.19 224.14 244 166.34 244 94a66.08 66.08 0 0 0-66-66m-5.49 142.36a328.69 328.69 0 0 1-44.51 31.8a328.69 328.69 0 0 1-44.51-31.8C61.82 151.77 36 123.42 36 94a42 42 0 0 1 42-42c17.8 0 32.7 9.4 38.89 24.54a12 12 0 0 0 22.22 0C145.3 61.4 160.2 52 178 52a42 42 0 0 1 42 42c0 29.42-25.82 57.77-47.49 76.36"
                    />
                  </svg>
                  {/* 願望清單
                </span> */}
                </a>
              </div>
            )}
            {auth.isLoggedIn ? (
              <a onClick={goCart} className={styles.pageLink}>
                {/* <!-- 手機圖示svg --> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30px"
                  height="30px"
                  viewBox="0 0 24 24"
                  className={styles.iconLinkMobile}
                >
                  <path
                    fill="#50BF8B"
                    d="M17 18a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2c0-1.11.89-2 2-2M1 2h3.27l.94 2H20a1 1 0 0 1 1 1c0 .17-.05.34-.12.5l-3.58 6.47c-.34.61-1 1.03-1.75 1.03H8.1l-.9 1.63l-.03.12a.25.25 0 0 0 .25.25H19v2H7a2 2 0 0 1-2-2c0-.35.09-.68.24-.96l1.36-2.45L3 4H1zm6 16a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2c0-1.11.89-2 2-2m9-7l2.78-5H6.14l2.36 5z"
                  />
                </svg>
                {/* <span className={styles.iconText}> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32px"
                  height="32px"
                  viewBox="0 0 24 24"
                  className={styles.mobileNone}
                >
                  <path
                    fill="#50bf8b"
                    d="M17 18a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2c0-1.11.89-2 2-2M1 2h3.27l.94 2H20a1 1 0 0 1 1 1c0 .17-.05.34-.12.5l-3.58 6.47c-.34.61-1 1.03-1.75 1.03H8.1l-.9 1.63l-.03.12a.25.25 0 0 0 .25.25H19v2H7a2 2 0 0 1-2-2c0-.35.09-.68.24-.96l1.36-2.45L3 4H1zm6 16a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2c0-1.11.89-2 2-2m9-7l2.78-5H6.14l2.36 5z"
                  />
                </svg>
                {/* 購物車
                </span> */}
              </a>
            ) : (
              <a onClick={doLogin} className={styles.pageLink}>
                {/* <!-- 手機圖示svg --> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30px"
                  height="30px"
                  viewBox="0 0 24 24"
                  className={styles.iconLinkMobile}
                >
                  <path
                    fill="#50BF8B"
                    d="M17 18a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2c0-1.11.89-2 2-2M1 2h3.27l.94 2H20a1 1 0 0 1 1 1c0 .17-.05.34-.12.5l-3.58 6.47c-.34.61-1 1.03-1.75 1.03H8.1l-.9 1.63l-.03.12a.25.25 0 0 0 .25.25H19v2H7a2 2 0 0 1-2-2c0-.35.09-.68.24-.96l1.36-2.45L3 4H1zm6 16a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2c0-1.11.89-2 2-2m9-7l2.78-5H6.14l2.36 5z"
                  />
                </svg>
                {/* <span className={styles.iconText}> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32px"
                  height="32px"
                  viewBox="0 0 24 24"
                  className={styles.mobileNone}
                >
                  <path
                    fill="#253D4E"
                    d="M17 18a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2c0-1.11.89-2 2-2M1 2h3.27l.94 2H20a1 1 0 0 1 1 1c0 .17-.05.34-.12.5l-3.58 6.47c-.34.61-1 1.03-1.75 1.03H8.1l-.9 1.63l-.03.12a.25.25 0 0 0 .25.25H19v2H7a2 2 0 0 1-2-2c0-.35.09-.68.24-.96l1.36-2.45L3 4H1zm6 16a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2c0-1.11.89-2 2-2m9-7l2.78-5H6.14l2.36 5z"
                  />
                </svg>
                {/* 購物車
                </span> */}
              </a>
            )}
            {auth.isLoggedIn ? (
              // 這邊放登入後
              <a onClick={goMemberDashboard} className={styles.pageLink}>
                {/* <!-- 手機圖示svg --> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30px"
                  height="30px"
                  viewBox="0 0 24 24"
                  className={styles.iconLinkMobile}
                >
                  <path
                    fill="#50BF8B"
                    d="M12 4a3.5 3.5 0 1 0 0 7a3.5 3.5 0 0 0 0-7M6.5 7.5a5.5 5.5 0 1 1 11 0a5.5 5.5 0 0 1-11 0M3 19a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v3H3zm5-3a3 3 0 0 0-3 3v1h14v-1a3 3 0 0 0-3-3z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32px"
                  height="32px"
                  viewBox="0 0 24 24"
                  className={styles.mobileNone}
                >
                  <path
                    fill="#50bf8b"
                    d="M12 4a3.5 3.5 0 1 0 0 7a3.5 3.5 0 0 0 0-7M6.5 7.5a5.5 5.5 0 1 1 11 0a5.5 5.5 0 0 1-11 0M3 19a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v3H3zm5-3a3 3 0 0 0-3 3v1h14v-1a3 3 0 0 0-3-3z"
                  />
                </svg>
              </a>
            ) : (
              <a onClick={doLogin} className={styles.pageLink}>
                {/* <!-- 手機圖示svg --> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30px"
                  height="30px"
                  viewBox="0 0 24 24"
                  className={styles.iconLinkMobile}
                >
                  <path
                    fill="#50BF8B"
                    d="M12 4a3.5 3.5 0 1 0 0 7a3.5 3.5 0 0 0 0-7M6.5 7.5a5.5 5.5 0 1 1 11 0a5.5 5.5 0 0 1-11 0M3 19a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v3H3zm5-3a3 3 0 0 0-3 3v1h14v-1a3 3 0 0 0-3-3z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32px"
                  height="32px"
                  viewBox="0 0 24 24"
                  className={styles.mobileNone}
                >
                  <path
                    fill="#253D4E"
                    d="M12 4a3.5 3.5 0 1 0 0 7a3.5 3.5 0 0 0 0-7M6.5 7.5a5.5 5.5 0 1 1 11 0a5.5 5.5 0 0 1-11 0M3 19a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v3H3zm5-3a3 3 0 0 0-3 3v1h14v-1a3 3 0 0 0-3-3z"
                  />
                </svg>
              </a>
            )}
            {auth.isLoggedIn ? (
              // 登出按鈕
              <button
                className={styles.logout}
                onClick={logoutButton}
                id="logout"
              >
                <IoLogOutOutline size={36} color="#50bf8b" />
              </button>
            ) : (
              <></>
            )}
          </div>
        </div>
      </header>
      <nav
        className={shrink ? `${styles.nav} ${styles.shrink}` : `${styles.nav}`}
      >
        <ul className={styles.navList}>
          <li className={styles.navItemPromotion}>
            <a onClick={goProductPromote} className={styles.pageLink}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="21"
                viewBox="0 0 24 24"
              >
                <g fill="none" fillRule="evenodd">
                  <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                  <path
                    fill="#3BB77E"
                    d="m10.255 1.387l1.26.756a8.146 8.146 0 0 1 3.48 4.144c.222-.5.486-.985.731-1.475l.981.981C18.909 7.995 21 11.295 21 14.5c0 4.298-2.65 7.023-6.89 7.494l-1.39.154l.304-1.365c.237-1.068.28-1.766.23-2.255c-.06-.615-.352-1.098-.716-1.578c-.348-.46-.693-.921-.969-1.43c-1.135.897-1.575 1.707-1.716 2.374c-.18.854.075 1.727.541 2.659l.822 1.644l-1.826-.203c-2.576-.286-5.114-2.007-6.114-4.518c-1.045-2.627-.306-5.806 3.07-8.732c2.24-1.941 3.426-4.458 3.909-7.357m1.332 3.3c-.762 2.14-2.225 4.09-3.932 5.569c-2.911 2.523-3.172 4.844-2.52 6.48c.485 1.22 1.532 2.223 2.773 2.792a4.97 4.97 0 0 1-.012-2.046c.326-1.546 1.438-2.995 3.574-4.33l1.077-.673l.402 1.205c.352 1.056 1.082 1.803 1.653 2.73c.628 1.02.748 2.19.62 3.358C17.842 19.117 19 17.13 19 14.5c0-2.222-1.34-4.402-2.67-6.106c-.548 1.228-1.703 1.66-2.83 2.224V9c0-1.369-.557-3.038-1.913-4.312Z"
                  />
                </g>
              </svg>
              {/* <!-- fire svg --> */}
              <span className={styles.navTextPromotion}>優惠活動</span>
            </a>
          </li>
          <li className={styles.navItemPageLinks}>
            <a onClick={goProductList} className={styles.pageLink}>
              <div>商品列表</div>
            </a>
            <button
              className={styles.navTextButton}
              onMouseDown={ProductToggleDropdown}
              onMouseUp={handleMouseUp}
            >
              {isProductOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <svg fill="none" fillRule="evenodd">
                    <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                    <path
                      fill="#50bf8b"
                      d="M13.06 16.06a1.5 1.5 0 0 1-2.12 0l-5.658-5.656a1.5 1.5 0 1 1 2.122-2.121L12 12.879l4.596-4.596a1.5 1.5 0 0 1 2.122 2.12l-5.657 5.658Z"
                    />
                  </svg>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <g fill="none" fillRule="evenodd">
                    <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                    <path
                      fill="#D9E1E6"
                      d="M13.06 16.06a1.5 1.5 0 0 1-2.12 0l-5.658-5.656a1.5 1.5 0 1 1 2.122-2.121L12 12.879l4.596-4.596a1.5 1.5 0 0 1 2.122 2.12l-5.657 5.658Z"
                    />
                  </g>
                </svg>
              )}
            </button>
            {isProductOpen && (
              <div
                className={styles.dropdownContent}
                ref={productDropdownRef}
                style={{
                  marginTop: "291px",
                  marginLeft: "52px",
                  width: "200px",
                }}
              >
                {productCategory.map((item, index) => (
                  <React.Fragment key={item.id}>
                    <a
                      key={item.id}
                      onClick={() => handleProductClick()}
                      href={item.href}
                      className={item.className}
                    >
                      {item.name}
                    </a>
                  </React.Fragment>
                ))}
              </div>
            )}
          </li>
          <li className={styles.navItemPageLinks}>
            <a onClick={goRecipeList} className={styles.pageLink}>
              <div>食譜精選</div>
            </a>
            <button
              className={styles.navTextButton}
              onMouseDown={RecipeToggleDropdown}
              onMouseUp={handleMouseUp}
            >
              {isRecipeOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <g fill="none" fillRule="evenodd">
                    <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                    <path
                      fill="#50bf8b"
                      d="M13.06 16.06a1.5 1.5 0 0 1-2.12 0l-5.658-5.656a1.5 1.5 0 1 1 2.122-2.121L12 12.879l4.596-4.596a1.5 1.5 0 0 1 2.122 2.12l-5.657 5.658Z"
                    />
                  </g>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <g fill="none" fillRule="evenodd">
                    <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                    <path
                      fill="#D9E1E6"
                      d="M13.06 16.06a1.5 1.5 0 0 1-2.12 0l-5.658-5.656a1.5 1.5 0 1 1 2.122-2.121L12 12.879l4.596-4.596a1.5 1.5 0 0 1 2.122 2.12l-5.657 5.658Z"
                    />
                  </g>
                </svg>
              )}
            </button>
            {isRecipeOpen && (
              <div
                className={styles.dropdownContent}
                ref={recipeDropdownRef}
                style={{
                  marginTop: "255px",
                  marginLeft: "52px",
                  width: "200px",
                }}
              >
                {recipeCategory.map((item, index) => (
                  <React.Fragment key={item.id}>
                    <a
                      key={item.id}
                      // onClick={() => handleRecipeClick()}
                      onClick={() => {
                        router.push("/recipe");
                        handleCategoryChangeR(item.id);
                      }}
                      className={item.className}
                    >
                      {item.name}
                    </a>
                    {/* {index < recipeCategory.length - 1 && (
                      <hr className={styles.noMargin} />
                    )} */}
                  </React.Fragment>
                ))}
              </div>
            )}
          </li>
          <li className={styles.navItemPageLinks}>
            <a className={styles.pageLink} onClick={goClassList}>
              <div>精選課程</div>
            </a>
            <button
              className={styles.navTextButton}
              onMouseDown={ClassToggleDropdown}
              onMouseUp={handleMouseUp}
            >
              {isClassOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <g fill="none" fillRule="evenodd">
                    <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                    <path
                      fill="#50bf8b"
                      d="M13.06 16.06a1.5 1.5 0 0 1-2.12 0l-5.658-5.656a1.5 1.5 0 1 1 2.122-2.121L12 12.879l4.596-4.596a1.5 1.5 0 0 1 2.122 2.12l-5.657 5.658Z"
                    />
                  </g>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <g fill="none" fillRule="evenodd">
                    <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                    <path
                      fill="#D9E1E6"
                      d="M13.06 16.06a1.5 1.5 0 0 1-2.12 0l-5.658-5.656a1.5 1.5 0 1 1 2.122-2.121L12 12.879l4.596-4.596a1.5 1.5 0 0 1 2.122 2.12l-5.657 5.658Z"
                    />
                  </g>
                </svg>
              )}
            </button>
            {isClassOpen && (
              <div
                className={styles.dropdownContent}
                ref={calssDropdownRef}
                style={{
                  marginTop: "255px",
                  marginLeft: "52px",
                  width: "200px",
                }}
              >
                {classCategory.map((item, index) => (
                  <React.Fragment key={item.id}>
                    <a
                      key={item.id}
                      onClick={() => {
                        router.push("/class-page");
                        handleCategoryChangeC(item.id);
                      }}
                      className={item.className}
                    >
                      {item.name}
                    </a>
                    {/* {index < classCategory.length - 1 && (
                      <hr className={styles.noMargin} />
                    )} */}
                  </React.Fragment>
                ))}
              </div>
            )}
          </li>
          <li className={styles.navItemPageLinks}>
            <a onClick={goSpeekerList} className={styles.pageLink}>
              <span className={styles.navText}>講師陣容</span>
            </a>
          </li>
          <li className={styles.navItemAbout}>
            <a href="#" className={styles.pageLink}>
              <span className={styles.navText}>認識Nutripolls</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default HeaderComponent;
