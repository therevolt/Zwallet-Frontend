import { useRouter } from "next/router";
import Layout from "../component/base/Layout";

export default function Home() {
  const router = useRouter();

  return (
    <Layout title="Landing Page" navbar="landing" footer="landing" type="landing">
      <div className="landing-page">
        <div className="container">
          <div className="content d-flex flex-column">
            <div className="title-content">
              Awesome App
              <br />
              For Saving Time.
            </div>
            <div className="subtext-title my-3">
              We bring you a mobile app for banking problems <br /> that oftenly wasting much of
              your times.
            </div>
            <button
              className="btn-signup fit-content my-3 primary-text fs-5"
              onClick={() => router.push("/auth/signup")}
            >
              Try It Free
            </button>
          </div>
        </div>
      </div>
      <div className="main d-flex flex-column">
        <div className="submenu-1 container d-flex flex-column my-5 py-4">
          <span className="title-submenu">
            <span className="primary-text">Why</span> Choose Zwallet?
          </span>
          <span className="subtext-title-submenu">
            We have some great features from the application and it’s totally free
            <br />
            to use by all users around the world.
          </span>
        </div>
        <div className="submenu-2 container d-flex justify-content-between mb-5 pb-5">
          <div className="card-feature d-flex flex-column py-5 px-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100"
              height="100"
              viewBox="0 0 100 100"
              fill="none"
            >
              <g filter="url(#filter0_d)">
                <circle cx="50" cy="46" r="30" fill="#473AD1" fillOpacity="0.1" />
              </g>
              <path
                d="M62.5 52.1501V55.9001C62.5014 56.2482 62.4301 56.5928 62.2906 56.9118C62.1511 57.2308 61.9466 57.5171 61.6901 57.7525C61.4335 57.9878 61.1307 58.167 60.8009 58.2785C60.4711 58.39 60.1217 58.4315 59.775 58.4001C55.9285 57.9822 52.2337 56.6678 48.9875 54.5626C45.9673 52.6435 43.4066 50.0828 41.4875 47.0626C39.375 43.8016 38.0603 40.0889 37.65 36.2251C37.6187 35.8795 37.6598 35.5311 37.7706 35.2022C37.8814 34.8732 38.0594 34.571 38.2934 34.3146C38.5274 34.0583 38.8122 33.8535 39.1297 33.7133C39.4472 33.573 39.7904 33.5004 40.1375 33.5001H43.8875C44.4941 33.4942 45.0822 33.709 45.5422 34.1045C46.0021 34.5001 46.3026 35.0494 46.3875 35.6501C46.5458 36.8502 46.8393 38.0285 47.2625 39.1626C47.4307 39.61 47.4671 40.0963 47.3674 40.5637C47.2677 41.0312 47.0361 41.4603 46.7 41.8001L45.1125 43.3876C46.8919 46.5171 49.483 49.1082 52.6125 50.8876L54.2 49.3001C54.5398 48.964 54.9689 48.7324 55.4364 48.6327C55.9038 48.533 56.3901 48.5694 56.8375 48.7376C57.9716 49.1608 59.1499 49.4543 60.35 49.6126C60.9572 49.6983 61.5117 50.0041 61.9081 50.472C62.3046 50.9399 62.5152 51.5371 62.5 52.1501Z"
                stroke="#6379F4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <defs>
                <filter
                  id="filter0_d"
                  x="0"
                  y="0"
                  width="100"
                  height="100"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  />
                  <feOffset dy="4" />
                  <feGaussianBlur stdDeviation="10" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"
                  />
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
            <span style={{ fontSize: "24px", fontWeight: "700" }}>24/7 Support</span>
            <span className="my-4">
              We have 24/7 contact support so you can contact us whenever you want and we will
              respond it.
            </span>
          </div>
          <div className="card-feature d-flex flex-column py-5 px-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100"
              height="100"
              viewBox="0 0 100 100"
              fill="none"
            >
              <g filter="url(#filter0_d)">
                <circle cx="50" cy="46" r="30" fill="#473AD1" fillOpacity="0.1" />
              </g>
              <path
                d="M58.75 44.75H41.25C39.8693 44.75 38.75 45.8693 38.75 47.25V56C38.75 57.3807 39.8693 58.5 41.25 58.5H58.75C60.1307 58.5 61.25 57.3807 61.25 56V47.25C61.25 45.8693 60.1307 44.75 58.75 44.75Z"
                stroke="#6379F4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M43.75 44.75V39.75C43.75 38.0924 44.4085 36.5027 45.5806 35.3306C46.7527 34.1585 48.3424 33.5 50 33.5C51.6576 33.5 53.2473 34.1585 54.4194 35.3306C55.5915 36.5027 56.25 38.0924 56.25 39.75V44.75"
                stroke="#6379F4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <defs>
                <filter
                  id="filter0_d"
                  x="0"
                  y="0"
                  width="100"
                  height="100"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  />
                  <feOffset dy="4" />
                  <feGaussianBlur stdDeviation="10" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"
                  />
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>{" "}
            <span style={{ fontSize: "24px", fontWeight: "700" }}>Data Privacy</span>
            <span className="my-4">
              We make sure your data is safe in our database and we will encrypt any data you
              submitted to us.
            </span>
          </div>
          <div className="card-feature d-flex flex-column py-5 px-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100"
              height="100"
              viewBox="0 0 100 100"
              fill="none"
            >
              <g filter="url(#filter0_d)">
                <circle cx="50" cy="46" r="30" fill="#473AD1" fillOpacity="0.1" />
              </g>
              <path
                d="M61.25 49.75V54.75C61.25 55.413 60.9866 56.0489 60.5178 56.5178C60.0489 56.9866 59.413 57.25 58.75 57.25H41.25C40.587 57.25 39.9511 56.9866 39.4822 56.5178C39.0134 56.0489 38.75 55.413 38.75 54.75V49.75"
                stroke="#6379F4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M43.75 43.5L50 49.75L56.25 43.5"
                stroke="#6379F4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M50 49.75V34.75"
                stroke="#6379F4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <defs>
                <filter
                  id="filter0_d"
                  x="0"
                  y="0"
                  width="100"
                  height="100"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  />
                  <feOffset dy="4" />
                  <feGaussianBlur stdDeviation="10" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"
                  />
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>{" "}
            <span style={{ fontSize: "24px", fontWeight: "700" }}>Easy Download</span>
            <span className="my-4">
              Zwallet is 100% totally free to use it’s now available on Google Play Store and App
              Store.
            </span>
          </div>
        </div>
        <div className="submenu-3">
          <img src="/partner.png" alt="" />
        </div>
        <div className="submenu-4 container d-flex flex-column">
          <div className="money-transfered primary-text my-4">Rp. 390.736.500</div>
          <span className="title-submenu my-4">
            <span className="primary-text">Money</span> has Been Transfered.
          </span>
          <span className="subtext-title-submenu mb-5 pb-5">
            That amount of money has been transfered from all users. We still
            <br />
            counting and going strong!
          </span>
        </div>
        <div className="submenu-5 d-flex">
          <div className="img-preview">
            <img src="/preview_apps.png" alt="" />
          </div>
          <div className="highlight d-flex flex-column">
            <div className="highlight-title">
              All The <span className="primary-text">Great</span>
              <br />
              Zwallet Features.
            </div>
            <div className="item-highlight px-4 py-4 my-3 mt-5">
              <p className="title-item-highlight fw-bolder">
                <span className="primary-text">1. </span> Small Fee
              </p>
              <span className="body-item-highlight">
                We only charge 5% of every success transaction done in Zwallet app.
              </span>
            </div>
            <div className="item-highlight px-4 py-4 my-3">
              <p className="title-item-highlight fw-bolder">
                <span className="primary-text">2. </span> Data Secured
              </p>
              <span className="body-item-highlight">
                All your data is secured properly in our system and it’s encrypted.
              </span>
            </div>
            <div className="item-highlight px-4 py-4 my-3">
              <p className="title-item-highlight fw-bolder">
                <span className="primary-text">3. </span> User Friendly
              </p>
              <span className="body-item-highlight">
                Zwallet come up with modern and sleek design and not complicated.
              </span>
            </div>
          </div>
        </div>
        <div className="submenu-6 d-flex flex-column my-5 pt-5">
          <div className="title-submenu">
            What Users are <span className="primary-text">Saying.</span>
          </div>
          <div className="subtext-title-submenu">
            We have some great features from the application and it’s totally free
            <br />
            to use by all users around the world.
          </div>
          <div className="carousel-feedback d-flex">
            <div className="button-prev">
              <img src="/prev.png" alt="" />
            </div>
            <div className="feedback">
              <div className="card-feedback d-flex flex-column align-items-center py-5">
                <img src="/user.png" alt="" width="120px" />
                <span className="fw-bold mt-3">Wisnu P</span>
                <span className="my-3">Programmer</span>
                <div className="text-feedback">
                  “This is the most outstanding app that I’ve ever try in my live, this app is such
                  an amazing masterpiece and it’s suitable for you who is bussy with their bussiness
                  and must transfer money to another person aut there. Just try this app and see the
                  power!”
                </div>
              </div>
            </div>
            <div className="button-next">
              <img src="/next.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
