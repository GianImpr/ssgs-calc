const { beforeAll, afterAll } = require("jest-circus");
const Calculator = require("./calculator");

test('Somma di due numeri (1 e 5) fa 6', () => {
    expect(Calculator.somma(1,5)).toBe(6);
})

test('Differenza fra due numeri (5 e 1) fa 4', () => {
    expect(Calculator.sottrai(5,1)).toBe(4);
})

test('Moltiplicazione fra due numeri (5, 10) fa 50', () => {
    expect(Calculator.moltiplica(5,10)).toBe(50);
})

test('Divisione fra due numeri (6 e 3) fa 2', () => {
    expect(Calculator.dividi(6,3)).toBe(2);
})

test('Divisione per zero solleva eccezione', () => {
    expect(() => Calculator.dividi(5,0)).toThrow(EvalError);
})

test('Resto della divisione intera fra due numeri (5 e 2) fa 1', () => {
    expect(Calculator.modulo(5,2)).toBe(1);
})

test('Resto della divisione intera per zero solleva eccezione', () => {
    expect(() => Calculator.modulo(5,0)).toThrow(EvalError);
})

test('Elevamento a potenza (base 5, potenza 2) fa 25', () => {
    expect(Calculator.potenza(5,2)).toBe(25);
})

test('Elevamento con base 0 e potenza 0 solleva eccezione', () => {
    expect(() => Calculator.potenza(0,0)).toThrow(EvalError);
})

test('Radice quadrata di un numero (25) fa 5', () => {
    expect(Calculator.radice(25)).toBe(5);
})

test('Radice quadrata di un numero negativo solleva eccezione', () => {
    expect(() => Calculator.radice(-25)).toThrow(RangeError);
})

test('La funzione saluta genera una stringa di saluti', () => {
    expect(typeof Calculator.saluta()).toBe("string");
})

test('Due valori digitati su tastiera ("3" e "5") sono numeri validi', () => {
    expect(Calculator.verificaNumeri(parseInt("3"), parseInt("5"))).toBe(true);
})

test('Almeno uno dei due valori su tastiera ("3" e "f") solleva eccezione', () => {
    expect(() => Calculator.verificaNumeri(parseInt("3"), parseInt("f"))).toThrow(EvalError);
})

test('Digitare un solo valore non valido ("-") solleva eccezione', () => {
    expect(() => Calculator.verificaNumeri(parseInt("-"))).toThrow(EvalError);
})

jest.mock('prompt-sync', () => {
    return () => jest.fn(); // Rende `prompt-sync` una funzione mockata
});

describe('Test relativi ad inserisciNumero', () => {
    it("Restituisce soltanto l'input valido, ovvero 10", () => {
        Calculator.prompt.mockReturnValueOnce("f")
              .mockReturnValueOnce("10");

        expect(Calculator.inserisciNumero()).toBe(10);
    });

    it('Restituisce -30', () => {
        Calculator.prompt.mockReturnValue("-30");

        expect(Calculator.inserisciNumero()).toBe(-30);
    });
});

describe('Test relativi ad inserisciNumeri', () => {
    it("Restituisce un array valido di numeri (10 e 15), digitando '10' e '15'", () => {
        Calculator.prompt.mockReturnValueOnce("10")
              .mockReturnValueOnce("15");

        expect(Calculator.inserisciNumeri()).toEqual([10, 15]);
    });

    it('Richiede i numeri se viene inserita una coppia non valida ("0" e "f"), e poi restituisce un array con una coppia valida ("10" e "20")', () => {
        Calculator.prompt.mockReturnValueOnce("0")
              .mockReturnValueOnce("f")
              .mockReturnValueOnce("10")
              .mockReturnValueOnce("20");

        expect(Calculator.inserisciNumeri()).toEqual([10, 20]);
    });
});

