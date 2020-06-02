let  text = document.querySelector("#text");
let  bouton = document.querySelector("#bouton_test");
let select = "Vous avez selectionné(e) : ";



let Jambes = "Jambes";
let Bras_droit = "Bras droit";
let Bras_gauche = "Bras gauche";
let Cou = "Cou";
let Tête = "Tête";
let Pied_gauche = "Pied gauche";
let Pied_droit = "Pied droit";
let Main_droite = "Main droite";
let Main_gauche = "Main gauche";
let Nuque = "Nuque";
let Dos = "Dos";
let Ventre = "Ventre";
let Cheveux = "Cheveux";

// ----------------------------------------face-------------------------------------------------------

let Ventre_selector_face = document.querySelector("#mapdiv > svg, g:nth-child(3) > a:nth-child(1");
let Jambes_selector_face = document.querySelector("#mapdiv > svg, g:nth-child(3) > a:nth-child(2");
let Bras_droit_selector_face = document.querySelector("#mapdiv > svg, g:nth-child(3) > a:nth-child(3");
let Bras_gauche_selector_face = document.querySelector("#mapdiv > svg, g:nth-child(3) > a:nth-child(4");
let Cou_selector_face = document.querySelector("#mapdiv > svg, g:nth-child(3) > a:nth-child(5");
let Tête_selector = document.querySelector("#mapdiv > svg, g:nth-child(3) > a:nth-child(6");
let Pied_droit_selector_face = document.querySelector("#mapdiv > svg, g:nth-child(3) > a:nth-child(7");
let Pied_gauche_selector_face = document.querySelector("#mapdiv > svg, g:nth-child(3) > a:nth-child(8");
let Main_droite_selector_face = document.querySelector("#mapdiv > svg, g:nth-child(3) > a:nth-child(9");
let Main_gauche_selector_face = document.querySelector("#mapdiv > svg, g:nth-child(3) > a:nth-child(16");

// ----------------------------------------dos-------------------------------------------------------

let Jambes_selector_dos = document.querySelector("#mapdiv > svg, g:nth-child(2) > a:nth-child(1");
let Bras_droit_selector_dos = document.querySelector("#mapdiv > svg, g:nth-child(2) > a:nth-child(2");
let Bras_gauche_selector_dos = document.querySelector("#mapdiv > svg, g:nth-child(2) > a:nth-child(3");
let Cou_selector_dos = document.querySelector("#mapdiv > svg, g:nth-child(2) > a:nth-child(4");
let Tête_selector_dos = document.querySelector("#mapdiv > svg, g:nth-child(2) > a:nth-child(5");
let Pied_droit_selector_dos = document.querySelector("#mapdiv > svg, g:nth-child(2) > a:nth-child(6");
let Pied_gauche_selector_dos = document.querySelector("#mapdiv > svg, g:nth-child(2) > a:nth-child(7");
let Main_droite_selector_dos = document.querySelector("#mapdiv > svg, g:nth-child(2) > a:nth-child(8");
let Main_gauche_selector_dos = document.querySelector("#mapdiv > svg, g:nth-child(2) > a:nth-child(9");
let Dos_selector_dos = document.querySelector("#mapdiv > svg, g:nth-child(2) > a:nth-child(24");


// ----------------------------------------Selector_face----------------------------------------------

Ventre_selector_face.addEventListener('click', function(event){
    text.classList.remove('d-none');
    text.style.color = "white";
    text.style.fontSize = "48";
    text.innerHTML = select + Ventre;
});

Jambes_selector_face.addEventListener('click', function(event){
    text.classList.remove('d-none');
    text.style.color = "white";
    text.style.fontSize = "48";
    text.innerHTML = select + Jambes;
});

Bras_droit_selector_face.addEventListener('click', function(event){
    text.classList.remove('d-none');
    text.style.color = "white";
    text.style.fontSize = "48";
    text.innerHTML = select + Bras_droit;
});

Bras_gauche_selector_face.addEventListener('click', function(event){
    text.classList.remove('d-none');
    text.style.color = "white";
    text.style.fontSize = "48";
    text.innerHTML = select + Bras_gauche;
});

Cou_selector_face.addEventListener('click', function(event){
    text.classList.remove('d-none');
    text.style.color = "white";
    text.style.fontSize = "48";
    text.innerHTML = select + Cou;
});

Tête_selector.addEventListener('click', function(event){
    text.classList.remove('d-none');
    text.style.color = "white";
    text.style.fontSize = "48";
    text.innerHTML = select + Tête;
});

Pied_droit_selector_face.addEventListener('click', function(event){
    text.classList.remove('d-none');
    text.style.color = "white";
    text.style.fontSize = "48";
    text.innerHTML = select + Pied_droit;
});

Pied_gauche_selector_face.addEventListener('click', function(event){
    text.classList.remove('d-none');
    text.style.color = "white";
    text.style.fontSize = "48";
    text.innerHTML = select + Pied_gauche;
});

Main_droite_selector_face.addEventListener('click', function(event){
    text.classList.remove('d-none');
    text.style.color = "white";
    text.style.fontSize = "48";
    text.innerHTML = select + Main_droite;
});

Main_gauche_selector_face.addEventListener('click', function(event){
    text.classList.remove('d-none');
    text.style.color = "white";
    text.style.fontSize = "48";
    text.innerHTML = select + Main_gauche;
});

// ----------------------------------------Selector_dos-----------------------------------------------


Jambes_selector_dos.addEventListener('click', function(event){
    text.classList.remove('d-none');
    text.style.color = "white";
    text.style.fontSize = "48";
    text.innerHTML = select + Jambes;
});

Bras_droit_selector_dos.addEventListener('click', function(event){
    text.classList.remove('d-none');
    text.style.color = "white";
    text.style.fontSize = "48";
    text.innerHTML = select + Bras_droit;
});

Bras_gauche_selector_dos.addEventListener('click', function(event){
    text.classList.remove('d-none');
    text.style.color = "white";
    text.style.fontSize = "48";
    text.innerHTML = select + Bras_gauche;
});

Cou_selector_dos.addEventListener('click', function(event){
    text.classList.remove('d-none');
    text.style.color = "white";
    text.style.fontSize = "48";
    text.innerHTML = select + Cou;
});

Tête_selector_dos.addEventListener('click', function(event){
    text.classList.remove('d-none');
    text.style.color = "white";
    text.style.fontSize = "48";
    text.innerHTML = select + Tête;
});

Pied_droit_selector_dos.addEventListener('click', function(event){
    text.classList.remove('d-none');
    text.style.color = "white";
    text.style.fontSize = "48";
    text.innerHTML = select + Pied_droit;
});

Pied_gauche_selector_dos.addEventListener('click', function(event){
    text.classList.remove('d-none');
    text.style.color = "white";
    text.style.fontSize = "48";
    text.innerHTML = select + Pied_gauche;
});

Main_droite_selector_dos.addEventListener('click', function(event){
    text.classList.remove('d-none');
    text.style.color = "white";
    text.style.fontSize = "48";
    text.innerHTML = select + Main_droite;
});

Main_gauche_selector_dos.addEventListener('click', function(event){
    text.classList.remove('d-none');
    text.style.color = "white";
    text.style.fontSize = "48";
    text.innerHTML = select + Main_gauche;
});

Dos_selector_dos.addEventListener('click', function(event){
    text.classList.remove('d-none');
    text.style.color = "white";
    text.style.fontSize = "48";
    text.innerHTML = select + Dos;
});
