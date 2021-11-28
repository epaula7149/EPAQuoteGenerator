const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

const car = {type:"Fiat", model:"500", color:"white"};

const quoteSeed = {
    text: 'The man who does not read good books has no advantage over the man who can’t read them.',
    author: 'Mark Twain' 
};

let apiQuotes = [];

// Show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function complete() {
    loader.hidden = true;
    quoteContainer.hidden = false;   
}

// Show New Quote
function newQuote() {
    loading();
    // Pick a random quote from the apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Check if Author field is blank and replace it with 'Unknown'
    setQuoteandAuthor(quote);
}

function setQuoteandAuthor(quote) {
    if (!quote.author) {
        authorText.textContent = 'Unknown';   
    } else {
        authorText.textContent = quote.author;
    }

    // Check Quote length to determine styling
    console.log('quote.text.length= ', quote.text.length);
    console.log('quote.text= ', quote.text);

    if (quote.text.length > 140) {
        quoteText.classList.add('long-quote');
        quoteText.classList.remove('short-quote');
    } else if (quote.text.length > 50) {
        quoteText.classList.remove('long-quote');
        quoteText.classList.remove('short-quote');
    } else {
        quoteText.classList.add('short-quote');
        quoteText.classList.remove('long-quote');
    }

    // Get Quote, Hide Loader
    quoteText.textContent = quote.text;
    complete();
}

// Get Quotes From API
async function getQuotes() {
    //loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        setQuoteandAuthor(quoteSeed);
    } catch (error) {
        // Catch Error Here  
    }
}

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();



