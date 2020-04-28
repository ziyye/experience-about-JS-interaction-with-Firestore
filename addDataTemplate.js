var citiesRef = db.collection("cities");

citiesRef.doc("SF").set({
    name: "San Francisco", state: "CA", country: "USA",
    capital: false, population: 860000,
    regions: ["west_coast", "norcal"] }); // this is an array
citiesRef.doc("LA").set({
    name: "Los Angeles", state: "CA", country: "USA",
    capital: false, population: 3900000,
    regions: ["west_coast", "socal"] });
citiesRef.doc("DC").set({
    name: "Washington, D.C", state: null, country: "USA",
    capital: true, population: 680000,
    regions: ["east_coast"] });

var docData = {
    stringExample: "Hello world!",
    booleanExample: true,
    numberExample: 3.14159265,
    dateExample: firebase.firestore.Timestamp.fromDate(new Date("December 10, 1815")),
    arrayExample: [5, true, "hello"],
    nullExample: null,
    objectExample: { // map
        a: 5,
        b: {
            nested: "foo"
        }
    },
    favorites: { food: "Pizza", color: "Blue", subject: "recess" }
};
db.collection("data").doc("one").set(docData).then(function() {
    console.log("Template data successfully written!");
})
.catch(function(error) {
    console.error("Error writing template data: ", error);
})
