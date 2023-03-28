const apiKey = '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';
const apiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';

document.addEventListener('DOMContentLoaded', function() {
  const searchBar = document.getElementById('search-bar');
  const submitButton = document.getElementById('submit-button');
  const response = document.getElementById('response');

  submitButton.addEventListener('click', function() {
    const text = searchBar.value;
    response.innerHTML = 'Thinking...';

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        prompt: text,
        temperature: 0.5,
        max_tokens: 60,
        stop: '\n',
        frequency_penalty: 0,
        presence_penalty: 0
      })
    })
    .then(response => response.json())
    .then(data => {
      response.innerHTML = data.choices[0].text.trim();
    })
    .catch(error => {
        if (console && console.log) {
          console.log('Error:', error);
        }
        response.innerHTML = 'Oops, something went wrong!';
      });
  });
});
