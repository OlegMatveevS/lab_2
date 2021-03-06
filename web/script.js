let prev_y = 0;
let res = 0;
let count = 0;

const correctX = [-3, -2, -1, 0, 1, 2, 3, 4, 5];
let is_default_graphic = false;

function init() {
    [r_out, x_out, y_out].forEach(f=>f.value='_');
    createGraphic('canvas', r_out.value);
}

function error(message) {
    let errorField = document.getElementById('error');
    errorField.innerText = message;
    setTimeout(()=>errorField.innerText='', 2000);
}

function clickCanvas(R) {
    console.log("Click on canvas");
    let canvas = document.getElementById("canvas");
    console.log('is default graphic: ' + is_default_graphic);
    if (is_default_graphic) {
        console.log('error: R is not set');
        createGraphic('canvas', 0);
        let canvas = document.getElementById("canvas"), context = canvas.getContext("2d");
        context.strokeStyle = "#000000";
        context.fillStyle = "#ff0014";
        context.font = '20px Arial';
        context.fillText('You have to set ', 20, 50);
        context.fillText('R parameter', 20, 70);
        return;
    }

    let br = canvas.getBoundingClientRect();
    let left = br.left;
    let top = br.top;

    let event = window.event;
    let x = event.clientX - left;
    let y = event.clientY - top;

    markPointFromServer((x - 150) / 130 * R, (-y + 150) / 130 * R, R);
}

function markPointFromServer(x, y, r) {
    console.log('try to mark point from server with x:' + x + ', y:' + y + ', r:' + r);
    x_h_id.value = (x * 1000 / 1000).toFixed(2);
    x_out.value = (x * 1000 / 1000).toFixed(2);
    y_h_id.value = (y * 1000 / 1000).toFixed(2);
    y_out.value = (y * 1000 / 1000).toFixed(2);
    if (!checkAllParameters(x, y, r)) {
        error('Wrong parameters');
        return false;
    } else {
        fetch("./hit?hit=true&x_h=" + encodeURI(x) + "&y_h=" + encodeURI(y) + "&r_h=" + encodeURI(r), {
            method: 'GET',
            headers: {
                'Content-Type': 'text/plain;charset=UTF-8'
            }
        })
            .then(response=>response.text())
            .then(hit=>markPoint(x, y, r, hit));
        return true;
    }

}

function Clear (){
    if (is_default_graphic) {
        console.log('error: R is not set');
        createGraphic('canvas', 0);
        let canvas = document.getElementById("canvas"), context = canvas.getContext("2d");
        context.strokeStyle = "#000000";
        context.fillStyle = "#ff0014";
        context.font = '20px Arial';
        context.fillText('You have to set ', 20, 50);
        context.fillText('R parameter', 20, 70);
        return;
    }
    r = r_h_id.value;
    createGraphic('canvas', r);
}

function markPoint(x, y, r, hit) {
    console.log('Marking point ' + x + ', ' + y + ', ' + r + ', ' + hit);
    createGraphic('canvas', r);
    let canvas = document.getElementById("canvas"), context = canvas.getContext("2d");

    context.beginPath();
    context.rect(Math.round(150 + ((x / r) * 130)) - 3, Math.round(150 - ((y / r) * 130)) - 3, 6, 6);
    context.closePath();
    context.strokeStyle = 'black';

    let color = 'red';
    hit = hit.toString();

    if (hit.trim() === "true") {
        color = 'lime';
    }

    context.fillStyle = color;
    context.fill();
    context.stroke();
}

function markPointTwo(x, y, r, hit) {
    console.log('Marking point ' + x + ', ' + y + ', ' + r + ', ' + hit);
    let canvas = document.getElementById("canvas"), context = canvas.getContext("2d");

    r = r_h_id.value;
    context.beginPath();
    context.rect(Math.round(150 + ((x / r) * 130)) - 3, Math.round(150 - ((y / r) * 130)) - 3, 6, 6);
    context.closePath();
    context.strokeStyle = 'black';

    let color = 'red';
    hit = hit.toString();

    if (hit.trim() === "true") {
        color = 'lime';
    }

    context.fillStyle = color;
    context.fill();
    context.stroke();
}


function egg() {
    let canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d");
    let img = new Image();

    context.drawImage(img, 25, 97, 50, 50);

    let currentAngle = 0.1;
    let vx = 0;
    let vy = 0;

    let int = setInterval(function () {
        vx = Math.cos(currentAngle) * 100 - 100;
        vy = Math.sin(currentAngle) * 100;

        createGraphic("canvas", 1);
        context.drawImage(img, 25 - vx, 97 - vy, 50, 50);
        currentAngle += 0.05;
        if (currentAngle > 3.1) {
            clearInterval(int);
            createGraphic("canvas", 1);
        }
    }, 25);
}

