//srdce - 40, kule - 60, list - 80, žalud - 100
karty = ["S7","S8","S9","SS","SV","SK","SD","SE",
         "K7","K8","K9","KS","KV","KK","KD","KE",
         "L7","L8","L9","LS","LV","LK","LD","LE",
         "Z7","Z8","Z9","ZS","ZV","ZK","ZD","ZE"
];

const hrac_enum = {
    "p1": 0, // hrac
    "p2": 1, // NPC vlevo
    "p3": 2 // NPV vpravo
}

kolo = 0; //kolo je definovano jako doba, kdy se odehraji 3 štychy
hra = 0; //hra je definovana jako oba, kdy se odehraje 30 štychů

p1_kolo_poc_body = 0; //ať se nemusí pokaždé při hádce znovu a znovu volat
p2_kolo_poc_body = 0;
p3_kolo_poc_body = 0;

score_p1 = 0;
score_p2 = 0;
score_p3 = 0;
karty_p1 = {deck:[], stych:[], p: "hrac"}; //deck je co má v ruce, stych je co sebral a odložil na počítání na konec
karty_p2 = {deck:[], stych:[], p: "p2"};
karty_p3 = {deck:[], stych:[], p: "p3"};
talon = [];
zprava_po_kliknuti = "";

hrac_dobry = false;
hrac2_dobry = false;
hrac3_dobry = false;

muzeme_hrat = false; //muzeme hrat az teprve tehdy, kdyz je rozdane a jsou urcene hlasky/skoncila hadka

karty_na_stole = [];

// ? hraci = ["p1","p2","p3"];
michac = hrac_enum["p1"]; //index 0->2 = p1->p3
hada_se = hrac_enum["p3"] // to same
hrac_povinnost = 2; //to same
//kopac = hrac_enum["p2"]
povinnost = 50;
povinnost_kolo = 50;

document.addEventListener("DOMContentLoaded",()=>{
    zamichani();
});

function nastav_zpravu(){
    if(hrac_povinnost == 0){
        zprava_po_kliknuti += "<p>Máš povinnost</p>";
    }
    if(hrac_povinnost == 1){
        zprava_po_kliknuti += "<p>Povinnost má hráč 2</p>";
    }
    if(hrac_povinnost == 2){
        zprava_po_kliknuti += "<p>Povinnost má hráč 3</p>";
    }
    zprava_po_kliknuti += "<p>Povinnost má hráč 3</p><p>Hráč 3 se teď rozhoduje zda je dobrý či přidá</p>";
}

function zamichani(){
    var nezamichane_karty = [...karty];
    var zamichane_karty = [];
    var pocet_iteraci = nezamichane_karty.length;
    for(let i = 0; i < pocet_iteraci; i++)
    {
        var random = Math.floor(Math.random() * nezamichane_karty.length);
        zamichane_karty.push(nezamichane_karty[random]);
        nezamichane_karty.splice(random, 1);
    }
    console.log(zamichane_karty);
    rozdavani(zamichane_karty);
}

