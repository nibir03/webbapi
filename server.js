const express = require('express');
const Airtable = require('airtable');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const base = new Airtable({apiKey:'patqGwriDxdCEw6NC.3148fc0d6e08e80a157d182ae69b5eee7d2dbd2ee03920b1808397a2d2ee3eaa'}).base('appSHid8g2TCtzv1s')

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', (req,res) => {
    res.sendFile('index');
});

app.get('/contacts', (req, res) => {
    let contacts = [];

    base('Contacts').select({
        view:'Grid view'
    }).eachPage((records, fetchNextPage) => {
        records.forEach(record => {
            contacts.push({
                id: record.id,
                name: record.get('Name'),
                email: record.get('Email')
            });
        });
        fetchNextPage();
    }, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Server Error');
            return;
        }
        res.json(contacts);
    });
});





app.post('/contacts', (req,res) => {
    base('Contacts').create([
        {
          "fields": {
            "Name": res.body.Name,
            "Email": res.body.Email
          }
        }], function(err, records) {
            if (err) {
              console.error(err);
              return;
            } res.sendStatus(200)})

})


app.get('/data', (req,res) => {
    fs.readFile('data.json', 'utf-8', (err, data) => {
        res.json(JSON.parse(data));
    } );
});

/*app.post('/data', (req,res) => {
    fs.writeFile('data.json', JSON.stringify(req, body), 'utf-8', (err) => {
        res.json(JSON.parse(data));
    });
});*/

app.listen(44, () => {
    console.log('Server up and running on 44');
});



