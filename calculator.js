let prompt = require("prompt-sync")();

const Operazioni = {
    ADDIZIONE: 0,
    SOTTRAZIONE: 1,
    MOLTIPLICAZIONE: 2,
    DIVISIONE: 3,
    MODULO: 4,
    POTENZA: 5,
    RADICE: 6
};

function main() {
    let operazione = 0;
    console.log("Benvenuto nel programma Calcolatrice.\nPer favore inserisci l'operazione che vuoi eseguire.\n");
    while(true) {
        console.log("0 - Addizione\n1 - Sottrazione\n2 - Moltiplicazione\n3 - Divisione\n4 - Modulo\n5 - Potenza\n6 - Radice quadrata\nQualsiasi altro tasto - Esci");
        operazione = parseInt(prompt("Scegli l'operazione: "));
        let risultato = 0;
        let numeri = []

        switch (operazione) {
            case Operazioni.ADDIZIONE:
                numeri = inserisciNumeri();
                risultato = module.exports.somma(numeri[0], numeri[1]);
                break;

            case Operazioni.SOTTRAZIONE:
                numeri = inserisciNumeri();
                risultato = module.exports.sottrai(numeri[0], numeri[1]);
                break;

            case Operazioni.MOLTIPLICAZIONE:
                numeri = inserisciNumeri();
                risultato = module.exports.moltiplica(numeri[0], numeri[1]);
                break;

            case Operazioni.DIVISIONE:
                let divisore_non_zero = false;
                do {
                    try {
                        numeri = inserisciNumeri();
                        risultato = module.exports.dividi(numeri[0], numeri[1]);
                        divisore_non_zero = true;
                    }
                    catch (e) {
                        console.error(e.message);
                    }
                } while (!divisore_non_zero);
                break;

            case Operazioni.MODULO:
                let divisore_non_zero_modulo = false;
                do {
                    try {
                        numeri = inserisciNumeri();
                        risultato = module.exports.modulo(numeri[0], numeri[1]);
                        divisore_non_zero_modulo = true;
                    }
                    catch (e) {
                        console.error(e.message);
                    }
                } while (!divisore_non_zero_modulo);
                break;

            case Operazioni.POTENZA:
                let elevamento_corretto = false;
                do {
                    try {
                        numeri = inserisciNumeri();
                        risultato = module.exports.potenza(numeri[0], numeri[1]);
                        elevamento_corretto = true;
                    }
                    catch (e) {
                        console.error(e.message);
                    }
                } while (!elevamento_corretto);
                break;

            case Operazioni.RADICE:
                let numero_positivo = false;
                do {
                    try {
                        risultato = module.exports.radice(inserisciNumero());
                        numero_positivo = true;
                    }
                    catch (e) {
                        console.error(e.message);
                    }
                } while (!numero_positivo);
                break;

            default:
                console.log(saluta());
                return;
        }

        console.log("Il risultato e': " + risultato + "\n\n");
    }
}

function somma(a, b) {
    return a+b;
}

function sottrai(a, b) {
    return a-b;
}

function moltiplica(a, b) {
    return a*b;
}

function dividi(a, b) {
    if (b === 0)
        throw new EvalError("Impossibile dividere per zero.");
    return a/b;
}

function modulo(a, b) {
    if (b === 0)
        throw new EvalError("Impossibile dividere per zero.");
    return a%b;
}

function potenza(a, b) {
    if (a === 0 && b === 0)
        throw new EvalError("Impossibile elevare 0 alla 0.");
    return Math.pow(a, b);
}

function radice(numero) {
    if (numero < 0)
        throw new RangeError("Impossibile calcolare la radice quadrata di un numero negativo.");
    return Math.sqrt(numero);
}

function inserisciNumeri() {
    let numeri_corretti = false;
    let numeri = [];
    do {
        numeri.push(parseFloat(prompt("Inserisci il primo numero: ")));
        numeri.push(parseFloat(prompt("Inserisci il secondo numero: ")));
        try {
            numeri_corretti = verificaNumeri(numeri[0], numeri[1]);
        }
        catch (e) {
            console.error(e.message);
            numeri = [];
        }
    } while (!numeri_corretti);
    return numeri;
}

function inserisciNumero() {
    let numero_corretto = false;
    let numero = 0;
    do {
        numero = parseFloat(prompt("Inserisci il numero: "));
        numero_corretto = !isNaN(numero);
    } while (!numero_corretto);
    return numero;
}

function verificaNumeri(numero1, numero2 = 0) {
    if (isNaN(numero1) || isNaN(numero2)) {
        throw new EvalError("Numero non valido");
    }
    return true;
}

function saluta() {
    let saluti = ["Ciao, a presto!", "Alla prossima!", "Se hai ancora bisogno, rieseguimi!"];
    let saluto = Math.floor(Math.random() * saluti.length);
    return saluti[saluto];
}

module.exports = {somma, sottrai, moltiplica, dividi, modulo, potenza, radice, saluta, verificaNumeri, inserisciNumero, prompt, inserisciNumeri, main};