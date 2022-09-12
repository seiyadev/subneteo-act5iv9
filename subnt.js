function botonSelect() {
    let opt = parseInt(document.getElementById("opc").value);
    console.log(opt);
    if (opt == 1) {
        generarPorSubRed();
    } else {
        alert("Axel");
    }
}

function convertirDecimal(bin) {
    let arrayDec = new Array;
    for (var i = 0; i < bin.length; i++) {
        let numero = 128;
        let num = 0;
        var ps = bin[i];
        var y = 0;
        let cadena = new Array;
        for (var y = 0; y < 8; y++) {
            cadena.push(parseInt(ps[y]));
        }

        for (var z = 0; z < cadena.length; z++) {
            if (cadena[z] == 1) {
                cadena[z] = numero;
                numero /= 2;
            } else {
                break;
            }
        }

        for (let i of cadena) num += i;
        arrayDec.push(num);
    }
    return arrayDec;
}

function convertirABinario(num) {
    let binario = (num % 2).toString();
    for (; num > 1; ) {
        num = parseInt(num / 2);
        binario =  (num % 2) + (binario);
    }
    return binario;
}

function generarPorSubRed() {
    let ip1 = parseInt(document.getElementById("ip1").value);
    let ip2 = parseInt(document.getElementById("ip2").value);
    let ip3 = parseInt(document.getElementById("ip3").value);
    let ip4 = parseInt(document.getElementById("ip4").value);
    let nbits = parseInt(document.getElementById("nbits").value);
    let nslt = parseInt(document.getElementById("nslt").value);
    let mascaraSubred = new Array;
    let ms = "";

    if (nslt <= 126) {
        if (nbits == 8) {
            mascaraSubred = ["11111111", "00000000", "00000000", "00000000"];
        } else {
            if (nbits == 16) {
                mascaraSubred = ["11111111", "11111111", "00000000", "00000000"];
            } else {
                if (nbits == 24) {
                    mascaraSubred = ["11111111", "11111111", "11111111", "00000000"];
                }
            }
        }


        for (var i = 1; i < 8; i++) { //Calcula la mascara de subred
            if ((2 ** i - 2) >= nslt) {
                for (var y = 0; y < i; y++) {
                    ms += "1";
                }
                for (var z = 0; z < 8 - i; z++) {
                    ms += "0";
                }

                for (var zx = 0; zx < mascaraSubred.length; zx++) {
                    if (mascaraSubred[zx] == "00000000") {
                        mascaraSubred[zx] = ms;
                        break;
                    }
                }
                console.log("Máscara de subred calculada: " + mascaraSubred);
                break;
            }
        }

        let mascaraSubredimp = "";
        for (var i = 0; i < mascaraSubred.length; i++) {
            if (i < mascaraSubred.length - 1) {
                mascaraSubredimp = mascaraSubredimp + mascaraSubred[i] + ".";
            } else {
                mascaraSubredimp += mascaraSubred[i];
            }
        }

        mascaraSubRedDecimal = convertirDecimal(mascaraSubred);
        console.log(mascaraSubRedDecimal);
        let numS;
        if (mascaraSubRedDecimal[0] < 255) {
            numS = mascaraSubRedDecimal[0];
        } else {
            if (mascaraSubRedDecimal[1] < 255) {
                numS = mascaraSubRedDecimal[1];
            } else {
                if (mascaraSubRedDecimal[3] < 255) {
                    numS = mascaraSubRedDecimal[3];
                }
            }
        }
        let saltosRed = 256 - numS;
        let cc = 0;

        for (let i = 0; i < mascaraSubred.length; i++) {
            var ps = mascaraSubred[i];
            for (let y = 0; y < ps.length; y++) {
                if (ps[y] == 0) {
                    cc += 1;
                }
            }
        }
        let hosts = 2 ** cc - 2;

        








        let direcciones = new Array(nslt);
        let direcciones2 = new Array(nslt);
        for (let i = 0; i < direcciones.length; i++) {
            direcciones[i] = { numerosubred: i+1, subred: "nd", desde: "nd", hasta: 1, broadcast: 1 };
        }

        let tablaDirecciones = document.getElementById("direcciones");
        let cuerpoTabla = document.createElement("tbody");

        direcciones.forEach(p => {
            let fila = document.createElement("tr");

            td = document.createElement("td");
            td.innerText = p.numerosubred;
            fila.appendChild(td);

            td = document.createElement("td");
            td.innerText = p.subred;
            fila.appendChild(td);

            td = document.createElement("td");
            td.innerText = p.desde;
            fila.appendChild(td);

            td = document.createElement("td");
            td.innerText = p.hasta;
            fila.appendChild(td);

            td = document.createElement("td");
            td.innerText = p.hasta;
            fila.appendChild(td);

            cuerpoTabla.appendChild(fila);
            
        });
        tablaDirecciones.appendChild(cuerpoTabla);


        for (let i = 0; i < direcciones2.length; i++) {
            direcciones2[i] = { SaltosSubRed: saltosRed, nhosts: hosts, mascara: mascaraSubred};
        }

        let tablaDirecciones2 = document.getElementById("direcciones2");
        let cuerpoTabla2 = document.createElement("tbody");

        direcciones2.forEach(p => {
            let fila = document.createElement("tr");

            td = document.createElement("td");
            td.innerText = p.SaltosSubRed;
            fila.appendChild(td);

            td = document.createElement("td");
            td.innerText = p.nhosts;
            fila.appendChild(td);

            td = document.createElement("td");
            td.innerText = p.mascara;
            fila.appendChild(td);

            cuerpoTabla2.appendChild(fila);
        });
        tablaDirecciones2.appendChild(cuerpoTabla2);
    } else {
        alert("Hubo un error con los datos ingresados.\nMáximo de subredes: 126");
    }
}