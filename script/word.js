// $("#save").click(function (e) {
//     e.preventDefault();
//     download();

// });
// console.log(listn);

// createWordle();
// function createWordle() {
//     WordCloud(document.getElementById('canvas'), {
//         list: list, gridSize: Math.round(16 * $('#canvas').width() / 1024),
//         weightFactor: function (size) {
//             return Math.pow(size, 2.3) * $('#canvas').width() / 1024;
//         },
//         fontFamily: 'Times, serif',
//         color: function (word, weight) {
//             return (weight === 12) ? '#f02222' : '#c09292';
//         },
//         rotateRatio: 0.5,
//         rotationSteps: 2,
//         backgroundColor: '#ffe0e0'
//     });

// }
// function download() {
//     var link = document.createElement('a');
//     link.download = 'filename.png';
//     link.href = document.getElementById('canvas').toDataURL()
//     link.click();
// }
$(document).ready(function () {

    $("#submit-btn").click(function (e) {
        e.preventDefault();
        addWord();
    });

    setTimeout(() => {
        $("#input-word").focus()

    }, 2000);

    $("#input-word").keydown(function (e) {
        if (e.keyCode == 13) {
            addWord();
        }
    });

    let canvas=document.getElementById("canvas");
    let canvasWidth=canvas.offsetWidth ;
    let canvasHeight=canvas.offsetHeight ;
    $("#canvas-height").val(canvasHeight)
    $("#canvas-width").val(canvasWidth)
    
    $("#canvas-width").change(function () { 
       updateWidth()
    });
    $("#canvas-width").keydown(function () { 
       updateWidth()
    });
    $("#canvas-width").keyup(function () { 
       updateWidth()
    });
    $("#canvas-height").change(function () { 
       updateHeight()
    });
    $("#canvas-height").keydown(function () { 
       updateHeight()
    });
    $("#canvas-height").keyup(function () { 
       updateHeight()
    });
});


// add word function
function addWord() {
    let word = $("#input-word").val();

    if (word.length < 1) {
        return;
    }
    // check for existing word
    let wordexiest = checkWordInList(word)
    if (wordexiest) {
        return;
    }
    addWordDiv(word);
    updateWordCount();
    createWordle();
}

function checkWordInList(newWord) {
    let words = document.getElementsByClassName("word");
    for (let i = 0; i < words.length; i++) {
        let word = words[i].innerText;
        if (word == newWord) {
            // increase count
            increaseCount(i);
            return true;
        }

    }

}

function increaseCount(wordId) {
    let wordDiv = $(".word-item");
    wordDiv = wordDiv[wordId];
    let countInput = wordDiv.firstElementChild.firstElementChild;
    let countValue = countInput.value;
    countValue = parseInt(countValue)
    countValue = countValue + 1;
    countInput.value = countValue
    return;

}

function addWordDiv(word) {
    let wordArray = word.split(" ");
    for (let i = 0; i < wordArray.length; i++) {

        let wordItem = `     <div class="word-item">
    <div class="word-size">
        <input type="number" value="1" class="wordsizecount">
    </div>
    <div class="word">
        ${wordArray[i]}
    </div>
    <div class="delete">

        <i class="fa fa-minus" aria-hidden="true"></i>
    </div>
</div>`;
        $("#word-list").append(wordItem)
        let scrollDiv = document.getElementById("word-list");
        scrollDiv.scrollTop = scrollDiv.scrollHeight;
    }
    $("#input-word").val("")
    $("#input-word").focus()
}

function updateWordCount() {
    let totalWordDivs = document.getElementsByClassName("word-item");
    let wordCount = totalWordDivs.length
    $("#word-count").text(wordCount)
}

function updateHeight()
{
    let canvasHeight=canvas.offsetHeight ;
    let newHeight=$("#canvas-height").val();
    newHeight=parseInt(newHeight);
    canvas.style.height=newHeight+"px"; 
}
function updateWidth()
{
    let canvasHeight=canvas.offsetWidth ;
    let newWidth=$("#canvas-width").val();
    newWidth=parseInt(newWidth);
    canvas.style.width=newWidth+"px"; 
}


function createWordle() {
    let list=[];

    let words=document.getElementsByClassName("word");
    let wordSizeCount=document.getElementsByClassName("wordsizecount");
    for (let i = 0; i < words.length; i++) {
        // const element = array[i];
        let word=words[i].innerText;
        let size=wordSizeCount[i].value;
        size=parseInt(size)
        let wordArr=[];
        wordArr.push(word);
        wordArr.push(20)
    list.push(wordArr)            
        
    }
    
        // WordCloud(document.getElementById('canvas'), {  
        //     list: [['list',12],['new',3]],
        //         gridSize: Math.round(16 * $('#canvas').width() / 1024),
        //         weightFactor: function (size) {
        //           return Math.pow(size, 2.3) * $('#canvas').width() / 1024;
        //         },
        //         fontFamily: 'Times, serif',
        //         color: function (word, weight) {
        //           return (weight === 12) ? '#f02222' : '#c09292';
        //         },
        //         rotateRatio: 0.5,
        //         rotationSteps: 2,
        //         backgroundColor: '#ffe0e0'
        //       }
let listn = [['foo', 12], ['bar', 6], ['bar', 3], ['bar', 3], ['bar', 3], ['bar', 3]]

        console.log(listn);
        console.log(list);
        
        
        WordCloud(document.getElementById('canvas'), {
            list: list,
               
                    fontFamily: `'Open Sans', sans-serif`,
                    color: function (word, weight) {
                        console.log(weight);
                        
                      return (weight === 12) ? '#EB8080' : '#EB8080';
                    },
                    rotateRatio: 0.5,
                    rotationSteps: 2,
                    backgroundColor: '#ffe0e0'
        });
}