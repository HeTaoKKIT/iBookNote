$(document).ready(function() {
    $("head").append("<link rel='stylesheet' href='" + $("head link:first").attr("href").split("css/")[0] + "highlight/styles/myjavascript.css' />");
    setTheCodeColorDocy();

    init();
});

function init(){
    var styleOptionList = "<select class='' id='styleId' style='background-color:#C1E478; opacity:0.7; border:none; float:right; width: 100px; height:30px; padding-left: 8px; -webkit-appearance: none;'><option value='Default'>Style</option><option value='Androidstudio'>Androidstudio</option><option value='Arta'>Arta</option><option value='Atelier Cave Dark'>Atelier Cave Dark</option><option value='Atelier Cave Light'>Atelier Cave Light</option><option value='Atelier Dune Dark'>Atelier Dune Dark</option><option value='Atelier Dune Light'>Atelier Dune Light</option><option value='Atelier Estuary Dark'>Atelier Estuary Dark</option><option value='Color Brewer'>Color Brewer</option><option value='Darkula'>Darkula</option><option value='Docco'>Docco</option><option value='Github Gist'>Github Gist</option><option value='Github'>Github</option><option value='Googlecode'>Googlecode</option><option value='Grayscale'>Grayscale</option><option value='Hybrid'>Hybrid</option><option value='Idea'>Idea</option><option value='Ir Black'>Ir Black</option><option value='Kimbie Dark'>Kimbie Dark</option><option value='Kimbie Light'>Kimbie Light</option><option value='Monokai Sublime'>Monokai Sublime</option><option value='School Book'>School Book</option><option value='Solarized Dark'>Solarized Dark</option><option value='Solarized Light'>Solarized Light</option><option value='Sunburst'>Sunburst</option><option value='Xcode'>Xcode</option></select>";

    $("div:first a:nth-child(2)").after(styleOptionList);

    if(document.getElementById("particles-js")){
        setStartParticlesBackground();
    }else {
        navigationShowOrHide();
        console.log("Can't find id 'particles-js'");
    }

    if(document.getElementsByClassName("button")){
        showOrHideTheContent();
    }else {
        console.log("Can't find className 'button'");
    }

    $("#styleId").on("change", function () {
        $("head link:nth-child(2)").remove();

        $("head").append("<link rel='stylesheet' href='" + $("head link:first").attr("href").split("css/")[0] + "highlight/styles/" + setCodeStyle($("#styleId").val()) + "' />");

        setTheCodeColorDocy();
    });

    muneListCreateAndShowOrHide();
}

function setCodeStyle(styleVal){
    var tempStyle = "myjavascript.css";
    switch(styleVal){
        case "Default": tempStyle = "myjavascript.css";break;
        case "Androidstudio": tempStyle = "androidstudio.css";break;
        case "Atelier Cave Dark": tempStyle = "atelier-cave.dark.css";break;
        case "Atelier Cave Light": tempStyle = "atelier-cave.Light.css";break;
        case "Atelier Dune Dark": tempStyle = "atelier-dune.dark.css";break;
        case "Atelier Dune Light": tempStyle = "atelier-dune.light.css";break;
        case "Atelier Estuary Dark": tempStyle = "atelier-estuary.dark.css";break;
        case "Github Gist": tempStyle = "github-gist.css";break;
        case "Github": tempStyle = "github.css";break;
        case "Grayscale": tempStyle = "grayscale.css";break;
        case "Idea": tempStyle = "idea.css";break;
        case "Ir Black": tempStyle = "ir_black.css";break;
        case "Kimbie Dark": tempStyle = "kimbie.dark.css";break;
        case "Kimbie Light": tempStyle = "kimbie.light.css";break;
        case "Monokai Sublime": tempStyle = "monokai_sublime.css";break;
        case "Solarized Dark": tempStyle = "solarized_dark.css";break;
        case "Sunburst": tempStyle = "sunburst.css";break;
        case "Xcode": tempStyle = "xcode.css";break;
        default:tempStyle = "myjavascript.css";
    }
    return tempStyle;
}

function setTheCodeColorDocy(){
    $('pre code').each(function(i, block) {
        hljs.highlightBlock(block);
    });
}

