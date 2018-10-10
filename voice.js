// ==UserScript==
// @name         Add Voice to sharepoint
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Add google's new voice to text to sharepoint 
// @author       Ben Gjerstad
// @match        https://[Edit].sharepoint.com/[edit]/EditForm.aspx*
// @grant        none

// ==/UserScript==

var istextready = 0
var final_transcript = '';
var recognizing = false;
var ignore_onend;
var start_timestamp;

var recognition = new window.webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;

recognition.onstart = function() {
    recognizing = true;
    document.getElementById("RecLink").text = "STP"
};
recognition.onerror = function(event) {
    if (event.error == 'no-speech') {
        alert("no-speech");
        ignore_onend = true;
    }
    if (event.error == 'audio-capture') {
        alert("no_microphone");
        ignore_onend = true;
    }
    if (event.error == 'not-allowed') {
        if (event.timeStamp - start_timestamp < 100) {
            1
        } else {
            alert("Mic blocked");
        }
        ignore_onend = true;
    }
};

recognition.onend = function() {
    recognizing = false;
    if (ignore_onend) {
        return;
    }
    document.getElementById("RecLink").text = "REC"
    if (!final_transcript) {
        return;
    }
    if (window.getSelection) {
        window.getSelection().removeAllRanges();
        var range = document.createRange();
        range.selectNode(document.getElementById('final_span'));
        window.getSelection().addRange(range);
    }
};
recognition.onresult = function(event) {
    var interim_transcript = '';
    for (var i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
            final_transcript += window.event.results[i][0].transcript;
        } else {
            interim_transcript += window.event.results[i][0].transcript;
        }
    }
    final_transcript = capitalize(final_transcript);
    if (final_transcript != ''){
        console.log('You said: ', final_transcript);
    }
    document.getElementById("final_span").innerHTML = linebreak(final_transcript);
    document.getElementById("interim_span").innerHTML = linebreak(interim_transcript);
};

var two_line = /\n\n/g;
var one_line = /\n/g;
function linebreak(s) {
  return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
}

var first_char = /\S/;
function capitalize(s) {
  return s.replace(first_char, function(m) { return m.toUpperCase(); });
}

function startButton(event){
    if (recognizing) {
        recognition.stop();
        return;
    }
  final_transcript = '';
  recognition.lang = 'United States';
  recognition.start();
  ignore_onend = false;
  //final_span.innerHTML = '';
  //interim_span.innerHTML = '';
  start_timestamp = event.timeStamp;
}

function polltextbox(){
        if (document.getElementById("ms-rterangecursor-end")){
            if (istextready == 0){
                var addthis = '<span id="final_span"></span><span id="interim_span"></span><a id="RecLink" href="#" style="float:right;">REC</a>';
                document.getElementById("ms-rterangecursor-end").parentNode.innerHTML = addthis+document.getElementById("ms-rterangecursor-end").parentNode.innerHTML;
                //window.$('#ms-rterangecursor-end').parentNode.innerHTML = document.getElementById("ms-rterangecursor-end").parentNode.innerHTML + addthis;
                window.$('#RecLink').click(startButton);
            }
            istextready = 1
        }
    else{
            if (istextready == 1){
                var relement = document.getElementById("RecLink");
                relement.parentNode.removeChild(relement);
            }
            istextready = 0
    }
}



(function() {'use strict';
    //setTimeout(function(){mymain()}, 5000);
    window.setInterval(polltextbox,1000)
})();
