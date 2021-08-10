// tracks functions:

async function displaySleepTracks(){
    const sleepTracksData= await fetch('/getSleepTracks').then((res) => res.json())
    if(sleepTracksData.status === 200){
        const unauthorizedWarning=document.getElementById('unauthorizedWarning');
        unauthorizedWarning.style.display='none';
        if (sleepTracksData.results == null) {
            sleepTracksArr = [];
        }
        else {
            sleepTracksArr = sleepTracksData.data.tracks;
        }
        let sleepTracksTable = document.getElementById("sleepTracksTable");
        let html = "";
        await sleepTracksArr.forEach(function(element, index){
            html += `<tr class="tableRows">
                        <th id="itemID" scope="row">${element._id}</th>
                        <td>${element.title}</td>
                        <td>${element.category}</td>
                        <td>${element.artist}</td>
                        <td>${element.description}</td>
                        <td>${element.isPremium? "premium" : "normal"}</td>
                        <td><button class="btn btn-danger" onclick="deleteTrack('${element._id}');">Delete</button></td>
                        <td><button class="btn btn-light" onclick="updateTrack(${element._id})">Update</button></td>
                    </tr>`;
           
        });
        if (sleepTracksArr.length != 0) {
            sleepTracksTable.innerHTML = html;
        }
        if (sleepTracksArr.length == 0) {
            const empty=document.getElementById('empty');
            empty.style.display='block';
        }
        const tracksCount=document.getElementById('tracksCount');
        tracksCount.innerText=`No.of results: ${sleepTracksData.results}`
        let search = document.getElementById("sleepTracksSearch");
        search.addEventListener("input", function () {
            let searchValue = search.value;
            let results = document.getElementsByClassName("tableRows");
            Array.from(results).forEach(function (element) {
                let cardTxt = element.getElementsByTagName("th")[0].innerText;
                cardTxt += element.getElementsByTagName("td")[0].innerText;
                cardTxt += element.getElementsByTagName("td")[1].innerText;
                cardTxt += element.getElementsByTagName("td")[2].innerText;
                cardTxt += element.getElementsByTagName("td")[3].innerText;
                cardTxt += element.getElementsByTagName("td")[4].innerText;
                if (cardTxt.toLowerCase().includes(searchValue.toLowerCase())) {
                    element.style.display = "";
                }
                else {
                    element.style.display = "none";
                }
            });
        });
    }
}
displaySleepTracks();


// CRUD functions
async function deleteTrack(id){
    console.log(id);
    const result=await fetch(`/sleepTrackDelete/${id}`, {
        method:"DELETE"
    })
    if(result.status === 200){
        console.log('deleted');
        document.location.href='/sleepTracks';
    }
    else if (result.status === 400){
        alert("Something went wrong! please try again");
    }
}