import React, { useState, useContext } from "react";
import { Logo } from "@pmndrs/branding";
import {
  AiOutlineHighlight,
  AiOutlineShopping,
  AiFillCamera,
  AiOutlineArrowLeft,
} from "react-icons/ai";
import { ProjectContext, ProjectDispatchContext } from "./context";

function Overlay() {
  const tabs = {
    intro: "intro",
    customizer: "customizer",
  };
  const [currentTab, setCurrentTab] = useState(tabs.intro);

  if (currentTab === tabs.intro)
    return <Intro tabs={tabs} setCurrentTab={setCurrentTab} />;
  if (currentTab === tabs.customizer)
    return <Customizer tabs={tabs} setCurrentTab={setCurrentTab} />;
}

function Intro({ tabs, setCurrentTab }) {
  return (
    <div className="container">
      <header>
        <Logo width="40" height="40" />
        <div>
          <AiOutlineShopping size="3em" />
        </div>
      </header>

      <section key="main">
        <div className="section--container">
          <div>
            <h1>LET'S DO IT.</h1>
          </div>
          <div className="support--content">
            <div>
              <p>
                Create your unique and exclusive shirt with our brand-new 3D
                customization tool. <strong>Unleash your imagination</strong>{" "}
                and define your own style.
              </p>
              <button
                onClick={() => {
                  setCurrentTab(tabs.customizer);
                }}
                style={{ background: "black" }}
              >
                CUSTOMIZE IT <AiOutlineHighlight size="1.3em" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Customizer({ tabs, setCurrentTab }) {
  const color = React.useContext(ProjectContext);
  const setColor = useContext(ProjectDispatchContext);
  const colors = [
    "#ccc",
    "#EFBD4E",
    "#80C670",
    "#726DE8",
    "#EF674E",
    "#353934",
    "Purple",
  ];
  const decals = ["react", "three2", "pmndrs"];
  return (
    <section key="custom">
      <div className="customizer">
        <div className="color-options">
          {colors.map((color) => {
            return (
              <div
                key={color}
                className="circle"
                style={{ background: color }}
                onClick={() => setColor(color)}
              ></div>
            );
          })}
        </div>
      </div>
      <div className="decals">
        <div className="decals--container">
          {decals.map((decal) => {
            return (
              <div key={decal} className="decal">
                <img key={decal} src={decal + "_thumb.png"} alt="brand" />
              </div>
            );
          })}
        </div>
      </div>
      <button
        className="share"
        style={{ background: color !== "" ? color : "black" }}
      >
        DOWNLOAD
        <AiFillCamera size="1.3rem" />
      </button>
      <button
        onClick={() => setCurrentTab(tabs.intro)}
        className="exit"
        style={{ background: color !== "" ? color : "black" }}
      >
        GO BACK
        <AiOutlineArrowLeft size="1.3rem" />
      </button>
    </section>
  );
}

export default Overlay;
