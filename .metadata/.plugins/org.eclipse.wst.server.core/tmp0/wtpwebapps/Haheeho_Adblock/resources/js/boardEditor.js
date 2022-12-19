
const boardEditor = document.getElementById('boardEditor');
const btnBold = document.getElementById('btn-bold');
const btnItalic = document.getElementById('btn-italic');
const btnUnderline = document.getElementById('btn-underline');
const btnStrike = document.getElementById('btn-strike');
const btnOrderedList = document.getElementById('btn-ordered-list');
const btnUnorderedList = document.getElementById('btn-unordered-list');

const btnAlignLeft = document.getElementById('btn-align-left');
const btnAlignCenter = document.getElementById('btn-align-center');
const btnAlignRight = document.getElementById('btn-align-right');
const selectFontSize = document.getElementById('select-fontSize');

const btnImage = document.getElementById('btn-image');
const imageSelector = document.getElementById('imgSelector');

// 텍스트 관련 이벤트
btnBold.addEventListener('click', () => {setStyle('bold')});
btnItalic.addEventListener('click', () => {setStyle('italic')});
btnUnderline.addEventListener('click', () => {setStyle('underline')});
btnStrike.addEventListener('click', () => {setStyle('strikeThrough')});
btnOrderedList.addEventListener('click', () => {setStyle('insertOrderedList')});
btnUnorderedList.addEventListener('click', () => {setStyle('insertUnorderedList')});
btnAlignRight.addEventListener('click', () => {setAlign('justifyRight')});
btnAlignLeft.addEventListener('click', () => {setAlign('justifyLeft')});
btnAlignCenter.addEventListener('click', () => {setAlign('justifyCenter')});
selectFontSize.addEventListener('change', () => {setFontSize()});

// img 관련 이벤트
btnImage.addEventListener('click', () => {imageSelector.click()});

imageSelector.addEventListener('change', (e) => {
    const files = e.target.files;
    // !!는 [undefined, "", 0] 일 경우 결과는 false 그 외에 결과는 모두 true
    if(!!files) {
        insertImageDate(files[0]);
    }
});

function insertImageDate(file) {
    const reader = new FileReader();
    reader.addEventListener('load', (e) => {
        focusEditor();
        document.execCommand('insertImage', false, `${reader.result}`);
    });
    reader.readAsDataURL(file);
}

function setStyle(style) {
    document.execCommand(style);
    focusEditor();
}

function setAlign(align) {
    document.execCommand(align);
    focusEditor();
}

function setFontSize(){
    const size = selectFontSize.options[selectFontSize.selectedIndex].value;
    document.execCommand("fontSize", false, size);
    focusEditor();
}

function focusEditor() {
    boardEditor.focus({preventScroll: true});
}