/* To load a config file (particles.json) you need to host this demo (MAMP/WAMP/local)... */
/*
particlesJS.load('particles-js', 'particles.json', function() {
  console.log('particles.js loaded - callback');
});
*/

/* Otherwise just put the config content (json):

particlesJS('particles-js',

  {
    // write the config content here
  }

);
*/
function setStartParticlesBackground(){
    /* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
    particlesJS('particles-js', {
        "particles": {
          "number": {
            "value": 150,  /* 光点数目 */
            "density": {
              "enable": true,
              "value_area": 500 /* 光点数目所在的范围越大单位面积内光点越少 */
            }
          },
          "color": {
            "value": "#F5F5DC" /* 初始化颜色 */
          },
          "shape": {
            "type": "circle",
            "stroke": {
              "width": 0,
              "color": "#000000"
            },
            "polygon": {
              "nb_sides": 5
            },
            "image": {
              "src": "img/github.svg",
              "width": 100,
              "height": 100
            }
          },
          "opacity": {
            "value": 1, /* 光点大小 */
            "random": false,
            "anim": {
              "enable": false,
              "speed": 2.5,
              "opacity_min": 0.1,
              "sync": false
            }
          },
          "size": {
            "value": 1,
            "random": true,
            "anim": {
              "enable": true, /* 光点闪烁 */
              "speed": 10,
              "size_min": 0.1,
              "sync": false /* 所有光点同步闪烁  */
            }
          },
          "line_linked": {
            "enable": true,
            "distance": 50, /* 光点间有效链接距离 */
            "color": "#FFFF00", /* 光点间链接线的颜色 */
            "opacity": 0.5, /* 光点间链接线的颜色深浅程度 */
            "width": 1 /* 光点间链接线的宽度 */
          },
          "move": {
            "enable": true,
            "speed": 2.5, /* 光点移动速度 */
            "direction": "none",
            "random": true,
            "straight": false,
            "out_mode": "out",
            "bounce": true,
            "attract": {
              "enable": false,
              "rotateX": 600,
              "rotateY": 600
            }
          }
        },
        "interactivity": {
          "detect_on": "canvas",
          "events": {
            "onhover": {
              "enable": true,
              "mode": "grab" /* 鼠标滑动后使用的模式 */
            },
            "onclick": {
              "enable": true,
              "mode": "grab"
            },
            "resize": true
          },
          "modes": {
            "grab": { /* 鼠标滑动后产生连接线 */
              "distance": 60, /* 鼠标滑动后产生连接线的覆盖范围 */
              "line_linked": {
                "opacity": 1
              }
            },
            "bubble": {
              "distance": 250,
              "size": 20,
              "duration": 2,
              "opacity": 8,
              "speed": 3
            },
            "repulse": {
              "distance": 200,
              "duration": 0.4
            },
            "push": {
              "particles_nb": 4
            },
            "remove": {
              "particles_nb": 2
            }
          }
        },
        "retina_detect": true /* 针对retina屏幕进行优化 */
      }
  );
}

function showOrHideTheContent(){
    $("body").delegate(".button", "click", function(){
        if($(this).next().css("display") == "none"){
            $(this).next().show();
        }else{
            $(this).next().hide();
        }
    });
}

function navigationShowOrHide(){
  $(".navigationBar").before("<div id='showOrHideNavigation' class='navigationBarShowHide'>导航</div>");
  var navigationBar = document.querySelector('.navigationBar');
  navigationBar.addEventListener('click', function(event) {
    event.stopPropagation();
  });
  // Remove the overlay when a 'click' is heard on the document (<html>) element
  document.addEventListener('click', function(event) {
    if(document.querySelector('.navigationBar')){
      //navigationBar.parentNode.removeChild(navigationBar);
      $(".navigationBar").hide();
      $(".navigationBarShowHide").show();
    }else{
      console.log("navigationBar is HIDE.");
    }
  });
  $(".navigationBarShowHide").on("click", function(event){
      $(".navigationBarShowHide").hide();
      $(".navigationBar").show();
      event.stopPropagation();
  });
}

