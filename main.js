// Cinema Dro - JavaScript Functions

// Funzione per mostrare informazione per prenotazioni
function showBookingInfo(filmTitle) {
    //alert(`Per prenotare "${filmTitle}" puoi:\n\n📞 Chiamare: 0464 544000\n✉️ Email: info.cinemadro@gmail.com\n\nGli orari di segreteria sono:\nLunedì-Venerdì: 9:00-12:00 e 15:00-18:00`);
    alert(`Presto sarà disponibile prenotare per "${filmTitle}"`);
}

// Functions to show additional information
function GalleryWorkInProgress() {
    alert('Sezione in costruzione. Presto sarà disponibile una galleria del Cinema Dro.');
}

// Informazione programmazione corrente
// Per cercare la copertina dei film: http://www.impawards.com/
const films = [
        
    
    
    {
        title: "ODISSEA",
        genre: "Avventura, Azione, Storico",
        duration: "180 min",
        poster: "immagini/ODISSEA.jpg", 
        isPremiere: true,
        showings: [  
            { date: "2026-07-30", time: "21.00" }, 
            { date: "2026-08-02", time: "21.00" },
            
            
        ],
        bookingUrl: "https://ticket.cinebot.it/dro/",
        note: "SALA CLIMATIZZATA"
    },
     {
        title: "OCEANIA - Il Film",
        genre: "Avventura, Commedia, Family",
        duration: "120 min",
        poster: "immagini/OCEANIA.jpg", 
        isPremiere: true,
        showings: [  

            
        ],
        bookingUrl: "https://ticket.cinebot.it/dro/",
        note: "PROSSIMAMENTE"
    }
    

    
     
];

// Funzione per formato data
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { 
        weekday: 'long', 
        day: 'numeric', 
        month: 'long'
    };
    return date.toLocaleDateString('it-IT', options);
}

// Funzione per mostra gruppi in base alla data
function groupShowingsByDate(showings) {
    const grouped = {};
    showings.forEach(showing => {
        if (!grouped[showing.date]) {
            grouped[showing.date] = [];
        }
        grouped[showing.date].push(showing.time);
    });
    return grouped;
}

// Funzione per generare il calendario HTML
function generateScheduleHTML(showings) {
    if (!showings || showings.length === 0) {
        return '<div class="no-showings">PROSSIMAMENTE</div>';
    }

    const grouped = groupShowingsByDate(showings);
    let html = '<div class="schedule-container">';
    
    Object.keys(grouped).sort().forEach(date => {
        const times = grouped[date].sort();
        html += `
            <div class="schedule-day">
                <span class="schedule-date">${formatDate(date)}</span>
                <div class="schedule-times">
                    ${times.map(time => `<span class="schedule-time">${time}</span>`).join(' ')}
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    return html;
}

// Funzione per gestire click bottone "Prenota"
function handleBookingClick(filmIndex) {
    console.log('handleBookingClick called with index:', filmIndex);
    
    const film = films[filmIndex];
    console.log('bookingUrl:', film.bookingUrl);

    if (!film) {
        console.error('Film not found for index:', filmIndex);
        return;
    }
    
    console.log('Processing booking for film:', film.title);
    
    if (film.bookingUrl) {
        window.open(film.bookingUrl, '_blank');
        if (!window) {
            alert("Impossibile aprire il link. Controlla se hai un blocco popup attivo.");
        }
    } else {
        showBookingInfo(film.title);
    }
}

// Funzione per caricare la programmazione
function loadProgrammazione() {
    const container = document.getElementById('filmsContainer');
    
    if (!container) {
        console.error('Container filmsContainer not found');
        return;
    }
    console.log('Container found:', container);
    container.innerHTML = '';

    films.forEach((film, index) => {
        console.log('Creating card for film:', film.title, 'with index:', index);
        
        const filmCard = document.createElement('div');
        filmCard.className = 'film-card';

        // Generate poster with image or fallback
        const posterStyle = film.poster ?
            `style="background-image: url('${film.poster}'); background-size: cover; background-position: center;"` : '';

        // Creazione del poster per film
        filmCard.innerHTML = `
            <div class="film-poster" ${posterStyle}>
                ${film.isPremiere ? '<div class="premiere-badge">Prima Visione</div>' : ''}
                ${!film.poster ? '🎬' : ''}
            </div>
            <div class="film-info">
                <div class="film-title">${film.title}</div>
                <div class="film-details">
                    <p><strong>Genere:</strong> ${film.genre}</p>
                    <p><strong>Durata:</strong> ${film.duration}</p>
                    <p><strong>Note:</strong> ${film.note}</p>
                </div>
                ${generateScheduleHTML(film.showings)}
                ${ (film.showings && film.showings.length > 0) 
                ? `<button class="book-button" data-film-index="${index}">Prenota ora</button>`
                : ''}
            </div>
        `;
               
        // Aggiungi event listener al bottone appena creato
        const bookButton = filmCard.querySelector('.book-button');
        console.log("Found bookButton?", bookButton);   
        
        if(bookButton){
            bookButton.addEventListener('click', function() {
                console.log('Button clicked for film index:', film.title);
                handleBookingClick(index);
            });
        } else {
            console.warn('⚠️ bookButton not found for film:', film.title);
        }

        // Aggiunge la nuova filmCard in container che punta alla classe programmazione-container con id filmsContainer
        container.appendChild(filmCard);
        
    });

    console.log('Programming loaded successfully');
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing Cinema Dro...');
    
    // Load programming on startup
    loadProgrammazione();

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Parallax effect for header
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('.header');
        
        if (header) {
            if (scrolled > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            }
        }
    });

    // Animation for cards on appearance
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe cards after they are created
    setTimeout(() => {
        document.querySelectorAll('.feature-card, .film-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s ease';
            observer.observe(card);
        });
    }, 100);

    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    // Toggle menu mobile
    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Chiudi menu al click su un link
    navItems.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
    
});
