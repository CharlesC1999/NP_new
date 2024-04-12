<section className="product-count-container">
  <header className="product-count-header">
    <h3 className="total-products">總共： # 項商品</h3>
    <div className="product-count-controls">
      <button className="celander-mobile">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
        >
          <g
            fill="none"
            stroke="#78CEA6"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          >
            <path d="M8 2v4m8-4v4" />
            <rect width={18} height={18} x={3} y={4} rx={2} />
            <path d="M3 10h18" />
          </g>
        </svg>
      </button>
      <div className="items-per-page">
        <span className="items-per-page-value" id="itemsPerPage">
          6
        </span>
        <div className="number-increase-decrease">
          <button className="select-btn" id="itemsPerPageUpIcon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10px"
              height="8px"
              viewBox="0 0 1024 1024"
              className="select-btn-icon"
            >
              <path
                fill="#78CEA6"
                d="M104.704 685.248a64 64 0 0 0 90.496 0l316.8-316.8l316.8 316.8a64 64 0 0 0 90.496-90.496L557.248 232.704a64 64 0 0 0-90.496 0L104.704 594.752a64 64 0 0 0 0 90.496"
              />
            </svg>
          </button>
          <button className="select-btn" id="itemsPerPageDownIcon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10px"
              height="8px"
              viewBox="0 0 1024 1024"
              className="select-btn-icon"
            >
              <path
                fill="#78CEA6"
                d="M104.704 338.752a64 64 0 0 1 90.496 0l316.8 316.8l316.8-316.8a64 64 0 0 1 90.496 90.496L557.248 791.296a64 64 0 0 1-90.496 0L104.704 429.248a64 64 0 0 1 0-90.496"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="sort-by" id="sortBy">
        <span className="sort-by-label">依 :</span>
        <span className="sort-by-value" id="sortByValue">
          Class ID
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          className="sort-mobile"
        >
          <path
            fill="#8b96a5"
            d="M4 18h4c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1M3 7c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1m1 6h10c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1"
          />
        </svg>
        <span className="sort-order">排序</span>
        <div className="sort-by-options">
          <div className="sort-by-option" data-value="Class ID">
            Class ID
          </div>
          <div className="sort-by-option" data-value="Product Name">
            Product Name
          </div>
          <div className="sort-by-option" data-value="Price">
            Price
          </div>
          <div className="sort-by-option" data-value="Date Added">
            Date Added
          </div>
        </div>
      </div>
      {/* only for mobile */}
      <div className="class-select">
        <span className="class-select-label">分類(#)</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          className="sort-mobile"
        >
          <path
            fill="#8b96a5"
            d="M2.57 3h18.86l-6.93 9.817V21h-5v-8.183zm3.86 2l5.07 7.183V19h1v-6.817L17.57 5z"
          />
        </svg>
      </div>
      {/* only for mobile */}
      <div className="grid-row-selections">
        <button className="grid-btn" id="selection-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="27px"
            height="27px"
            viewBox="0 0 24 24"
            className="selection-btn"
          >
            <g fill="none" fillRule="evenodd">
              <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
              <path
                fill="#50bf8b"
                d="M9 13a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2zm10 0a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2zM9 3a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm10 0a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"
              />
            </g>
          </svg>
        </button>
        <button className="row-btn" id="selection-btn-list">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30px"
            height="30px"
            viewBox="0 0 100 100"
            className="selection-btn-list"
          >
            <path
              fill="#50bf8b"
              d="M17.563 30.277h.012a2.268 2.268 0 0 0 2.246 2.267v.002H80.18v-.001a2.269 2.269 0 0 0 2.259-2.268h.01V19.818a2.269 2.269 0 0 0-2.269-2.265H19.821a2.27 2.27 0 0 0-2.269 2.269c0 .039.01.076.012.115zm62.616 12.227H19.821a2.27 2.27 0 0 0-2.269 2.269c0 .039.01.076.012.115v10.34h.012a2.268 2.268 0 0 0 2.246 2.267v.002h60.359v-.001a2.269 2.269 0 0 0 2.259-2.268h.01V44.769a2.272 2.272 0 0 0-2.271-2.265m0 24.95H19.821a2.27 2.27 0 0 0-2.269 2.269c0 .039.01.076.012.115v10.34h.012a2.268 2.268 0 0 0 2.246 2.267v.002h60.359v-.001a2.27 2.27 0 0 0 2.259-2.269h.01V69.718a2.272 2.272 0 0 0-2.271-2.264"
            />
          </svg>
        </button>
      </div>
    </div>
  </header>
</section>;
