const callbackLineLogin = async (query) => {
  const qs = new URLSearchParams({
    ...query,
  }).toString();
  const res = await fetch(
    `http://localhost:3005/api/line-login/callback?${qs}`,
    { credentials: "include" }
  ).then((res) => res.json());
  console.log(res);

  if (res.status === "success") {
    const jwtUser = parseJwt(res.data.accessToken);
    const res1 = await fetch(`http://localhost:3005/api/member/${jwtUser.id}`, {
      // headers: {
      //   Accept: 'application/json',
      //   'Content-Type': 'application/json',
      // },
      // 允許攜帶cookie
      credentials: "include",
    }).then((res) => res.json());

    if (res1.status === "success") {
      const dbUser = res1.data;
      const userData = { ...initUserData };

      for (const key in userData) {
        if (Object.hasOwn(dbUser, key)) {
          userData[key] = dbUser[key] || "";
        }
        // console.log(userData)
      }

      setAuth({
        isAuth: true,
        userData,
      });
      Swal.fire({
        // position: "top-end",
        icon: "success",
        title: "成功登入，頁面即將跳轉",
        showConfirmButton: false,
        timer: 2000,
      });
      setTimeout(() => {
        window.location.href = "http://localhost:3000/member/profile";
      }, 1000);
    } else {
      Swal.fire({
        icon: "error",
        title: "登入失敗",
        text: "無法取得會員資料",
      });
    }
  } else {
    Swal.fire({
      icon: "error",
      title: "登入失敗",
      text: "請重新嘗試，或註冊帳號",
    });
  }
};

// 處理line登入
const goLineLogin = async () => {
  if (auth.isAuth) return;
  const data = await fetch(`http://localhost:3005/api/line-login/login`, {
    credentials: "include",
    // }).then((res) => {
    //   res.json()
    // console.log(res.data.url)
    // if (res.data.url) {
    //   window.location.href = res.data.url
    // }
  }).then((res) => res.json());
  if (data) {
    window.location.href = data.url;
  }
  console.log(data);
};
