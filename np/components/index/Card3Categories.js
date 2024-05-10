import React from "react";
import styles from "./Card3Categories.module.css";
import Link from "next/Link"
function Card3Categories({name,id}) {
  const productCateIcon = ["cateVegetable01.png","cateFruit.png","cateMeat.png","cateFish.png","cateEgg.png","cateMilk.png","cateVegetable02.png"]
  return(
    <>  
      <Link href={`/product?categoryFromDetail=${id}`} className={styles.card3boxLink }>
        <div className={`${styles['card3box']}`}>
          <div className={`${styles['card3CategoryContent']}`}>
            <div className={styles.cateImg}>
              <img src={`/index-images/product-cataPng/${productCateIcon[id-1]}`} alt="" />
            </div>
                <h6>{name}</h6>
            </div>
            
      </div>
      </Link>
    </>
  )
}

export default Card3Categories