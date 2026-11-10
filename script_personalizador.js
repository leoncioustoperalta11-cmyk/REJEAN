/* =====================================================
   Personalizador de piezas de jean (portado del Rejean 1)
   El cliente elige: 1) producto  2) lavado del jean  3) color del hilo.
   La pieza se dibuja con SVG creado por JavaScript, se inclina en 3D
   al mover el cursor y el botón "Pedir este diseño" rellena el formulario.
   Todo va dentro de una función para no chocar con los otros scripts.
   ===================================================== */
(function () {

const $ = s => document.querySelector(s);

/* ----- 1. Filtros y gradientes SVG (textura de jean) ----- */
document.body.insertAdjacentHTML('afterbegin',`<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
<filter id="g" x="-25%" y="-25%" width="150%" height="150%"><feTurbulence type="fractalNoise" baseFrequency=".8 .07" numOctaves="3" seed="3" result="n"/><feColorMatrix in="n" type="matrix" values="0 0 0 0 .1 0 0 0 0 .2 0 0 0 0 .5 0 0 0 .9 -.25" result="t"/><feComposite in="t" in2="SourceGraphic" operator="in" result="tc"/><feBlend in="tc" in2="SourceGraphic" mode="overlay"/></filter>
<filter id="bl"><feGaussianBlur stdDeviation="6"/></filter>
<pattern id="tw" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(55)"><line x1="0" y1="0" x2="0" y2="6" stroke="#fff" stroke-opacity=".13" stroke-width="1.6"/></pattern>
<linearGradient id="sh" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".22"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".35"/></linearGradient>
<linearGradient id="sx" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#000" stop-opacity=".3"/><stop offset=".2" stop-color="#000" stop-opacity="0"/><stop offset=".8" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".35"/></linearGradient>
</defs></svg>`);

/* ----- 2. Colores de lavado, hilo y dibujo de cada producto ----- */
const PAL={light:['#6b93cf','#3f6aa8','#a9c4e8'],mid:['#3a62a6','#27487f','#5f86c4'],dark:['#22396a','#16264a','#3f5f9c'],black:['#2b2f38','#1a1d24','#4a505c']};
const F=(d,c)=>`<path d="${d}" fill="${c}" filter="url(#g)"/><path d="${d}" fill="url(#tw)"/><path d="${d}" fill="url(#sx)"/><path d="${d}" fill="url(#sh)"/>`;
let TH="#f2b81c";
const S=(d,w=1.8)=>`<path d="${d}" fill="none" stroke="${TH}" stroke-width="${w}" stroke-dasharray="5 4" stroke-linecap="round"/>`;
const R=(x,y)=>`<circle cx="${x}" cy="${y}" r="4.5" fill="#c9a24b" stroke="#6b4f12"/>`;
const Z=d=>`<path d="${d}" fill="none" stroke="#cfd3da" stroke-width="4.5" stroke-dasharray="3 2"/>`;
const LB=(x,y)=>`<rect x="${x}" y="${y}" width="36" height="14" rx="2" fill="#8a5a2b"/><rect x="${x+3}" y="${y+3}" width="30" height="8" rx="1" fill="none" stroke="#e7c27a" stroke-width=".8" stroke-dasharray="2 2"/>`;
const sh=(rx=100)=>`<ellipse cx="150" cy="274" rx="${rx}" ry="9" fill="#000" opacity=".35" filter="url(#bl)"/>`;
const W=c=>`<svg viewBox="0 0 300 300" role="img" aria-label="Producto de jean reutilizado">${c}</svg>`;
const ART={
 jeans:p=>W(sh(100)+F("M92 34H208L226 276H160L150 128L140 276H74Z",p[0])+F("M92 34H208V58H92Z",p[1])+`<rect x="106" y="28" width="8" height="32" rx="2" fill="${p[1]}"/><rect x="186" y="28" width="8" height="32" rx="2" fill="${p[1]}"/>`+S("M147 60V126")+S("M98 64Q118 72 130 104")+S("M202 64Q182 72 170 104")+S("M80 264H152")+S("M160 264H222")+R(150,48)+`<ellipse cx="118" cy="190" rx="15" ry="28" fill="#fff" opacity=".12"/><path d="M104 176l22 3M106 184l18 2" stroke="#fff" stroke-width="1.6" opacity=".7"/>`),
 tote:p=>W(sh(105)+`<path d="M98 120C98 30 202 30 202 120" fill="none" stroke="${p[1]}" stroke-width="15" filter="url(#g)"/>`+F("M55 105H245L256 268Q150 284 44 268Z",p[0])+F("M55 105H245V132H55Z",p[1])+S("M58 126H242")+S("M52 258Q150 274 248 258")+F("M92 170H208V248Q150 258 92 248Z",p[2])+S("M99 177H201V242Q150 251 99 242Z")+LB(132,184)+R(92,170)+R(208,170)),
 pack:p=>W(sh(95)+`<path d="M72 120Q40 190 70 262M228 120Q260 190 230 262" fill="none" stroke="${p[1]}" stroke-width="12" filter="url(#g)"/><path d="M135 62Q150 28 165 62" fill="none" stroke="${p[1]}" stroke-width="8"/>`+F("M82 96Q150 38 218 96L232 264Q150 282 68 264Z",p[0])+F("M82 96Q150 38 218 96V150Q150 176 82 150Z",p[1])+S("M88 144Q150 168 212 144")+`<rect x="138" y="146" width="24" height="20" rx="3" fill="#c9a24b"/>`+F("M105 192H195V248Q150 256 105 248Z",p[2])+S("M111 199H189V243Q150 250 111 243Z")+Z("M105 192H195")),
 cyl:p=>W(sh(115)+`<g transform="rotate(-8 150 160)">`+F("M80 118H220A40 40 0 0 1 220 198H80A40 40 0 0 1 80 118Z",p[0])+`<rect x="76" y="124" width="150" height="12" rx="6" fill="#fff" opacity=".12"/>`+Z("M86 128H212")+S("M86 138H212")+`<circle cx="214" cy="128" r="6" fill="#c9a24b"/>`+F("M110 156H190V182H110Z",p[1])+S("M114 160H186V178H114Z")+`</g>`),
 flat:p=>W(sh(115)+`<g transform="rotate(6 150 156)">`+F("M50 92H250Q258 92 258 100V212Q258 220 250 220H50Q42 220 42 212V100Q42 92 50 92Z",p[0])+Z("M56 104H244")+S("M56 114H244")+F("M68 142H168V198H68Z",p[2])+S("M74 148H162V192H74Z")+LB(196,170)+R(68,142)+`<circle cx="246" cy="104" r="6" fill="#c9a24b"/></g>`),
 hat:p=>W(sh(125)+F("M42 190A108 30 0 1 0 258 190A108 30 0 1 0 42 190Z",p[1])+S("M62 196Q150 224 238 196")+F("M96 188L104 92Q150 66 196 92L204 188Q150 206 96 188Z",p[0])+F("M104 92Q150 66 196 92Q150 108 104 92Z",p[1])+F("M97 168Q150 184 203 168L204 188Q150 206 96 188Z",p[1])+S("M110 150Q150 162 190 150")+`<circle cx="112" cy="140" r="4" fill="#0a1830"/><circle cx="188" cy="140" r="4" fill="#0a1830"/>`),
 cap:p=>W(sh(115)+F("M78 178Q76 70 160 68Q244 70 242 178Q160 192 78 178Z",p[0])+`<path d="M160 68V184M118 80Q108 130 112 182M202 80Q212 130 208 182" fill="none" stroke="#0a1830" stroke-opacity=".3"/>`+`<circle cx="160" cy="68" r="7" fill="${p[1]}"/>`+F("M84 176Q170 196 270 214Q258 250 160 236Q96 222 84 176Z",p[1])+S("M100 190Q170 208 256 222")),
 lap:p=>W(sh(115)+F("M44 96H256Q262 96 262 102V222Q262 228 256 228H44Q38 228 38 222V102Q38 96 44 96Z",p[0])+F("M38 102Q38 96 44 96H256Q262 96 262 102V138H38Z",p[1])+Z("M44 138H256")+S("M44 148H256")+F("M62 166H150V212H62Z",p[2])+S("M68 172H144V206H68Z")+LB(204,196)+`<circle cx="250" cy="138" r="6" fill="#c9a24b"/>`),
 purse:p=>W(sh(85)+F("M84 132Q150 104 216 132L226 226Q150 250 74 226Z",p[0])+F("M84 132Q150 104 216 132L218 158Q150 132 82 158Z",p[1])+Z("M86 146Q150 120 214 146")+`<circle cx="222" cy="158" r="8" fill="none" stroke="#c9a24b" stroke-width="3"/><circle cx="214" cy="146" r="5" fill="#c9a24b"/>`+F("M118 180H182V218Q150 226 118 218Z",p[2])+S("M123 185H177V214Q150 220 123 214Z"))
};
const draw=(k,pal='mid')=>ART[k](PAL[pal]);

/* ----- 3. Datos del personalizador: [clave, nombre, precio, tipo de interés del formulario] ----- */
const CP=[['tote','Bolsa tote',45,0],['pack','Mochila urbana',85,0],['cyl','Cartuchera cilíndrica',18,1],['flat','Cartuchera plana',15,1],['hat','Sombrero bucket',35,2],['cap','Gorra patchwork',30,2],['lap','Funda para laptop',40,0],['purse','Monedero mini',12,0]];
const CW=[['Claro','light'],['Medio','mid'],['Oscuro','dark'],['Negro','black']];
const CT=[['Dorado','#f2b81c'],['Coral','#ff6b4a'],['Lima','#c6f432'],['Blanco','#ffffff'],['Rojo','#d62839']];
const st = { p: 0, w: 1, t: 0 };   // opción elegida: producto, lavado, hilo

/* Dibuja la pieza y actualiza precio, resumen y botones activos */
function render() {
    TH = CT[st.t][1];
    $('#art').innerHTML = draw(CP[st.p][0], CW[st.w][1]);
    TH = '#f2b81c';
    $('#price').textContent = 'S/ ' + CP[st.p][2];
    $('#sum').textContent = `${CP[st.p][1]} · jean ${CW[st.w][0].toLowerCase()} · hilo ${CT[st.t][0].toLowerCase()}`;
    [['#cProd', 'p'], ['#cWash', 'w'], ['#cThread', 't']].forEach(([id, k]) =>
        [...$(id).children].forEach((b, i) => b.classList.toggle('on', i === st[k])));
}

/* Botones de producto, lavado y color de hilo */
CP.forEach((p, i) => { const b = document.createElement('button'); b.type = 'button'; b.textContent = p[1]; b.onclick = () => { st.p = i; render(); }; $('#cProd').append(b); });
CW.forEach((w, i) => { const b = document.createElement('button'); b.type = 'button'; b.title = w[0]; b.setAttribute('aria-label', w[0]); b.style.background = PAL[w[1]][0]; b.onclick = () => { st.w = i; render(); }; $('#cWash').append(b); });
CT.forEach((t, i) => { const b = document.createElement('button'); b.type = 'button'; b.title = t[0]; b.setAttribute('aria-label', t[0]); b.style.background = t[1]; b.onclick = () => { st.t = i; render(); }; $('#cThread').append(b); });
render();

/* Inclinación 3D al mover el cursor sobre la vista */
const vw = $('#view'), c3 = $('#card3d');
vw.addEventListener('pointermove', e => {
    const r = vw.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
    c3.style.transform = `rotateY(${x * 30}deg) rotateX(${-y * 24}deg)`;
    vw.style.setProperty('--gx', (x + .5) * 100 + '%');
    vw.style.setProperty('--gy', (y + .5) * 100 + '%');
});
vw.addEventListener('pointerleave', () => c3.style.transform = '');

/* "Pedir este diseño": escribe el diseño en el formulario de contacto */
$('#order').addEventListener('click', () => {
    $('#mensaje').value = 'Hola, quiero este diseño: ' + $('#sum').textContent + ' (' + $('#price').textContent + ').';
    $('#interes').selectedIndex = CP[st.p][3];
});

})();
