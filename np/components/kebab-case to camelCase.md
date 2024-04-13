\.([\w-]+)\s

Name="([\w-]+)"

1. Ctrl + F 選正規表達搜索所有的減號命名(kebab-case)
2. Alt + Enter 全選
3. Ctrl + Shift + p 開啟上方查詢
4. 輸入 change case camel case 轉換成駝峰命名

---

`class=".*?"`

class=" "

`className=\{styles\..*?\}`

className={styles.所有內容}

`className=".*?"`

className="(所有內容)"

`className=\{styles\['.*?'\]\}`

className={styles['所有內容']}

---

駝峰命名後，className = " "， to className = {styles.}

1. Ctrl + H 取代
2. `className="([^"]*)"`
3. `className={styles.$1}`
