# cinema-dro-website

## Struttura dei Branch (Git)

Questo progetto utilizza una strategia a 4 branch per mantenere separato il codice ufficiale dagli esperimenti personali:

1. **`main`** (Produzione): 
   È la versione ufficiale e pubblica del sito web. Il codice viene unito (merged) qui solo quando è completo, testato e pronto per essere pubblicato. Non si fanno mai esperimenti direttamente su questo branch.

2. **`aggiornamenti`** (Sviluppo / Staging): 
   È il branch in cui vengono preparati, testati e accumulati gli aggiornamenti ufficiali prima di essere integrati nel branch `main`.

3. **`main-luca`** (Sandbox Personale): 
   È una copia personale del branch `main`. Serve per fare pratica o testare nuove idee sulla versione attualmente online del sito, in totale sicurezza e senza il rischio di danneggiare il sito ufficiale.

4. **`aggiorna-luca`** (Test Nuove Funzionalità): 
   È una copia personale del branch `aggiornamenti`. Permette di sperimentare con i futuri aggiornamenti in lavorazione senza interferire con il lavoro ufficiale.

## Come Modificare la Programmazione dei Film

Per aggiornare o aggiungere nuovi film, è necessario modificare il file [`main.js`](file:///c:/Users/bonin/Luca/Cose%20varie/0_Parrocchia/SitoWebCinema/main.js).

Tutte le informazioni sui film si trovano all'interno della variabile `const films = [...]` (a partire da riga 16 circa).

Ogni film segue questa struttura:
```javascript
{
    title: "NOME DEL FILM",
    genre: "Genere",
    duration: "120 min",
    poster: "immagini/NOME_IMMAGINE.jpg", 
    isPremiere: true, // true per "Prima Visione", false altrimenti
    showings: [  
        { date: "2026-07-01", time: "21.00" }
    ],
    bookingUrl: "https://ticket.cinebot.it/dro/",
    note: "SALA CLIMATIZZATA"
}
```
**Promemoria:**
* È possibile aggiungere nuovi film copiando e incollando un blocco come quello qui sopra (ricordando la virgola `,` tra un film e l'altro).
* Se il film non ha ancora orari, si può lasciare l'array vuoto `showings: []` e apparirà la scritta "PROSSIMAMENTE".
* Assicurarsi che l'immagine del poster sia stata caricata all'interno della cartella `immagini/` con il nome corretto.

## Connessioni Remote (GitHub)

Questo progetto è configurato per lavorare con due server remoti ("remotes") separati, permettendo di lavorare e sperimentare in modo sicuro:

### 1. `origine` (Spazio Personale)
* **Cos'è:** È la copia personale (Fork) su GitHub (`LucaBoni28/cinema-dro.git`).
* **A cosa serve:** È un ambiente di backup sicuro in cloud. Questo remoto viene utilizzato per salvare (`push`) esperimenti, branch personali o lavori non ancora finiti. Ciò che viene caricato qui non intacca in alcun modo il sito ufficiale.

### 2. `origine-ufficiale` (Sito Ufficiale)
* **Cos'è:** È il repository "padre" dell'organizzazione (`CinemaParocchialeDro/CineWeb`). 
* **A cosa serve:** È la sorgente del vero sito web. Da qui si scaricano (`pull`) gli aggiornamenti creati dagli altri collaboratori per avere sempre l'ultima versione. Quando una modifica sullo spazio personale è terminata e testata, si utilizza una "Pull Request" per richiederne l'inserimento in questo repository ufficiale.

### Flusso di lavoro (Workflow)
1. **Pull:** Scaricare regolarmente gli aggiornamenti da `origine-ufficiale` per restare sincronizzati.
2. **Lavoro:** Eseguire le modifiche sul computer locale.
3. **Push:** Salvare il lavoro in corso sul proprio remoto `origine`.
4. **Pubblica:** Proporre le modifiche finali inviandole a `origine-ufficiale`.
