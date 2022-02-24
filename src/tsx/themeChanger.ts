import $ from "jquery";
import themes, { Theme } from "./themes";

var theme : any = themes[0];

export function init() {
    var MutationObserver = window.MutationObserver;
    var observerhtml = new MutationObserver(mutationhtml);
    var observer = new MutationObserver(mutationCallback);
    var node : HTMLElement = document.getElementsByTagName("html")[0];

    observerhtml.observe(node,{ childList: true,subtree: true });

    function mutationhtml(data : any){
        data.forEach (function (mutation : any){
            mutation.addedNodes.forEach(function(each : any){
                //console.log(each.nodeName);
                if(each.nodeName == "BODY"){
                    injectStyles(theme);
                    node =  document.body;
                    observer.observe(node,{ childList: true,subtree: true });
                    observerhtml.disconnect();
                }
            });
        });
    }

    function mutationCallback(data : any) {
        data.forEach ( function (mutation : any) {
            if(mutation.type){
                mutation.addedNodes.forEach(function(elem : any){
                    try{
                        $(elem).find("*").each((idx, el) => {
                            forElem($(el));
                        })
                    }catch(e){
                        console.log(e);
                    }
                })
            }
        } );
    }
}

function forElem(j_elem : JQuery<HTMLElement>){
    try{
        if(j_elem.css("background-color").search("226, 165, 0") >= 0){
        if(!j_elem.hasClass("newbackground"))
                j_elem.addClass("newbackground");
        }
    }catch(e){} 
    
    try{
        if(j_elem.css("background-color").search("50, 58, 69") >= 0){
        if(!j_elem.hasClass("newbg2"))
                j_elem.addClass("newbg2");
        }
    }catch(e){}
    
    try{
        if(j_elem.css("background-color").search("58, 69, 75") >= 0){
        if(!j_elem.hasClass("newbg3"))
                j_elem.addClass("newbg3");
        }
    }catch(e){}
    
    try{
        if(j_elem.css("background-color").search("239, 188, 0") >= 0){
        if(!j_elem.hasClass("newbg4"))
                j_elem.addClass("newbg4");
        }
    }catch(e){}
    
    try{
        if(j_elem.css("border-color").search("226, 165, 0") >= 0){
        if(!j_elem.hasClass("newborder"))
                j_elem.addClass("newborder");
        }
    }catch(e){}
    
    try{
        if(j_elem.css("color").search("226, 165, 0") >= 0){
        if(!j_elem.hasClass("newtext"))
                j_elem.addClass("newtext");
        }
    }catch(e){}
    
    try{
        if(j_elem.css("color").search("#e2a500") >= 0){
        if(!j_elem.hasClass("newtext"))
                j_elem.addClass("newtext");
        }
    }catch(e){}
}

function injectStyles(theme : Theme){
    // New img element for background 
    let bg = $("<img id='bg-img'>");
    bg.attr("src", chrome.runtime.getURL('themes/img/' + theme.image[0].path));
    bg.css({
        width:"100%",
        height:"100%",
        objectFit:"cover",
        position:"fixed",
        zIndex:"-1",
        top:"0",
        opacity:"0",
        transition: "all 200ms",
        filter: "contrast(1.4)",
        objectPosition: "50% 20%"
    });
    bg.on("load", () => {
        bg.css({ opacity : 1 });
    })
    
    // Add it to the body
    $(document.body).append(bg)
    
    // Inject styles to the dom
	$(`<style type='text/css'> 
	:root{
	    --accent-main: ` + theme.color.accent_main + `;--accent-second: ` + theme.color.accent_second + `;
	    --accent-text: ` + theme.color.accent_text + `;
        --secondary-bgcol: ` + theme.color.second_bgcol + `;
        --menu-bgcol:` + theme.color.menu_bgcol + `;
	    --wrapperbgcol:` +  theme.color.wrapper_bgcol + `;
	    --bg-img: url(` + chrome.runtime.getURL('themes/img/' + theme.image[0].path) + `);
	}
	body {
        background: url() !important;
        background-color: var(--accent-main) !important;
	}
    button,
    .btn,
    .btn-default,
    input.form-submit,
    input[type="button"],
    input[type="submit"],
    input[type="reset"],
    input.form-submit,
    input#id_submitbutton,
    input#id_submitbutton2,
    .path-admin .buttons input[type="submit"],
    td.submit input,
    .submit.buttons input[name="cancel"],
    #notice .singlebutton+.singlebutton input {
        background-color: var(--accent-main) !important;
    }
	.block .header .title h2:before {
	    background-color: var(--accent-second) !important;
	}
	.newbg4 {
	    background-color: var(--accent-second) !important;
	}
	#wrapper {
	    background-color: var(--wrapperbgcol) !important;
	    border-color: var(--accent-main) !important;
	}
	.newbackground {
	    background-color: var(--accent-main) !important;
	}
	.newbg2 {
	    background-color: var(--secondary-bgcol) !important;
	}
	.newbg3 {
	    background-color: var(--menu-bgcol) !important;
	}
	.newborder {
	    border-color: var(--accent-main) !important;
	}
	.newtext {
	    color: var(--accent-text) !important;
	}
	.navbar .nav>li>a:focus,
	.navbar .nav>li>a:hover,
	.navbar .nav>.active>a,
	.navbar .nav>.active>a:hover,
	.navbar .nav>.active>a:focus,
	.navbar .nav li.dropdown.open>.dropdown-toggle,
	.navbar .nav li.dropdown.active>.dropdown-toggle,
	.navbar .nav li.dropdown.open.active>.dropdown-toggle {
	    background-color: var(--accent-main) !important
	}
	.navbar .dropdown-menu>li>a:hover,
	.navbar .dropdown-menu>li>a:focus {
	    background-color: var(--secondary-bgcol) !important;
	}
	#page-footer .block .header .title h2:after {
	    background-color: var(--accent-main) !important;
	}
	</style>`).appendTo("head");
}

export function applyTheme(theme : Theme){
    const bg_src = chrome.runtime.getURL('themes/img/' + theme.image[0].path);
    const img = $('#bg-img');

    document.documentElement.style.setProperty('--accent-main', theme.color.accent_main);
    document.documentElement.style.setProperty('--accent-second', theme.color.accent_second);
    document.documentElement.style.setProperty('--accent-text', theme.color.accent_text);
    document.documentElement.style.setProperty('--secondary-bgcol', theme.color.second_bgcol);
    document.documentElement.style.setProperty('--bg-img', `url(${bg_src})`);
    document.documentElement.style.setProperty('--menu-bgcol', theme.color.menu_bgcol);
    document.documentElement.style.setProperty('--wrapperbgcol', theme.color.wrapper_bgcol);

    // Onload listener previously registerd will take care of showing the image onload
    img.css({ opacity: 0 });
    img.attr("src", bg_src);
}
