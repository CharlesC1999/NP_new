import React from 'react';

function DiscountComponent({ discount }) {
    let displayText;
    if (typeof discount === 'number') {
        if (discount < 1) {
            const discountPercent = discount * 100;
            displayText = `${discountPercent}折`;
        } else {
            displayText = `$${discount}`;
        }
    } else {
        displayText = discount;
    }

    return (
        <span className={styles.cspan}>{displayText}</span>
    );
}

export default DiscountComponent;


//按鈕從後端抓過來要不要顯示方法2
import React from 'react';

function CouponList({ coupons }) {
    return (
        <div>
            {coupons.map(coupon => (
                <div key={coupon.id} className={styles.card}>
                    <div className={styles.content}>
                        <p>優惠券內容</p>
                    </div>
                    <button className={styles.button} disabled={coupon.status !== '可使用'}>立即使用</button>
                </div>
            ))}
        </div>
    );
}

export default CouponList;




// 下面是三種優惠券樣式

<div className={styles.coupmain}>
  {/* 可以用的 */}
  <div className={styles.couponCard}>
    <div className={styles.couponImg} >
    <span className={styles.cspan} >85折</span>
   
  <span className={styles.cspan2}>效期:2024/12/31</span>
  <span className={styles.cspan2}>~2025/12/31</span>
    </div>
    <div className={styles.couponContent }>
      <div className={styles.couponDetails}>
        <div className={styles.lowbuy}>低消$100</div>
        
        <div className={styles.couponDate}>二月過年檔期小優惠你這個敗家子還買舵手手</div>
      </div>
      <div className={styles.couponButton}>
        <button className={`${styles.couponBtn} btn`}>立即使用</button>
      </div>
    </div>
  </div>
  {/* 不能用的 */}
  {/* <div className={styles.couponCard}>
    <div className={styles.couponImg} />
    <div className={styles.couponContent }>
      <div className={styles.couponDetails}>
        <div className={styles.lowbuy}>低消$100</div>
        <div className={styles.couponDate}>有效日期:2024/12/31</div>
      </div>
      
    </div>
  </div> */}
  {/* 原本的 */}
  <div className={styles.couponCard}>
    <div className={styles.couponImg} >
      
    </div>
    <div className={styles.couponContent }>
      <div className={styles.couponDetails}>
        <div className={styles.lowbuy}>低消$100</div>
        <div className={styles.couponDate}>有效日期:2024/12/31</div>
      </div>
      <div className={styles.couponButton}>
        <button className={`${styles.couponBtn} btn`}>立即使用</button>
      </div>
    </div>
  </div>

 
</div>
