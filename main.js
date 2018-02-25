const afangar = [];

const mainDiv = document.getElementById('maingrid');

(function saekjaJson() {
    fetch("afangar.json")
        .then(res => res.json())
        .then(json => {
            json.map(j => {
                if(j.active) {
                    afangar.push(new Afangi(j))
                }    
            });
            afangar.map(afangi => {
                const undanfarar = afangi.parents
                if (undanfarar) {
                    const undanfararAfanga = [];
                    undanfarar.map(undanfari => undanfararAfanga.push(afangar.find(a => a.id === undanfari)));
                    afangi.parents = undanfararAfanga.slice(0);
                }
                synaDiv(afangi);
            });
            teiknaUndanfara();
        })
        .catch(e => console.log("villa:", e));
})();

function synaDiv(afangi) {
    const div = document.createElement('div');
    div.className = "afangar";
    div.className += afangi.tbr ? "" : " nontbr";
    div.className += afangi.core ? " core" : "";
    div.className += ` ${afangi.id.substring(0,4)}`;
    div.style.gridArea = afangi.id.split('0')[0];
    div.id = afangi.id;
    div.innerHTML = afangi.div;
    mainDiv.appendChild(div);
}

function teiknaUndanfara() {
    afangar.map(afangi => {
        const curDiv = document.getElementById(afangi.id);
        const undanfaraLinur = [];
        if (afangi.parents) {
            afangi.parents.map(undanfari => {
                const undanfaraLina = new LeaderLine(
                    document.getElementById(undanfari.id),
                    curDiv, {
                        hide: true,
                        color: "rgba(45, 52, 54,1.0)",
                        size: 4,
                        endPlug: "disc",
                        startPlug: "disc"
                    }
                );

                if (afangi.id === 'VAL05') {
                    undanfaraLina.endPlug = "arrow1"
                    undanfaraLina.setOptions({
                        startSocket: 'top'
                    });
                }
                undanfaraLinur.push(undanfaraLina);
            });
        }

        curDiv.addEventListener("mouseover", e => {
            if(afangar.find(afangi => afangi.id === e.target.id)) {
                curDiv.title = afangi.description;
                //curDiv.dataTooltip = afangi.description;
                undanfaraLinur.map(l => l.show("draw"));
            }
        });

        curDiv.addEventListener("mouseleave", e => {
            if(afangar.find(afangi => afangi.id === e.target.id)) {
                undanfaraLinur.map(l => l.hide());
            }
        });
    });
}

/* const annir = document.getElementsByClassName("annir");
console.log(annir);
for(var a of annir) {
    divBr = a.getBoundingClientRect().width;
    browserBr = window.innerWidth;
    console.log("fyrir",a.getBoundingClientRect())
    //a.style.width = "100%";
    console.log("eftir",window.innerWidth)
    console.log(`hlutfall = ${divBr/browserBr}`)
    console.log(`breydd deilt með 9 = ${browserBr/9}`)
    //a.style.width = "750%";
    a.style.width = `${100/(divBr/browserBr)}%`;
}

window.addEventListener("resize", () => {
    
    for(var a of annir) {
        divBr = a.getBoundingClientRect().width;
        browserBr = window.innerWidth;
        a.style.width = `${100/(divBr/browserBr)}%`;
        console.log(`${100/(divBr/browserBr)}% - ${divBr/browserBr}`);
    }
}) */