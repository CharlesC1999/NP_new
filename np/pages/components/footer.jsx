import React from "react";
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerTop}>
          <div className={styles.footerSection}>
            <h2 className={styles.footerTitle}>營養大選 Nutripolls</h2>
            <nav className={styles.footerLinks}>
              <a href="#" className={styles.footerNoMargin}>
                關於我們
              </a>
              <a href="#" className={styles.footerLink}>
                會員權益
              </a>
              <a href="#" className={styles.footerLink}>
                隱私權政策
              </a>
              <a href="#" className={styles.footerLink}>
                購物須知
              </a>
            </nav>
          </div>
          <div className={styles.footerSection}>
            <h2 className={styles.footerTitle}>聯絡資訊</h2>
            <div className={styles.footerContactInfo}>
              <p className={styles.footerNoMargin}>
                服務信箱：service@mfee48.com.tw
              </p>
              <p className={styles.footerContactItem}>客服專線：0800-666-888</p>
              <p className={styles.footerContactItem}>
                客服時間：週一至週五9:00-18:00
              </p>
            </div>
          </div>
          <div className={styles.footerSection}>
            <h2 className={styles.footerTitle}>關注我們</h2>
            <div className={styles.footerSocialIcons}>
              <a href="#" className={styles.footerIconLinks}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28.5"
                  height="28.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="white"
                    d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95"
                  />
                </svg>
              </a>
              <a href="#" className={styles.footerIconLinks}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28.5"
                  height="28.5"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill="white"
                    d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104l.022.26l.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105l-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006l-.087-.004l-.171-.007l-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103l.003-.052l.008-.104l.022-.26l.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007l.172-.006l.086-.003l.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z"
                  />
                </svg>
              </a>
              <a href="#" className={styles.footerIconLinks}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28.5"
                  height="28.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="white"
                    d="M19.365 9.863a.631.631 0 0 1 0 1.261H17.61v1.125h1.755a.63.63 0 1 1 0 1.259h-2.386a.631.631 0 0 1-.627-.629V8.108c0-.345.282-.63.63-.63h2.386a.63.63 0 0 1-.003 1.26H17.61v1.125zm-3.855 3.016a.63.63 0 0 1-.631.627a.618.618 0 0 1-.51-.25l-2.443-3.317v2.94a.63.63 0 0 1-1.257 0V8.108a.627.627 0 0 1 .624-.628c.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63c.345 0 .63.285.63.63zm-5.741 0a.632.632 0 0 1-.631.629a.631.631 0 0 1-.627-.629V8.108c0-.345.282-.63.63-.63c.346 0 .628.285.628.63zm-2.466.629H4.917a.634.634 0 0 1-.63-.629V8.108c0-.345.285-.63.63-.63c.348 0 .63.285.63.63v4.141h1.756a.63.63 0 0 1 0 1.259M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608c.391.082.923.258 1.058.59c.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645c1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <p className={styles.footerBottom}>
          Copyright © 2023 Nutripolls. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
