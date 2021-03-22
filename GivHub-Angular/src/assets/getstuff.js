function GetCharity()
{
    let charity2Search = document.querySelector('#charity2Search').value;

    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
  
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Credentials', 'true');
  
    headers.append('GET', 'POST', 'OPTIONS');
  
  //  headers.append('Authorization', 'Basic ' + base64.encode(username + ":" + password));

    fetch(`http://data.orghunter.com/v1/charitysearch?user_key=153f832c549a150e74121c7c7c40667e&searchTerm=${charity2Search}`,
    {mode: 'no-cors',
    credentials: 'include',
    method: 'POST',
    headers: {'Content-Type': 'application/json'}})
        .then(result => {
            let json = result.json();
            if (json.status >= 200 && json.status < 300) {
            
            } else {
                return json.then(Promise.reject.bind(Promise));
            }
            
        })

        .then(charity => {
            
            document.querySelector('.charityResult name').forEach(name => name.remove());
            document.querySelector('.charityResult foundation').forEach(article => article.remove());
            let article = document.createElement('name');
            article.appendChild(document.createTextNode(charity[0].name));
            document.querySelector('.charityResult'.appendChild(article));
            document.querySelector('#charity2Search').value = '';
            let foundation = document.createElement('foundation');
            foundation.appendChild(document.createTextNode(charity[1].foundation));
            document.querySelector('.charityResult'.appendChild(foundation));
            document.querySelector('#charity2Search').value = '';
        });
}