describe('Test relativi al Main', () => {
    const Mock = {
        SOMMA: 0,
        DIFFERENZA: 1,
        MOLTIPLICAZIONE: 2,
        DIVISIONE: 3,
        MODULO: 4,
        POTENZA: 5,
        RADICE: 6
    }

    const Operazioni = ['somma', 'sottrai', 'moltiplica', 'dividi', 'modulo', 'potenza', 'radice'];
    let myMocks;

    beforeEach(() => {
        myMocks = [];
        Operazioni.forEach(element => {
        myMocks.push(jest.spyOn(Calculator, element));
        });   
    });

    afterEach(() => {
        myMocks.forEach(mock => mock.mockRestore());
    });
     

    test("Digitare 0 e poi 3 e 5 fa la somma tra 3 e 5, poi esce con f", () => {
        Calculator.prompt.mockReturnValueOnce("0") // Seleziona addizione
              .mockReturnValueOnce("3")  // Primo numero
              .mockReturnValueOnce("5")  // Secondo numero
              .mockReturnValueOnce("f"); // Esce dal programma

        Calculator.main();

        expect(myMocks[Mock.SOMMA]).toHaveBeenCalledWith(3, 5);
        expect(myMocks[Mock.SOMMA]).toHaveBeenCalledTimes(1);
    });

    test("Digitare 1 e poi 3 e 5 fa la differenza tra 3 e 5, poi esce con f", () => {
        Calculator.prompt.mockReturnValueOnce("1") // Seleziona sottrazione
              .mockReturnValueOnce("3")  // Primo numero
              .mockReturnValueOnce("5")  // Secondo numero
              .mockReturnValueOnce("f"); // Esce dal programma

        Calculator.main();

        expect(myMocks[Mock.DIFFERENZA]).toHaveBeenCalledWith(3, 5);
        expect(myMocks[Mock.DIFFERENZA]).toHaveBeenCalledTimes(1);
    });

    test("Digitare 2 e poi 3 e 5 fa la moltiplicazione tra 3 e 5, poi esce con f", () => {
        Calculator.prompt.mockReturnValueOnce("2") // Seleziona moltiplicazione
              .mockReturnValueOnce("3")  // Primo numero
              .mockReturnValueOnce("5")  // Secondo numero
              .mockReturnValueOnce("f"); // Esce dal programma

        Calculator.main();

        expect(myMocks[Mock.MOLTIPLICAZIONE]).toHaveBeenCalledWith(3, 5);
        expect(myMocks[Mock.MOLTIPLICAZIONE]).toHaveBeenCalledTimes(1);
    });

    test("Digitare 3 e poi 3 e 5 fa la divisione tra 3 e 5, poi esce con f", () => {
        Calculator.prompt.mockReturnValueOnce("3") // Seleziona divisione
              .mockReturnValueOnce("3")  // Primo numero
              .mockReturnValueOnce("5")  // Secondo numero
              .mockReturnValueOnce("f"); // Esce dal programma

        Calculator.main();

        expect(myMocks[Mock.DIVISIONE]).toHaveBeenCalledWith(3, 5);
        expect(myMocks[Mock.DIVISIONE]).toHaveBeenCalledTimes(1);
    });

    test("Digitare 3 e poi 3 e 0 richiede i numeri perche' non si puo' dividere per zero, quindi digita 3 e 5 ed esce con f", () => {
        Calculator.prompt.mockReturnValueOnce("3") // Seleziona divisione
              .mockReturnValueOnce("3")  // Primo numero
              .mockReturnValueOnce("0")  // Secondo numero (Deve richiedere i numeri)
              .mockReturnValueOnce("3")
              .mockReturnValueOnce("5")
              .mockReturnValueOnce("f"); // Esce dal programma

        Calculator.main();

        expect(myMocks[Mock.DIVISIONE]).toHaveBeenCalledWith(3, 0);
        expect(myMocks[Mock.DIVISIONE]).toHaveBeenCalledWith(3, 5);
        expect(myMocks[Mock.DIVISIONE]).toHaveBeenCalledTimes(2);
    });

    test("Digitare 4 e poi 3 e 5 fa il modulo tra 3 e 5, poi esce con f", () => {
        Calculator.prompt.mockReturnValueOnce("4") // Seleziona modulo
              .mockReturnValueOnce("3")  // Primo numero
              .mockReturnValueOnce("5")  // Secondo numero
              .mockReturnValueOnce("f"); // Esce dal programma

        Calculator.main();

        expect(myMocks[Mock.MODULO]).toHaveBeenCalledWith(3, 5);
        expect(myMocks[Mock.MODULO]).toHaveBeenCalledTimes(1);
    });

    test("Digitare 4 e poi 3 e 0 richiede i numeri perche' non si puo' dividere per zero, quindi digita 3 e 7 ed esce con f", () => {
        Calculator.prompt.mockReturnValueOnce("4") // Seleziona modulo
              .mockReturnValueOnce("3")  // Primo numero
              .mockReturnValueOnce("0")  // Secondo numero (Deve richiedere i numeri)
              .mockReturnValueOnce("3")
              .mockReturnValueOnce("7")
              .mockReturnValueOnce("f"); // Esce dal programma

        Calculator.main();

        expect(myMocks[Mock.MODULO]).toHaveBeenCalledWith(3, 0);
        expect(myMocks[Mock.MODULO]).toHaveBeenCalledWith(3, 7);
        expect(myMocks[Mock.MODULO]).toHaveBeenCalledTimes(2);
    });

    test("Digitare 5 e poi 3 e 5 fa la potenza in base 3 con esponente 5, poi esce con f", () => {
        Calculator.prompt.mockReturnValueOnce("5") // Seleziona potenza
              .mockReturnValueOnce("3")  // Primo numero
              .mockReturnValueOnce("5")  // Secondo numero
              .mockReturnValueOnce("f"); // Esce dal programma

        Calculator.main();

        expect(myMocks[Mock.POTENZA]).toHaveBeenCalledWith(3, 5);
        expect(myMocks[Mock.POTENZA]).toHaveBeenCalledTimes(1);
    });

    test("Digitare 5 e poi 0 e 0 richiede i numeri perche' non si puo' elevare 0 per 0, quindi digita 2 e 8, poi esce con f", () => {
        Calculator.prompt.mockReturnValueOnce("5") // Seleziona potenza
              .mockReturnValueOnce("0")  // Primo numero
              .mockReturnValueOnce("0")  // Secondo numero (Deve richiedere i numeri)
              .mockReturnValueOnce("2")
              .mockReturnValueOnce("8")
              .mockReturnValueOnce("f"); // Esce dal programma

        Calculator.main();

        expect(myMocks[Mock.POTENZA]).toHaveBeenCalledWith(0, 0);
        expect(myMocks[Mock.POTENZA]).toHaveBeenCalledWith(2, 8);
        expect(myMocks[Mock.POTENZA]).toHaveBeenCalledTimes(2);
    });

    test("Digitare 6 e poi 4 fa radice quadrata di 4, poi esce con f", () => {
        Calculator.prompt.mockReturnValueOnce("6") // Seleziona radice
              .mockReturnValueOnce("4")  // Primo numero
              .mockReturnValueOnce("f"); // Esce dal programma

        Calculator.main();

        expect(myMocks[Mock.RADICE]).toHaveBeenCalledWith(4);
        expect(myMocks[Mock.RADICE]).toHaveBeenCalledTimes(1);
    });

    test("Digitare 6 e poi -3 richiede il numero perche' non si puo' fare la radice di un numero negativo, quindi digita 25, poi esce con f", () => {
        Calculator.prompt.mockReturnValueOnce("6") // Seleziona radice
              .mockReturnValueOnce("-3")  // Primo numero (Deve richiederlo)
              .mockReturnValueOnce("25")
              .mockReturnValueOnce("f"); // Esce dal programma

        Calculator.main();

        expect(myMocks[Mock.RADICE]).toHaveBeenCalledWith(-3);
        expect(myMocks[Mock.RADICE]).toHaveBeenCalledWith(25);
        expect(myMocks[Mock.RADICE]).toHaveBeenCalledTimes(2);
    });
});