function rozdavani(shuffled_karty){
    switch(michac){
        case 0:
            var karta = 0;
            let rozdavani_cykly = setInterval(()=>{ //michame dle postupu 3-2-talon-3-2
                //console.log(karta); //ikdyz preskoci nektere cisla tak se to spravne rozda
                if(karta < 3){
                    karty_p2.deck.push(shuffled_karty[karta]);
                    render_rozdavani(karty_p2.deck[karty_p2.deck.length-1], karty_p2.deck);
                    karta++;
                }
                if(karta >= 3 && karta < 6){
                    karty_p3.deck.push(shuffled_karty[karta]);
                    render_rozdavani(karty_p3.deck[karty_p3.deck.length-1], karty_p3.deck);
                    karta++;
                }
                if(karta >= 6 && karta < 9){
                    karty_p1.deck.push(shuffled_karty[karta]);
                    render_rozdavani(karty_p1.deck[karty_p1.deck.length-1], karty_p1.deck);
                    karta++;
                }
                if(karta >= 9 && karta < 11){
                    karty_p2.deck.push(shuffled_karty[karta]);
                    render_rozdavani(karty_p2.deck[karty_p2.deck.length-1], karty_p2.deck);
                    karta++;
                }
                if(karta >= 11 && karta < 13){
                    karty_p3.deck.push(shuffled_karty[karta]);
                    render_rozdavani(karty_p3.deck[karty_p3.deck.length-1], karty_p3.deck);
                    karta++;
                }
                if(karta >= 13 && karta < 15){
                    karty_p1.deck.push(shuffled_karty[karta]);
                    render_rozdavani(karty_p1.deck[karty_p1.deck.length-1], karty_p1.deck);
                    karta++;
                }
                if(karta >= 15 && karta < 17){
                    talon.push(shuffled_karty[karta]);
                    render_rozdavani(talon[talon.length-1], talon);
                    karta++;
                }
                if(karta >= 17 && karta < 20){
                    karty_p2.deck.push(shuffled_karty[karta]);
                    render_rozdavani(karty_p2.deck[karty_p2.deck.length-1], karty_p2.deck);
                    karta++;
                }
                if(karta >= 20 && karta < 23){
                    karty_p3.deck.push(shuffled_karty[karta]);
                    render_rozdavani(karty_p3.deck[karty_p3.deck.length-1], karty_p3.deck);
                    karta++;
                }
                if(karta >= 23 && karta < 26){
                    karty_p1.deck.push(shuffled_karty[karta]);
                    render_rozdavani(karty_p1.deck[karty_p1.deck.length-1], karty_p1.deck);
                    karta++;
                }
                if(karta >= 26 && karta < 28){
                    karty_p2.deck.push(shuffled_karty[karta]);
                    render_rozdavani(karty_p2.deck[karty_p2.deck.length-1], karty_p2.deck);
                    karta++;
                }
                if(karta >= 28 && karta < 30){
                    karty_p3.deck.push(shuffled_karty[karta]);
                    render_rozdavani(karty_p3.deck[karty_p3.deck.length-1], karty_p3.deck);
                    karta++;
                }
                if(karta >= 30 && karta < 32){
                    if(karta == 31){
                        karty_p1.deck.push(shuffled_karty[karta]);
                        render_rozdavani(karty_p1.deck[karty_p1.deck.length-1], karty_p1.deck);
                        //console.log("p1: " + karty_p1.deck);console.log("p2: " + karty_p2.deck);console.log("p3: " + karty_p3.deck);console.log("talon: " + talon);
                        render();
                        clearInterval(rozdavani_cykly);
                    }
                    else{
                    karty_p1.deck.push(shuffled_karty[karta]);
                    render_rozdavani(karty_p1.deck[karty_p1.deck.length-1], karty_p1.deck);
                    karta++; 
                    }
                }
            }, 200);
            break;
        case 1:
            break;
        case 2:
            break;    
    }
}

function render_rozdavani(karta, arr){ //tento bude animovat karty průběžně po zamíchání/při rozdávání
    if(arr == karty_p1.deck){
        let card = document.createElement("div");
        card.classList.add("p1-karta");
        card.innerHTML = "<img src='./cards/" + karta + ".jpg'>";
        card.setAttribute("karta", karta);
        document.querySelector(".player").append(card);
    }
    if(arr == karty_p2.deck){
        let card = document.createElement("div");
        card.classList.add("npc-karta");
        card.innerHTML = "<img src='./cards/zadek.jpg'>";
        card.setAttribute("karta", karta);
        document.querySelector(".p2").append(card);
    }
    if(arr == karty_p3.deck){
        let card = document.createElement("div");
        card.classList.add("npc-karta");
        card.innerHTML = "<img src='./cards/zadek.jpg'>";
        card.setAttribute("karta", karta);
        document.querySelector(".p3").append(card);
    }
}

function usporadani(deck){
    // srdce - kule - listy - zaludy
    px_usporadany = [];
    for(let i = 0; i < karty.length; i++){
        for(let j = 0; j < deck.length; j++){
            if(deck[j] === karty[i]){
                px_usporadany.push(karty[i]);
            }
        }
    }
    console.log(deck);
    return px_usporadany;
}

