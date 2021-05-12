async function get_numbers()
{
    speesoc.innerHTML = '';
    const response = await fetch('/numbers');
    const numbers = await response.json();

    for (let number of numbers)
    {
        const button = document.createElement("button");
        button.addEventListener('click', visual);
        button.innerText = number.name;
        button.setAttribute("data-v", BigInt(number.value));
        button.classList.add("list-group-item");
        button.classList.add("list-group-item-action");
        speesoc.appendChild(button);
    }
}


async function savenum()
{
    console.log("123wsqsawe")
    await fetch('/numbers',
        {
            method: "POST",
            headers: 
            {
                'Content-Type': 'application/json;charset:utf-8'
            },
            body: JSON.stringify(
                {
                    "name": savenameinp.value,
                    "value": form_text.value
                }
            )
        }
    );
    get_numbers();
}


function visual(event)
{
    form_text.value = event.target.dataset.v;
}


async function start(event)
{
    xprev = 0;
    yprev = 0;
    is_draw = false;
    points = make_points();
    canvas = document.getElementById('000');
    button_visu = document.getElementById("001");
    form_text = document.getElementById("002");
    button_calc = document.getElementById("003");
    mode = document.getElementById("004");
    speesoc = document.getElementById("005");
    savebutton = document.getElementById("006");
    savenameinp = document.getElementById("007");
    cont = canvas.getContext('2d');
    canvas.addEventListener('mousedown', draw_start);
    canvas.addEventListener('mouseup', draw_finish);
    canvas.addEventListener('mousemove', draw_rect);
    canvas.addEventListener('mouseout', draw_finish);
    savebutton.addEventListener('click', async (event) => { event.preventDefault(); await savenum(); });
    button_calc.onclick = calc;
    button_visu.onclick = visu;
    await get_numbers();
}


function draw_start(event)
{
    is_draw = true;
    draw_rect(event);
    xprev = 107;
    yprev = 18;
}


function draw_finish()
{
    is_draw = false;
}


function draw_rect(event)
{
    const canvas_rect = canvas.getBoundingClientRect();
    let y = Math.floor((event.pageY - canvas_rect.top) / 10);
    let x = Math.floor((event.pageX - canvas_rect.left) / 10);
    if (is_draw && (x != xprev || y != yprev))
    {
        if (parseInt(mode.value) == 2)
        {
            if (cont.getImageData(x * 10, y * 10, 1, 1).data[2] == 128 && cont.getImageData(x * 10, y * 10, 1, 1).data[3] == 255)
            {
                cont.fillStyle = 'rgba(255, 0, 0, 255)';
                points[y][105 - x] = 1;
            }
            else if (cont.getImageData(x * 10, y * 10, 1, 1).data[2] == 0 && cont.getImageData(x * 10, y * 10, 1, 1).data[3] == 255)
            {
                cont.fillStyle = 'rgba(128, 128, 128, 105)';
                points[y][105 - x] = 0;
            }
            else
            {
                cont.fillStyle = 'rgba(255, 0, 0, 255)';
                points[y][105 - x] = 1;
            }
            cont.fillRect(x * 10, y * 10, 10, 10);
        }
        else if (parseInt(mode.value) == 1)
        {
            cont.fillStyle = 'rgba(255, 0, 0, 255)';
            points[y][105 - x] = 1;
            cont.fillRect(x * 10, y * 10, 10, 10);
        }
        else
        {
            if (cont.getImageData(x * 10, y * 10, 1, 1).data[2] == 0 && cont.getImageData(x * 10, y * 10, 1, 1).data[3] == 255)
            {
                cont.fillStyle = 'rgba(128, 128, 128, 105)';
                points[y][105 - x] = 0;
                cont.fillRect(x * 10, y * 10, 10, 10);
            }
        }
        xprev = x;
        yprev = y;
    }
}


function calc(event)
{
    event.preventDefault();
    let twopaws = 142896697153460416720805209046049317327814622896978049339386633977871186574645757332326963900352440075186956694211874845373003983788839577592176844275932052525047196300745439952275822644968892229226569808767955286352387115635794054046126840249704067979253613529018275859829574410746826232154508485306846554772453254318240336447247320279930233939144823683331925165977433731585300150589310505050514686327132085648991018615745655946429473768762993378913584868300158940223323623522752322136111328024675396912582079103886598568509141159904649674752n;
    let protorslt = BigInt(0);
    for (let x = 0; x < 106; x++)
    {
        for (let y = 0; y < 17; y++)
        {
            protorslt += BigInt(points[y][x]) * twopaws;
            twopaws /= 2n;
        }
    }
    form_text.value = protorslt * 17n;
}


function visu(event)
{
    event.preventDefault();
    let number = BigInt((BigInt(form_text.value) / 17n).toString(2)).toString();
    for (let i = number.length; i < 1802; i++)
    {
        number = "0" + number;
    }
    for (let xe = 0; xe < 106; xe++)
    {
        for (let ye = 0; ye < 17; ye++)
        {
            points[ye][xe] = parseInt(number[(xe * 17) + ye]);
            if (points[ye][xe] == 1)
            {
                cont.fillStyle = 'rgba(0, 0, 0, 255)';
                cont.fillRect((105 - xe) * 10, ye * 10, 10, 10);
            }
            else if (points[ye][xe] == 0)
            {
                cont.fillStyle = 'rgba(255, 255, 255, 255)';
                cont.fillRect((105 - xe) * 10, ye * 10, 10, 10);
            }
        }
    }
}


function make_points()
{
    const points = [];
    for (let i = 0; i < 17; i++)
    {
        const line = [];
        for (let x = 0; x < 106; x++)
        {
            line.push(0);
        }
        points.push(line);
    }
    return points;
}
let xprev;
let yprev;
let is_draw;
let points;
let canvas;
let button_visu;
let form_text;
let button_calc;
let mode;
let speesoc;
let cont;
let savebutton;
let savenameinp;

document.addEventListener('DOMContentLoaded', async () => { await start(); });
