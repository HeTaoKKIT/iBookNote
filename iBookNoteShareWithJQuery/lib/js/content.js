$(document).ready(function() {
  // 初始化页面的样式及绑定事件
  CommonUtil.pageCommonInit();
});

var GlobalConfig = (function(){
  var letDefinedList = {
    'debug'                 :   'false',
    'defaultCodeColor'      :   'myjavascript.css',
    'defaultCodeColorPath'  :   'highlight/styles/'
  };
  return {
    getValue: function(key){
      // 返回Object中对象可以用［key］获得
      return letDefinedList[key] ? letDefinedList[key] : alert('letDefinedList var: ' + key + ' is UNDEFINED!');
    }
  };
})();

var CommonUtil = function() {
};
CommonUtil.varList = {
  'tempData'              :       'tempData',
  'isEditBigRangeStr'     :       'true'
};
CommonUtil.pageCommonInit = function() {
  $("head").append("<link rel='stylesheet' href='" + $("head link:first").attr("href").split("css/")[0] + GlobalConfig.getValue('defaultCodeColorPath') + GlobalConfig.getValue('defaultCodeColor') + "' />");
  var styleOptionList = "<select class='' id='styleId' style='background-color:#C1E478; opacity:0.7; border:none; float:right; width: 100px; height:30px; padding-left: 8px; -webkit-appearance: none;'><option value='Default'>Style</option><option value='Androidstudio'>Androidstudio</option><option value='Atelier Cave Dark'>Atelier Cave Dark</option><option value='Atelier Cave Light'>Atelier Cave Light</option><option value='Atelier Dune Dark'>Atelier Dune Dark</option><option value='Atelier Dune Light'>Atelier Dune Light</option><option value='Atelier Estuary Dark'>Atelier Estuary Dark</option><option value='Github Gist'>Github Gist</option><option value='Github'>Github</option><option value='Grayscale'>Grayscale</option><option value='Idea'>Idea</option><option value='Ir Black'>Ir Black</option><option value='Kimbie Dark'>Kimbie Dark</option><option value='Kimbie Light'>Kimbie Light</option><option value='Monokai Sublime'>Monokai Sublime</option><option value='Solarized Dark'>Solarized Dark</option><option value='Sunburst'>Sunburst</option><option value='Xcode'>Xcode</option></select>";
  $("div:first a:nth-child(2)").after(styleOptionList);
  if(!document.getElementById("particles-js")){
    $('.navigationBar').before('<div id="navigationBarShowHideId" class="navigationBarShowHide notEditable">导航</div>');
    console.log('Can not find id "particles-js"');
  }else {
    CommonUtil.setStartParticlesBackground();
  }
  this.globalBindEvent();

};
CommonUtil.globalBindEvent = function() {
  // render Source code color
  this.setTheCodeColorDocy();
  // handle Code Color style change event
  $("#styleId").change(function() {
    $("head link:nth-child(2)").remove();

    $("head").append("<link rel='stylesheet' href='" + $("head link:first").attr("href").split("css/")[0] + GlobalConfig.getValue('defaultCodeColorPath') + CommonUtil.setCodeStyle($("#styleId").val()) + "' />");
    CommonUtil.setTheCodeColorDocy();
  });
  // handle Button case to show the hidden section
  if(document.getElementsByClassName("button")){
    this.showOrHideTheContent();
  }else {
    console.log("Can't find className 'button'");
  }
  // handle init hidden section to display after DOM and Event ready
  $('.hiddenForInit').removeClass('hiddenForInit');

  this.navigationGenerated();
  this.navigationShowOrHideWithClick();
  // handle navigationBar Click event
  var navigationBar = document.querySelector('.navigationBar');
  navigationBar.addEventListener('click', function(event) {
    event.stopPropagation();
  });
  // Remove the navigationBar overlay when a 'click' is heard on the document (<html>) element
  document.addEventListener('click', function(event) {
    if(document.querySelector('.navigationBar') && !document.getElementById("particles-js")){
      //navigationBar.parentNode.removeChild(navigationBar);
      $(".navigationBar").hide();
      $("#navigationBarShowHideId").show();
    }else{
      console.log("navigationBar is HIDE.");
    }
  });
  $("#navigationBarShowHideId").on('click', function(event){
      $("#navigationBarShowHideId").hide();
      $(".navigationBar").show();
      $('#eidtControlId').addClass('hidden');
      event.stopPropagation();
  });
};