function render(){ //tento bude animovat karty po rozdání
    if(kolo == 0){
        karty_p1.deck = usporadani(karty_p1.deck);
        karty_p2.deck = usporadani(karty_p2.deck);
        karty_p3.deck = usporadani(karty_p3.deck);
        p1_kolo_poc_body = ai_hlaska(karty_p1.deck, karty_p1.p);
        p2_kolo_poc_body = ai_hlaska(karty_p2.deck, karty_p2.p);
        p3_kolo_poc_body = ai_hlaska(karty_p3.deck, karty_p3.p);
        hadky(hrac_povinnost);
    }
    document.querySelector(".player").innerHTML = "";
    for(let i = 0; i < karty_p1.deck.length; i++){
        let card = document.createElement("div");
        card.classList.add("p1-karta");
        //console.log("" + karty_p1.deck[i] + "");
        card.innerHTML = "<img src='./cards/" + karty_p1.deck[i] + ".jpg'>";
        card.setAttribute("karta", karty_p1.deck[i]);
        card.addEventListener("click", () => kliknutiNaKartu(card));
        document.querySelector(".player").appendChild(card);
    }
    for(let j = 0; j < karty_na_stole.length; j++){
        let stul = document.querySelector(".info-panel");
        let card = document.createElement("div");
        card.classList.add("karta-stul");
        card.innerHTML = "<img src='./cards/" + karty_na_stole[i] + ".jpg'>";
        stul.appendChild(card);
    }
}

// 0 - p1/hrac, 1 - p2, 2 - p3
function hadky(na_rade){ //hadani se o talon
    // povinnost_kolo = povinnost;
    if(na_rade == hrac_enum['p3'] && hrac3_dobry == false){
        zprava_po_kliknuti = "<p>Povinnost má hráč 3</p><p>Hráč 3 se teď rozhoduje zda je dobrý či přidá</p>";
        document.querySelector(".info-panel").innerHTML = zprava_po_kliknuti;
        setTimeout(()=>{
            if(hrac_dobry && hrac2_dobry){
                document.querySelector(".info-panel").innerHTML = "<p>Hráč 3 musí uhrát " + povinnost_kolo; + "</p><p>Hra začíná za 3 sekundy</p>";
            }
            else{
                if(p3_kolo_poc_body <= povinnost_kolo){
                    hrac3_dobry = true;
                    document.querySelector(".info-panel").innerHTML = "Hráč 3 je dobrý";
                    setTimeout(()=>{ hadky(0) }, 1500);
                    console.log("p3 dobry");
                }
                else{ //v tomhle pripade je else rovnocen else if n > m
                    povinnost_kolo += 10;
                    hrac_povinnost = (hrac_povinnost + 1) % 3;
                    document.querySelector(".info-panel").innerHTML = "Hráč 3 přidal na " + povinnost_kolo;
                    setTimeout(()=>{ 
                        if(hrac_dobry && !hrac2_dobry) hadky(1); 
                        if(hrac_dobry && hrac2_dobry) console.log("hra") // HRA!
                        if((!hrac_dobry && hrac2_dobry) || (!hrac_dobry && !hrac2_dobry)) hadky(0);  
                    }, 1500);
                }
            }
        }, 1500);
    }
    if(na_rade == hrac_enum['p1'] && hrac_dobry == false){
        zprava_po_kliknuti = "<p>Povinnost má hráč 1 (ty)</p><p>Máš " + p1_kolo_poc_body + " bodů a sázka je " + povinnost_kolo + "</p>";
        document.querySelector(".info-panel").innerHTML = zprava_po_kliknuti;
        setTimeout(()=>{
            if(hrac2_dobry && hrac3_dobry){
                document.querySelector(".info-panel").innerHTML = "<p>Hráč 1 (ty) musí uhrát " + povinnost_kolo; + "</p><p>Hra začíná za 3 sekundy</p>";
                setTimeout(()=>{
                    document.querySelector(".info-panel").innerHTML = "<p>Kolik sázíš?</p><br><input type='number' min='povinnost_kolo' step=10 max='320'></input>";
                }, 1500);
            }
            else{
                if(p1_kolo_poc_body <= povinnost_kolo){
                    //hrac1_dobry = true;
                    let btn = document.createElement("button");
                    btn.innerHTML = "Dobrý";
                    document.querySelector(".info-panel").append(btn);
                    btn.addEventListener("click", ()=>{
                        hrac_dobry = true;
                        hadky(1);
                    });
                }
                else{
                    povinnost_kolo += 10;
                    hrac_povinnost = (hrac_povinnost + 1) % 3;
                    let btn = document.createElement("button");
                    btn.innerHTML = "Přidej";
                    document.querySelector(".info-panel").append(btn);
                    btn.addEventListener("click", ()=>{
                        document.querySelector(".info-panel").innerHTML = "Hráč 1 přidal na " + povinnost_kolo;
                        hadky(1);
                    });
                }
            }
        }, 1500);
    }
    if(na_rade == hrac_enum['p2'] && hrac2_dobry == false){
        zprava_po_kliknuti = "<p>Povinnost má hráč 2</p><p>Hráč 2 se teď rozhoduje zda je dobrý či přidá</p>";
        document.querySelector(".info-panel").innerHTML = zprava_po_kliknuti;
        setTimeout(()=>{
            if(hrac_dobry && hrac3_dobry){
                document.querySelector(".info-panel").innerHTML = "<p>Hráč 2 musí uhrát " + povinnost_kolo; + "</p><p>Hra začíná za 3 sekundy</p>";
            }
            else{
                if(p2_kolo_poc_body <= povinnost_kolo){
                    hrac2_dobry = true;
                    document.querySelector(".info-panel").innerHTML = "Hráč 2 je dobrý";
                    setTimeout(()=>{ hadky(0) }, 1500);
                    console.log("p2 dobry");
                }
                else{ //v tomhle pripade je else rovnocen else if n > m
                    povinnost_kolo += 10;
                    hrac_povinnost = (hrac_povinnost + 1) % 3;
                    document.querySelector(".info-panel").innerHTML = "Hráč 2 přidal na " + povinnost_kolo;
                    setTimeout(()=>{ hadky(0); }, 1500);
                }
            }
        }, 1500);
    }
}

