! function () {
    //封裝方法，壓縮之後減少文件大小
    function get_attribute(node, attr, default_value) {
        return node.getAttribute(attr) || default_value;
    }
    //封裝方法，壓縮之後減少文件大小
    function get_by_tagname(name) {
        return document.getElementsByTagName(name);
    }
    //獲取配置參數
    function get_config_option() {
        var scripts = get_by_tagname("script"),
          script_len = scripts.length,
          script = scripts[script_len - 1]; //當前加載的script
        return {
            l: script_len, //長度，用於生成id用
            z: get_attribute(script, "zIndex", -1), //z-index
            o: get_attribute(script, "opacity", 0.975), //opacity
            c: get_attribute(script, "color", "244,255,255"), //color"0,31,86"
            n: get_attribute(script, "count", 99) //count
        };
    }
    //設置canvas的高寬
    function set_canvas_size() {
        canvas_width = the_canvas.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        canvas_height = the_canvas.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    }

    //繪製過程
    function draw_canvas() {
        context.clearRect(0, 0, canvas_width, canvas_height);
        //隨機的線條和當前位置聯合數組
        var e, i, d, x_dist, y_dist, dist; //臨時節點
        //遍歷處理每一個點
        random_points.forEach(function (r, idx) {
            r.x += r.xa,
            r.y += r.ya, //移動
            r.xa *= r.x > canvas_width || r.x < 0 ? -1 : 1,
            r.ya *= r.y > canvas_height || r.y < 0 ? -1 : 1, //碰到邊界，反向反彈
            context.fillRect(r.x - 0.5, r.y - 0.5, 1, 1); //繪製一個寬高為1的點
            //從下一個點開始
            for (i = idx + 1; i < all_array.length; i++) {
                e = all_array[i];
                //當前點存在
                if (null !== e.x && null !== e.y) {
                    x_dist = r.x - e.x; //x軸距離 l
                    y_dist = r.y - e.y; //y軸距離 n
                    dist = x_dist * x_dist + y_dist * y_dist; //總距離, m

                    dist < e.max && (e === current_point && dist >= e.max / 2 && (r.x -= 0.03 * x_dist, r.y -= 0.03 * y_dist), //靠近的时候加速
                      d = (e.max - dist) / e.max,
                      context.beginPath(),
                      context.lineWidth = d / 2,
                      context.strokeStyle = "rgba(" + config.c + "," + (d + 0.2) + ")",
                      context.moveTo(r.x, r.y),
                      context.lineTo(e.x, e.y),
                      context.stroke());
                }
            }
        }), frame_func(draw_canvas);
    }
    //創建畫布，並添加到body中
    var the_canvas = document.createElement("canvas"), //畫布
      config = get_config_option(), //配置
      canvas_id = "c_n" + config.l, //canvas id
      context = the_canvas.getContext("2d"), canvas_width, canvas_height,
      frame_func = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (func) {
          window.setTimeout(func, 1000 / 45);
      }, random = Math.random,
      current_point = {
          x: null, //當前鼠標x
          y: null, //當前鼠標y
          max: 20000 //圈半徑的平方
      },
      all_array;
    the_canvas.id = canvas_id;
    the_canvas.style.cssText = "position:fixed;top:0;left:0;z-index:" + config.z + ";opacity:" + config.o;
    get_by_tagname("body")[0].appendChild(the_canvas);

    //初始化畫布大小
    set_canvas_size();
    window.onresize = set_canvas_size;
    //當時鼠標位置存儲，離開的時候，釋放當前位置訊息
    window.onmousemove = function (e) {
        e = e || window.event;
        current_point.x = e.clientX;
        current_point.y = e.clientY;
    }, window.onmouseout = function () {
        current_point.x = null;
        current_point.y = null;
    };
    //隨機生成config.n條線位置訊息
    for (var random_points = [], i = 0; config.n > i; i++) {
        var x = random() * canvas_width, //隨機位置
          y = random() * canvas_height,
          xa = 2 * random() - 1, //隨機運動方向
          ya = 2 * random() - 1;
        //隨機點
        random_points.push({
            x: x,
            y: y,
            xa: xa,
            ya: ya,
            max: 6000 //沾附距離
        });
    }
    all_array = random_points.concat([current_point]);
    //0.1秒後繪製
    setTimeout(function () {
        draw_canvas();
    }, 100);
}();