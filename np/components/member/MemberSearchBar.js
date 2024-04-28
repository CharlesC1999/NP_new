import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; 
import styles from "./MemberSearchBar.module.css"


 const MemberSearchBar =() => {
  return(
    <> 
      <div className={styles.searchContainer}>
  <input className={styles.searchBar} type="text" placeholder="Search for items..." />
  <button type="submit" className={styles.searchButton}>
    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24">
      <path fill="none" stroke="#747E85" strokelinecap="round" strokelinejoin="round" d="m21 21l-4.343-4.343m0 0A8 8 0 1 0 5.343 5.343a8 8 0 0 0 11.314 11.314" />
    </svg>
  </button>
</div>



          
    </>
);

};
export default MemberSearchBar;