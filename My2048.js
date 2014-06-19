var locations;
var keys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c",
		"d", "e", "f"];
// 不同數字對應不同顏色,
// colors是顏色的陣列
var colors = ["#FFF", "PINK", "GRAY", "#ABCDEF", "#0FF0FF", "#FF0", "#CDF0AB",
		"#FEDCBA", "#F0F", "#BBBBBB", "#00F", "#00FF00"];

var score;  // 總分
var max;    // 最大數
var time;   // 計時
var t;

// 初始化
function init()
{
	/// <summary>
	/// 初始化
	/// </summary>
    t = setInterval(showtime, 1000);
    score = 0;
    max = 0;
    time = 0;
    locations = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // length=16
    locations[createLocation()] = createFixedNum();
    locations[createLocation()] = createFixedNum();
    paint();

    // 按键控制方向
    window.onkeydown = function (e)
    {
        var keyCode;
        if (!e)
            e = window.event;
        if (document.all)
        {
            keyCode = e.keyCode;
        } else
        {
            keyCode = e.which;
        }
        // ← 
        if (keyCode == 37)
        {
            $("#keys").text("←");
            toLeft();
            isEnd();
        }
        // ↑ 
        if (keyCode == 38 )
        {
            $("#keys").text("↑");
            toUp();
            isEnd();
        }
        // → 
        if (keyCode == 39 )
        {
            $("#keys").text("→");
            toRight();
            isEnd();
        }
        // ↓ 
        if (keyCode == 40 )
        {
            $("#keys").text("↓");
            toDown();
            isEnd();
        }
    };
}

function isEnd()
{
	/// <summary>
	/// 判斷是否結束
	/// </summary>
	/// <returns type="bool">true:結束  false:繼續</returns>
    var f = false;
    
    if (locations.indexOf(0) == -1)
    {
        // 如果陣列中不含 0
        // 判斷相鄰的數字是否為相等
        $("#danger").text("注意了哦~");
        // if(isEndX()){
        if (isEndX() && isEndY())
        {
            clearTimeout(t);
            if (window.confirm("结束了!\n總分：" + score + ";\n使用時間：" + time
					+ " 秒;\n最大數值為： " + max + "。\n是否開始新的遊戲？"))
            {
                init();
            } else
            {
                window.close();
            }
        }
    } else
    {
        $("#danger").text("");
    }
    return f;
}

function isEndX()
{
    // 判斷橫向的陣列
    // 如果相鄰位置的值不同，就結束
    var f = false;
    var w = new Array();
    for (var j = 0; j < 4; j++)
    {
        for (var i = 0; i < 4; i++)
        {
            w[i] = locations[4 * j + i];
        }
        // true：表示相鄰的兩個數不相等
        f = (w[0] != w[1] && w[1] != w[2] && w[2] != w[3]);
        if (!f)
        {
            break;
        }
    }

    return f;
}

function isEndY()
{
    // 判斷縱向的陣列
    // 如果相鄰位置的值不同，就結束
    var f = false;
    var w = new Array();
    for (var j = 0; j < 4; j++)
    {
        for (var i = 0; i < 4; i++)
        {
            w[i] = locations[4 * i + j];
        }
        // true：表示相鄰的兩個數不相等
        f = (w[0] != w[1] && w[1] != w[2] && w[2] != w[3]);
        if (!f)
        {
            break;
        }
    }

    return f;
}

function toDown()
{
	/// <summary>
    /// 按下方向鍵 ↓
	/// </summary>
    // 向下
    for (var i = 0; i < 4; i++)
    {
        // 判斷每一欄 
        // 由下而上
        var rcol = [locations[i + 12], locations[i + 8], locations[i + 4],
				locations[i]];
        configurationD(i, rcol);
    }

    //locations[createLocation()] = createFixedNum();
    //paint();
    CalNumAndPaint();
}

function toRight()
{
    /// <summary>
    /// 按下方向鍵 →
    /// </summary>
    // 向右
    for (var i = 0; i < 4; i++)
    {
        // 判斷每一行
        // 由右至左
        var row = [locations[i * 4 + 3], locations[i * 4 + 2],
				locations[i * 4 + 1], locations[i * 4]];
        // alert(i+"\t"+row);
        configurationR(i, row);
    }
    //locations[createLocation()] = createFixedNum();
    //paint();
    CalNumAndPaint();
}

