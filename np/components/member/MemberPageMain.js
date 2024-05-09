import { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./MemberPageMain.module.css";
import { useRouter } from "next/router";
// sweet alert
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const MemberPageMain = () => {
  // 更新資料成功後跳轉至會員首頁
  const router = useRouter();
  // 利用ref點擊input file，以此成功觸發監聽onChange
  const fileRef = useRef(null);
  // 判斷是否有上傳檔案，若無則顯示原本的圖片
  const [fileChanged, setFileChanged] = useState(false);
  const handleClickFile = () => {
    fileRef.current.click();
  };

  // 取得localStorage裡的token，用來發起req帶入headers
  const [LStoken, setLStoken] = useState("");
  const getTokenInLS = () => {
    setLStoken(localStorage.getItem("token"));
  };

  // 初始值
  const [userData, setUserData] = useState({
    id: 0,
    User_name: "",
    Account: "",
    Email: "",
    Phone: "",
    Address: "",
    Gender: "",
    User_image: "",
  });

  // 串接上後端並把token傳進headers用來解碼
  // !!! 從localStorage取出token後，帶入headers來解碼，若要用postman測試記得Authorization也要選Bearer Token並放入加密的token
  const getUser = async () => {
    const url = "http://localhost:3005/api/member-profile/check";
    const tokenforheaders = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${LStoken}`,
      },
    };
    try {
      const res = await fetch(url, tokenforheaders);
      const data = await res.json();
      setUserData(data.data.user);
    } catch (e) {
      console.log(e);
    }
  };

  // !!! 印出初始值後用來設定表單元素的state
  // 用來打印出radio
  const genderAry = [
    { name: "男", key: "M" },
    { name: "女", key: "F" },
    { name: "其他", key: "Other" },
  ];

  // 多欄位共用的formChange
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  // ??? ----------------------處理上傳圖片------------------------
  // 代表選中的檔案(null代表沒選中檔案，或取消檔案選擇)
  const [selectedFile, setSelectedFile] = useState(null);
  // 預覽圖片的網址(呼叫URL.createObjectURL得到的網址)
  const [previewURL, setPreviewURL] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      // 設定到選擇的檔案
      setSelectedFile(file);
      // 產生預覽圖片的網址
      setPreviewURL(URL.createObjectURL(file));
    } else {
      // 設回預設值
      setSelectedFile(null);
      setPreviewURL("");
    }
  };

  // 錯誤訊息狀態
  const [errors, setErrors] = useState({
    User_name: "",
    Email: "",
    Phone: "",
    Gender: "",
  });

  // 處理送出表單的行為
  const handleSubmit = async (e) => {
    // *** -------------------------- 表單檢查 START --------------------------------------
    e.preventDefault();
    // 建立一個新的錯誤物件
    const newErrors = {
      User_name: "",
      Email: "",
      Phone: "",
      Gender: "",
    };

    // 檢查各欄位是否為必填
    if (!userData.User_name) {
      newErrors.User_name = "姓名為必填";
    }

    if (!userData.Email) {
      newErrors.Email = "Email為必填";
    }

    if (!userData.Phone) {
      newErrors.Phone = "手機為必填";
    }

    if (!userData.Gender) {
      newErrors.Gender = "性別為必填";
    }

    // 呈現錯誤訊息
    setErrors(newErrors);

    // 如果檢查有發生錯誤時
    // hasErrors相當於Object.values(newErrors).some((v) => v)
    if (Object.values(newErrors).some((v) => v)) {
      setErrors(newErrors); // 呈現錯誤訊息
      return; // 跳出函式，不繼續往下
    } else {
      // 清空錯誤訊息
      setErrors({
        User_name: "",
        Email: "",
        Phone: "",
        Gender: "",
      });
    }
    // 欄位檢查 ---END---

    // ??? 最後檢查沒問題才送到伺服器
    const formData = new FormData();
    formData.append("User_name", userData.User_name);
    formData.append("Email", userData.Email);
    formData.append("Phone", userData.Phone);
    formData.append("Address", userData.Address);
    formData.append("Gender", userData.Gender);
    formData.append(
      "User_image",
      selectedFile ? selectedFile : userData.User_image
    );
    // 用來放在fetch裡的兩個參數
    const url = "http://localhost:3005/api/member-profile/update-profile";
    const updateProfileObj = {
      method: "put",
      headers: {
        Authorization: `Bearer ${LStoken}`,
      },
      body: formData,
    };
    const res = await fetch(url, updateProfileObj);
    const data = await res.json();

    // 顯示成功或失敗的訊息 (sweet alert)
    if (data.status === "success") {
      await Swal.fire({
        title: data.message,
        text: "",
        icon: "success",
      });
      router.push("/member");
    } else if (data.status === "error") {
      Swal.fire({
        icon: "error",
        title: data.message,
        text: "",
      });
    }
  };

  // 初次渲染時取得LS裡的token
  useEffect(() => {
    getTokenInLS();
  }, []);

  // 得到token後執行getUser()去後端解碼token並根據得到的user資料查詢資料庫並將資料設定給userData
  useEffect(() => {
    getUser();
  }, [LStoken]);

  return (
    <>
      <div className={` ${styles.container1} ${styles.main} `}>
        {/* 下面是側邊欄 */}

        {/* 這邊是主內容那塊 */}
        <div className>
          {/* 主內容的標題 */}
          <div className={styles.title}>
            <div className={styles.titleNow}>我的帳戶</div>
            {/* <div className={styles.title2}>我的帳戶</div> */}
          </div>
          {/* 主內容的標題 */}
          {/* 手機板大頭貼 */}
          <div className={styles.mUserimage}>
            <div className={styles.mUImage}>
              <img src="" alt="" />
              <div className={styles.camera}>
                <label htmlFor="fileUpload" className={styles.uploadBtn}>
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={29}
                    height={21}
                    viewBox="0 0 29 21"
                    fill="none"
                  >
                    <path
                      d="M8.81608 1.97624L8.26313 3.39811H4.29145C2.41461 3.39811 0.888672 4.70606 0.888672 6.31478V17.9814C0.888672 19.5902 2.41461 20.8981 4.29145 20.8981H24.7081C26.585 20.8981 28.1109 19.5902 28.1109 17.9814V6.31478C28.1109 4.70606 26.585 3.39811 24.7081 3.39811H20.7364L20.1835 1.97624C19.8379 1.08301 18.8649 0.481445 17.7643 0.481445H11.2352C10.1347 0.481445 9.16168 1.08301 8.81608 1.97624ZM14.4998 7.77311C15.8535 7.77311 17.1518 8.23405 18.109 9.05452C19.0662 9.87499 19.6039 10.9878 19.6039 12.1481C19.6039 13.3084 19.0662 14.4212 18.109 15.2417C17.1518 16.0622 15.8535 16.5231 14.4998 16.5231C13.1461 16.5231 11.8478 16.0622 10.8906 15.2417C9.93338 14.4212 9.39562 13.3084 9.39562 12.1481C9.39562 10.9878 9.93338 9.87499 10.8906 9.05452C11.8478 8.23405 13.1461 7.77311 14.4998 7.77311Z"
                      fill="#2ECC71"
                    />
                  </svg>
                </label>
                {/* 隐藏的文件上传输入框 */}
                <input
                  id="fileUpload"
                  type="file"
                  className={styles.inputfile}
                />
              </div>
            </div>
          </div>
          {/* 資料顯示區 */}
          <div className="mt-5 d-flex ">
            <div className={styles.form1}>
              <div className={`${styles.box} row mb-3 `}>
                <label
                  htmlFor="name"
                  className={`col-form-label text-end col-3 ${styles.lb}`}
                >
                  姓名 :
                </label>
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="請輸入姓名"
                    name="User_name"
                    value={userData.User_name}
                    onChange={handleChange}
                  />
                </div>
                {/* // *** 錯誤訊息 */}
                <div className="col-12 d-flex justify-content-center">
                  <span style={{ color: "red" }} className="error">
                    {errors.User_name}
                  </span>
                </div>
              </div>
              <div className={`${styles.box} row mb-3  `}>
                <label
                  htmlFor="email"
                  className={`col-form-label text-end  col-3 ${styles.lb}`}
                >
                  Email :
                </label>
                <div className="col">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="請輸入Email"
                    name="Email"
                    value={userData.Email}
                    onChange={handleChange}
                  />
                </div>
                {/* // *** 錯誤訊息 */}
                <div className="col-12 d-flex justify-content-center">
                  <span style={{ color: "red" }} className="error">
                    {errors.Email}
                  </span>
                </div>
              </div>
              <div className={`${styles.box} row mb-3 `}>
                <label
                  htmlFor="phone"
                  className={`col-form-label text-end  col-3 ${styles.lb}`}
                >
                  手機號碼 :
                </label>
                <div className="col">
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    placeholder="請輸入手機號碼"
                    name="Phone"
                    value={userData.Phone}
                    onChange={handleChange}
                  />
                </div>
                {/* // *** 錯誤訊息 */}
                <div className="col-12 d-flex justify-content-center">
                  <span style={{ color: "red" }} className="error">
                    {errors.Phone}
                  </span>
                </div>
              </div>
              <div className={`${styles.box} row mb-3 `}>
                <label
                  htmlFor="address"
                  className={`col-form-label text-end  col-3 ${styles.lb}`}
                >
                  地址 :
                </label>
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    placeholder="請輸入地址"
                    name="Address"
                    value={userData.Address === "null" ? "" : userData.Address}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className={`${styles.box} row mb-3 `}>
                <label
                  className={`col-form-label text-end  col-3 ${styles.lb}`}
                >
                  性别 :
                </label>
                <div className={`${styles.checkAlignment} col`}>
                  {genderAry.map((v, i) => {
                    return (
                      <div
                        className={`${styles.formCheck} form-check form-check-inline `}
                      >
                        <input
                          className={`${styles.formCheckInput} form-check-input`}
                          type="radio"
                          value={v.key}
                          name="Gender"
                          id={v.key}
                          checked={v.key === userData.Gender}
                          onChange={handleChange}
                        />
                        <label
                          htmlFor={v.key}
                          className={`${styles.formCheckLabel} form-check-label`}
                        >
                          {v.name}
                        </label>
                      </div>
                    );
                  })}

                  {/* // *** 利用map的方法打印出性別的radio */}
                  {/* <div
                    className={`${styles.formCheck} form-check form-check-inline `}
                  >
                    <input
                      className={`${styles.formCheckInput} form-check-input`}
                      type="radio"
                      id="male"
                      defaultValue="男"
                    />
                    <label
                      className={`${styles.formCheckLabel} form-check-label`}
                      htmlFor="male"
                    >
                      男
                    </label>
                  </div>
                  <div
                    className={`${styles.formCheck} form-check form-check-inline `}
                  >
                    <input
                      className={`${styles.formCheckInput} form-check-input`}
                      type="radio"
                      id="other"
                      defaultValue="其他"
                    />
                    <label
                      className={`${styles.formCheckLabel} form-check-label`}
                      htmlFor="other"
                    >
                      其他
                    </label>
                  </div> */}
                </div>
              </div>
              {/* <div className={`${styles.box} row mb-3 `}>
                <label
                  htmlFor="birthday"
                  className={`col-form-label text-end  col-3 ${styles.lb}`}
                >
                  生日 :
                </label>
                <div className="col">
                  <input
                    type="date"
                    className="form-control"
                    name="date_of_birth"
                    value={userData.date_of_birth}
                    onChange={handleChange}
                  />
                </div>
              </div> */}
              {/* // !修改密碼放在另外一頁 */}
              {/* <div className={`${styles.box} row mb-3 align-items-start`}>
          <label htmlFor="password" className={`col-form-label  col-3 ${styles.lb }`}>密碼 :</label>
          <div className="col">
            <input type="password" className="form-control" id="password" placeholder="請輸入密碼" />
          </div>
        </div>
        <a href className={`${styles.reset}   container-fluid text-end `}>[重設密碼]</a> */}
              <div
                className={`${styles.btnCenter} ${styles.box} row mb-3 align-items-start `}
              >
                <button
                  onClick={handleSubmit}
                  type="submit"
                  className={`${styles.btn1} ${styles.btnmargin} btn`}
                >
                  確認修改
                </button>
              </div>
            </div>
            <div className={styles.mainRight}>
              <div
                className={`rounded-circle overflow-hidden ${styles.userImageBig}`}
              >
                <img
                  src={
                    fileChanged
                      ? previewURL
                      : `/images/member/${userData.User_image}`
                  }
                  alt=""
                  className="w-100 h-100 object-fit-cover"
                />
              </div>
              <div className={`${styles.btnCenter} row mb-3 align-items-start`}>
                <label
                  onClick={handleClickFile}
                  className={`btn ${styles.btn2} `}
                >
                  選擇圖片
                </label>
                <input
                  ref={fileRef}
                  type="file"
                  className={styles.inputfile}
                  onChange={(e) => {
                    handleFileChange(e);
                    setFileChanged(true);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default MemberPageMain;
