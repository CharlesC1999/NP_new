import React from 'react';
import products from '@/data/Product.json';
import styles from './checkout.module.css';
import { useCart } from '@/hooks/use-cart';
import toast, { Toaster } from 'react-hot-toast';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

export default function ProductList() {
  const { addItem } = useCart();

  const MySwal = withReactContent(Swal);

  const notify = (productName) => {
    MySwal.fire({
      title: '成功加入',
      text: productName + '已成功加入購物車!',
      icon: 'success',
    });
  };

  //   const notify = (productName) =>
  //     toast.success(productName + ' 已成功加入購物車!');

  return (
    <>
      <ul className={styles['list']}>
        {products.map((v, i) => {
          return (
            <li key={v.id} className={styles['item']}>
              <div className={styles['w-400']}>{v.name}</div>
              <div>{v.price}</div>
              <div>
                <button
                  onClick={() => {
                    // 呈現訊息
                    notify(v.name);
                    // 加入購物車狀態
                    addItem(v);
                  }}
                >
                  加入購物車
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      {/* 用於土司訊息的元件 */}
      <Toaster />
    </>
  );
}
