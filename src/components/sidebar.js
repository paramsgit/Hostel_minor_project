import { useState } from "react";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
export const Side = () => {
  const [isact, setact] = useState(1);
  return (
    <div className="navb">
      <div
        className="d-flex justify-content-center "
        style={{ background: "#1a1b1f", maxWidth: "100px" }}
      >
        <img
          className="bhuy"
          src="pwhite.png"
          alt="noy"
          style={{ width: "20px", height: "18px" }}
        />
      </div>
      <nav className="d-flex ">
        <div>
          <ul
            className="d-flex flex-column align-items-center"
            style={{ listStyle: "none" }}
          >
            <h1></h1>
            <li className="my-3">
              <Link to="/login"
                onClick={() => setact(1)}
                className={`cvtn ${isact === 1 && "active"} `}
              >
                <i className={`fi fi-${isact === 1 ? "s" : "r"}r-home`}></i>
              </Link>
            </li>

            <li className="my-3">
            <Link to="/about"
                onClick={() => setact(2)}
                className={`cvtn ${isact === 2 && "active"} `}
              >
                <i className={`fi fi-${isact === 2 ? "s" : "r"}r-envelope`}></i>
              </Link>
            </li>
            <li className="my-3">
              <button
                onClick={() => setact(3)}
                className={`cvtn ${isact === 3 && "active"} `}
              >
                <i className={`fi fi-${isact === 3 ? "s" : "r"}r-lock`}></i>
              </button>
            </li>
            <li className="my-3">
              <button
                onClick={() => setact(4)}
                className={`cvtn ${isact === 4 && "active"} `}
              >
                <i
                  className={`fi fi-${isact === 4 ? "s" : "r"}r-graduation-cap`}
                ></i>
              </button>
            </li>
            <li className="my-3">
              <button
                onClick={() => setact(5)}
                className={`cvtn ${isact === 5 && "active"} `}
              >
                <i className={`fi fi-${isact === 5 ? "s" : "r"}r-apps`}></i>
              </button>
            </li>
            
          </ul>
        </div>
      </nav>
    </div>
  );
};

// import React, { useState } from "react";

// export default function Side(props) {
//   const [isact, setact] = useState(1);

//   return (
//   <div className="navb">
//     <div
//       className="d-flex justify-content-center "
//       style={{ background: "#1a1b1f", maxWidth: "100px" }}
//     >
//       <img
//         className="bhuy"
//         src="pwhite.png"
//         alt="noy"
//         style={{ width: "20px", height: "18px" }}
//       />
//     </div>
//     <nav className="d-flex ">
//       <div>
//         <ul
//           className="d-flex flex-column align-items-center"
//           style={{ listStyle: "none" }}
//         >
//           <h1></h1>
//           <li className="my-3">
//             <button
//               onClick={() => setact(1)}
//               className={`cvtn ${isact === 1 && "active"} `}
//             >
//               <i className={`fi fi-${isact === 1 ? "s" : "r"}r-home`}></i>
//             </button>
//           </li>

//           <li className="my-3">
//             <button
//               onClick={() => setact(2)}
//               className={`cvtn ${isact === 2 && "active"} `}
//             >
//               <i className={`fi fi-${isact === 2 ? "s" : "r"}r-envelope`}></i>
//             </button>
//           </li>
//           <li className="my-3">
//             <button
//               onClick={() => setact(3)}
//               className={`cvtn ${isact === 3 && "active"} `}
//             >
//               <i className={`fi fi-${isact === 3 ? "s" : "r"}r-lock`}></i>
//             </button>
//           </li>
//           <li className="my-3">
//             <button
//               onClick={() => setact(4)}
//               className={`cvtn ${isact === 4 && "active"} `}
//             >
//               <i
//                 className={`fi fi-${isact === 4 ? "s" : "r"}r-graduation-cap`}
//               ></i>
//             </button>
//           </li>
//           <li className="my-3">
//             <button
//               onClick={() => setact(5)}
//               className={`cvtn ${isact === 5 && "active"} `}
//             >
//               <i className={`fi fi-${isact === 5 ? "s" : "r"}r-apps`}></i>
//             </button>
//           </li>
//           {/* <li><i class="fi fi-rr-envelope"></i></li>
//  <li><i class="fi fi-rr-apps"></i></li>

//  <li><i class="fi fi-rr-lock"></i></li>
//  <li><i class="fi fi-rr-graduation-cap"></i></li>

//  <li><i class="fi fi-sr-graduation-cap"></i></li>
//  <li><i class="fi fi-sr-lock"></i></li>
//  <li><i class="fi fi-sr-home"></i></li>
//  <li><i class="fi fi-sr-envelope"></i></li>
//  <li><i class="fi fi-sr-apps"></i></li>  */}
//         </ul>
//       </div>
//     </nav>
//   </div>
//   );
// }