function toLeft()
{
    /// <summary>
    /// 按下方向鍵 ←
    /// </summary>
    for (var i = 0; i < 4; i++)
    {
        // 判斷每一行
        // 由左至右
        var row = [locations[i * 4], locations[i * 4 + 1],
				locations[i * 4 + 2], locations[i * 4 + 3]];
        configurationL(i, row);
    }
    //locations[createLocation()] = createFixedNum();
    //paint();
    CalNumAndPaint();
}

function toUp()
{
    /// <summary>
    /// 按下方向鍵 ↑
    /// </summary>
    // 向上
    for (var i = 0; i < 4; i++)
    {
        // 判斷每一欄
        // 由上而下
        var col = [locations[i + 0], locations[i + 4], locations[i + 8],
				locations[i + 12]];
        configurationU(i, col);
    }
    //locations[createLocation()] = createFixedNum();
    //paint();
    CalNumAndPaint();
}


function CalNumAndPaint()
{
	/// <summary>
	/// 計算相加值與 render 
    /// </summary>
    if (locations.indexOf(0) != -1)
    {
        locations[createLocation()] = createFixedNum();
        paint();
    }
    else
    {
        alert('此方向已無可以相加的數值，請換方向試試看');
    }
    
}

function configurationD(i, r)
{
    makeArray(r);

    for (var j = 0; j < 4; j++)
    {
        locations[4 * (3 - j) + i] = r[j];
    }
}

function configurationR(i, r)
{
    // 向右
    makeArray(r);

    for (var j = 0; j < 4; j++)
    {
        locations[3 + 4 * i - j] = r[j];
    }
}

function configurationU(i, r)
{
    makeArray(r);

    for (var j = 0; j < 4; j++)
    {
        locations[4 * j + i] = r[j];
    }
}

function configurationL(i, r)
{
    makeArray(r);

    for (var j = 0; j < 4; j++)
    {
        locations[4 * i + j] = r[j];
    }
}

function makeArray(r)
{
	/// <summary>
	/// 
	/// </summary>
	/// <param name="r"></param>
	/// <returns type=""></returns>
    if (!isZero(r))
    {
        // 把陣列中 0 往後移動

        for (var n = 0; n < 3; n++)
        {
            if (r[n] == 0)
            {
                r[n] = r[n + 1];
                r[n + 1] = 0;
            }
        }
    }

    for (var m = 0; m < 3; m++)
    {
        if (r[m] == r[m + 1])
        {
            var k = m;
            r[k] += r[k + 1];
            score += r[k];
            while (++k < 3)
            {
                r[k] = r[k + 1];
            }
            r[3] = 0;
        }
    }

    return r;
}

// 畫出點的位置
function paint()
{
	/// <summary>
    /// 畫出點的位置
	/// </summary>
    for (var i = 0; i < 16; i++)
    {
        $("#box" + keys[i]).text((locations[i] == 0) ? "" : locations[i]);
        var index = (locations[i] == 0) ? 0
				: (locations[i].toString(2).length - 1);
        $("#box" + keys[i]).css("background", colors[index]);
        // 挑出最大的數值
        if (locations[i] > max)
        {
            max = locations[i];
        }
    }
    $("#score").text("總分為: " + score);
    $("#max").text("最大值為 : " + max);
}

// 隨機產生兩個數
function createFixedNum()
{
	/// <summary>
	/// 隨機產生兩個數
	/// </summary>
	/// <returns type=""></returns>
    // 產生 2 或 4;
    // 產生 2 的機率是 0.8
    return Math.random() < 0.8 ? 2 : 4;
}

// 產生的位置
function createLocation()
{
	/// <summary>
	/// 產生的位置
	/// </summary>
	/// <returns type=""></returns>
    // 在空位置中隨機產生
    var num = Math.floor(Math.random() * 16);
    // 如果該位置有資料，就重新產生
    while (locations[num] != 0)
    {
        num = Math.floor(Math.random() * 16);
    }
    return num;
}

function isZero(m)
{
	/// <summary>
	/// 
	/// </summary>
	/// <param name="m"></param>
	/// <returns type=""></returns>
    return m[0] == 0 && m[1] == 0 && m[2] == 0 && m[3] == 0;
}

// 計算時間
function showtime()
{
	/// <summary>
    /// 計算時間
	/// </summary>
    $("#time").text("使用時間：" + (++time) + " 秒");
}