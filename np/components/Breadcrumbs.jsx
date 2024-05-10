import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import BreadcrumbsStyles from "./BreadcrumbsStyles.module.css";

//  這裡大家共編一下，因為檔案命名是英文的，但麵包屑需要是中文的，所以大家請放上英文檔名以及對應的中文名稱

const pathNameMapping = {
  "search-result": "搜尋結果",
  "class-page": "精選課程",
  "class-detail": "課程介紹",
  speaker: "講師陣容",
  "speaker-detail": "講師介紹",
  member: "會員",
  favor: "願望清單",
  recipe: "食譜列表",
  recipeId: "食譜詳細頁",
  product: "產品列表",
  "product-detail": "產品介紹",
  // 繼續添加其他路徑和對應的中文名稱
};

const Breadcrumbs = () => {
  const anchorStyle = {
    color: "var(--green03)",
    textDecoration: "none",
    marginInline: "10px",
  };

  const router = useRouter();
  const pathSegments = router.asPath
    .split("?")[0]
    .split("/")
    .filter((v) => v);

  const breadcrumbs = pathSegments.map((segment, index) => {
    const nextSegment = pathSegments[index + 1];
    const baseHref = "/" + pathSegments.slice(0, index + 1).join("/");
    let href = `${baseHref}`; // 指向資料夾中的 index.js

    // 檢查是否是動態路由的情況，比如包含查詢參數的課程介紹頁
    if (segment === "class-detail" && nextSegment === undefined) {
      // 如果是 class-detail 並且沒有下一個路徑段，認為是查詢參數情況
      href += `?${router.asPath.split("?")[1]}`; // 保持原有查詢參數
    }

    if (segment === "speaker-detail" && nextSegment === undefined) {
      // 如果是 speaker-detail 並且沒有下一個路徑段，認為是查詢參數情況
      href += `?${router.asPath.split("?")[1]}`; // 保持原有查詢參數
    }

    const displayName = pathNameMapping[segment] || segment; // 使用映射的中文名稱或原名稱

    return { name: displayName, href };
  });

  return (
    <div className={BreadcrumbsStyles.styleSetting}>
      <nav className={BreadcrumbsStyles.widthSetting}>
        <Link
          href="/"
          style={anchorStyle}
          className={BreadcrumbsStyles.homeFont}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
          >
            <path fill="#78CEA6" d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8z" />
          </svg>
          首頁
        </Link>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24px"
          height="24px"
          viewBox="0 0 1024 1024"
          style={{ verticalAlign: "middle" }}
        >
          <path
            fill="#78CEA6"
            d="M338.752 104.704a64 64 0 0 0 0 90.496l316.8 316.8l-316.8 316.8a64 64 0 0 0 90.496 90.496l362.048-362.048a64 64 0 0 0 0-90.496L429.248 104.704a64 64 0 0 0-90.496 0"
          />
        </svg>
        {breadcrumbs.map((breadcrumb, index) => (
          <span
            key={index}
            className={BreadcrumbsStyles.routerFont}
            style={{ display: "inline" }}
          >
            {index > 0 && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="24px"
                viewBox="0 0 1024 1024"
                style={{ verticalAlign: "middle" }}
              >
                <path
                  fill="#78CEA6"
                  d="M338.752 104.704a64 64 0 0 0 0 90.496l316.8 316.8l-316.8 316.8a64 64 0 0 0 90.496 90.496l362.048-362.048a64 64 0 0 0 0-90.496L429.248 104.704a64 64 0 0 0-90.496 0"
                />
              </svg>
            )}
            <Link href={breadcrumb.href} style={anchorStyle}>
              {breadcrumb.name}
            </Link>
          </span>
        ))}
      </nav>
    </div>
  );
};

export default Breadcrumbs;
