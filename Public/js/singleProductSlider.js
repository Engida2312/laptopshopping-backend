const model = document.querySelector(".singel_page_centerimage img");
const defult = document.querySelector("#sigelpage_defult");
const image1 = document.querySelector("#sigelpage_sideimg1");
const image2 = document.querySelector("#sigelpage_sideimg2");
const image3 = document.querySelector("#sigelpage_sideimg3");
model.src= defult.src;
defult.style.opacity= 1;
image1.onclick = function() {
    model.src = image1.src;
    image1.style.opacity = 1;
    defult.style.opacity = 0.6;
    image2.style.opacity = 0.6;
    image3.style.opacity = 0.6;
}
image2.onclick = function() {
    model.src = image2.src;
    image2.style.opacity = 1;
    defult.style.opacity = 0.6;
    image1.style.opacity = 0.6;
    image3.style.opacity = 0.6;
}
image3.onclick = function() {
    model.src = image3.src;
    image3.style.opacity = 1;
    defult.style.opacity = 0.6;
    image1.style.opacity = 0.6;
    image2.style.opacity = 0.6;
}
defult.onclick = function() {
    model.src = defult.src;
    defult.style.opacity= 1;
    image1.style.opacity = 0.6;
    image2.style.opacity = 0.6;
    image3.style.opacity = 0.6;
}
