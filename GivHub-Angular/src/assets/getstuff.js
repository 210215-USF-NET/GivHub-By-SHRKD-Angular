function GetCharity()
{
    let charity2Search = document.querySelector('#charity2Search').value;
    fetch(`http://data.orghunter.com/v1/charitysearch?user_key=153f832c549a150e74121c7c7c40667e&searchTerm=${charity2Search}`,{mode: 'no-cors'})
        .then(result => result.json())
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
