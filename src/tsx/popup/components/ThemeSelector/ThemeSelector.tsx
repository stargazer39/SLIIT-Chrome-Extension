import React from "react";
import themes from "../../../themes";
import Theme from "../Theme/Theme";
import TopBar from "../TopBar/TopBar";

function ThemeSelecter() {
    return (
        <>
            <TopBar back={true} title="Themes"/>
            <div>
                {
                    themes.map((value, index) => {
                        return <Theme id={index} key={index}/>
                    })
                }
            </div>
        </>
    )
}

export default ThemeSelecter;