console.log("content.js loaded");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'get_response') {
      const searchInput = document.querySelector('input[name="q"]');
      console.log(searchInput); // log searchInput to console
      const query = searchInput.value;
      console.log('searchInput:', searchInput);
      fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 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'
        },
        body: JSON.stringify({
          prompt: 'How to make a cup of tea',
          max_tokens: 100,
            n: 1,
            stop: '\n'
        })
      })
        .then(response => response.json())
        .then(data => console.log(data))
        .then(data => {
          const responseText = data.choices[0].text.trim();
          sendResponse({ message: 'success', response: responseText });
        })
        .catch(error => {
          console.error(error);
          sendResponse({ message: 'error', response: 'An error occurred while getting the response.' });
        });
      return true;
    }
  });
  