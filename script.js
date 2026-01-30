// Fetch country info using Fetch API
function getCountryInfo() {
  const country = document.getElementById("countryInput").value.trim();
  const resultDiv = document.getElementById("result");
  const loading = document.getElementById("loading");

  resultDiv.innerHTML = "";
  if (!country) {
    resultDiv.innerHTML = "<p>Please enter a country name.</p>";
    return;
  }

  loading.style.display = "block";

  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Country not found");
      }
      return response.json();
    })
    .then(data => {
      const info = data[0];
      resultDiv.innerHTML = `
        <h2>${info.name.common}</h2>
        <p><strong>Capital:</strong> ${info.capital}</p>
        <p><strong>Region:</strong> ${info.region}</p>
        <p><strong>Population:</strong> ${info.population.toLocaleString()}</p>
        <img src="${info.flags.svg}" alt="Flag of ${info.name.common}" width="150" />
      `;
    })
    .catch(error => {
      resultDiv.innerHTML = `<p>Error: ${error.message}</p>`;
    })
    .finally(() => {
      loading.style.display = "none";
    });
}
