# React + Vite

💡 Premessa: Stai sviluppando un campo di ricerca intelligente simile a quello di Amazon. Quando l'utente digita, una tendina di suggerimenti mostra i prodotti corrispondenti alla ricerca. Per evitare richieste API eccessive, devi ottimizzare la ricerca con il debounce.

📌 Milestone 1: Creare un campo di ricerca e mostrare la lista dei suggerimenti
- Crea un campo di input (<input type="text">) in cui l’utente può digitare.
- Effettua una chiamata API a: /products?search=[query]
    La query deve essere sostituita con il testo digitato.
- Mostra i risultati API sotto l'input in una tendina di suggerimenti.
- Se l'utente cancella il testo, la tendina scompare.

Obiettivo: Mostrare suggerimenti dinamici in base alla ricerca dell'utente.

📌 Milestone 2: Implementare il Debounce per Ottimizzare la Ricerca
- Attualmente, ogni pressione di tasto esegue una richiesta API. Questo è inefficiente!
- Implementa una funzione di debounce per ritardare la chiamata API fino a quando l’utente smette di digitare per un breve periodo (es. 300ms)
- Dopo l’implementazione, verifica che la ricerca non venga eseguita immediatamente a ogni tasto premuto, ma solo dopo una breve pausa.

Obiettivo: Ridurre il numero di richieste API e migliorare le prestazioni.

🎯 Bonus: Caricare i Dettagli del Prodotto Selezionato
- Quando l’utente clicca su un prodotto nella tendina, nascondi la tendina e carica i dettagli completi del prodotto sotto il campo di ricerca.
- Effettua una richiesta API per ottenere i dettagli completi: /products/{id}
- Mostra i dettagli del prodotto selezionato (es. image, name, description, price).

Obiettivo: Aggiungere interattività permettendo di visualizzare le informazioni complete di un prodotto.