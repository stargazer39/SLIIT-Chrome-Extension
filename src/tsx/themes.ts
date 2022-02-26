export interface Theme {
   name:  string;
   color: Color;
   image: Image[];
}

export interface Color {
   accent_main:   string;
   accent_second: string;
   accent_text:   string;
   menu_bgcol:    string;
   second_bgcol:  string;
   wrapper_bgcol: string;
}

export interface Image {
   path:      string;
   copyright: string;
}

export function getTheme(id : string) : Theme {
   if(themes[id])
      return themes[id];
   
   // Get theme form the database and send
   return themes["default"];
}

export function listThemes(){
   return themes;
}

const themes : {[key : string]: Theme} = {
    "default": {
       "name":"Hatsune Miku 1",
       "color":{
          "accent_main":"#21cebd",
          "accent_second":"#ff019e",
          "accent_text":"#21cebd",
          "menu_bgcol":"#111111b5",
          "second_bgcol":"black",
          "wrapper_bgcol":"#ffffffeb"
       },
       "image":[
          {
             "path":"miku001.png",
             "copyright":"Image by Mikou <a href=\"https://www.pixiv.net/en/artworks/84964080\">pixv.net</a>"
          }
       ]
    },
    "miku2": {
       "name":"Hatsune Miku 2",
       "color":{
          "accent_main":"red",
          "accent_second":"#0020ff",
          "accent_text":"#095e98",
          "menu_bgcol":"#111111b5",
          "second_bgcol":"black",
          "wrapper_bgcol":"#fcfcfce3"
       },
       "image":[
          {
             "path":"miku002.png",
             "copyright":"Image by 蒼崎ヤト <a href=\"https://www.pixiv.net/en/artworks/84995204\">pixv.net</a>"
          }
       ]
    },
    "blends": {
       "name":"Blend S",
       "color":{
          "accent_main":"#ff0090",
          "accent_second":"#03A9F4",
          "accent_text":"#0090d2",
          "menu_bgcol":"#091285",
          "second_bgcol":"#091285",
          "wrapper_bgcol":"#e5e7fff0"
       },
       "image":[
          {
             "path":"blends001.png",
             "copyright":"Image from Anime BlendS <a href=\"https://en.wikipedia.org/wiki/Blend_S\">wikipedia.org</a>"
          }
       ]
    }
   }