function createGraphic(id, r) {
    if (r === 0 || r === '_') {
        is_default_graphic = true;
        r = 1;
    }else{
        is_default_graphic = false;
    }
    let canvas = document.getElementById(id), context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);

    // квадрат
    context.beginPath();
    context.rect(150, 150, 130, 130);
    context.closePath();
    context.strokeStyle = "#2f9aff";
    context.fillStyle = "#2f9aff";
    context.fill();
    context.stroke();

    // окружность
    context.beginPath();
    context.moveTo(150, 150);
    context.arc(150, 150, 130, Math.PI, -Math.PI/2,  false);
    context.closePath();
    context.strokeStyle = "#2f9aff";
    context.fillStyle = "#2f9aff";
    context.fill();
    context.stroke();

    //треугольник
    context.beginPath();
    context.moveTo(150, 150);
    context.lineTo(20, 150);
    context.lineTo(150, 280);
    context.lineTo(150, 150);
    context.closePath();
    context.strokeStyle = "#2f9aff";
    context.fillStyle = "#2f9aff";
    context.fill();
    context.stroke();

    // axes
    context.beginPath();
    context.font = "10px Verdana";
    context.strokeStyle = "black";
    context.fillStyle = "black";
    context.moveTo(150, 0);
    context.lineTo(150, 300);
    context.moveTo(150, 0);
    context.lineTo(145, 15);
    context.moveTo(150, 0);
    context.lineTo(155, 15);
    context.fillText("Y", 160, 10);
    context.moveTo(0, 150);
    context.lineTo(300, 150);
    context.moveTo(300, 150);
    context.lineTo(285, 145);
    context.moveTo(300, 150);
    context.lineTo(285, 155);
    context.fillText("X", 290, 130);

    // Y
    context.moveTo(145, 20);
    context.lineTo(155, 20);
    context.fillText(is_default_graphic ? 'R' : String(r), 160, 20);
    context.moveTo(145, 85);
    context.lineTo(155, 85);
    context.fillText(is_default_graphic ? 'R/2' : String(r / 2), 160, 78);
    context.moveTo(145, 215);
    context.lineTo(155, 215);
    context.fillText(is_default_graphic ? '-R/2' : String(-(r / 2)), 160, 215);
    context.moveTo(145, 280);
    context.lineTo(155, 280);
    context.fillText(is_default_graphic ? '-R' : String(-r), 160, 280);

    // X
    context.moveTo(20, 145);
    context.lineTo(20, 155);
    context.fillText(is_default_graphic ? '-R' : String(-r), 15, 140);
    context.moveTo(85, 145);
    context.lineTo(85, 155);
    context.fillText(is_default_graphic ? '-R/2' : String(-(r / 2)), 70, 140);
    context.moveTo(215, 145);
    context.lineTo(215, 155);
    context.fillText(is_default_graphic ? 'R/2' : String(r / 2), 215, 140);
    context.moveTo(280, 145);
    context.lineTo(280, 155);
    context.fillText(is_default_graphic ? 'R' : String(r), 280, 140);

    context.closePath();
    context.strokeStyle = "black";
    context.fillStyle = "black";
    context.stroke();
}


function setRadius(r) {


    console.log('setting radius: ' + r);

    r_h_id.value = r;
    r_out.value = r > 0 ? r : '_';
    createGraphic('canvas', r);
}


function isXcorrect(x) {
    return isNumber(x) && correctX.includes(Number(x));
}

function isYcorrect(y) {
    let yFloat = parseFloat(y.replace(/,/, '.'));
    return isNumber(y.replace(/,/, '.')) && yFloat > -5 && yFloat < 3;
}

function isRcorrect(r) {
    return r >= 1 && r <= 100;
}

function setX(x) {
    if (count < 2) {
        count++;
        res = Number(res) + Number(x);
    } else {
        res = Number(res) + Number(x);
        count = 0;
        if (Number(res) === 2)
            egg();
        res = 0;
    }
    x_h_id.value = x;
    x_out.value = x;
}

function verifyY(y) {
    let y1 = parseFloat(y.value.replace(/,/, '.'));
    let elem = document.getElementById("y_in");
    if (y.value !== '' && y.value !== '-') {
        if (!isYcorrect(y.value)) {
            y.focus();
            elem.style.backgroundColor = "red";
            y.value = prev_y;
            return false;
        }
        prev_y = y1;
        y_h_id.value = y1;
        y_out.value = y1;
        elem.style.backgroundColor = "#E0FFFF";
        return true;
    }
    elem.style.backgroundColor = "#E0FFFF";
    prev_y = y.value;
    return true;
}

function isNumber(n) {
    return !isNaN(parseFloat(n)) && !isNaN(n - 0)
}


function markAsWrong(node) {
    node.style.backgroundColor = "red";
    node.value = '';
    setTimeout(() => node.style.backgroundColor = "white", 120);
}


function checkAllParameters(x, y, r) {
    return isNumber(x) && isNumber(y) && isRcorrect(r);
}

