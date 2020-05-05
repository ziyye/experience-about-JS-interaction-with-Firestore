// （1）首先，要想和Firebase里的Firestore中的数据交互，首先要将网页连接到对应的Firebase project（通过Firebase CLI的initial、deploy命令完成）
// （2）如果控制台提示无读写数据库的permission，则需要修改firestore.rules文件（对应行改成ture），以获得权限
// （2）然后需要load Firebase的SDK，这些写在bot2jz.html中嵌入的<script>里了

// Firebase的数据存在Firestore，结构是每个collection下有很多document，例如“students”collection
// 里面包含很多个学生，每个学生是一个document
// 输出到console的信息在控制台才能看到，页面不显示
// 如果要输入到网页上，把输出到console的语句换了就行，例如bot2jz.html的44、45行

/* ===================================== update() ==================================== */
// update(): add new data to existing document, update data; only for existing doc
// 在"students" collection 下的一个ID为"john0000"的document，存的是unikey对应的学生的信息
// collection里有document，document里也可以有collection，更新里面某个值的调用如下：
db.collection("students").doc("john0000").collection("units").doc("COMP5318").update({
    // 如果update()之前已经有“assignment2"这个field，就更新其值；没有，就添加此field和这个值
    assignment2: true 
    }); 

/* ============================================ where() ====================================== */
// retrieve the data within collection "cities" under specific condition
// 使用where语法检索在collection "cities"所有符合条件的document，并输出到控制台
// where() method takes 3 parameters: a field to filter on, a comparison operation, & a 
// value. The comparison can be <, <=, ==, >, >=, array-contains, in, or array-contains-any.
db.collection("cities").where("capital", "==", true)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            // output document ID and document content to console
            console.log(doc.id, " => ", doc.data()); // 输出document的信息到浏览器的控制台
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });

// Create a reference to the cities collection
var citiesRef = db.collection("cities");
// Create a query against the collection.
var query = citiesRef.where("state", "==", "CA");
/* citiesRef.where("population", "<", 100000)
   citiesRef.where("name", ">=", "San Francisco")
   citiesRef.where("regions", "array-contains", "west_coast")
   citiesRef.where('country', 'in', ['USA', 'Japan']);
   citiesRef.where('regions', 'array-contains-any', ['west_coast', 'east_coast']); */

query.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });




// get() & onSnapShot()
// get(): This method will be invoked and get data only once until it’s called again.
// onSnapShot(): Unlike get() method, this method will be triggered every time data changes in a location that it’s listening for.

// read data, & output the result to console
// 查找一个特定的field的值，比如学生"john0000"的"COMP5318"的"assignment1"的完成状态是true还是false
var docRef = db.collection("students").doc("john0000").collection("units").doc("COMP5318"); // 定义对需要的document的引用
docRef.get().then(function(doc){ 
    // 此时的doc.data()代表了students->john0000->units->COMP5318这个document
    console.log(doc.id, ":", doc.data().assignment1); // doc.data()后面接个 .assignment1 就是引用里面的这个field
})

// get(): will return a promise, and if the promise is full-filled, the then() function 
// will be called and the callback function will have a snapshot object snap. 
// promise 要用then接收或者async await
db.collection("users").get() 
.then(snap => {
    // The snap object contains all the user documents from the users collection with some other meta information.
    snap.forEach(doc => { // forEach(): passing a callback function on each iteration.
        console.log(doc.data()); // doc object: is also a firebase query snapshot, that contains each user document with some additional metadata.
        console.log(doc.id);
    });
});
// To see a real-time change on the view, you will need to use onSnapShot() listener.
// Using the onSnapShot() listener method, it will update the view 
// automatically when data changes on the Firestore Database
db.collection("users").onSnapshot()
.then(snap => {
    snap.forEach(doc => {
        console.log(doc.data());
    });
});

// read data, & output the result to console
var docRef = db.collection("students").doc("john0000"); 
docRef.get().then(function(doc){
    console.log(doc.id, ":", doc.data()); // 打印学生john0000的所有信息到控制台
})

// add a document into collection "cities"; only for collection
// 在"cities"这个collection里加入一个document，不过会随机生成document ID，不推荐使用
db.collection("cities").add({
    name: "addDataTest"
})

// delete the document
// 删除这个学生
db.collection("students").doc("john0000").delete();

// Could be directly inputted into Console inside browser
db.collection("data").doc("one").get().then(function(doc){
  console.log("Yooo:", doc.data().arrayExample[2]);
  console.log("Yooo:", doc.data().objectExample); 
  console.log(doc.id, ":", doc.data());
}); 

// set()函数，如果指定的document已经存在，则重写为{ }里的数据；不存在，则生成这个document，并填充进{ }里的数据
// since the "DC" document within "cities" already exists, this function would reset it with new data
db.collection("cities").doc("DC").set({
    name: "Washington, D.C", state: null, country: "USA",
    capital: true, population: 680000,
    regions: ["east_coast"] });

    this.videoComments.forEach(comment => {
        if(!!comment.replies) {
            comment.replies.comments = comment.replies.comments.sort(
                (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
                ); 
            } 
        }
    );

this.videoComments.forEach(comment => {
    comment.replies.comments = comment.replies.comments.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
});

this.videoComments.forEach(comment => {
    if(!!comment.replies) {
          comment.replies.comments = comment.replies.comments.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
    }
 });

 this.videoComments.forEach(comment => {
    if(!!comment.replies) {
          comment.replies.comments = comment.replies.comments.sort((a, b) => +new Date(b.snippet.publishedAt) - +new Date(a.snippet.publishedAt));
    }
 });

 // read data, & output the result to console
 
var id = n - index; 
var docRef = db.collection("students").doc("id"); 
docRef.get().then(function(doc){
     // 改成输出到html对应位置的语句
    console.log(doc.id, ":", doc.data().title);
    console.log(doc.id, ":", doc.data().data);
})

ref = db.doc("students/shli0000")
ref.get().then(function(doc) {
    console.log(doc.id, " => ", doc.data().email);
})

// 模仿。原代码用的是老版的 firebase.database()，这里用的新款的 firebase.firestore()
function genFunction(data) {
    data.last = "Li123"
    console.log("after callback: ", data.last)
}
window.addEventListener("load", getData(genFunction))
function getData(callbackIN) {
    var ref = firebase.firestore().collection("students")
    ref.doc("shli0000").get().then(function (snapshot) {
        console.log("before callback: ", snapshot.data().last)
        callbackIN(snapshot.data())
    })
}
