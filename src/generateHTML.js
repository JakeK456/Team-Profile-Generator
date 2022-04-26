// returns full html with all card html placed into main body
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
        <header class="bg-secondary text-white text-center fs-2 p-5"> Team Profile Generator </header>

        <main>
            <div class="container">
                <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3">
                    ${cardHTML}
                </div> 
            </div>
        </main>
    </body>
    </html>`;
    return html;
};

// iterates through team members, creating card html for each
const generateCardHTML = (teamMembers) => {
    let html = "";

    // html snippet unique to employee type
    teamMembers.forEach(member => {
        let htmlSnippet = null;
        switch (member.getRole()){
            case 'Manager': 
                htmlSnippet = `Office number: ${member.getOfficeNumber()}`; 
                break;
            case 'Engineer': 
                htmlSnippet = `GitHub: <a href="https://github.com/${member.getGithub()}" class="card-link">${member.getGithub()}</a>`; 
                break;
            case 'Intern': 
                htmlSnippet = `School: ${member.getSchool()}`; 
                break;
        }

        const cardHTML = 
        `<div class="col">
            <div class="card shadow p-2 rounded bg-light m-3" style="width: 18rem;">
                <div class="card-body bg-primary text-white rounded">
                    <h5 class="card-title">${member.getName()}</h5>
                    <p class="card-text">${member.getRole()}</p>
                </div> 
                <div class="card-body">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item border rounded m-1">
                            ID: <span>${member.getId()}</span>
                        </li>
                        <li class="list-group-item border rounded m-1">
                            Email: <a href="mailto: ${member.getEmail()}" class="card-link">${member.getEmail()}</a>
                        </li>
                        <li class="list-group-item border rounded m-1">
                            ${htmlSnippet}
                        </li>
                    </ul>
                </div>
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