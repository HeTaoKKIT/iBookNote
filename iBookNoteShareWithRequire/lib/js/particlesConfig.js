define(['particles'],
  function (particles) {
    'use strict';

    var Particles = function(){};

    Particles.init = function(){
      if(document.getElementById("particles-js")){
        this.setStartParticlesBackground();
      }else {
        console.log("Can't find id 'particles-js'");
      }
    };
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
    Particles.setStartParticlesBackground = function(){
        /* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
      particlesJS('particles-js',
        {
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
                "sync": false /* 所有光点同步闪烁 */
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

    return Particles;
  }
);