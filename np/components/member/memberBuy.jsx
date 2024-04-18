import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; 
import styles from "./memberBuy.module.css"


 const MemberBuy =() => {
  return(
    <> 
  <div className={` ${styles.container1} ${styles.main} ` }>
  {/* 下面是側邊攔 */}
  <div className={styles.menu}>
    <div className={styles.menuTop}>
      <div className={styles.userimage} />
      <div className={styles.menuTitle}>
        <div className={styles.accountleft}><a href>帳號</a></div>
        <div className={styles.nameleft}><a href>會員名稱</a></div>
      </div>
    </div>
    <div className={styles.menu1}>
      <div className={styles.menu2}>
        <div className={styles.myAccount}> <a href>我的帳戶</a></div>
        <div className={styles.lefta}><a href>購買清單</a></div>
        <div className={styles.lefta}><a href>優惠券</a></div>
        <div className={styles.lefta}><a href>會員等級</a></div>
        <div className={styles.lefta}><a href>願望清單</a></div>
      </div>
    </div>
  </div>
  {/* 這邊是主內容那塊 */}
  <div className>
    {/* 主內容的標題 */}
    <div className={styles.title}>
      <div className={styles.titleNow}>購買清單</div>
      <div className={styles.title2}>我的帳戶</div>
    </div>
    {/* 主內容的標題 */}
    <div>
  <div className={styles.couponcat}>
    <div className={styles.ccathover}><a href>全部</a></div>
    <div className={styles.ccat}><a href>待付款</a></div>
    <div className={styles.ccat}> <a href>待出貨</a></div>
    <div className={styles.ccat}><a href>待收貨</a></div>
    <div className={styles.ccat}><a href>已完成</a></div>
    <div className={styles.ccat}><a href>取消</a></div>
  </div>
  {/* 分類欄下面的搜尋框 */}
  <div className={styles.mainsearch}>
    <div className={styles.mscontent}>Search for ltemss...</div>
    <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/4d7b4236db983404c60a8e6f407043967fd36bb8b4dd9dd5af142d2320770caa?" className={styles.img} />
  </div>
</div>
<div className={styles.buyCard}>
  <div className={styles.buyCardContent}>
    <div className={styles.bccolumn}>
      <div className={styles.bcimg} />
    </div>
    <div className={styles.bccolumn2}>
      <div className={styles.buyItem}>
        <div className={styles.buyItemMain}>
          <div className={styles.biContent}>新鮮 蔬菜 </div>
          <div className={styles.biNumber}>商品規格數量..... </div>
          <div className={styles.biState}>狀態 : 待收貨</div>
        </div>
        <div className={styles.biMb }>
          <div className={styles.biMoney}>訂單金額: $200</div>
          <a href className={`${styles.buyCardBtn} btn` }>查看詳情</a>
        </div>
      </div>
    </div>
  </div>
</div>
<div className={styles.buyCard}>
  <div className={styles.buyCardContent}>
    <div className={styles.bccolumn}>
      <div className={styles.bcimg} />
    </div>
    <div className={styles.bccolumn2}>
      <div className={styles.buyItem}>
        <div className={styles.buyItemMain}>
          <div className={styles.biContent}>新鮮 蔬菜 </div>
          <div className={styles.biNumber}>商品規格數量..... </div>
          <div className={styles.biState}>狀態 : 待收貨</div>
        </div>
        <div className={styles.biMb }>
          <div className={styles.biMoney}>訂單金額: $200</div>
          <a href className={`${styles.buyCardBtn} btn` }>查看詳情</a>
        </div>
      </div>
      
    </div>
  </div>
</div>
<div className={styles.buyCard}>
  <div className={styles.buyCardContent}>
    <div className={styles.bccolumn}>
      <div className={styles.bcimg} />
    </div>
    <div className={styles.bccolumn2}>
      <div className={styles.buyItem}>
        <div className={styles.buyItemMain}>
          <div className={styles.biContent}>新鮮 蔬菜 </div>
          <div className={styles.biNumber}>商品規格數量..... </div>
          <div className={styles.biState}>狀態 : 待收貨</div>
        </div>
        <div className={styles.biMb }>
          <div className={styles.biMoney}>訂單金額: $200</div>
          <a href className={`${styles.buyCardBtn} btn` }>查看詳情</a>
        </div>
      </div>
      
    </div>
  </div>
</div>

  </div>
</div>
</>
);

};
export default MemberBuy;