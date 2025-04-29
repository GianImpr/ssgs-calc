# Calcolatrice sviluppata con Node.js
## Introduzione
Questo è il codice sorgente di una calcolatrice sviluppata con Node.js, con test che hanno 100% code coverage.

Il programma deve essere utilizzato su un terminale e richiede l'installazione del modulo ```prompt-sync``` con il comando ```npm install prompt-sync``` per funzionare.

## Operazioni supportate
Le operazioni supportate sono le seguenti:
- Addizione
- Sottrazione
- Moltiplicazione
- Divisione
- Modulo
- Potenza
- Radice quadrata

## Test sviluppati
I test sviluppati testano la correttezza delle funzioni, assicurandosi che le operazioni vengano svolte senza problemi.
Per funzioni che invece richiedono l'input dell'utente, vengono utilizzate le funzionalità Mock di Jest per verificare il loro comportamento e simulare l'input senza doverlo digitare manualmente ogni volta. (Tramite il mock di prompt)


Oltre a questo, viene verificato che ad ogni giro il main, con una certa sequenza di input, richiami ogni operazione un certo numero di volte per assicurare il corretto funzionamento del menù, tramite dei Mock che "spiano" il comportamento delle funzioni target, con spyOn.
