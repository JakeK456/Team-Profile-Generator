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
        let htmlSnippet = null;
        switch (member.getRole()){
            case 'Manager': 
                htmlSnippet = `Office number: ${member.getOfficeNumber()}`; 
                break;
            case 'Engineer': 
                htmlSnippet = `GitHub: <a href="${member.getGithub()}" class="card-link">${member.getGithub()}</a>`; 
                break;
            case 'Intern': 
                htmlSnippet = `School: ${member.getSchool()}`; 
                break;
        }

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
                        Email: <a href="mailto: ${member.getEmail()}" class="card-link">${member.getEmail()}</a>
                    </li>
                    <li class="list-group-item">
                        ${htmlSnippet}
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