CommonUtil.editPageElemetnContent = function(isEditAreaBigString, editIDName, savedIDName, hiddenStorageIDName, setCSSNotEditable) {
  var globalIsEdit      =   false, // 定义全局变量检测页面是否发生改动
      isEditArea        =   false,
      version           =   'Version',
      versionNumber     =   0,
      dataBase          =   {
                              'tempData'            :    '',
                              'VersionDateIndex'    :    '',
                              'versionNumber'       :    '',
                              'changeDate'          :    '',
                              'changeFilePath'      :    '',
                              'platform'            :    '',
                              'modifyBody'          :    '',
                              'submitComment'       :    'Write your submit comment'
                            };
  document.getElementById(editIDName).onclick = function(){
    document.onclick = function(event) {
      console.log(event.target.baseURI); // get the current file full path
      console.log(event.target.tagName); // get the current event DOM element
      console.log(event.target);
      var elementHasContenteditable = !document.querySelector('*[contenteditable]'),
          eventTargetBodyOrParentBody = event.target.tagName !== 'BODY' && event.target.tagName !== 'HTML',
          eventTargetCSSElement = event.target.className.indexOf(setCSSNotEditable) == -1;
      if(elementHasContenteditable && eventTargetBodyOrParentBody && eventTargetCSSElement) {
        if(isEditAreaBigString == 'true') {
          if(event.target.parentElement.tagName !== 'BODY'){
            event.target.parentElement.setAttribute('contenteditable', 'true');
          }else{
            event.target.setAttribute('contenteditable', 'true');
          }
        }else{
          event.target.setAttribute('contenteditable', 'true');
        }
        event.stopPropagation();
        document.onclick = function(){};
        isEditArea = true;
      }else{
        console.log('Can not edit with NotEditable CSS or contenteditable is EXIST NOW!');
      }
    };
  }
  document.getElementById(savedIDName).onclick = function() {
    if(isEditArea) {
      document.getElementById(hiddenStorageIDName).insertAdjacentHTML('beforeend', '<div id="' + ( version + versionNumber ) + '"></div>');
      document.getElementById(version + versionNumber).appendChild(document.body.cloneNode(true));
      document.querySelector('*[contenteditable]').removeAttribute('contenteditable');
      // the contenteditable has twice added in the page, so remove again
      document.querySelector('*[contenteditable]').removeAttribute('contenteditable');

      $('#hiddenTempStorage .navigationBar').show();
      $('#hiddenTempStorage #navigationBarShowHideId').remove();
      $('#hiddenTempStorage #styleId').remove();
      $('#hiddenTempStorage #nativeDiv').remove();
      for (var i = 0; i < $('#hiddenTempStorage pre').length; i++ ) {
        if($('#hiddenTempStorage pre span').length > 0) {
          $('#hiddenTempStorage pre').html('<code class="' + $('#hiddenTempStorage pre code')[0].className.replace(' hljs', '') + '">' + $('#hiddenTempStorage pre').text() + '</code>');
        }
      }
      dataBase.currentFileName    =    document.baseURI.split('/')[document.baseURI.split('/').length - 1 ].replace(/.html/g, '');
      dataBase.tempData           =    new Date().toString().substr('4', '20');
      dataBase.VersionDateIndex   =    dataBase.currentFileName + dataBase.tempData.replace(/:/g, '').replace(/ /g, '');
      dataBase.changeDate         =    dataBase.tempData;
      dataBase.changeFilePath     =    document.baseURI.split('iBookNoteShareWithJQuery')[1]; // IE doesn't support, for IE: document.URL.split('iBookNoteShareWithJQuery')[1];
      dataBase.versionNumber      =    versionNumber;
      dataBase.platform           =    navigator.appVersion;
      dataBase.modifyBody         =    document.getElementById(version + versionNumber).innerHTML; // remember to remove \ before to show on page
      dataBase.submitComment      =    CommonUtil.getCurrentDate();
      document.getElementById(version + versionNumber).setAttribute('VersionDateIndex',     dataBase.VersionDateIndex);
      document.getElementById(version + versionNumber).setAttribute('changeDate',           dataBase.changeDate);
      document.getElementById(version + versionNumber).setAttribute('changeFilePath',       dataBase.changeFilePath);
      document.getElementById(version + versionNumber).setAttribute('platform',             dataBase.platform);
      // write the updated info to DataBase
      CommonUtil.dataBaseUpdate(dataBase);
      // dataBase      =    '';
      isEditArea    = false;
      globalIsEdit  = true;
      versionNumber++;
      alert('Updated done!');
    }else{
      alert('No Content Updated!');
    }
  }
};
CommonUtil.setCodeStyle = function(styleVal) {
  // var styleList = document.getElementById('myStyleList');
  // return styleList.options[styleList.selectedIndex].text + ".css";
  // use below to make the info to config
  var tempStyle = '';
  switch(styleVal){
    case 'Androidstudio'         : tempStyle = 'androidstudio.css';          break;
    case 'Atelier Cave Dark'     : tempStyle = 'atelier-cave.dark.css';      break;
    case 'Atelier Cave Light'    : tempStyle = 'atelier-cave.Light.css';     break;
    case 'Atelier Dune Dark'     : tempStyle = 'atelier-dune.dark.css';      break;
    case 'Atelier Dune Light'    : tempStyle = 'atelier-dune.light.css';     break;
    case 'Atelier Estuary Dark'  : tempStyle = 'atelier-estuary.dark.css';   break;
    case 'Github Gist'           : tempStyle = 'github-gist.css';            break;
    case 'Github'                : tempStyle = 'github.css';                 break;
    case 'Grayscale'             : tempStyle = 'grayscale.css';              break;
    case 'Idea'                  : tempStyle = 'idea.css';                   break;
    case 'Ir Black'              : tempStyle = 'ir_black.css';               break;
    case 'Kimbie Dark'           : tempStyle = 'kimbie.dark.css';            break;
    case 'Kimbie Light'          : tempStyle = 'kimbie.light.css';           break;
    case 'Monokai Sublime'       : tempStyle = 'monokai_sublime.css';        break;
    case 'Solarized Dark'        : tempStyle = 'solarized_dark.css';         break;
    case 'Sunburst'              : tempStyle = 'sunburst.css';               break;
    case 'Xcode'                 : tempStyle = 'xcode.css';                  break;
    default                      : tempStyle = GlobalConfig.getValue('defaultCodeColor');
  }
  return tempStyle;
};
CommonUtil.setTheCodeColorDocy = function() {
  $('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
  });
};
CommonUtil.navigationGenerated = function() {
  var navigationList = [], // 定义标题列表数组
    firstLiLevelTitle = $("ul:first > li > p:first-child"), // 获取一级列表
    firstLiLevelTitleLength = 0,
    secondLiLevelTitleLength = 0,
    insertTitleLink= "",
    tempTitleValue = "", // 定义一级目录临时储存变量
    iPlus = 0, // 定义一级目录序列号
    jPlus = 0; // 定义二级目录序列号
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
    navigationList.unshift('<div id="nativeDiv" class="nativePositionTopRight"><div id="navigationCircle" class="nativeMenu notEditable">目录</div><div id="nativeMenuList"><ul>');
    if(GlobalConfig.getValue('debug') == 'true') {
      navigationList.push('</ul></div><div id="eidtControlId" class="hidden"><div id="enableEditId" class="nativeMenu notEditable">Edit</div><div id="savedId" class="nativeMenu notEditable">Save</div><div id="hiddenTempStorage" style="display: block;"></div></div></div>'); // 添加元素到数组最后一位
    } else {
      navigationList.push('</ul></div><div id="eidtControlId" class="hidden"><div id="enableEditId" class="nativeMenu notEditable">Edit</div><div id="savedId" class="nativeMenu notEditable">Save</div><div id="hiddenTempStorage" style="display: none;"></div></div></div>'); // 添加元素到数组最后一位
    }
    $("ul:first").after(navigationList.toString().replace(/,/g, "")); // 从toString方法生成的字符串中去除“,”
    // handle the page element eidt content
    this.editPageElemetnContent(CommonUtil.varList.isEditBigRangeStr, 'enableEditId', 'savedId', 'hiddenTempStorage', 'notEditable');
  }else{
      console.log("firstLiLevelTitleLength is 0.");
  }
};
CommonUtil.navigationShowOrHideWithClick = function() {
  $('#navigationCircle').on('click', function(){
    if($(this).next().css('display') == 'none'){
      $('#eidtControlId').addClass('hidden');
      $(this).next().show();
      $('#nativeDiv').css({'opacity' : '1'});
    }else{
      $(this).next().hide();
      $('#eidtControlId').removeClass('hidden');
      $('#nativeDiv').css({'opacity' : '0.7'});
    }
  });
  $('#nativeMenuList li > a').on('click', function(){
    $('#nativeMenuList').hide();
    $('#nativeDiv').css({'opacity' : '0.7'});
    $('#eidtControlId').addClass('hidden');
  });
  $("ul:first").on('click', function(){
    $('#navigationCircle').next().hide();
    $('#nativeDiv').css({'opacity' : '0.7'});
    $('#eidtControlId').removeClass('hidden');
  });
};
CommonUtil.showOrHideTheContent = function(){
  $('body').delegate('.button', 'click', function(){
    if($(this).next().css('display') == 'none'){
      $(this).next().show();
    }else{
      $(this).next().hide();
    }
  });
};
CommonUtil.setStartParticlesBackground = function() {
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
};
CommonUtil.setEditorAreaModeAndFormatHTMLContent = function(ToBeSource, editorId) {
  var editorArea,
      editorAreaContent,
      editorInnerHTML = '';
  editorArea = document.getElementById(editorId);
  editorInnerHTML = editorArea.innerHTML
                    .toString().replace(/<br>/g, '')
                    .replace(/<p><\/p>/g, '')
                    .replace(/<li><\/li>/g, '')
                    .replace(/<div><\/div>/g, '')
                    .replace(/<\/p><p>/g, '<\/p>\n<p>')
                    .replace(/<\/li><li>/g, '<\/li>\n<li>')
                    .replace(/<\/div><div>/g, '<\/div>\n<div>');
  if (ToBeSource) {
    editorAreaContent = document.createTextNode(editorInnerHTML);
    editorArea.innerHTML = '';
    var PreElement = document.createElement('pre');
    editorArea.contentEditable = false;
    PreElement.contentEditable = true;
    PreElement.appendChild(editorAreaContent);
    editorArea.appendChild(PreElement);
  } else {
    if (document.all) {
      editorArea.innerHTML = editorArea.innerText;
    } else {
      editorAreaContent = document.createRange();
      editorAreaContent.selectNodeContents(editorArea.firstChild);
      editorArea.innerHTML = editorAreaContent.toString();
    }
    editorArea.contentEditable = true;
  }
  editorArea.focus();
};
CommonUtil.dataBaseGetCurrent = function() {
  // 打开数据库或者直接连接数据库参数：数据库名称，版本，概述，大小
  var iBNdb = openDatabase('iBNDatabase', '1.0', 'DataBase for iBookNote!', 1024 * 1024);
  return iBNdb;
};
CommonUtil.dataBaseInit = function() {
  var iBNdb = CommonUtil.dataBaseGetCurrent();
  // 初始化数据库，如果数据库不存在便创建新的
  if(!iBNdb) {
    alert('您的浏览器不支持HTML5本地数据库');
    return;
  }
  iBNdb.transaction(function (trans) {//启动一个事务，并设置回调函数
      //执行创建表的Sql脚本
      trans.executeSql('create table if not exists iBN(uVersionDateIndex text null, versionNumber text null, changeDate text null, changeFilePath text null, platform text null, modifyBody text null, submitComment text null)', [], function (trans, result) {
          }, function (trans, message) {//消息的回调函数alert(message);});
      }, function (trans, result) {
      }, function (trans, message) {
      });
  });
};
CommonUtil.dataBaseUpdate = function(data) {
  CommonUtil.dataBaseInit();
  var iBNdb               =    CommonUtil.dataBaseGetCurrent(),
      data = data || {};
  // 执行sql脚本，插入数据
  iBNdb.transaction(function (trans) {
      trans.executeSql(
        'insert into iBN(uVersionDateIndex, versionNumber, changeDate, changeFilePath, platform, modifyBody, submitComment) values(?, ?, ?, ?, ?, ?, ?)',
        [
          data.VersionDateIndex,
          data.versionNumber,
          data.changeDate,
          data.changeFilePath,
          data.platform,
          data.modifyBody,
          data.submitComment
        ], function (ts, data) {
      }, function (ts, message) {
          alert(message.message);
      });
  });
  // print the databse info
  iBNdb.transaction(function (trans) {
      trans.executeSql("select * from iBN ", [], function (ts, data) {
          if (data) {
              for (var i = 0; i < data.rows.length; i++) {
                  // console.log(data.rows.item(i)); // 获取数据库中第i行数据的json对象
                  console.log(data.rows.item(i).modifyBody);
              }
          }
      },  function (ts, message) {
            alert(message.message);
            var tst = message;
          });
  });
};
CommonUtil.getCurrentDate = function() {
  return new Date().toString();
};