function muneListCreateAndShowOrHide(){
  var navigationList = [], // 定义标题列表数组
      firstLiLevelTitle = $("ul:first > li > p:first-child"), // 获取一级列表
      firstLiLevelTitleLength = 0,
      secondLiLevelTitleLength = 0,
      insertTitleLink= "",
      tempTitleValue = "", // 定义一级目录临时储存变量
      iPlus = 0,  // 定义一级目录序列号
      jPlus = 0;  // 定义二级目录序列号
  firstLiLevelTitleLength = firstLiLevelTitle.length > 0 ? firstLiLevelTitle.length : 0;
  if(firstLiLevelTitleLength > 0){ // 根据一级目录长度判定是否生成目录
    for (var i = 0; i <= firstLiLevelTitleLength - 1; i++) {
      if($(firstLiLevelTitle[i]).text() != ""){
        iPlus = i + 1;
        // 生成一级目录内容
        navigationList[i] = "<li><a href='#LiLevelNumber" + iPlus + "'>" + iPlus + "、" + $(firstLiLevelTitle[i]).text() + "</a></li>";
        // 正文中生成并插入一级目录的链接
        insertTitleLink = "<p><a name='LiLevelNumber" + iPlus + "' id='LiLevelNumber" + iPlus + "'></a></p>";
        $(firstLiLevelTitle[i]).before(insertTitleLink);
        // 二级目录判定
        if($(firstLiLevelTitle[i]).nextAll("ul").length > 0) {
          var secondLiLevelTitle = $(firstLiLevelTitle[i]).nextAll("ul").children(); // 获得二级ul的子元素
          secondLiLevelTitleLength = secondLiLevelTitle.length > 0 ? secondLiLevelTitle.length : 0;
          // 定义一维数组中的元素为新数组，使得一维数组变成二维数组
          tempTitleValue = navigationList[i];
          navigationList[i] = new Array();
          navigationList[i][i] = tempTitleValue;
          for (var j = 0; j < secondLiLevelTitleLength; j++) {
            jPlus = j + 1;
            // 判断二级目录是否是空值，如果空值则不生成相应的目录
            if($(firstLiLevelTitle[i]).nextAll("ul").children().find("p:first-child").text() != "") {
              // 生成二级目录，使用一级目录的列数，注意二维数组的下标 eg:navigationList[i][i + j + 1]，并且注意用$来封装jQuery对象后再使用jQuery方法，如：$($(firstLiLevelTitle[i]).nextAll("ul").children().find("p:first-child")[j]).text()
              navigationList[i][iPlus + j] = "<li><a href='#LiLevel2Number" + iPlus + jPlus + "'>&nbsp;" + iPlus + "." + jPlus + "、" + $($(firstLiLevelTitle[i]).nextAll("ul").children().find("p:first-child")[j]).text() + "</a></li>";
              insertTitleLink = "<p><a name='LiLevel2Number" + iPlus + jPlus + "' id='LiLevel2Number" + iPlus + jPlus + "'></a></p>";
               $($(firstLiLevelTitle[i]).nextAll("ul").children().find("p:first-child")[j]).before(insertTitleLink);
              tempTitleValue = "";
            } else {
              console.log("can't get the second title VALUE!");
            }
          }
        } else {
          console.log("there is no UL LI P UL LI P struct!");
        }
      } else {
        console.log("can't get the first title VALUE!");
      }
    }
    // unshift方法会添加到数组的第一个位置，自动后移原来的数组元素，比使用下标添加更好。
    navigationList.unshift("<div id='nativeDiv' class='nativePositionTopRight'><div id='navigationCircle' class='nativeMenu'>目录</div><div id='nativeMenuList'><ul>");
    navigationList.push("</ul></div></div>"); // 添加元素到数组最后一位

    $("ul:first").after(navigationList.toString().replace(/,/g,"")); // 从toString方法生成的字符串中去除“,”

    $("#navigationCircle").on("click", function(){
      if($(this).next().css("display") == "none"){
          $(this).next().show();
          $("#nativeDiv").css({"opacity" : "1"});
      }else{
          $(this).next().hide();
          $("#nativeDiv").css({"opacity" : "0.7"});
      }
    });
    $("#nativeMenuList li > a").on("click", function(){
      $("#nativeMenuList").hide();
      $("#nativeDiv").css({"opacity" : "0.7"});
    });
    $("ul:first").on("click", function(){
      $("#navigationCircle").next().hide();
      $("#nativeDiv").css({"opacity" : "0.7"});
    });
  }else{
      console.log("firstLiLevelTitleLength is 0.");
  }

}