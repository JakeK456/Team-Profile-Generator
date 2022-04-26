const generateFullHTML = (cardHTML) => {
    html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        
        <!-- Bootstrap CSS -->
        <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
        crossorigin="anonymous"
      />
        
        <title>Team Profile Generator</title>
    </head>
    <body>
        <header> Team Profile Generator </header>
    
        <main>
            ${cardHTML}
        </main>
    </body>
    </html>`;
    return html;
};

const generateCardHTML = (teamMembers) => {
    let html = "";

    teamMembers.forEach(member => {
        const cardHTML = `
        <div class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${member.getName()}</h5>
                <p class="card-text">${member.getRole()}</p>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                        ID: <span>${member.getId()}</span>
                    </li>
                    <li class="list-group-item">
                        <a href="#" class="card-link">Email</a>
                    </li>
                    <li class="list-group-item">
                        A third item
                    </li>
                </ul>
            </div>
        </div>`;
        html += cardHTML;
    });

    return html;
};

const generateHTML = (teamMembers) => {
    const cardHTML = generateCardHTML(teamMembers);
    const fullHTML = generateFullHTML(cardHTML);
    return fullHTML;
};

module.exports = generateHTML;