function ai_hlaska(deck_arg, playa){ //funkce pro zavedení logiky pro určení hlášky
    let spocteno = 0; //vrací číselnou hodnotu karet
    let pocet_es = 0; // pokud je pocet_es mensi nez pocet trumfu tak budou blonkovni
    let st = 0; let kt = 0; let lt = 0; let zt = 0; // trumfy - jak kralovna tak kral
    //console.log("ai_hlaska funkce spustena. Deck " + playa);
    for(let i = 0; i < deck_arg.length; i++){
        if(deck_arg[i] == "S7" || deck_arg[i] == "S8" || deck_arg[i] == "S9" || deck_arg[i] == "K7" || deck_arg[i] == "K8" || deck_arg[i] == "K9" || deck_arg[i] == "L7" || deck_arg[i] == "L8" || deck_arg[i] == "L9" || deck_arg[i] == "Z7" || deck_arg[i] == "Z8" || deck_arg[i] == "Z9"){
            //console.log("nic");
            spocteno += 0;
        }
        if(deck_arg[i] == "SS" || deck_arg[i] == "KS" || deck_arg[i] == "LS" || deck_arg[i] == "ZS"){
            //console.log("2")
            spocteno += 2;
        }
        if(deck_arg[i] == "SV" || deck_arg[i] == "KV" || deck_arg[i] == "LV" || deck_arg[i] == "ZV"){
            //console.log("3")
            spocteno += 3;
            switch(deck_arg[i]){
                case "SV":
                    st++;
                    break;
                case "KV":
                    kt++;
                    break;
                case "LV":
                    lt++;
                    break;
                case "ZV":
                    zt++;
                    break;
            }
        }
        if(deck_arg[i] == "SK" || deck_arg[i] == "KK" || deck_arg[i] == "LK" || deck_arg[i] == "ZK"){
            //console.log("4")
            spocteno += 4;
            switch(deck_arg[i]){
                case "SK":
                    st++;
                    break;
                case "KK":
                    kt++;
                    break;
                case "LK":
                    lt++;
                    break;
                case "ZK":
                    zt++;
                    break;
        }
    }
        if(deck_arg[i] == "SD" || deck_arg[i] == "KD" || deck_arg[i] == "LD" || deck_arg[i] == "ZD"){
            //console.log("10")
            spocteno += 10;
        }
        if(deck_arg[i] == "SE" || deck_arg[i] == "KE" || deck_arg[i] == "LE" || deck_arg[i] == "ZE"){
            pocet_es++;
            //console.log("11")
            spocteno += 11;
            }
        }
        if(zt == 2 && pocet_es > 0){
            spocteno += 100;
            pocet_es--;
        }
        if(lt == 2 && pocet_es > 0){
            spocteno += 80;
            pocet_es--;
        }
        if(kt == 2 && pocet_es > 0){
            spocteno += 60;
            pocet_es--;
        }
        if(st == 2 && pocet_es > 0){
            spocteno += 40;
            pocet_es--;
        }
        console.log("body " + playa + ": " + spocteno);
        return spocteno;
    }

function kliknutiNaKartu(karta){
    if(muzeme_hrat){
        let kod = karta.getAttribute("karta");
        console.log(kod);
        karty_na_stole.push(karta)
        //špatně nadesignované - karta není přiřazená ke svému ekvivalentu v array
    }
}