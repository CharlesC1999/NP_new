export default async function handler(req, res) {
  const { email } = req.query;
  // 在此處連接你的數據庫並檢查郵箱是否存在
  const exists = await checkEmailInDatabase(email);
  res.status(200).json({ exists });
}

async function checkEmailInDatabase(email) {
  // 實際的數據庫查詢
  return false; // 修改為基於實際查詢結果的返回值
}
